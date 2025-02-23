import {
  Button,
  Grid,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { RegisterEmployeePayload, RegisterEmployeeSchema } from "@repo/schemas";
import {
  RegisterFormLabels,
  RegisterFormNames,
  RegisterFormPlaceholder,
} from "./utils";

export function SignUp() {
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

  const handlesubmit = (formData: RegisterEmployeePayload) => {
    console.log(formData);
  }
  return (
    <Grid bd="2px solid red" h="100vh">
      <Grid.Col span={6}>Banner</Grid.Col>
      <Grid.Col span={6}>
        <Stack>
          <Stack>
            <Title>Welcome to clocki!</Title>
            <Text>Enter your details to create an account</Text>
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
      </Grid.Col>
    </Grid>
  );
}
