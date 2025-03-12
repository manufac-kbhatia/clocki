import { Card, TextInput, Title } from "@mantine/core";
import { useField } from "@mantine/form";
// import { useDrag } from 'react-dnd'

const AddTeam = () => {
  const field = useField({
    initialValue: "",
    validate: (value) => (value.trim().length < 2 ? "Value is too short" : null),
  });

  // const [{ opacity }, dragRef] = useDrag(
  //   () => ({
  //     type: ItemTypes.CARD,
  //     item: { text },
  //     collect: (monitor) => ({
  //       opacity: monitor.isDragging() ? 0.5 : 1
  //     })
  //   }),
  //   []
  // )

  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder m="xl">
      <Title order={1} fw={800} mb="xs">
        Add new user
      </Title>
      <TextInput {...field.getInputProps()} label="Name" placeholder="Enter your name" mb="md" />
    </Card>
  );
};

export default AddTeam;
