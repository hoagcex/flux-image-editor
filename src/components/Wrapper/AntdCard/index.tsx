import { Card, CardProps } from "antd";
import { twMerge } from "tailwind-merge";

type AntdTableProps = CardProps;

export const AntdCard = (props: AntdTableProps) => {
	const { className, children } = props;
	return (
		<Card {...props} className={twMerge("overflow-hidden", className)}>
			{children}
		</Card>
	);
};
