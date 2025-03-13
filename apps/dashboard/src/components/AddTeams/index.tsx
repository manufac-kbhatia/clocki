import { Card, Grid, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useGetEmployees } from "../../hooks/api";
import { GetEmployeesResponse } from "@repo/schemas/rest";
import { Section, SectionType } from "./utils";
import { Column } from "./Column";


const AddTeam = () => {
  const {data} = useGetEmployees();
  const [candidate, setCandidate] = useState<GetEmployeesResponse["employees"]>(data?.employees ?? []);
  const [teamLead, setTeamLead] = useState<GetEmployeesResponse["employees"][number] | null>(null);
  const [members, setMembers] = useState<GetEmployeesResponse["employees"]>([])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const to = over.id as SectionType;
    const {employee, from} = active.data.current as {from: SectionType, employee: GetEmployeesResponse["employees"][number]};
    if (to === from) return; // If to and from drop location is same then return
    if (to === Section.Team_Lead && teamLead !== null) return; // If the team lead is already selected, return


    const removeFrom: Record<SectionType, (employee?: GetEmployeesResponse["employees"][number]) => void> = {
      [Section.Candidate] : (employee) =>  setCandidate((prev) => prev.filter((ele) => ele.id !== employee?.id )),
      [Section.Members] : (employee) =>  setMembers((prev) => prev.filter((ele) => ele.id !== employee?.id )),
      [Section.Team_Lead] : () =>  setTeamLead(null),
    }

    const addTo: Record<SectionType, (employee: GetEmployeesResponse["employees"][number]) => void> = {
      [Section.Candidate] : (employee) =>  setCandidate((prev) => [...prev, employee]),
      [Section.Members] : (employee) =>  setMembers((prev) => [...prev, employee]),
      [Section.Team_Lead] : (employee) =>  setTeamLead(employee),
    }

    addTo[to](employee);
      removeFrom[from](employee);

  }

  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder m="xl">
      <Title order={1} fw={800} mb="xs">
        Add new user
      </Title>
      <DndContext onDragEnd={handleDragEnd}>
          <Grid>
            <Grid.Col span={4}>
              <Stack>
              <Column
                section={Section.Team_Lead}
                employees={teamLead ? [teamLead] : []}
              />
              <Column
                section={Section.Members}
                employees={members}
              />
              </Stack>
            </Grid.Col>
            <Grid.Col span={8}>
              <Column
                section={Section.Candidate}
                employees={candidate}
              />
            </Grid.Col>
          </Grid>
        </DndContext>
    </Card>
  );
};

export default AddTeam;
