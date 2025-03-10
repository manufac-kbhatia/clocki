import { Button, Center, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { LoginSchema } from "@repo/schemas";
import { SignInFormNames, SignInFormLabels, SignInFormPlaceholder } from "./utils";
import { LoginPayload } from "@repo/schemas/rest";
import { useLogin } from "../../hooks/api";
import { useClockiContext } from "../../context";
import { useLocation, useNavigate } from "react-router";
import { LocatioState } from "../../utils";

export function Login() {
  const { setAuth } = useClockiContext();

  const navigate = useNavigate();
  const locatoin = useLocation();
  const state = locatoin.state as LocatioState | null;
  const from = state?.from ?? "/";

  const { mutate: login } = useLogin({
    onSuccess: (data) => {
      console.log(data);
      setAuth((prev) => {
        return { ...prev, accessToken: data.accessToken, isAuthenticated: data.success };
      });
      navigate(from, { replace: true });
    },
  });
  const { getInputProps, key, onSubmit } = useForm<LoginPayload>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(LoginSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handlesubmit = (payload: LoginPayload) => {
    login(payload);
  };

  return (
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

            <Button type="submit">Login</Button>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
}
