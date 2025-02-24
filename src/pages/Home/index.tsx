import { AppSpinner, MaskEditor, PageWrapper, PromptForm } from "@/components";
import { cn } from "@/utils";
import { Progress } from "antd";
import { isNil, round } from "lodash";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

interface FluxGenResponse {
	image?: string;
	batch_index?: string;
	metadata?: string;
	gen_progress?: GenProcess;
	keep_alive?: boolean;
	socket_intention?: "close" | "open";
}

interface GenProcess {
	batch_index?: string;
	overall_percent?: number;
	current_percent?: number;
	preview?: string;
}

const Home = () => {
	const [genImg, setGenImg] = useState("");
	// "https://flux.longerthanthelongest.com/View/local/raw/2024-12-02/0652-photograph%20of%20a%20legible%20but%20stylized%20and-unknown-1504658100.png",
	const [process, setProcess] = useState<number>(0);
	const [loading, setLoading] = useState(false);
	const promptRef = useRef(null);

	useEffect(() => {
		const onFluxConnect = (res: boolean) => handleFluxGenerate(res);
		const onFluxGenerate = (res: FluxGenResponse) => {
			if (res === false) setLoading(false);
		};

		socket.on("connect", () => {
			console.log("Connected to server with ID:", socket.id);
		});

		socket.on("flux-connect", onFluxConnect);
		socket.on("flux-generate", onFluxGenerate);
		socket.on("flux-msg", handleFluxEvent);

		return () => {
			socket.off("flux-connect", onFluxConnect);
			socket.off("flux-generate", onFluxGenerate);
			socket.off("flux-msg", handleFluxEvent);
		};
	}, []);

	const handleFluxGenerate = (res: boolean) => {
		// console.log("handleFluxGenerate", res);

		if (res === false) {
			setLoading(false);
			return;
		}

		if (res === true) {
			const request = {
				prompt: promptRef.current?.getValue(),
			};
			socket.emit("flux-generate", JSON.stringify(request));
			setLoading(true);
			return;
		}
	};

	const handleFluxEvent = (res: FluxGenResponse) => {
		// console.log("handleFluxEvent", res);
		if (res.socket_intention === "close") {
			setLoading(false);
			return;
		}

		if (!isNil(res.gen_progress)) {
			setProcess(round((res.gen_progress.current_percent ?? 0) * 100));
			if (!isNil(res.gen_progress.preview)) {
				setGenImg(res.gen_progress.preview);
			}
		}
		if (!isNil(res.image)) {
			setGenImg(encodeURI(import.meta.env.REACT_APP_BASE_URL + res.image));
		}
	};

	return (
		<PageWrapper>
			{false ? (
				<AppSpinner fullscreen />
			) : (
				<div className="w-full flex flex-col">
					<div className="w-full flex flex-row gap-x-4">
						<div className="flex flex-col min-w-[450px] max-w-[750px] gap-y-4 gap-x-4">
							<PromptForm ref={promptRef} socket={socket} loading={loading} />
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
								<img src={genImg} className="w-auto h-full max-h-[750px]" />
							</div>
							<Progress percent={process} status="active" />
						</div>
					</div>
					{/* <ImageList /> */}
				</div>
			)}
			<MaskEditor />
		</PageWrapper>
	);
};
export default Home;
