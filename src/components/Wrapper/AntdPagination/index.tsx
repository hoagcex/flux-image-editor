import { QueryParams } from "@/common";
import { Pagination, PaginationProps } from "antd";
import { useSearchParams } from "react-router-dom";

interface AntdPaginationProps extends PaginationProps {
	pageSizeDefault?: string;
}

export const AntdPagination = (props: AntdPaginationProps) => {
	const { pageSizeDefault, ...rest } = props;

	const [searchParams, setSearchParams] = useSearchParams();
	const pageQuery = Number(searchParams.get(QueryParams.PAGE_INDEX) ?? "1");
	const pageSizeQuery = Number(searchParams.get(QueryParams.PAGE_SIZE) ?? pageSizeDefault ?? "50");

	const handleChangePage = (current: number, size: number) => {
		if (size !== pageSizeQuery) {
			searchParams.set(QueryParams.PAGE_INDEX, "1");
			searchParams.set(QueryParams.PAGE_SIZE, size.toString());
			setSearchParams(searchParams);
		} else {
			searchParams.set(QueryParams.PAGE_INDEX, current.toString());
			setSearchParams(searchParams);
		}
	};

	return (
		<Pagination
			current={pageQuery}
			pageSize={pageSizeQuery}
			onChange={handleChangePage}
			showSizeChanger={true}
			showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
			{...rest}
		/>
	);
};
