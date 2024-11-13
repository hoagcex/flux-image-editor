import { useQuery } from "@tanstack/react-query";
import API from "../API";
import { QueryKey } from "./QueryKey";
import { ListImageRequest } from "@/model";

export const useGetListWorkFlows = () =>
	useQuery({
		queryFn: () => API.getListWorkFlows(),
		queryKey: [QueryKey.LIST_WORK_FLOWS],
	});

export const useReadWorkFlow = (name: string) =>
	useQuery({
		queryFn: () => API.readWorkFlow(name),
		queryKey: [QueryKey.READ_WORK_FLOW, name],
	});
export const useGetCurrentStatus = () =>
	useQuery({
		queryFn: () => API.getCurrentStatus(),
		queryKey: [QueryKey.GET_CURRENT_STATUS],
	});
export const useGetListImages = (params: ListImageRequest) =>
	useQuery({
		queryFn: () => API.listImages(params),
		queryKey: [QueryKey.GET_LIST_IMAGES, params],
	});
