import { useGetListWorkFlows } from "@/network";
import { cn } from "@/utils";
import { Typography } from "antd";
import { useMemo } from "react";

export const WorkFlows = () => {
	const { data } = useGetListWorkFlows();

	const workflows = useMemo(() => data?.workflows ?? [], [data]);
	console.warn("workflows", workflows);

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
				<div
					className={cn(
						"w-64 m-1 relative overflow-hidden whitespace-pre-wrap break-all rounded-[10px]",
						"border-[1px] border-solid border-transparent hover:border-[1px] hover:border-solid hover:border-[#d1d5db]",
					)}
				>
					<img className="h-60 block m-auto rounded-md align-middle mb-2" src={item.image} />
					<Typography.Text className="font-bold">{item.name}</Typography.Text>
				</div>
			))}
		</div>
	);
};
