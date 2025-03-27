import { Group, Stack, ActionIcon, Center, SimpleGrid, Card, Text } from "@mantine/core";
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
import "./index.css";

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
    <>
      <MainContainer
        style={{
          height: "90vh",
          backgroundColor: "transparent",
          border: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.length === 0 ? (
          <Center h={"800"}>
            <SimpleGrid cols={2}>
              <Card withBorder shadow="none">
                <Text size="sm" ta="center">Want to log your work hours for today? I can help</Text>
              </Card>
              <Card withBorder shadow="none">
               <Text size="sm" ta="center"> Who do you need to email? I can draft the message and send it for you!</Text>
              </Card>
              <Card withBorder shadow="none">
                <Text size="sm" ta="center">Who are you looking for? I can fetch details on any employee!</Text>
              </Card>
              <Card withBorder shadow="none">
                <Text size="sm" ta="center">Looking for details on a team, project, or client?</Text>
              </Card>
            </SimpleGrid>
          </Center>
        ) : null}
        <ChatContainer
          style={{ display: "flex", justifyContent: "flex-end", backgroundColor: "inherit" }}
        >
          {messages.length > 0 ? (
            <MessageList style={{ backgroundColor: "inherit" }}>
              {messages.map((message) => {
                return <Message model={message} key={message.sentTime ?? ""} className="" />;
              })}
            </MessageList>
          ) : null}
          <InputToolbox style={{ backgroundColor: "inherit" }}>
            <Stack w="100%">
              {/* Please Note: TypingIndicator is not a valid children of ChatContainer and MessageList and will throw error if directly placed inside them  */}
              {isPending === true ? (
                <TypingIndicator
                  style={{ paddingLeft: "20px", backgroundColor: "inherit" }}
                  content="Looking"
                />
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
    </>
  );
}

export default Assistant;
