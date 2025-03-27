import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { AIMessage, ToolMessage } from "@langchain/core/messages";
import { config } from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { Request, Response } from "express";
import { multiply } from "../agentTools";
import { setContextVariable } from "@langchain/core/context";
import { Role } from "@repo/schemas";

config();
const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o",
  temperature: 0,
});

const tools = [multiply];
const toolsByName = Object.fromEntries(tools.map((tool) => [tool.name, tool]));
const llmWithTools = llm.bindTools(tools);

// Nodes

// Define the function that calls the model
async function llmCall(state: typeof MessagesAnnotation.State) {
  const response = await llmWithTools.invoke([
    {
      role: "system",
      content: "You are a helpfull assistant tasked with performing arithemetic on a set of inputs",
    },
    ...state.messages,
  ]);

  // We return a list, because this will get added to the existing list
  return { messages: [response] };
}

async function toolNode(state: typeof MessagesAnnotation.State) {
  const results: ToolMessage[] = [];
  const lastMessage = state.messages.at(-1) as AIMessage | undefined;

  if (lastMessage?.tool_calls?.length) {
    for (const toolCall of lastMessage.tool_calls) {
      const tool = toolsByName[toolCall.name];
      // @ts-ignore
      const observation = await tool?.invoke(toolCall.args);
      results.push(
        new ToolMessage({
          content: observation,
          tool_call_id: toolCall.id ?? "",
        }),
      );
    }
  }

  return { messages: results };
}

function shouldContinue({ messages }: typeof MessagesAnnotation.State) {
  const lastMessage = messages[messages.length - 1] as AIMessage;

  // If the LLM makes a tool call, then we route to the "tools" node
  if (lastMessage.tool_calls?.length) {
    return "tools";
  }
  // Otherwise, we stop (reply to the user) using the special "__end__" node
  return "__end__";
}

const agentBuilder = new StateGraph(MessagesAnnotation)
  .addNode("llmCall", llmCall)
  .addNode("tools", toolNode)
  .addEdge("__start__", "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, { tools: "tools", __end__: "__end__" })
  .addEdge("tools", "llmCall")
  .compile();

const conversationHistory = new Map<string, { role: string; content: string }[]>();

export const agent = async (req: Request<unknown, unknown, { prompt: string }>, res: Response) => {
  const employeeId = req.employeeId;
  const organisationId = req.role === Role.Admin ? req.employee?.createdOrganisation?.id : req.employee?.organisationId;

  setContextVariable("userId", req.employeeId);
  setContextVariable("organisationId", organisationId);

  if (!employeeId) {
    return res.status(400).json({ error: "employeeId is required" });
  }

  let messages = conversationHistory.get(employeeId) || [];
  messages.push({ role: "user", content: req.body.prompt });

  // Invoke LLM
  const result = await agentBuilder.invoke({ messages });

  const lastMessage = result.messages.at(-1) as AIMessage;
  if (lastMessage) {
    messages.push({ role: "system", content: JSON.stringify(lastMessage.content) });
  }

  conversationHistory.set(employeeId, messages);

  res.status(200).json({ message: result.messages });
};
