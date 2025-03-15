import { Avatar, Menu, Text, useMantineTheme } from "@mantine/core";
import { IconLogout, IconQuestionMark, IconSettings } from "@tabler/icons-react";

export interface AvatarProps {
  name: string;
  size?: string | number;
  radius?: string | number;
}
const CustomAvatar = ({ name, size = "md", radius = "xl" }: AvatarProps) => {
  const theme = useMantineTheme();
  return (
    <Menu>
      <Menu.Target>
        <Avatar
          variant="filled"
          radius={radius}
          name={name}
          color={theme.primaryColor}
          size={size}
        />
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
