import { AntdButton, AppSpinner, PageWrapper, TextAreaBase } from "@/components";
import { cn } from "@/utils";
import { Progress } from "antd";
import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000"); // Replace with your server's URL

const Home = () => {
	useEffect(() => {
		socket.on("connect", () => {
			console.warn("Connected to server with ID:", socket.id);
		});

		socket.on("flux-msg", (msg) => {
			console.warn("flux-msg", msg);
		});

		socket.on("flux-connect", (msg) => {
			if (msg === true) {
				socket.emit("flux-generate");
				return;
			}
		});

		socket.on("flux-generate", (msg) => {
			console.warn("flux-generate", msg);
		});

		// return () => {
		// 	socket.disconnect();
		// };
	}, []);

	const handleGenerate = () => {
		socket.emit("flux-connect");
	};

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
						<AntdButton type="primary" className="w-full" onClick={handleGenerate}>
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
