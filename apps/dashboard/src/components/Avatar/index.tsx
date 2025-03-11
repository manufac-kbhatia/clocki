import { Avatar, Menu, Text, useMantineTheme } from "@mantine/core";
import { IconLogout, IconQuestionMark, IconSettings } from "@tabler/icons-react";

export interface AvatarProps {
  name: string;
}
const CustomAvatar = ({ name }: AvatarProps) => {
  const theme = useMantineTheme();
  return (
    <Menu>
      <Menu.Target>
        <Avatar variant="filled" radius="xl" name={name} color={theme.primaryColor} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          <Text fw={700}>{name}</Text>
        </Menu.Label>
        <Menu.Divider />
        <Menu.Item leftSection={<IconQuestionMark size={14} />}>
          <Text>Help</Text>
        </Menu.Item>
        <Menu.Item leftSection={<IconSettings size={14} />}>
          <Text>My settings</Text>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<IconLogout size={14} />}>
          <Text>Sign out</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default CustomAvatar;
