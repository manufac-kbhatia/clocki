import { Avatar, Menu, Text } from "@mantine/core";
import { IconLogout, IconQuestionMark, IconSettings } from "@tabler/icons-react";
import { Link } from "react-router";
import { useLogout } from "../../hooks/api/auth";
import { useClockiContext } from "../../context";
import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";

export interface AvatarProps {
  name: string;
  size?: string | number;
  radius?: string | number;
}

const CustomAvatar = ({ name, size = "md", radius = "xl" }: AvatarProps) => {
  const { setAuth } = useClockiContext();
  const { mutate: logout } = useLogout({
    onSuccess: () => {
      setAuth(undefined);

      notifications.show({
        title: "Logged out successfully",
        message: "",
      });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        notifications.show({
          title: "Logout failed",
          message: error.response?.data.message as string,
          color: "red",
        });
      }
    },
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <Menu>
      <Menu.Target>
        <Avatar variant="light" radius={radius} name={name} color="initials" size={size} />
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
          <Link to="/my-settings" style={{ textDecoration: "none", color: "inherit" }}>
            <Text>My settings</Text>
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<IconLogout size={14} />} onClick={handleLogout}>
          <Text>Sign out</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default CustomAvatar;
