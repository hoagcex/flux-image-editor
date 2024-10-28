import { cn } from "@/utils";
import { Typography } from "antd";
import { isEmpty, isNil } from "lodash";
import { twMerge } from "tailwind-merge";

interface BorderWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	label?: string;
	labelClassName?: string;
}

const BorderWrapper: React.FC<BorderWrapperProps> = (props: BorderWrapperProps) => {
	const { label = "", children, className, labelClassName } = props;

	return (
		<div className="block">
			{!isNil(label) && !isEmpty(label) && (
				<Typography.Text className={twMerge("font-bold px-3", labelClassName)}>{label}</Typography.Text>
			)}
			<div
				style={{
					borderRadius: 4,
				}}
				className={cn(
					`border-[1px] border-solid border-[#d1d5db] dark:border-[#55585B]`,
					"flex justify-center flex-col min-h-[45px] relative m-auto",
					`focus-within:border-primaryColor dark:focus-within:border-primaryColor`,
					!isNil(label) && !isEmpty(label) && "mt-1",
					className,
				)}
			>
				{children}
			</div>
		</div>
	);
};

export { BorderWrapper };
