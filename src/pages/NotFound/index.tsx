import { RoutePath } from "@/common";
import { AntdButton, PageWrapper } from "@/components";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotFound() {
	const navigate = useNavigate();

	return (
		<PageWrapper>
			<Result
				status="404"
				title="404"
				subTitle="Trang không tìm thấy"
				extra={
					<AntdButton type="primary" onClick={() => navigate(RoutePath.HOME)}>
						Về trang chủ
					</AntdButton>
				}
			/>
		</PageWrapper>
	);
}

export default NotFound;
