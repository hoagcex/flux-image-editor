import { Divider, DividerProps } from "antd";
import { twMerge } from "tailwind-merge";

interface AntdDividerProps extends DividerProps {}

export function AntdDivider(props: AntdDividerProps) {
	const { className } = props;
	return <Divider className={twMerge("my-2", className)} />;
}
