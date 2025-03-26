import { Card, Pill, Stack, Text, useMantineTheme } from "@mantine/core";
import { TimeEntryWithInfo } from "@repo/schemas/rest";
import { Dayjs } from "dayjs";
import { useMemo } from "react";
import { convertToTime } from "../../TimeSheet/TimeEntryModal/utils";

export interface WeeklyOverviewDateCardProps {
  entryData?: TimeEntryWithInfo[];
  date: Dayjs;
}

const WeeklyOverviewDateCard = ({ entryData, date }: WeeklyOverviewDateCardProps) => {
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
    <Card shadow="none" withBorder bg="transparent">
      <Stack align="center">
        <Text size="sm">
          {data.day} {data.dateInNumber}
        </Text>
        <Pill w="fit-content" bg={theme.primaryColor} c="white" fw={700}>
          {data.totalLogged}
        </Pill>
      </Stack>
    </Card>
  );
};

export default WeeklyOverviewDateCard;
