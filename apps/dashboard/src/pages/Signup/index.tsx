import { Button, Center, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { RegisterEmployeePayload, RegisterEmployeeSchema } from "@repo/schemas";
import { RegisterFormLabels, RegisterFormNames, RegisterFormPlaceholder } from "./utils";
import { useSignUp } from "../../hooks/api";
import { useClockiContext } from "../../context";

export function SignUp() {
  const { setIsAuthenticated } = useClockiContext();
  const { mutate: registerUser } = useSignUp({
    onSuccess: () => {
      setIsAuthenticated(true);
    },
  });
  const { getInputProps, key, onSubmit } = useForm<RegisterEmployeePayload>({
    initialValues: {
      email: "",
      firstName: "",
      password: "",
      lastName: "",
    },
    validate: zodResolver(RegisterEmployeeSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handlesubmit = (payload: RegisterEmployeePayload) => {
    registerUser(payload);
  };
  return (
    <Center h="100vh" p="md">
      <Stack w={{ base: 400, sm: 400 }}>
        <Stack>
          <Title size="h6" ta="center">
            Clocki
          </Title>
          <Text size="lg" ta="center">
            Enter your details to create an account
          </Text>
        </Stack>
        <form onSubmit={onSubmit(handlesubmit)}>
          <Stack>
            <TextInput
              {...getInputProps(RegisterFormNames.firstName)}
              key={key(RegisterFormNames.firstName)}
              label={RegisterFormLabels.firstName}
              placeholder={RegisterFormPlaceholder.firstName}
            />
            <TextInput
              {...getInputProps(RegisterFormNames.lastName)}
              key={key(RegisterFormNames.lastName)}
              label={RegisterFormLabels.lastName}
              placeholder={RegisterFormPlaceholder.lastName}
            />

            <TextInput
              {...getInputProps(RegisterFormNames.email)}
              key={key(RegisterFormNames.email)}
              label={RegisterFormLabels.email}
              placeholder={RegisterFormPlaceholder.email}
            />

            <PasswordInput
              {...getInputProps(RegisterFormNames.password)}
              key={key(RegisterFormNames.password)}
              label={RegisterFormLabels.password}
              placeholder={RegisterFormPlaceholder.password}
            />

            <Button type="submit">Sign up</Button>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
}
