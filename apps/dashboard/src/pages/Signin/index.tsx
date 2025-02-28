import { Button, Center, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { LoginPayload, LoginSchema } from "@repo/schemas";
import { SignInFormNames, SignInFormLabels, SignInFormPlaceholder } from "./utils";

export function SignIn() {
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
    console.log(payload);
  };
  return (
    <Center h="100vh" p="md">
      <Stack w={{ base: 400, sm: 400 }}>
        <Stack>
          <Title size="h6" ta="center">
            Clocki
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

            <Button type="submit">Signin</Button>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
}
