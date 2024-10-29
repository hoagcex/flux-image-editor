import { AntdButton, AppSpinner, BorderWrapper, InputBase, PageWrapper, TextAreaBase } from "@/components";
import { useGetNewSession } from "@/network";
import { cn } from "@/utils";
import { Progress, Spin, Typography } from "antd";
import { useEffect } from "react";

const Home = () => {
	const { mutateAsync: getNewSession, isPending } = useGetNewSession();

	useEffect(() => {
		getNewSession()
			.then((res) => {
				console.log("res", res);
			})
			.catch((error) => {
				console.log("error", error);
			});
	}, []);

	return (
		<PageWrapper>
			{isPending && <AppSpinner fullscreen />}
			<div className="w-full flex flex-row gap-x-4">
				<div className="flex flex-col min-w-[320px] max-w-[500px] gap-y-4 gap-x-4">
					<div>
						<InputBase className="w-full" />
					</div>
					<div>
						<InputBase className="w-full" />
					</div>
					<div>
						<TextAreaBase className="w-full" />
					</div>
					<AntdButton type="primary" className="w-full">
						Tạo
					</AntdButton>
				</div>
				<div className="flex flex-1 flex-col w-full gap-y-2">
					<div
						style={{
							borderRadius: 4,
						}}
						className={cn(
							`border-[1px] border-solid border-[#d1d5db] dark:border-[#55585B]`,
							`focus-within:border-primaryColor dark:focus-within:border-primaryColor`,
							"min-h-[500px]",
							"w-[calc(100% - 2rem)] p-4",
						)}
					>
						{/* <Typography.Text>123</Typography.Text> */}
					</div>
					<Progress percent={50} />
				</div>
			</div>
		</PageWrapper>
	);
};
export default Home;
