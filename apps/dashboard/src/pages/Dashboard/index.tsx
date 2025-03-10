import { Text } from "@mantine/core";
import { useGetMe } from "../../hooks/api";
import { Link } from "react-router";

export function Dashboard() {
  const { data } = useGetMe();

  return (
    <>
    <Text>
      {data?.me.firstName} : {data?.me.email}
    </Text>
    <Link to={"/page"}>Page A</Link>
    </>
  );
}
