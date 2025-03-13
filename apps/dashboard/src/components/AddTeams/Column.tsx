import { GetEmployeesResponse } from "@repo/schemas/rest";
import { SectionType } from "./utils";
import { useDroppable } from "@dnd-kit/core";
import { Stack, Title } from "@mantine/core";
import { EmployeeCard } from "./EmployeeCard";

type ColumnProps = {
  section: SectionType;
  employees?: GetEmployeesResponse["employees"];
};

export function Column({ section, employees }: ColumnProps) {
  const handler = useDroppable({
    id: section,
    data: employees,
  });

  // console.log(`${column.title}`, handler);

  return (
    <Stack  bd={"2px solid red"} mih={200} ref={handler.setNodeRef} >
      <Title>{section}</Title>
      <Stack>
      {employees?.map((employee) => {
          return <EmployeeCard key={employee.id} employee={employee} section={section}/>;
        })}
      </Stack>
    </Stack>
  );
}