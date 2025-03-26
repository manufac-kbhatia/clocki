import { useClockiContext } from "../../context";
import WelcomeCard from "../../components/Dasboard/WelcomeCard";
import WeeklyOverview from "../../components/Dasboard/WeeklyOverview";
import { Card, Grid } from "@mantine/core";

export function Dashboard() {
  const { auth } = useClockiContext();
  return (
    <Grid>
      <Grid.Col span={12}>
        <WelcomeCard userName={auth?.employee?.firstName} />
      </Grid.Col>
      <Grid.Col span={12}>
        <Grid>
          <Grid.Col span={6}>
            <WeeklyOverview />
          </Grid.Col>
          <Grid.Col span={6}>
            <Card withBorder></Card>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
}
