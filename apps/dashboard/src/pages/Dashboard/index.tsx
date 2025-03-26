import { useClockiContext } from "../../context";
import WelcomeCard from "../../components/Dasboard/WelcomeCard";
import WeeklyOverview from "../../components/Dasboard/WeeklyOverview";

export function Dashboard() {
  const { auth } = useClockiContext();
  return (
    <>
      <WelcomeCard userName={auth?.employee?.firstName} />
      <WeeklyOverview />
    </>
  );
}
