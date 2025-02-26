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
import { useSignUp } from "../../hooks/api";
import { useClockiContext } from "../../context";

export function SignUp() {
  const {setIsAuthenticated} = useClockiContext();
  const {mutate: registerUser,} = useSignUp({
    onSuccess: () => {
      setIsAuthenticated(true);
    }
  })
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
    registerUser(payload)
  }
  return (
    <Grid h="100vh">
      <Grid.Col visibleFrom="sm" span={{sm: 6}}>Banner</Grid.Col>
      <Grid.Col span={{base: 12, sm: 6}} p={"md"} h="100vh" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Stack w={{base: 400, sm: 500}}>
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
