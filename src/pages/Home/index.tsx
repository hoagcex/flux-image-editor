import { AntdButton, AppSpinner, ImageList, MaskEditor, PageWrapper, PromptForm, TextAreaBase } from "@/components";
import { cn, getAccessToken } from "@/utils";
import { Progress } from "antd";
import { isNil } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

interface FluxGenResponse {
	image?: string;
	batch_index?: string;
	metadata?: string;
	gen_progress?: GenProcess;
	keep_alive?: boolean;
}

interface GenProcess {
	batch_index?: string;
	overall_percent?: number;
	current_percent?: number;
	preview?: string;
}

const Home = () => {
	const [prompt, setPrompt] = useState("");
	const [img, setImg] = useState("");
	const [process, setProcess] = useState<number>(0);
	const promptRef = useRef(null);

	useEffect(() => {
		socket.on("connect", () => {
			console.warn("Connected to server with ID:", socket.id);
		});

		socket.on("flux-msg", handleFluxEvent);

		socket.on("flux-connect", handleFluxGenerate);

		socket.on("flux-generate", (msg: FluxGenResponse) => {
			console.warn("flux-generate", msg);
		});

		// return () => {
		// 	socket.disconnect();
		// };
	}, []);

	const handleFluxGenerate = (res: boolean) => {
		if (res === true) {
			const request = {
				session_id: getAccessToken(),
				prompt: promptRef.current?.getValue(),
			};

			console.warn(request);

			socket.emit("flux-generate", JSON.stringify(request));
			return;
		}
	};

	const handleFluxEvent = (res: FluxGenResponse) => {
		if (!isNil(res.gen_progress)) {
			setProcess((res.gen_progress.current_percent ?? 0) * 100);
			if (!isNil(res.gen_progress.preview)) {
				setImg(res.gen_progress.preview);
			}
		}
	};

	return (
		<PageWrapper>
			{false ? (
				<AppSpinner fullscreen />
			) : (
				<div className="w-full flex flex-col">
					<div className="w-full flex flex-row gap-x-4">
						<div className="flex flex-col min-w-[300px] max-w-[500px] gap-y-4 gap-x-4">
							<PromptForm ref={promptRef} socket={socket} />
						</div>
						<div className="flex flex-1 flex-col w-full gap-y-2">
							<div
								style={{
									borderRadius: 4,
								}}
								className={cn(
									`border-[1px] border-solid border-[#d1d5db] dark:border-[#55585B]`,
									`focus-within:border-primaryColor dark:focus-within:border-primaryColor`,
									"min-h-[300px] overflow-y-scroll",
									"w-[calc(100% - 2rem)] p-4 flex flex-wrap flex-row gap-y-4",
								)}
							>
								<img src={img} className="w-[200px] h-[200px]" />
							</div>
							<Progress percent={process} status="active" />
						</div>
					</div>
					<ImageList />
				</div>
			)}
			<MaskEditor />
		</PageWrapper>
	);
};
export default Home;
