import {
  GetMeReponse,
  LoginEmployeeResponse,
  LoginPayload,
  RegisterEmployeePayload,
  RegisterEmployeeResponse,
  RegisterOrganisationPayload,
  RegisterOrganisationResponse,
} from "@repo/schemas/rest";
import { useMutation, UseMutationOptions, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import useAxiosPrivate from "../axios/useAxiosPrivate";
import axios from "../axios";

export function useSignUp(
  params?: UseMutationOptions<RegisterEmployeeResponse, Error, RegisterEmployeePayload>,
): UseMutationResult<RegisterEmployeeResponse, Error, RegisterEmployeePayload> {
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const reponse = await axios.post<RegisterEmployeeResponse>("/register", payload);
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}

export function useLogin(
  params?: UseMutationOptions<LoginEmployeeResponse, Error, LoginPayload>,
): UseMutationResult<LoginEmployeeResponse, Error, LoginPayload> {
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const reponse = await axios.post<LoginEmployeeResponse>("/auth/login", payload);
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}

export function useGetMe(): UseQueryResult<GetMeReponse> {
  const axiosPrivate = useAxiosPrivate();
  const output = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      const response = await axiosPrivate.get<GetMeReponse>("/me");
      return response.data;
    },
    retry: false,
  });
  return output;
}

export function useSetupOrganisation(
  params?: UseMutationOptions<RegisterOrganisationResponse, Error, RegisterOrganisationPayload>,
): UseMutationResult<RegisterOrganisationResponse, Error, RegisterOrganisationPayload> {
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const reponse = await axiosPrivate.post<RegisterOrganisationResponse>("/organisations", payload);
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}
