import { Button, Center, Group, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { LoginSchema } from "@repo/schemas";
import { SignInFormNames, SignInFormLabels, SignInFormPlaceholder } from "./utils";
import { LoginPayload } from "@repo/schemas/rest";
import { useLogin } from "../../hooks/api/auth";
import { useClockiContext } from "../../context";
import { useEffect } from "react";
import { Loader } from "../../components/Loader";
import { useCustomNavigate } from "../../hooks/location";
import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";
import { Link } from "react-router";

export function Login() {
  const { setAuth, auth } = useClockiContext();
  const navigate = useCustomNavigate();

  const { mutate: login, isPending } = useLogin({
    onSuccess: (data) => {
      setAuth((prev) => {
        return {
          ...prev,
          accessToken: data.accessToken,
          isAuthenticated: data.success,
          employee: data.employeeData,
        };
      });

      notifications.show({
        title: "Logged in",
        message: "You are successfully logged in",
      });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        notifications.show({
          title: "Login falid",
          message: error.response?.data.message as string,
          color: "red",
        });
      }
    },
  });

  const { getInputProps, key, onSubmit } = useForm<LoginPayload>({
    initialValues: {
      email: "harkirat@gmail.com",
      password: "12345678",
    },
    validate: zodResolver(LoginSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });
  
  const handlesubmit = (payload: LoginPayload) => {
    login(payload);
  };

  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate();
      return;
    }
  }, [auth?.isAuthenticated, navigate]);

  return auth?.isAuthenticated ? (
    <Loader isVisible={auth?.isAuthenticated} />
  ) : (
    <Center h="100vh" p="md">
      <Stack w={{ base: 400, sm: 400 }}>
        <Stack>
          <Title size="h6" ta="center">
            Cloki
          </Title>
          <Text size="lg" ta="center">
            Sign In
          </Text>
        </Stack>
        <form onSubmit={onSubmit(handlesubmit)}>
          <Stack>
            <TextInput
              {...getInputProps(SignInFormNames.email)}
              key={key(SignInFormNames.email)}
              label={SignInFormLabels.email}
              placeholder={SignInFormPlaceholder.email}
            />
            <PasswordInput
              {...getInputProps(SignInFormNames.password)}
              key={key(SignInFormNames.password)}
              label={SignInFormLabels.password}
              placeholder={SignInFormPlaceholder.password}
            />

            <Button type="submit" loading={isPending}>
              Login
            </Button>
          </Stack>
        </form>
        <Group justify="center" gap={5}>
          <Text ta="center">Don't have an account?</Text>
          <Link to="/register">Register</Link>
        </Group>
      </Stack>
    </Center>
  );
}
