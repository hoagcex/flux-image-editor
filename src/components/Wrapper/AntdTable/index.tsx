import { Table, TableProps } from "antd";
import { twMerge } from "tailwind-merge";
import "./table.css";

type AntdTableProps = TableProps;

const AntdTable = (props: AntdTableProps) => {
	const { className, columns, ...rest } = props;

	return (
		<Table
			bordered
			size="small"
			className={twMerge("table-striped-rows", className)}
			columns={columns?.map((item) => ({ ellipsis: true, ...item }))}
			{...rest}
		/>
	);
};

export { AntdTable };
