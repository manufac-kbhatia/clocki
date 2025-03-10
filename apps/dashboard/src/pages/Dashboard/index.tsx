import { Text } from "@mantine/core";
import { useGetMe } from "../../hooks/api";

export function Dashboard() {
  const {data} = useGetMe();

  return <Text>{data?.me.firstName} : {data?.me.email}</Text>;
}
