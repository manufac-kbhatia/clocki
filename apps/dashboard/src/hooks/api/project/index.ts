import {
  GetProjectsResponse,
  CreateProjectResponse,
  ProjectPayload,
  UpdateProjectPayload,
  UpdateProjectResponse,
} from "@repo/schemas/rest";
import { UseQueryResult, useQuery, UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../axios/useAxiosPrivate";

export function useGetProjects(): UseQueryResult<GetProjectsResponse> {
  const axiosPrivate = useAxiosPrivate();
  const output = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await axiosPrivate.get<GetProjectsResponse>("/project");
      return response.data;
    },
    retry: false,
  });
  return output;
}

export function useCreateProject(
  params?: UseMutationOptions<CreateProjectResponse, Error, ProjectPayload>,
): UseMutationResult<CreateProjectResponse, Error, ProjectPayload> {
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const reponse = await axiosPrivate.post<CreateProjectResponse>("/project", payload);
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}

export function useUpdateProject(
  params?: UseMutationOptions<UpdateProjectResponse, Error, { payload: UpdateProjectPayload; id: string }>,
): UseMutationResult<UpdateProjectResponse, Error, { payload: UpdateProjectPayload; id: string }> {
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async ({ payload, id }) => {
      const reponse = await axiosPrivate.post<UpdateProjectResponse>(`/project/${id}`, payload);
      return reponse.data;
    },
    ...params,
  });
  return mutation;
}
