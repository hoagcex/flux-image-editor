import { AntdButton, AppSpinner, PageWrapper, TextAreaBase } from "@/components";
import { cn, getAccessToken } from "@/utils";
import { Progress } from "antd";
import { isNil } from "lodash";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { MaskEditor, toMask } from "react-mask-editor";

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
	const [img, setImg] = useState(
		"https://flux.longerthanthelongest.com/View/local/raw/2024-11-04/0919--flux1-dev-fp8-1616137809.png?preview=true",
	);
	// const [img, setImg] = useState("");
	const [process, setProcess] = useState<number>(0);

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

	const handleConnect = () => {
		socket.emit("flux-connect");
	};

	const handleFluxGenerate = (res: boolean) => {
		if (res === true) {
			const request = {
				session_id: getAccessToken(),
				prompt: prompt,
			};

			socket.emit("flux-generate", JSON.stringify(request));
			return;
		}
	};

	const handleFluxEvent = (res: FluxGenResponse) => {
		if (!isNil(res.gen_progress)) {
			console.warn("res.gen_progress", res.gen_progress);

			setProcess((res.gen_progress.current_percent ?? 0) * 100);
			if (!isNil(res.gen_progress.preview)) {
				setImg(res.gen_progress.preview);
			}
		}
	};
	const canvas = React.useRef<HTMLCanvasElement>(null);

	return (
		<PageWrapper>
			{false ? (
				<AppSpinner fullscreen />
			) : (
				<div className="w-full flex flex-row gap-x-4">
					<div className="flex flex-col min-w-[300px] max-w-[500px] gap-y-4 gap-x-4">
						<div>
							<TextAreaBase
								className="w-full"
								label="Prompt"
								onChange={(e) => setPrompt(e.target.value)}
							/>
						</div>
						<AntdButton type="primary" className="w-full" onClick={handleConnect}>
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
						>
							<img src={img} className="w-[200px] h-[200px]" />
							<MaskEditor src={img} canvasRef={canvas} />
							<button onClick={() => console.log(toMask(canvas.current))}>Get Mask</button>
						</div>
						<Progress percent={process} status="active" />
					</div>
				</div>
			)}
		</PageWrapper>
	);
};
export default Home;
