import { EmployeeWithEmployeeInfo } from "@repo/schemas/rest";
import { SectionType } from "./utils";
import { useDroppable } from "@dnd-kit/core";
import { Paper, Stack, Title } from "@mantine/core";
import { EmployeeCard } from "./EmployeeCard";

type ColumnProps = {
  section: SectionType;
  employees?: EmployeeWithEmployeeInfo[];
};

export function Column({ section, employees }: ColumnProps) {
  const handler = useDroppable({
    id: section,
    data: employees,
  });

  return (
    <Stack>
      <Title>{section}</Title>
      <Paper shadow="xl" withBorder p="xl" mih={200} ref={handler.setNodeRef}>
        <Stack>
          {employees?.map((employee) => {
            return <EmployeeCard key={employee.id} employee={employee} section={section} />;
          })}
        </Stack>
      </Paper>
    </Stack>
  );
}
