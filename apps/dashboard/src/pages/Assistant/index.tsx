import { Group, Stack, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  InputToolbox,
  SendButton,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import type { MessageModel } from "@chatscope/chat-ui-kit-react";
import { useChatAgent } from "../../hooks/api/agent";

export function Assistant() {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [inputText, setInputText] = useState("");
  const { mutate: SendPrompt, isPending } = useChatAgent({
    onSuccess: (data) => {
      const cleanedResponse = data.response
        .replace(/^"|"$/g, "") // Remove leading & trailing quotes
        .replace(/\\n/g, "\n");
      setMessages((prev) => {
        const newMessage: MessageModel = {
          message: cleanedResponse,
          direction: "incoming",
          position: "normal",
          type: "text",
        };
        return [...prev, newMessage];
      });
    },
  });

  const handleSendPrompt = (prompt: string) => {
    setMessages((prev) => {
      const newMessage: MessageModel = {
        message: prompt,
        direction: "outgoing",
        position: "first",
      };
      return [...prev, newMessage];
    });

    SendPrompt(prompt);
    setInputText("");
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    // Ref: https://chatscope.io/storybook/react/?path=/docs/documentation-introduction--docs
    <MainContainer
      style={{
        height: "90vh",
        backgroundColor: "transparent",
        border: "none",
      }}
    >
      <ChatContainer
        style={{ display: "flex", justifyContent: "center", backgroundColor: "inherit" }}
      >
        {messages.length > 0 ? (
          <MessageList style={{ backgroundColor: "inherit" }}>
            {messages.map((message) => {
              return <Message model={message} key={message.sentTime ?? ""} />;
            })}
          </MessageList>
        ) : null}
        <InputToolbox style={{ backgroundColor: "inherit" }}>
          <Stack w="100%">
            {/* Please Note: TypingIndicator is not a valid children of ChatContainer and MessageList and will throw error if directly placed inside them  */}
            {isPending === true ? (
              <TypingIndicator style={{ paddingLeft: "20px" }} content="Looking" />
            ) : null}
            <Group>
              <MessageInput
                placeholder="Let's chat"
                sendButton={false}
                disabled={isPending}
                attachButton={false}
                style={{ flex: "1", border: "none", backgroundColor: "inherit" }}
                onChange={setInputText}
                onSend={() => {
                  handleSendPrompt(inputText); // To support enter press
                }}
              />
              <SendButton
                onClick={() => {
                  handleSendPrompt(inputText);
                }}
                disabled={isPending}
              />
              {messages.length > 0 ? (
                <ActionIcon variant="light" onClick={handleClearChat}>
                  <IconTrash />
                </ActionIcon>
              ) : null}
            </Group>
          </Stack>
        </InputToolbox>
      </ChatContainer>
    </MainContainer>
  );
}

export default Assistant;
