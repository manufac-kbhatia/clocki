import { RegisterOrganisationResponse, RegisterOrganisationPayload, GetOrganisationResponse } from "@repo/schemas/rest";
import { UseMutationOptions, UseMutationResult, useMutation, UseQueryResult, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../axios/useAxiosPrivate";

export function useSetupOrganisation(
  params?: UseMutationOptions<RegisterOrganisationResponse, Error, RegisterOrganisationPayload>,
): UseMutationResult<RegisterOrganisationResponse, Error, RegisterOrganisationPayload> {
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const reponse = await axiosPrivate.post<RegisterOrganisationResponse>("/organisation", payload);
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}

export function useGetOrganisation(): UseQueryResult<GetOrganisationResponse> {
  const axiosPrivate = useAxiosPrivate();
  const output = useQuery({
    queryKey: ["organisation"],
    queryFn: async () => {
      const response = await axiosPrivate.get<GetOrganisationResponse>("/organisation");
      return response.data;
    },
    retry: false,
  });
  return output;
}
