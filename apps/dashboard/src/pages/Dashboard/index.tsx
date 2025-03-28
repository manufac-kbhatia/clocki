import { useClockiContext } from "../../context";
import WelcomeCard from "../../components/Dasboard/WelcomeCard";
import WeeklyOverview from "../../components/Dasboard/WeeklyOverview";
import { Card, Grid, Group, Stack, Text, Title } from "@mantine/core";
import { useMemo, useState } from "react";
import { useGetMyTimeEntries } from "../../hooks/api/timeSheet";
import { formatDate, getCurrentWeekRange } from "../LogTime/utils";
import { convertToTime } from "../../components/TimeSheet/TimeEntryModal/utils";
import LoggedTimeCard from "../../components/Dasboard/LoggedTimeCard";
import ActiveProjectsCard from "../../components/Dasboard/ActiveProjectsCard";
import ProjectsAndTeams from "../../components/Dasboard/ProjectsAndTeams";

export function Dashboard() {
  const { auth } = useClockiContext();
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeekRange(new Date()));
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

  const totalLoggedHours = useMemo(() => {
    const totalminutes = Object.values(timeSheetData?.timeEntry ?? {})
      .flat()
      .reduce((sum, entry) => sum + entry.loggedHours, 0);

    return convertToTime(totalminutes);
  }, [timeSheetData]);

  return (
    <Grid>
      <Grid.Col span={12}>
        <WelcomeCard userName={auth?.employee?.firstName} />
      </Grid.Col>
      <Grid.Col span={12}>
        <Grid>
          <Grid.Col span={6}>
            <Stack>
              <WeeklyOverview
                timeSheetData={timeSheetData}
                handleNextWeek={handleNextWeek}
                handlePrevWeek={handlePrevWeek}
                currentWeek={currentWeek}
              />
              <Group grow>
                <LoggedTimeCard totalLoggedHours={totalLoggedHours} />
                <ActiveProjectsCard totalActiveProjects={auth?.employee?.projects.length ?? 0} />
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6} h={350}>
            <ProjectsAndTeams />
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={12}>
        <Grid>
          <Grid.Col span={6}>
            <Card mih={350} withBorder shadow="none">
              <Title>Requests pending decision</Title>
              <Text ta="center" m="xl">
                No requests pending decision
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card mih={350} withBorder shadow="none">
              <Title>Vacation leave</Title>
              <Text ta="center" m="xl">
                You have not been granted any vacation days
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card mih={350} withBorder shadow="none">
              <Title>Work from home</Title>
              <Text ta="center" m="xl">
                Nobody is working from home
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card mih={350} withBorder shadow="none">
              <Title>Absences</Title>
              <Text ta="center" m="xl">
                No absences recorded
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
}
