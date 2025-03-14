import {
  CreateEmployeePayload,
  CreateEmployeeResponse,
  CreateTeamResponse,
  DeleteTeamResponse,
  GetEmployeeResponse,
  GetEmployeesResponse,
  GetMeReponse,
  GetTeamsResponse,
  LoginEmployeeResponse,
  LoginPayload,
  RegisterEmployeePayload,
  RegisterEmployeeResponse,
  RegisterOrganisationPayload,
  RegisterOrganisationResponse,
  TeamPayload,
} from "@repo/schemas/rest";
import { useMutation, UseMutationOptions, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import useAxiosPrivate from "../axios/useAxiosPrivate";
import axios from "../axios";

export function useSignUp(
  params?: UseMutationOptions<RegisterEmployeeResponse, Error, RegisterEmployeePayload>,
): UseMutationResult<RegisterEmployeeResponse, Error, RegisterEmployeePayload> {
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const reponse = await axios.post<RegisterEmployeeResponse>("/register", payload, { withCredentials: true });
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
      const reponse = await axios.post<LoginEmployeeResponse>("/auth/login", payload, { withCredentials: true });
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
      const response = await axiosPrivate.get<GetMeReponse>("/employee/me");
      return response.data;
    },
    retry: false,
    enabled: false,
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

export function useCreateEmployee(
  params?: UseMutationOptions<CreateEmployeeResponse, Error, CreateEmployeePayload>,
): UseMutationResult<CreateEmployeeResponse, Error, CreateEmployeePayload> {
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const reponse = await axiosPrivate.post<CreateEmployeeResponse>("/employee", payload);
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}

export function useGetEmployees(): UseQueryResult<GetEmployeesResponse> {
  const axiosPrivate = useAxiosPrivate();
  const output = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await axiosPrivate.get<GetEmployeesResponse>("/employee");
      return response.data;
    },
    retry: false,
  });
  return output;
}

export function useCreateTeam(
  params?: UseMutationOptions<CreateTeamResponse, Error, TeamPayload>,
): UseMutationResult<CreateTeamResponse, Error, TeamPayload> {
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const reponse = await axiosPrivate.post<CreateTeamResponse>("/team", payload);
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}

export function useGetTeams(): UseQueryResult<GetTeamsResponse> {
  const axiosPrivate = useAxiosPrivate();
  const output = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const response = await axiosPrivate.get<GetTeamsResponse>("/team");
      return response.data;
    },
    retry: false,
  });
  return output;
}

export function useDeleteTeam(
  params?: UseMutationOptions<DeleteTeamResponse, Error, string>,
): UseMutationResult<DeleteTeamResponse, Error, string> {
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async (id) => {
      const reponse = await axiosPrivate.delete<DeleteTeamResponse>(`/team/${id}`);
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}

export function useGetEmployee(id: string | undefined): UseQueryResult<GetEmployeeResponse> {
  const axiosPrivate = useAxiosPrivate();
  const output = useQuery<GetEmployeeResponse, Error, GetEmployeeResponse, [string, string | undefined]>({
    queryKey: ["employee", id],
    queryFn: async ({ queryKey }) => {
      const [, employeeId] = queryKey;
      const response = await axiosPrivate.get<GetEmployeeResponse>(`/employee/${employeeId}`);
      return response.data;
    },
    retry: false,
    enabled: id === undefined ? false : true,
  });
  return output;
}
