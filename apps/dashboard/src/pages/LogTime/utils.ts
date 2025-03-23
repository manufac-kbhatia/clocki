import { Status } from "@repo/schemas";
import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";

export const CreateTimeSheetEntryNames: Record<keyof TimeSheetEntryPayload, keyof TimeSheetEntryPayload> = {
  description: "description",
  createdAt: "createdAt",
  projectId: "projectId",
  status: "status",
};

export const CreateTimeSheetEntryLabels: Record<keyof TimeSheetEntryPayload, string> = {
  description: "Description",
  createdAt: "Log Date",
  projectId: "Project",
  status: "Status",
};

export const CreateTimeSheetEntryPlaceholders: Record<keyof TimeSheetEntryPayload, string> = {
  description: "Enter a description",
  createdAt: "Select the Date",
  projectId: "Select the project",
  status: "Select the status",
};

export const TimeSheetEntrySchema = z.object({
  description: z.string().min(1, "Descrioption is required for entry to be logged"),
  status: z.nativeEnum(Status),
  projectId: z.string({ required_error: "Please provide the project id for which the entry is logged" }).optional(),
  createdAt: z.date(),
});

export const getCurrentWeekRange = (date: Date) => {
  const dayOfWeek = date.getDay(); // 0 (Sun) - 6 (Sat)

  // Calculate Monday (start of the week)
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  // Calculate Sunday (end of the week)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return {
    startOfWeek: dayjs(startOfWeek), // Convert to Day.js
    endOfWeek: dayjs(endOfWeek), // Convert to Day.js
  };
};

export const formatDate = (date: Date | string | Dayjs): string => {
  return dayjs(date).format("YYYY-MM-DD");
};

export type TimeSheetEntryPayload = z.infer<typeof TimeSheetEntrySchema>;
