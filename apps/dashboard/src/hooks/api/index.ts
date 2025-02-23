// export function useReadTags(): UseQueryResult<Tag[]> {
//     const output = useQuery({
//       queryKey: ["readTags"],
//       queryFn: window.electronAPI?.readTags,
//     });
//     return output;
//   }

import {
  RegisterEmployeePayload,
  RegisterEmployeeResponse,
} from "@repo/schemas";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../utils";
import { PrismaUtils } from "@repo/db";

// export function useCreateStitchFile(
//     params?: UseMutationOptions<StitchItResponse, Error, StitchItPayload>,
//   ): UseMutationResult<StitchItResponse, Error, StitchItPayload> {
//     const mutation = useMutation({
//       ...params,
//       mutationFn: async (payload) => {
//         const response = await axios.post<StitchItResponse>(${API_URL}/stitch, payload);
//         return response.data;
//       },
//     });
//     return mutation;
//   }

export function useSignUp(
  params?: UseMutationOptions<unknown, Error, RegisterEmployeePayload>
): UseMutationResult<unknown, Error, RegisterEmployeePayload> {
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const reponse = await axios.post<RegisterEmployeeResponse>(
        `${API_URL}/register`,
        payload
      );
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}

export function useGetMe(): UseQueryResult<PrismaUtils.Employee> {
  const output = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      const response = await axios.get<PrismaUtils.Employee>(`${API_URL}/me`);
      return response.data;
    },
  });
  return output;
}
