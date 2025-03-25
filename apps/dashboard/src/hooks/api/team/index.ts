import { CreateTeamResponse, TeamPayload, GetTeamsResponse, GetTeamResponse, DeleteTeamResponse } from "@repo/schemas/rest";
import { UseMutationOptions, UseMutationResult, useMutation, UseQueryResult, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../axios/useAxiosPrivate";

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
  
  export function useGetTeam(id: string | undefined): UseQueryResult<GetTeamResponse> {
    const axiosPrivate = useAxiosPrivate();
    const output = useQuery<GetTeamResponse, Error, GetTeamResponse, [string, string | undefined]>({
      queryKey: ["team", id],
      queryFn: async ({ queryKey }) => {
        const [, teamId] = queryKey;
        const response = await axiosPrivate.get<GetTeamResponse>(`/team/${teamId}`);
        return response.data;
      },
      retry: false,
      enabled: id === undefined ? false : true,
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