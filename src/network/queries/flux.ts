import { useQuery } from "@tanstack/react-query";
import API from "../API";
import { QueryKey } from "./QueryKey";

export const useGetListWorkFlows = () =>
	useQuery({
		queryFn: () => API.getListWorkFlows(),
		queryKey: [QueryKey.LIST_WORK_FLOWS],
	});
