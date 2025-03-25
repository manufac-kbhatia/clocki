import { CreateClientResponse, ClientPayload, GetClientsResponse, GetClientResponse, UpdateClientPayload, UpdateClientResponse } from "@repo/schemas/rest";
import { UseMutationOptions, UseMutationResult, useMutation, UseQueryResult, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../axios/useAxiosPrivate";

export function useCreateClient(
    params?: UseMutationOptions<CreateClientResponse, Error, ClientPayload>,
  ): UseMutationResult<CreateClientResponse, Error, ClientPayload> {
    const axiosPrivate = useAxiosPrivate();
    const mutation = useMutation({
      mutationFn: async (payload) => {
        const reponse = await axiosPrivate.post<CreateClientResponse>("/client", payload);
        return reponse.data;
      },
      ...params,
    });
    return mutation;
  }
  
  export function useGetClients(): UseQueryResult<GetClientsResponse> {
    const axiosPrivate = useAxiosPrivate();
    const output = useQuery({
      queryKey: ["clients"],
      queryFn: async () => {
        const response = await axiosPrivate.get<GetClientsResponse>("/client");
        return response.data;
      },
      retry: false,
    });
    return output;
  }

  export function useUpdateClient(
  params?: UseMutationOptions<UpdateClientResponse, Error, { payload: UpdateClientPayload; id: string }>,
): UseMutationResult<UpdateClientResponse, Error, { payload: UpdateClientPayload; id: string }> {
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async ({ payload, id }) => {
      const reponse = await axiosPrivate.post<UpdateClientResponse>(`/client/${id}`, payload);
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}

export function useGetClient(id: string | undefined): UseQueryResult<GetClientResponse> {
  const axiosPrivate = useAxiosPrivate();
  const output = useQuery<GetClientResponse, Error, GetClientResponse, [string, string | undefined]>({
    queryKey: ["client", id],
    queryFn: async ({ queryKey }) => {
      const [, clientId] = queryKey;
      const response = await axiosPrivate.get<GetClientResponse>(`/client/${clientId}`);
      return response.data;
    },
    retry: false,
    enabled: id === undefined ? false : true,
  });
  return output;
}
