import {
  CreateEmployeeResponse,
  CreateEmployeePayload,
  GetEmployeesResponse,
  GetEmployeeResponse,
} from "@repo/schemas/rest";
import { UseMutationOptions, UseMutationResult, useMutation, UseQueryResult, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../axios/useAxiosPrivate";

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
