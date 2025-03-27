import { AgentResponse } from "@repo/schemas/rest";
import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import useAxiosPrivate from "../../axios/useAxiosPrivate";

export function useChatAgent(
  params?: UseMutationOptions<AgentResponse, Error, string>,
): UseMutationResult<AgentResponse, Error, string> {
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async (prompt) => {
      const reponse = await axiosPrivate.post<AgentResponse>("/agent", { prompt }, { withCredentials: true });
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}
