import { RegisterEmployeePayload, RegisterEmployeeResponse } from "@repo/schemas/rest";
import { useMutation, UseMutationOptions, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../utils";
import type { Prisma } from "@repo/db";

export function useSignUp(
  params?: UseMutationOptions<unknown, Error, RegisterEmployeePayload>,
): UseMutationResult<unknown, Error, RegisterEmployeePayload> {
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const reponse = await axios.post<RegisterEmployeeResponse>(`${API_URL}/register`, payload);
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}

export function useGetMe(): UseQueryResult<Prisma.EmployeeGetPayload<{ omit: { password: true } }>> {
  const output = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      const response = await axios.get<Prisma.EmployeeGetPayload<{ omit: { password: true } }>>(`${API_URL}/me`);
      return response.data;
    },
  });
  return output;
}
