import { Card, Pill, Stack, Title, useMantineTheme } from "@mantine/core";
import { TimeEntryWithInfo } from "@repo/schemas/rest";
import type { Dayjs } from "dayjs";
import { useMemo } from "react";
import { convertToTime } from "../TimeEntryModal/utils";

export interface DateCardProps {
  date: Dayjs;
  onClick: (value: string) => void;
  entryData?: TimeEntryWithInfo[];
  selectedDate?: string;
}
const DateCard = ({ date, onClick, entryData, selectedDate }: DateCardProps) => {
    const theme = useMantineTheme();
  const data = useMemo(() => {
    const totalLogged = entryData?.reduce((acc, curr) => {
      return acc + curr.loggedHours;
    }, 0);
    return {
      formatedDate: date.toISOString().split("T")[0] as string,
      day: date.toDate().toLocaleDateString("en-US", { weekday: "short" }),
      dateInNumber: date.date(),
      totalLogged: convertToTime(totalLogged ?? 0),
    };
  }, [date, entryData]);

  return (
    <Card
    shadow="none"
      withBorder
      onClick={() => onClick(data.formatedDate)}
      miw={50}
      bg="transparent"
      style={{ cursor: "pointer", border: selectedDate === data.formatedDate ? `2px solid ${theme.colors.violet[6]}` : undefined }}
    >
      <Stack align="center">
        <Title
          order={3}
          size="xl"
          fw={600}
          c={selectedDate === data.formatedDate ? theme.primaryColor : undefined}
        >
          {data.day}
        </Title>
        <Title order={4} fw={400} c={selectedDate === data.formatedDate ? theme.primaryColor : undefined}>
          {data.dateInNumber}
        </Title>
        <Pill w={55} bg={theme.primaryColor} fw={700}>
          {data.totalLogged}
        </Pill>
      </Stack>
    </Card>
  );
};

export default DateCard;
