import {
  Button,
  Grid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { RegisterOrganisationPayload } from "@repo/schemas";
import {
RegisterOrganisationFormLabels,
RegisterOrganisationFormPlaceholder,
RegisterOrgnisationFormNames
} from "./utils";
import { RegisterOrganisationSchema } from "@repo/schemas";


export function SetupOrganisation() {

  const { getInputProps, key, onSubmit } = useForm<RegisterOrganisationPayload>({
    initialValues: {
     companyName: "",
     address: "",
     city: "",
     vatNumber: "",
    },
    validate: zodResolver(RegisterOrganisationSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handlesubmit = (payload: RegisterOrganisationPayload) => {
    console.log(payload);
  }
  return (
    <Grid bd="2px solid red" h="100vh">
      <Grid.Col span={6}>Banner</Grid.Col>
      <Grid.Col span={6}>
        <Stack>
          <Stack>
            <Title>Welcome to clocki!</Title>
            <Text>Enter details to setup the company/organisation</Text>
          </Stack>
          <form onSubmit={onSubmit(handlesubmit)}>
            <Stack>
              <TextInput
                {...getInputProps(RegisterOrgnisationFormNames.companyName)}
                key={key(RegisterOrgnisationFormNames.companyName)}
                label={RegisterOrganisationFormLabels.companyName}
                placeholder={RegisterOrganisationFormPlaceholder.companyName}
              />
              <TextInput
                {...getInputProps(RegisterOrgnisationFormNames.address)}
                key={key(RegisterOrgnisationFormNames.address)}
                label={RegisterOrganisationFormLabels.address}
                placeholder={RegisterOrganisationFormPlaceholder.address}
              />
              <TextInput
                {...getInputProps(RegisterOrgnisationFormNames.city)}
                key={key(RegisterOrgnisationFormNames.city)}
                label={RegisterOrganisationFormLabels.city}
                placeholder={RegisterOrganisationFormPlaceholder.city}
              />
              <TextInput
                {...getInputProps(RegisterOrgnisationFormNames.vatNumber)}
                key={key(RegisterOrgnisationFormNames.vatNumber)}
                label={RegisterOrganisationFormLabels.vatNumber}
                placeholder={RegisterOrganisationFormPlaceholder.vatNumber}
              />

              <Button type="submit">Complete setup</Button>
            </Stack>
          </form>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
