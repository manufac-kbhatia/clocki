import {
  Group,
  Stack,
  ActionIcon,
  Card,
  Box,
  TextInput,
  ScrollArea,
  SimpleGrid,
  Text,
  Title,
  Loader,
} from "@mantine/core";
import { IconSend, IconTrash } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useChatAgent } from "../../hooks/api/agent";
import ReactMarkdown from "react-markdown";

export interface Message {
  content: string;
  direction: "incoming" | "outgoing";
}

export function Assistant() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const { mutate: SendPrompt, isPending } = useChatAgent({
    onSuccess: (data) => {
      const cleanedResponse = data.response
        .replace(/^"|"$/g, "")
        .replace(/\\n/g, "\n");
      setMessages((prev) => {
        const newMessage: Message = {
          content: cleanedResponse,
          direction: "incoming",
        };
        return [...prev, newMessage];
      });
    },
  });

  const handleSendPrompt = (prompt: string) => {
    if (prompt.length === 0) return;
    setMessages((prev) => {
      const newMessage: Message = {
        content: prompt,
        direction: "outgoing",
      };
      return [...prev, newMessage];
    });

    setInputText("");
    SendPrompt(prompt);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Stack h="85vh" justify="center">
      {messages.length === 0 ? (
        <SimpleGrid cols={2}>
          <Card withBorder shadow="none">
            <Text size="sm" ta="center">
              Is there any employee named Harkirat?
            </Text>
          </Card>
          <Card withBorder shadow="none">
            <Text size="sm" ta="center">
              Send a mail to Harkirat
            </Text>
          </Card>
          <Card withBorder shadow="none">
            <Text size="sm" ta="center">
              Can you tell me about the team members of 100xDevs project?
            </Text>
          </Card>
          <Card withBorder shadow="none">
            <Text size="sm" ta="center">
              Do we have an android developer or we have talent gap in this field?
            </Text>
          </Card>
        </SimpleGrid>
      ) : null}

      {messages.length > 0 ? (
        <ScrollArea h="95%">
          <Stack gap="xl">
            {messages.map((message) => {
              return (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: message.direction === "incoming" ? "flex-start" : "flex-end",
                  }}
                >
                  <Card
                    px={10}
                    py={0}
                    w="fit-content"
                    withBorder={message.direction === "outgoing" ? true : false}
                    maw={message.direction === "incoming" ? 600 : undefined}
                    // bg={message.direction === "incoming" ? "transparent" : undefined}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </Card>
                </Box>
              );
            })}
            <div ref={scrollRef} />
          </Stack>
        </ScrollArea>
      ) : null}
      {messages.length === 0 ? (
        <Title order={3} ta="center">
          What can I help with?
        </Title>
      ) : null}
      <Group>
        <TextInput
          placeholder={isPending ? "Working..." : "Ask anything"}
          disabled={isPending}
          value={inputText}
          onKeyDown={(e) => e.key === "Enter" && handleSendPrompt(inputText)}
          onChange={(event) => setInputText(event.currentTarget.value)}
          flex={1}
          rightSection={
            <ActionIcon onClick={() => handleSendPrompt(inputText)}>
              <IconSend size={18} />
            </ActionIcon>
          }
          leftSection={isPending ? <Loader size={18} /> : null}
        />
        {messages.length > 0 ? (
          <ActionIcon onClick={handleClearChat}>
            <IconTrash size={18} />
          </ActionIcon>
        ) : null}
      </Group>
    </Stack>
  );
}

export default Assistant;
