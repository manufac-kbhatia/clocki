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
import axios from "axios";
import { API_URL } from "../../utils";

export function useSignUp(
  params?: UseMutationOptions<RegisterEmployeeResponse, Error, RegisterEmployeePayload>,
): UseMutationResult<RegisterEmployeeResponse, Error, RegisterEmployeePayload> {
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const reponse = await axios.post<RegisterEmployeeResponse>(`${API_URL}/register`, payload, {
        withCredentials: true,
      });
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
      const reponse = await axios.post<LoginEmployeeResponse>(`${API_URL}/auth/login`, payload, {
        withCredentials: true,
      });
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}

export function useGetMe(): UseQueryResult<GetMeReponse> {
  const output = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      const response = await axios.get<GetMeReponse>(`${API_URL}/me`, {
        withCredentials: true,
      });
      return response.data;
    },
    retry: false,
  });
  return output;
}

export function useSetupOrganisation(
  params?: UseMutationOptions<RegisterOrganisationResponse, Error, RegisterOrganisationPayload>,
): UseMutationResult<RegisterOrganisationResponse, Error, RegisterOrganisationPayload> {
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const reponse = await axios.post<RegisterOrganisationResponse>(`${API_URL}/organisations`, payload, {
        withCredentials: true,
      });
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}
