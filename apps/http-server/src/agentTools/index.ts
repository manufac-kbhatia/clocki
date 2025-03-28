import { getContextVariable } from "@langchain/core/context";
import { tool } from "@langchain/core/tools";
import { client } from "@repo/db";
import { z } from "zod";

export const multiply = tool(
  async ({ a, b }: { a: number; b: number }) => {
    return (a * b).toString();
  },
  {
    name: "multiply",
    description: "Multiply two number together",
    schema: z.object({
      a: z.number().describe("first number"),
      b: z.number().describe("second number"),
    }),
  },
);

export const findEmployee = tool(
  async ({ searchQuery }: { searchQuery: string }) => {
    const organisationId = getContextVariable("organisationId") as string;
    const results = await client.employee.findMany({
      where: {
        OR: [
          { organisationId },
          { createdOrganisation: { id: organisationId } }
        ],
        AND: [
          {
            OR: [
              { firstName: { contains: searchQuery, mode: "insensitive" } },
              { lastName: { contains: searchQuery, mode: "insensitive" } },
              { email: { contains: searchQuery, mode: "insensitive" } },
              { employeeInfo: { position: { contains: searchQuery, mode: "insensitive" } } },
            ],
          }
        ],
      },
      include: {
        employeeInfo: true,
      },
    });

    if (results.length === 0) {
      return `No employees found matching "${searchQuery}".`;
    }

    return results
      .map(({ employeeInfo, ...rest }) => {
        return `
Name: ${rest.firstName} ${rest.lastName ?? ""}
Date of Birth: ${rest.dateOfBirth?.toISOString() ?? "N/A"}
Email: ${rest.email}
Address: ${rest.address ?? "N/A"}, ${rest.city ?? "N/A"} (${rest.postalCode ?? "N/A"})
Phone: ${rest.phoneNumber ?? "N/A"}
Role: ${rest.role ?? "N/A"}
Gender: ${rest.gender ?? "N/A"}
Position: ${employeeInfo?.position ?? "N/A"}
Hire Date: ${employeeInfo?.hireDate?.toISOString() ?? "N/A"}
        `.trim();
      })
      .join("\n");
  },
  {
    name: "findEmployee",
    description:
      "Finds employees that match the search query across multiple fields (first name, last name, email, position, etc).",
    schema: z.object({
      searchQuery: z.string().describe("Search query for the employee name, email, or position etc"),
    }),
  },
);

export const getAllEmployeeDetails = tool(
  async () => {
    const organisationId = getContextVariable("organisationId") as string;
    const results = await client.employee.findMany({
      where: {
        OR: [
          { organisationId },
          { createdOrganisation: { id: organisationId } },
        ],
      },
      include: {
        employeeInfo: true,
      },
    });

    if (results.length === 0) {
      return `No employees found".`;
    }

    return results
      .map(({ employeeInfo, ...rest }) => {
        return `
Name: ${rest.firstName} ${rest.lastName ?? ""}
Date of Birth: ${rest.dateOfBirth?.toISOString() ?? "N/A"}
Email: ${rest.email}
Address: ${rest.address ?? "N/A"}, ${rest.city ?? "N/A"} (${rest.postalCode ?? "N/A"})
Phone: ${rest.phoneNumber ?? "N/A"}
Role: ${rest.role ?? "N/A"}
Gender: ${rest.gender ?? "N/A"}
Position: ${employeeInfo?.position ?? "N/A"}
Hire Date: ${employeeInfo?.hireDate?.toISOString() ?? "N/A"}
        `.trim();
      })
      .join("\n");
  },
  {
    name: "getAllEmployeeDetails",
    description: "Fetches and returns details of all employees in the organization.",
  },
);


export const getAllTeamsDetails = tool(
  async () => {
    const organisationId = getContextVariable("organisationId") as string;
    const results = await client.team.findMany({
      where: {
        organisationId,
      },
      include: {
        members: {
          include: {
            employeeInfo: true,
          },
        },
        teamLead: {
          include: {
            employeeInfo: true,
          },
        },
      },
    });

    if (results.length === 0) {
      return `No teams found.`;
    }

    return results
      .map(({ name, members, teamLead }) => {
        return `
Team Name: ${name}

Team Lead:
  Name: ${teamLead?.firstName ?? ""} ${teamLead?.lastName ?? ""}
  Email: ${teamLead?.email ?? "N/A"}
  Position: ${teamLead?.employeeInfo?.position ?? "N/A"}
  Role: ${teamLead?.role ?? "N/A"}

Members:
${members.length > 0
  ? members
      .map(
        (member) => `  - ${member.firstName} ${member.lastName ?? ""}
    Email: ${member.email ?? "N/A"}
    Position: ${member.employeeInfo?.position ?? "N/A"}`
      )
      .join("\n")
  : "  No members in this team."}
        `.trim();
      })
      .join("\n\n");
  },
  {
    name: "getAllTeamsDetails",
    description: "Fetches and returns details of all teams, including team lead and members info.",
  },
);

export const getAllProjectsDetails = tool(
  async () => {
    const organisationId = getContextVariable("organisationId") as string;
    const results = await client.project.findMany({
      where: {
        organisationId,
      },
      include: {
        members: {
          include: {
            employeeInfo: true,
          },
        },
        Client: true,
      },
    });

    if (results.length === 0) {
      return `No projects found.`;
    }

    return results
      .map(({ name, members, Client }) => {
        return `
Project Name: ${name}

Client:
  Name: ${Client?.name ?? ""}
  Email: ${Client?.email ?? "N/A"}
  Address: ${Client.address ?? "N/A"}, ${Client.city ?? "N/A"})

Members:
${members.length > 0
  ? members
      .map(
        (member) => `  - ${member.firstName} ${member.lastName ?? ""}
    Email: ${member.email ?? "N/A"}
    Position: ${member.employeeInfo?.position ?? "N/A"}`
      )
      .join("\n")
  : "  No members in this team."}
        `.trim();
      })
      .join("\n\n");
  },
  {
    name: "getAllProjectsDetails",
    description: "Fetches and returns details of all projects, including client details and members info.",
  },
);

export const getAllClientsDetails = tool(
  async () => {
    const organisationId = getContextVariable("organisationId") as string;
    const results = await client.client.findMany({
      where: {
        organisationId,
      },
    });

    if (results.length === 0) {
      return `No clients found.`;
    }

    return results
      .map((Client) => {
        return `
Project Name: ${name}

Client:
  Name: ${Client?.name ?? ""}
  Email: ${Client?.email ?? "N/A"}
  Address: ${Client.address ?? "N/A"}, ${Client.city ?? "N/A"})
  `.trim();
      })
      .join("\n\n");
  },
  {
    name: "getAllClientsDetails",
    description: "Fetches and returns details of all clients, including client details and members info.",
  },
);


