import { useDraggable } from "@dnd-kit/core";
import { Card, Text } from "@mantine/core";
import { GetEmployeesResponse } from "@repo/schemas/rest";
import { SectionType } from "./utils";

type EmployeeCardProps = {
  employee: GetEmployeesResponse["employees"][number];
  section: SectionType;
};

export function EmployeeCard({ employee, section }: EmployeeCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: employee.id,
    data: { from: section, employee },
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        zIndex: 10,
      }
    : undefined;

  return (
    <Card ref={setNodeRef} {...listeners} {...attributes} style={style} withBorder maw={300}>
      <Text>
        {employee.firstName} {employee.lastName}
      </Text>
      <Text>{employee.role}</Text>
    </Card>
  );
}
