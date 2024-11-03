import { AntdButton, AppSpinner, PageWrapper, TextAreaBase } from "@/components";
import { useGetCurrentStatus } from "@/network";
import { cn } from "@/utils";
import { Progress } from "antd";
import { useEffect } from "react";
// import WebSocket from "ws";

document.cookie = "Authorization=Basic Z3BwbToxMTE=; path=/";
const socket = new WebSocket("ws://flux.longerthanthelongest.com/API/GenerateText2ImageWS", null, {
	headers: {
		["Authorization"]: "Bearer ",
	},
});

const Home = () => {
	useEffect(() => {
		socket.onopen = function (event) {
			console.warn("event", event);
			// socket.send()
		};

		socket.onmessage = function (event) {
			console.warn("event", event);
		};

		socket.onclose = function (event) {
			console.warn("event", event);
		};
	}, []);

	const { data } = useGetCurrentStatus();

	console.log("data", data);

	return (
		<PageWrapper>
			{false ? (
				<AppSpinner fullscreen />
			) : (
				<div className="w-full flex flex-row gap-x-4">
					<div className="flex flex-col min-w-[300px] max-w-[500px] gap-y-4 gap-x-4">
						<div>
							<TextAreaBase className="w-full" label="Prompt" />
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
								"min-h-[500px] overflow-y-scroll",
								"w-[calc(100% - 2rem)] p-4 flex flex-wrap flex-row gap-y-4",
							)}
						></div>
						<Progress percent={50} />
					</div>
				</div>
			)}
		</PageWrapper>
	);
};
export default Home;
