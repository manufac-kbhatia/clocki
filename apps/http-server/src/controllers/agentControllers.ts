import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { AIMessage, ToolMessage } from "@langchain/core/messages";
import { config } from "dotenv";

config();

import { ChatOpenAI } from "@langchain/openai";
import { Request, Response } from "express";

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o",
  temperature: 0,
});

const multiply = tool(
  async ({ a, b }: { a: number; b: number }) => {
    return a * b;
  },
  {
    name: "mutiply",
    description: "Mutiply two number together",
    schema: z.object({
      a: z.number().describe("first number"),
      b: z.number().describe("second number"),
    }),
  },
);

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

export const agent = async (req: Request<unknown, unknown, { prompt: string }>, res: Response) => {
  console.log("openai", process.env.OPENAI_API_KEY);
  const prompt = req.body.prompt;
  const messages = [
    {
      role: "user",
      content: prompt,
    },
  ];
  const result = await agentBuilder.invoke({ messages: prompt });
  res.status(200).json({
    message: result.messages,
  });
};
