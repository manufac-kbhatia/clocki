import { Button, Center, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import {
  RegisterOrganisationFormLabels,
  RegisterOrganisationFormPlaceholder,
  RegisterOrgnisationFormNames,
} from "./utils";
import { RegisterOrganisationSchema } from "@repo/schemas";
import { RegisterOrganisationPayload } from "@repo/schemas/rest";
import { useGetMe, useSetupOrganisation } from "../../hooks/api";
import { Loader } from "../../components/Loader";
import { useEffect } from "react";
import { useClockiContext } from "../../context";
import { useCustomNavigate } from "../../hooks/location";

export function SetupOrganisation() {
  const { auth, setAuth } = useClockiContext();
  const navigate = useCustomNavigate();

  const { refetch } = useGetMe();
  const { mutate: setupOrganisation, isPending } = useSetupOrganisation({
    onSuccess: async () => {
      const { data } = await refetch();
      setAuth((prev) => {
        return { ...prev, employee: data?.employeeData };
      });
    },
  });
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
    setupOrganisation(payload);
  };

  useEffect(() => {
    if (auth?.employee?.createdOrganisation || auth?.employee?.organisation) {
      navigate();
      return;
    }
  }, [auth?.employee?.createdOrganisation, auth?.employee?.organisation, navigate]);

  return auth?.employee?.createdOrganisation || auth?.employee?.organisation ? (
    <Loader />
  ) : (
    <Center h="100vh" p="md">
      <Stack w={{ base: 400, sm: 400 }}>
        <Stack>
          <Title size="h6" ta="center">
            Cloki
          </Title>
          <Text size="lg" ta="center">
            Enter details to setup the company/organisation
          </Text>
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

            <Button type="submit" loading={isPending}>
              Complete setup
            </Button>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
}
