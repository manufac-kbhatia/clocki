import { useDraggable } from "@dnd-kit/core";
import { Box, Text, Title } from "@mantine/core";
import { GetEmployeesResponse } from "@repo/schemas/rest";
import { SectionType } from "./utils";

type EmployeeCardProps = {
  employee:  GetEmployeesResponse["employees"][number];
  section: SectionType;
};

export function EmployeeCard({ employee, section }: EmployeeCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: employee.id,
    data: {from: section,  employee},
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        "zIndex": 10,
      }
    : undefined;

  return (
    <Box ref={setNodeRef}
    {...listeners}
    {...attributes} style={style}>
      <Title>{employee.firstName} {employee.lastName}</Title>
      <Text>{employee.role}</Text>
    </Box>
  );
}