import { useClockiContext } from "../../context";
import WelcomeCard from "../../components/Dasboard/WelcomeCard";

export function Dashboard() {
  const { auth } = useClockiContext();
  return (
    <>
     <WelcomeCard userName={auth?.employee?.firstName} />
    </>
  );
}
