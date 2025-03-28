import { useDraggable } from "@dnd-kit/core";
import { Avatar, Card, Group, Stack, Text } from "@mantine/core";
import { EmployeeWithEmployeeInfo } from "@repo/schemas/rest";
import { SectionType } from "./utils";
import { useHover } from "@mantine/hooks";

type EmployeeCardProps = {
  employee: EmployeeWithEmployeeInfo;
  section: SectionType;
};

export function EmployeeCard({ employee, section }: EmployeeCardProps) {
  const { hovered, ref } = useHover();
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
    <Card
      shadow="none"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      withBorder
      maw={300}
      p={5}
    >
      <Group justify="space-between" ref={ref}>
        <Group>
          <Avatar color="initials" name={`${employee.firstName} ${employee.lastName ?? ""}`} />
          <Stack gap={1}>
            <Text size="sm">
              {employee.firstName} {employee.lastName}
            </Text>
            {hovered === true ? (
              <Text size="sm" fw={700}>
                {employee.employeeInfo?.position ?? ""}
              </Text>
            ) : null}
          </Stack>
        </Group>
      </Group>
    </Card>
  );
}
