import {
  ActionIcon,
  Card,
  Group,
  Paper,
  Pill,
  ScrollArea,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMemo } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import WeeklyOverviewDateCard from "./WeeklyOverviewDateCard";
import { convertToTime } from "../../TimeSheet/TimeEntryModal/utils";
import { GetMyTimeEntryResponse } from "@repo/schemas/rest";
import { Dayjs } from "dayjs";
export interface WeeklyOverviewProps {
  timeSheetData?: GetMyTimeEntryResponse;
  handlePrevWeek: () => void;
  handleNextWeek: () => void;
  currentWeek: {
    startOfWeek: Dayjs;
    endOfWeek: Dayjs;
  };
}
const WeeklyOverview = ({
  timeSheetData,
  handleNextWeek,
  handlePrevWeek,
  currentWeek,
}: WeeklyOverviewProps) => {
  const theme = useMantineTheme();

  const dates = useMemo(() => {
    return Array.from(
      { length: currentWeek.endOfWeek.diff(currentWeek.startOfWeek, "day") + 1 },
      (_, i) => currentWeek.startOfWeek.add(i, "day"),
    );
  }, [currentWeek]);

  const totalLoggedHours = useMemo(() => {
    return Object.values(timeSheetData?.timeEntry ?? {})
      .flat()
      .reduce((sum, entry) => sum + entry.loggedHours, 0);
  }, [timeSheetData]);

  return (
    <Card withBorder shadow="none">
      <Stack>
        <Group justify="space-between">
          <Title>Weekly Overview</Title>
          <Group gap="xs">
            <ActionIcon size="sm" variant="outline" onClick={handlePrevWeek}>
              <IconChevronLeft />
            </ActionIcon>
            <ActionIcon size="sm" variant="outline" onClick={handleNextWeek}>
              <IconChevronRight />
            </ActionIcon>
          </Group>
        </Group>
        <Group>
          <Text>Total this week</Text>
          <Pill fw={800} c="white" bg={theme.primaryColor}>
            {convertToTime(totalLoggedHours)}
          </Pill>
        </Group>
        <ScrollArea>
          <Paper p="sm" w="fit-content" mx="auto">
            <Group wrap="nowrap" gap={14}>
              {dates.map((date) => {
                const formatedDate = date.toISOString().split("T")[0] as string;
                return (
                  <WeeklyOverviewDateCard
                    key={formatedDate}
                    date={date}
                    entryData={timeSheetData?.timeEntry[formatedDate]}
                  />
                );
              })}
            </Group>
          </Paper>
        </ScrollArea>
      </Stack>
    </Card>
  );
};

export default WeeklyOverview;
