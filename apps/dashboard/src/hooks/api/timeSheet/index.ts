import { CreateTimeEntryResponse, TimeSheetPayload, GetMyTimeEntryResponse, GetTimeEntryResponse } from "@repo/schemas/rest";
import { UseMutationOptions, UseMutationResult, useMutation, UseQueryResult, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../axios/useAxiosPrivate";

export function useCreateTimeEntry(
    params?: UseMutationOptions<CreateTimeEntryResponse, Error, TimeSheetPayload>,
  ): UseMutationResult<CreateTimeEntryResponse, Error, TimeSheetPayload> {
    const axiosPrivate = useAxiosPrivate();
    const mutation = useMutation({
      mutationFn: async (payload) => {
        const reponse = await axiosPrivate.post<CreateTimeEntryResponse>("/log-time", payload);
        return reponse.data;
      },
      ...params,
    });
    return mutation;
  }
  
  export function useGetMyTimeEntries(payload: {
    startDate?: string;
    endDate?: string;
  }): UseQueryResult<GetMyTimeEntryResponse> {
    const axiosPrivate = useAxiosPrivate();
    const output = useQuery<
      GetMyTimeEntryResponse,
      Error,
      GetMyTimeEntryResponse,
      [string, { startDate?: string; endDate?: string }]
    >({
      queryKey: ["client", payload],
      queryFn: async ({ queryKey }) => {
        const [, payload] = queryKey;
        const response = await axiosPrivate.get<GetMyTimeEntryResponse>(
          `/log-time?startDate=${payload.startDate}&endDate=${payload.endDate}`,
        );
        return response.data;
      },
      retry: false,
      enabled: payload.endDate === undefined || payload.startDate === undefined ? false : true,
    });
    return output;
  }
  
  export function useGetTimeEntries(): UseQueryResult<GetTimeEntryResponse> {
    const axiosPrivate = useAxiosPrivate();
    const output = useQuery({
      queryKey: ["time-entires"],
      queryFn: async () => {
        const response = await axiosPrivate.get<GetTimeEntryResponse>("/log-time");
        return response.data;
      },
      retry: false,
    });
    return output;
  }
  