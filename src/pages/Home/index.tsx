import { AntdButton, AppSpinner, InputBase, PageWrapper, TextAreaBase, WorkFlows } from "@/components";
import { useGetNewSession } from "@/network";
import { useAuthUserStore } from "@/store";
import { Progress } from "antd";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

const Home = () => {
	const { mutateAsync: getNewSession, isPending } = useGetNewSession();
	const [doLogin] = useAuthUserStore(useShallow((state) => [state.doLogin]));

	useEffect(() => {
		getNewSession()
			.then((res) => {
				doLogin(res);
			})
			.catch((error) => {
				console.log("error", error);
			});
	}, []);

	return (
		<PageWrapper>
			{isPending ? (
				<AppSpinner fullscreen />
			) : (
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
						<WorkFlows />
						<Progress percent={50} />
					</div>
				</div>
			)}
		</PageWrapper>
	);
};
export default Home;
