import { RoutePath } from "@/common";
import { Workflow } from "@/model";
import { useGetListWorkFlows } from "@/network";
import { cn } from "@/utils";
import { Typography } from "antd";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export const WorkFlows = () => {
	const { data } = useGetListWorkFlows();

	const workflows = useMemo(() => data?.workflows ?? [], [data]);

	return (
		<div
			style={{
				borderRadius: 4,
			}}
			className={cn(
				`border-[1px] border-solid border-[#d1d5db] dark:border-[#55585B]`,
				`focus-within:border-primaryColor dark:focus-within:border-primaryColor`,
				"max-h-[500px] overflow-y-scroll",
				"w-[calc(100% - 2rem)] p-4 flex flex-wrap flex-row gap-y-4",
			)}
		>
			{workflows.map((item) => (
				<WorkFlowItem key={item.name} item={item} />
			))}
		</div>
	);
};

const WorkFlowItem = ({ item }: { item: Workflow }) => {
	return (
		<Link
			to={RoutePath.TEXT_2_IMAGE.replace(":name", item.name ?? "")}
			className={cn(
				"w-64 m-1 relative overflow-hidden whitespace-pre-wrap break-all rounded-md",
				"border-[1px] border-solid border-transparent hover:border-[1px] hover:border-solid hover:border-[#d1d5db]",
			)}
		>
			<img className="h-60 block m-auto rounded-md align-middle mb-2" src={item.image} />
			<Typography.Text className="font-bold">{item.name}</Typography.Text>
		</Link>
	);
};
