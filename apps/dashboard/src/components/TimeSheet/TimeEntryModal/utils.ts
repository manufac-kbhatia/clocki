export const TimeEntryModalMode = {
  Add: "Add",
  Edit: "Edit",
} as const;

export type TimeEntryModalMode = (typeof TimeEntryModalMode)[keyof typeof TimeEntryModalMode];

import { Status } from "@repo/schemas";
import { z } from "zod";

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
  projectId: z.string({ required_error: "Please provide the project id for which the entry is logged" }),
  createdAt: z.date().optional(),
});

export type TimeSheetEntryPayload = z.infer<typeof TimeSheetEntrySchema>;

export const convertToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const convertToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

export const validateTime = (value: string): boolean => {
  if (!/^\d{2}:\d{2}$/.test(value)) return false; // Ensure format HH:MM
  const [hours, minutes] = value.split(":").map(Number);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};
