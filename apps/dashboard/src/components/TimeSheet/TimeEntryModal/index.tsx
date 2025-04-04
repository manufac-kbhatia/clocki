import {
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import {
  convertToMinutes,
  convertToTime,
  CreateTimeSheetEntryNames,
  CreateTimeSheetEntryPlaceholders,
  TimeEntryModalMode,
  TimeSheetEntryPayload,
  TimeSheetEntrySchema,
  validateTime,
} from "./utils";
import { DateInput } from "@mantine/dates";
import { Status } from "@repo/schemas";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { ProjectWithInfo, TimeSheetPayload } from "@repo/schemas/rest";
import { useCreateTimeEntry } from "../../../hooks/api/timeSheet";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";

export interface TimeEntryModalProps {
  opened: boolean;
  onClose: () => void;
  mode?: TimeEntryModalMode;
  editTimeEntry?: TimeSheetEntryPayload;
  projects?: ProjectWithInfo[];
  selectedDate?: string;
}

const TimeEntryModal = ({
  opened,
  onClose,
  mode,
  projects,
  editTimeEntry,
  selectedDate
}: TimeEntryModalProps) => {
  const { getInputProps, key, onSubmit, setValues, reset, setFieldValue } = useForm<TimeSheetEntryPayload>({
    mode: "uncontrolled",
    validate: zodResolver(TimeSheetEntrySchema),
  });
  const queryClient = useQueryClient();
  const [time, setTime] = useState<string>("");
  const [timeError, setTimeError] = useState<string | null>(null);
  const { mutate: createEntry, isPending } = useCreateTimeEntry({
    onSuccess: async (data) => {
      notifications.show({
        title: "Entry logged",
        message: `${convertToTime(data.timeEntry.loggedHours)} hours logged`,
      });
      await queryClient.invalidateQueries({queryKey: ["timeEntries"]})
      onClose();
    },

    onError: () => {
      notifications.show({
        title: "Failed",
        message: "",
        color: "red",
      });
    },
  });

  const handleChange: TextInputProps["onChange"] = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    if (value.length > 2) {
      value = value.slice(0, 2) + ":" + value.slice(2, 4);
    }
    setTime(value);
  };

  const handleBlur = () => {
    if (!validateTime(time)) {
      setTime("01:00");
    } else {
      const [hours, minutes] = time.split(":").map(Number);
      if (hours === 0 && minutes < 1) {
        setTime("01:00");
      }
      if (hours === 23 && minutes > 59) {
        setTime("23:59");
      }
    }
  };

  const handleSubmit = (value: TimeSheetEntryPayload) => {
    if (time.length === 0) {
      setTimeError("Please enter valid hours to be logged");
    } else {
      setTimeError(null);
    }

    const loggedHours = convertToMinutes(time);
    const { createdAt, ...rest } = value;
    if (createdAt === undefined) return;
    const entryDate = createdAt?.toLocaleString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const payload: TimeSheetPayload = {
      ...rest,
      createdAt: entryDate,
      loggedHours,
    };
  
    if (mode === TimeEntryModalMode.Add) {
      createEntry(payload);
    } else if (mode === TimeEntryModalMode.Edit) {
      // updateEntry(value);
    }
  };

  useEffect(() => {
    if (mode === TimeEntryModalMode.Edit && editTimeEntry) {
      const values: TimeSheetEntryPayload = {
        description: editTimeEntry.description,
        projectId: editTimeEntry.projectId,
        status: editTimeEntry.status,
        createdAt: editTimeEntry.createdAt,
      };
      setValues(values);
    }
  }, [editTimeEntry, mode, setValues]);

  useEffect(() => {
    if (selectedDate)
    setFieldValue("createdAt", new Date(selectedDate))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate])

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      title={
        <Text fw={600}>{mode === TimeEntryModalMode.Add ? "Add new entry" : "Edit entry"}</Text>
      }
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 4,
      }}
    >
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack gap="xs">
          <Select
            {...getInputProps(CreateTimeSheetEntryNames.projectId)}
            key={key(CreateTimeSheetEntryNames.projectId)}
            placeholder={CreateTimeSheetEntryPlaceholders.projectId}
            label={CreateTimeSheetEntryPlaceholders.projectId}
            data={projects?.map((project) => {
              return { value: project.id, label: project.name };
            })}
          />
          <Textarea
            {...getInputProps(CreateTimeSheetEntryNames.description)}
            key={key(CreateTimeSheetEntryNames.description)}
            placeholder={CreateTimeSheetEntryPlaceholders.description}
            label={CreateTimeSheetEntryPlaceholders.description}
            resize="vertical"
          />
          <Group grow>
            <DateInput
              {...getInputProps(CreateTimeSheetEntryNames.createdAt)}
              key={key(CreateTimeSheetEntryNames.createdAt)}
              placeholder={CreateTimeSheetEntryPlaceholders.createdAt}
              label={CreateTimeSheetEntryPlaceholders.createdAt}
            />
            <TextInput
              placeholder="--:--"
              value={time}
              onChange={handleChange}
              onBlur={handleBlur}
              error={timeError}
              label={"Log Hours"}
            />
          </Group>
          <Select
            {...getInputProps(CreateTimeSheetEntryNames.status)}
            key={key(CreateTimeSheetEntryNames.status)}
            placeholder={CreateTimeSheetEntryPlaceholders.status}
            data={Object.values(Status)}
            label={CreateTimeSheetEntryPlaceholders.status}
          />
          <Group justify="center">
            <Button variant="outline" type="button" onClick={reset}>
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>Save</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default TimeEntryModal;
