import { ActionIcon, Card, Group, Pill, Text, Title, useMantineTheme } from "@mantine/core";
import { DateInput, DateInputProps, DatePicker } from "@mantine/dates";
import { IconCalendar, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";

// import { getWeekRange } from "../../utils";

const LogTime = () => {
  const [showDatePicker, setShowDatePiker] = useState(false);
  const theme = useMantineTheme();
  const [value, setValue] = useState<Date | null>(null);
//   const [currentDate, setCurrentDate] = useState<Date>(new Date());

// const { startOfWeek, endOfWeek } = getWeekRange(currentDate);
const dateParser: DateInputProps['dateParser'] = (input) => {
  console.log(input);
  if (input === 'WW2') {
    return new Date(1939, 8, 1);
  }

  return dayjs(input, 'DD/MM/YYYY').toDate();
};

console.log('value', value);

  return (
    <Card h={600} withBorder shadow="md">
      <Group>
        <Title>Log Time</Title>
      </Group>
      <Group justify="space-between">
        <Group>
          <Text>Total this week</Text>
          <Pill fw={800} c="white" bg={theme.colors.oceanBlue[6]}>3:00</Pill>
        </Group>
        <Group style={{ position: "relative" }}>
          <ActionIcon size="lg" variant="outline" onClick={() => setShowDatePiker(!showDatePicker)}>
            <IconCalendar />
          </ActionIcon>
          <Group gap="xs">
            <ActionIcon size="lg" variant="outline"><IconChevronLeft/></ActionIcon>
            <ActionIcon size="lg" variant="outline"><IconChevronRight/></ActionIcon>
          </Group>
          {showDatePicker === true ? (
            <DatePicker
              bd="2px solid #424242"
              style={{
                position: "absolute",
                zIndex: "100",
                top: 40,
                right: 0,
                borderRadius: "5px"
              }}
            />
          ) : null}
        </Group>
      </Group>

      <Group>
      <DateInput
      value={value}
      onChange={setValue}
      // valueFormat="YYYY-MM-DD"
      label="Date input"
      placeholder="YYYY-MM-DD"
      dateParser={dateParser}
    />
      </Group>
    </Card>
  );
};

export default LogTime;
