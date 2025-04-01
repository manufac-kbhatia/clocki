import { getContextVariable } from "@langchain/core/context";
import { tool } from "@langchain/core/tools";
import { client } from "@repo/db";
import { Status } from "@repo/schemas";
import { z } from "zod";

export const convertToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  if (hours && minutes) return hours * 60 + minutes;

  return 0;
};

export const convertToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

export const findEmployee = tool(
  async ({ searchQuery }: { searchQuery: string }) => {
    const organisationId = getContextVariable("organisationId") as string;
    const results = await client.employee.findMany({
      where: {
        OR: [{ organisationId }, { createdOrganisation: { id: organisationId } }],
        AND: [
          {
            OR: [
              { firstName: { contains: searchQuery, mode: "insensitive" } },
              { lastName: { contains: searchQuery, mode: "insensitive" } },
              { email: { contains: searchQuery, mode: "insensitive" } },
              { employeeInfo: { position: { contains: searchQuery, mode: "insensitive" } } },
            ],
          },
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
        OR: [{ organisationId }, { createdOrganisation: { id: organisationId } }],
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
${
  members.length > 0
    ? members
        .map(
          (member) => `  - ${member.firstName} ${member.lastName ?? ""}
    Email: ${member.email ?? "N/A"}
    Position: ${member.employeeInfo?.position ?? "N/A"}`,
        )
        .join("\n")
    : "  No members in this team."
}
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
${
  members.length > 0
    ? members
        .map(
          (member) => `  - ${member.firstName} ${member.lastName ?? ""}
    Email: ${member.email ?? "N/A"}
    Position: ${member.employeeInfo?.position ?? "N/A"}`,
        )
        .join("\n")
    : "  No members in this team."
}
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

export const createProject = tool(
  async ({ name, membersEmail, clientEmail }: { name: string; membersEmail: string[]; clientEmail: string }) => {
    const organisationId = getContextVariable("organisationId") as string;

    if (!membersEmail.length) {
      return "At least one member email must be provided.";
    }

    // Fetch all employees in a single query instead of multiple `findUnique` calls
    const assignees = await client.employee.findMany({
      where: { email: { in: membersEmail } },
    });

    if (assignees.length === 0) {
      return "No employees found with the given emails.";
    }

    // Fetch the client
    const associatedClient = await client.client.findUnique({
      where: {
        email_organisationId: {
          email: clientEmail,
          organisationId,
        },
      },
    });

    if (!associatedClient) {
      return "No client found with the given email.";
    }

    // Create the project
    const project = await client.project.create({
      data: {
        name,
        clientId: associatedClient.id,
        members: {
          connect: assignees.map(({ id }) => ({ id })),
        },
        organisationId,
      },
    });

    return JSON.stringify(project);
  },
  {
    name: "createProject",
    description: "Creates a new project in the system with the specified name, client, and assigned team members.",
    schema: z.object({
      name: z.string().describe("The name of the project to be created."),
      membersEmail: z
        .array(z.string().email())
        .min(1, "At least one email is required.")
        .describe("A list of employee emails to be assigned to the project."),
      clientEmail: z.string().email().describe("The email of the client associated with the project."),
    }),
  },
);

export const logTimeEntry = tool(
  async ({
    projectName,
    description,
    loggedHours,
    createdAt,
    status,
  }: {
    projectName: string;
    description: string;
    loggedHours: string;
    createdAt: string;
    status: Status;
  }) => {
    const organisationId = getContextVariable("organisationId") as string;
    const userId = getContextVariable("userId") as string;

    // Fetch the employee
    const employee = await client.employee.findUnique({
      where: { id: userId },
    });

    if (!employee) {
      return "Unable to create log entry as the employee details could not be found.";
    }

    // Fetch the project
    const selectedProject = await client.project.findUnique({
      where: {
        name_organisationId: {
          name: projectName,
          organisationId,
        },
      },
    });

    if (!selectedProject) {
      return "Project with the given name not found.";
    }

    // Create the time log entry
    const createdTimeEntry = await client.timesheet.create({
      data: {
        createdAt,
        description,
        loggedHours: convertToMinutes(loggedHours),
        status,
        employeeId: employee.id,
        projectId: selectedProject.id,
      },
    });

    return JSON.stringify(createdTimeEntry);
  },
  {
    name: "logTimeEntry",
    description:
      "Logs a time entry for an employee on a specific project, including description, hours logged (in HH:MM format), the date when it should be created and status.",
    schema: z.object({
      projectName: z.string().describe("The name of the project to which the time entry is associated."),
      description: z.string().describe("A brief description of the work done."),
      loggedHours: z
        .string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Must be in HH:MM format (24-hour time).")
        .describe("The number of hours logged in HH:MM format (e.g., 05:30 for 5 hours 30 minutes)."),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be in YYYY-MM-DD format (e.g., 2025-03-20).")
        .describe("The date when the time entry was created, formatted as YYYY-MM-DD."),
      status: z.nativeEnum(Status).describe("The status of the time entry (e.g., Completed, Inprogress)."),
    }),
  },
);

export const getAllTimeEntriesOfGivenProject = tool(
  async ({ name }: { name: string }) => {
    const organisationId = getContextVariable("organisationId") as string;

    // Fetch the project along with its time entries and employee details
    const project = await client.project.findUnique({
      where: {
        name_organisationId: {
          name,
          organisationId,
        },
      },
      include: {
        Timesheet: {
          include: {
            employee: {
              select: {
                email: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!project) {
      return `No project found with the name "${name}".`;
    }

    if (project.Timesheet.length === 0) {
      return `Project "${name}" exists, but no time entries have been logged yet.`;
    }

    return `Project Name: ${project.name}

Time Entries:
${project.Timesheet.map(
  (entry, index) =>
    `${index + 1}. ${entry.employee.firstName} ${entry.employee.lastName ?? ""} (${entry.employee.email}) logged time on ${entry.createdAt}.
   - Note: ${entry.description}
   - Logged Hours: ${convertToTime(entry.loggedHours)}
   - Status: ${entry.status}`,
).join("\n")}`;
  },
  {
    name: "getAllTimeEntriesOfGivenProject",
    description:
      "Retrieves all time entries logged for a given project, including employee details, descriptions, hours logged, and statuses.",
    schema: z.object({
      name: z.string().describe("The name of the project whose time entries you want to fetch."),
    }),
  },
);
