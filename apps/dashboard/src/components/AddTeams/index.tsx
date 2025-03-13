import { Button, Card, Grid, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useCreateTeam, useGetEmployees } from "../../hooks/api";
import { GetEmployeesResponse, TeamPayload } from "@repo/schemas/rest";
import { Section, SectionType } from "./utils";
import { Column } from "./Column";
import { useForm } from "@mantine/form";
import { useClockiContext } from "../../context";

const AddTeam = () => {
  const { auth } = useClockiContext();
  const { data } = useGetEmployees();
  const { mutate: createTeam } = useCreateTeam();
  const [candidate, setCandidate] = useState<GetEmployeesResponse["employees"]>(
    data?.employees ?? [],
  );
  const [teamLead, setTeamLead] = useState<GetEmployeesResponse["employees"][number] | null>(null);
  const [members, setMembers] = useState<GetEmployeesResponse["employees"]>([]);

  const { getInputProps, onSubmit, setFieldError, errors } = useForm<TeamPayload>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      organisationId: "",
      teamLeadId: "",
      members: [],
    },
    validate: { name: (value) => (value.trim().length < 2 ? "Value is too short" : null) },
  });

  console.log(errors);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const to = over.id as SectionType;
    const { employee, from } = active.data.current as {
      from: SectionType;
      employee: GetEmployeesResponse["employees"][number];
    };
    if (to === from) return; // If to and from drop location is same then return
    if (to === Section.TeamLead && teamLead !== null) return; // If the team lead is already selected, return

    const removeFrom: Record<
      SectionType,
      (employee?: GetEmployeesResponse["employees"][number]) => void
    > = {
      [Section.Candidate]: (employee) =>
        setCandidate((prev) => prev.filter((ele) => ele.id !== employee?.id)),
      [Section.Members]: (employee) =>
        setMembers((prev) => prev.filter((ele) => ele.id !== employee?.id)),
      [Section.TeamLead]: () => setTeamLead(null),
    };

    const addTo: Record<
      SectionType,
      (employee: GetEmployeesResponse["employees"][number]) => void
    > = {
      [Section.Candidate]: (employee) => setCandidate((prev) => [...prev, employee]),
      [Section.Members]: (employee) => setMembers((prev) => [...prev, employee]),
      [Section.TeamLead]: (employee) => setTeamLead(employee),
    };

    addTo[to](employee);
    removeFrom[from](employee);
  }

  const handleSubmit = (value: TeamPayload) => {
    if (teamLead === null) {
      setFieldError("teamLeadId", "Team lead is required for team formation");
      return;
    }

    if (members.length === 0) {
      setFieldError("members", "Select atleast one user as team member for team formation");
      return;
    }

    const organisationId =
      auth?.employee?.organisationId ?? auth?.employee?.createdOrganisation?.id;
    if (organisationId !== undefined) {
      const teamLeadId = teamLead.id;
      const membersId = members.map((member) => member.id);
      value = { ...value, organisationId: organisationId, teamLeadId, members: membersId };
      createTeam(value);
    }
  };

  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder m="xs">
      <Title order={1} fw={800} mb="xs">
        Add new team
      </Title>
      <form onSubmit={onSubmit(handleSubmit)}>
        <TextInput {...getInputProps("name")} label="Name" placeholder="Enter team name" mb="md" />
        <DndContext onDragEnd={handleDragEnd}>
          <Grid>
            <Grid.Col span={8}>
              <Stack>
                <Column section={Section.TeamLead} employees={teamLead ? [teamLead] : []} />
                <Text c="red">{errors.teamLeadId}</Text>
                <Column section={Section.Members} employees={members} />
                <Text c="red">{errors.members}</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
              <Column section={Section.Candidate} employees={candidate} />
            </Grid.Col>
          </Grid>
        </DndContext>
        <Group>
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Card>
  );
};

export default AddTeam;
