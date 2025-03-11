import { Button, Center, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { RegisterEmployeeSchema } from "@repo/schemas";
import { RegisterFormLabels, RegisterFormNames, RegisterFormPlaceholder } from "./utils";
import { useSignUp } from "../../hooks/api";
import { useClockiContext } from "../../context";
import { RegisterEmployeePayload } from "@repo/schemas/rest";
import { useEffect } from "react";
import { Loader } from "../../components/Loader";
import { useCustomNavigate } from "../../hooks/location";

export function Register() {
  const { setAuth, auth } = useClockiContext();
  const navigate = useCustomNavigate();

  const { mutate: registerUser, isPending } = useSignUp({
    onSuccess: (data) => {
      setAuth({
        accessToken: data.accessToken,
        isAuthenticated: data.success,
        employee: data.employeeData,
      });
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

            <Button type="submit" loading={isPending}>Register</Button>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
}
