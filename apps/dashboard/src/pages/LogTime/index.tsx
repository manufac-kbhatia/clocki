import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Paper,
  Pill,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { DateInputProps, DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconChevronLeft, IconChevronRight, IconRefresh } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import TimeEntryModal from "../../components/TimeSheet/TimeEntryModal";
import { convertToTime, TimeEntryModalMode } from "../../components/TimeSheet/TimeEntryModal/utils";
import { formatDate, getCurrentWeekRange } from "./utils";
import { TimeEntryWithInfo } from "@repo/schemas/rest";
import DateCard from "../../components/TimeSheet/DateCard";
import { useGetProjects } from "../../hooks/api/project";
import { useGetMyTimeEntries } from "../../hooks/api/timeSheet";

const LogTime = () => {
  const [showDatePicker, setShowDatePiker] = useState(false);
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { data } = useGetProjects();
  const [timeEntryModalMode, setTimeEntryModalMode] = useState<TimeEntryModalMode>(
    TimeEntryModalMode.Add,
  );
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeekRange(new Date()));
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedDateEntry, setSelectedDateEntry] = useState<TimeEntryWithInfo[]>();
  const { data: timeSheetData } = useGetMyTimeEntries({
    startDate: formatDate(currentWeek.startOfWeek),
    endDate: formatDate(currentWeek.endOfWeek),
  });
  const { colorScheme } = useMantineColorScheme();

  const totalLoggedHours = useMemo(() => {
    return Object.values(timeSheetData?.timeEntry ?? {})
      .flat()
      .reduce((sum, entry) => sum + entry.loggedHours, 0);
  }, [timeSheetData]);

  const handleAddEntry = () => {
    setTimeEntryModalMode(TimeEntryModalMode.Add);
    open();
  };

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

  const handleDateSelect = (date: string) => {
    const data = timeSheetData?.timeEntry[date];
    setSelectedDate(date);
    setSelectedDateEntry(data);
  };

  const dates = Array.from(
    { length: currentWeek.endOfWeek.diff(currentWeek.startOfWeek, "day") + 1 },
    (_, i) => currentWeek.startOfWeek.add(i, "day"),
  );

  const handleToday = () => {
    const today = new Date();
    const selectToday = today.toISOString().split("T")[0] as string;
    setCurrentWeek(getCurrentWeekRange(today));
    setSelectedDate(selectToday);
  };

  const handleCalendarSelect: DateInputProps["onChange"] = (value) => {
    if (value !== null) {
      const selectToday = value.toISOString().split("T")[0] as string;
      setCurrentWeek(getCurrentWeekRange(value));
      setSelectedDate(selectToday);
    }
  };

  return (
    <Stack>
      <Card withBorder shadow="none" h={410}>
        <Stack>
          <Group>
            <Title>Log Time</Title>
          </Group>
          <Group justify="space-between">
            <Group>
              <Text>Total this week</Text>
              <Pill fw={800} c="white" bg={theme.primaryColor}>
                {convertToTime(totalLoggedHours)}
              </Pill>
            </Group>
            <Group style={{ position: "relative" }}>
              <Button onClick={handleAddEntry}>Add entry</Button>
              <ActionIcon
                size="lg"
                variant="outline"
                onClick={() => setShowDatePiker(!showDatePicker)}
              >
                <IconCalendar />
              </ActionIcon>
              <Tooltip label="Today">
                <ActionIcon size="lg" variant="outline" onClick={handleToday}>
                  <IconRefresh />
                </ActionIcon>
              </Tooltip>
              <Group gap="xs">
                <ActionIcon size="lg" variant="outline" onClick={handlePrevWeek}>
                  <IconChevronLeft />
                </ActionIcon>
                <ActionIcon size="lg" variant="outline" onClick={handleNextWeek}>
                  <IconChevronRight />
                </ActionIcon>
              </Group>
              {showDatePicker === true ? (
                <DatePicker
                  bd={`2px solid ${theme.primaryColor}`}
                  bg={colorScheme === "dark" ? "#1f1f1f" : "#F8F8F8"}
                  style={{
                    position: "absolute",
                    zIndex: "100",
                    top: 40,
                    right: 0,
                    borderRadius: "5px",
                  }}
                  onChange={handleCalendarSelect}
                />
              ) : null}
            </Group>
          </Group>
          <Paper p="xl">
            <SimpleGrid cols={{ base: 3, xs: 4, lg: 7 }}>
              {dates.map((date) => {
                const formatedDate = date.toISOString().split("T")[0] as string;
                return (
                  <DateCard
                    date={date}
                    onClick={handleDateSelect}
                    entryData={timeSheetData?.timeEntry[formatedDate]}
                    selectedDate={selectedDate}
                  />
                );
              })}
            </SimpleGrid>
          </Paper>
        </Stack>
      </Card>
      <Card mih={300} shadow="none" withBorder>
        <Stack style={{ overflow: "auto" }} fw={600}>
          <Grid>
            <Grid.Col span={3}>Project</Grid.Col>
            <Grid.Col span={5}>Description</Grid.Col>
            <Grid.Col span={2}>Hours</Grid.Col>
            <Grid.Col span={2}>Status</Grid.Col>
          </Grid>
          <Divider />

          <>
            {selectedDateEntry && selectedDateEntry.length > 0 ? (
              selectedDateEntry.map((entry) => {
                return (
                  <Grid>
                    <Grid.Col span={3}>{entry.project.name}</Grid.Col>
                    <Grid.Col span={5}>{entry.description}</Grid.Col>
                    <Grid.Col span={2}>{convertToTime(entry.loggedHours)}</Grid.Col>
                    <Grid.Col span={2}>{entry.status}</Grid.Col>
                  </Grid>
                );
              })
            ) : (
              <Text ta="center" c="dimmed">
                No entries
              </Text>
            )}
          </>
        </Stack>
      </Card>
      <TimeEntryModal
        opened={opened}
        onClose={close}
        mode={timeEntryModalMode}
        projects={data?.projects}
      />
    </Stack>
  );
};

export default LogTime;
