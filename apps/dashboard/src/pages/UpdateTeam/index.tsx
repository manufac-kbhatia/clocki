import { Button, Card, Grid, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useGetEmployees, useGetTeam } from "../../hooks/api";
import { EmployeeWithEmployeeInfo, TeamPayload } from "@repo/schemas/rest";
import { useForm } from "@mantine/form";
import { useClockiContext } from "../../context";
import { Section, SectionType } from "../../components/DnDCards/utils";
import { Column } from "../../components/DnDCards/Column";
import { useParams } from "react-router";

const UpdateTeam = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { auth } = useClockiContext();
  const { data } = useGetEmployees();
  const { data: teamData } = useGetTeam(id);

  const [candidate, setCandidate] = useState<EmployeeWithEmployeeInfo[]>([]);
  const [teamLead, setTeamLead] = useState<EmployeeWithEmployeeInfo | null>(null);
  const [members, setMembers] = useState<EmployeeWithEmployeeInfo[]>([]);

  const { getInputProps, onSubmit, setFieldError, errors, setFieldValue } = useForm<TeamPayload>({
    mode: "uncontrolled",
    validate: { name: (value) => (value.trim().length < 2 ? "Value is too short" : null) },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const to = over.id as SectionType;
    const { employee, from } = active.data.current as {
      from: SectionType;
      employee: EmployeeWithEmployeeInfo;
    };
    if (to === from) return; // If to and from drop location is same then return
    if (to === Section.TeamLead && teamLead !== null) return; // If the team lead is already selected, return

    const removeFrom: Record<SectionType, (employee?: EmployeeWithEmployeeInfo) => void> = {
      [Section.Candidate]: (employee) =>
        setCandidate((prev) => prev.filter((ele) => ele.id !== employee?.id)),
      [Section.Members]: (employee) =>
        setMembers((prev) => prev.filter((ele) => ele.id !== employee?.id)),
      [Section.TeamLead]: () => setTeamLead(null),
    };

    const addTo: Record<SectionType, (employee: EmployeeWithEmployeeInfo) => void> = {
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
      //   createTeam(value);
      console.log(value);
    }
  };

  useEffect(() => {
    const membersId = teamData?.team.members.map((member) => member.id);
    const possibleCandidate = data?.employees.filter(
      (employee) =>
        membersId?.includes(employee.id) === false && employee.id !== teamData?.team.teamLeadId,
    );
    const teamLeadWithEmployeeInfo = data?.employees.find(
      (employee) => employee.id === teamData?.team.teamLeadId,
    );
    const membersWithEmployeeInfo = data?.employees.filter((employee) =>
      membersId?.includes(employee.id),
    );

    setCandidate(possibleCandidate ?? []);
    setTeamLead(teamLeadWithEmployeeInfo ?? null);
    setMembers(membersWithEmployeeInfo ?? []);
    setFieldValue("name", teamData?.team.name ?? "");
  }, [data, setFieldValue, teamData]);

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

export default UpdateTeam;
