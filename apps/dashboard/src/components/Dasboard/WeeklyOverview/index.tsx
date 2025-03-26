import {
  ActionIcon,
  Card,
  Group,
  Paper,
  Pill,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMemo, useState } from "react";
import { useGetMyTimeEntries } from "../../../hooks/api/timeSheet";
import { getCurrentWeekRange, formatDate } from "../../../pages/LogTime/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import WeeklyOverviewDateCard from "./WeeklyOverviewDateCard";
import { convertToTime } from "../../TimeSheet/TimeEntryModal/utils";

const WeeklyOverview = () => {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeekRange(new Date()));
  const theme = useMantineTheme();
  const { data: timeSheetData } = useGetMyTimeEntries({
    startDate: formatDate(currentWeek.startOfWeek),
    endDate: formatDate(currentWeek.endOfWeek),
  });

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => ({
      startOfWeek: prev.startOfWeek.subtract(7, "day"),
      endOfWeek: prev.endOfWeek.subtract(7, "day"),
    }));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => ({
      startOfWeek: prev.startOfWeek.add(7, "day"),
      endOfWeek: prev.endOfWeek.add(7, "day"),
    }));
  };

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
        <Paper w="fit-content" p="xs">
          <Group wrap="nowrap">
            {dates.map((date) => {
              const formatedDate = date.toISOString().split("T")[0] as string;
              return (
                <WeeklyOverviewDateCard
                  date={date}
                  entryData={timeSheetData?.timeEntry[formatedDate]}
                />
              );
            })}
          </Group>
        </Paper>
      </Stack>
    </Card>
  );
};

export default WeeklyOverview;
