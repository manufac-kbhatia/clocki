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
        organisationId,
        OR: [
          { firstName: { contains: searchQuery, mode: "insensitive" } },
          { lastName: { contains: searchQuery, mode: "insensitive" } },
          { email: { contains: searchQuery, mode: "insensitive" } },
          { employeeInfo: { position: { contains: searchQuery, mode: "insensitive" } } },
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
