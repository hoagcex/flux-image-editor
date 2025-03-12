import { PromptForm } from "@/components";
import { useSelectedImage } from "@/store";
import { cn } from "@/utils";
import { EditOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Progress } from "antd";
import { isEmpty, isNil, round } from "lodash";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useShallow } from "zustand/react/shallow";

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

const items: MenuProps["items"] = [
	{
		label: "Edit mask",
		key: "edit",
		icon: <EditOutlined />,
	},
];

interface ImageGenProps {
	socket: Socket;
}

export const ImageGen = (props: ImageGenProps) => {
	const { socket } = props;
	const [genImg, setGenImg] = useState("");
	const [process, setProcess] = useState<number>(0);
	const [loading, setLoading] = useState(false);
	const [setImage] = useSelectedImage(useShallow((stt) => [stt.setImage]));

	useEffect(() => {
		const onFluxGenerate = (res: boolean) => {
			console.log("flux-generate", res);
			if (res === false) setLoading(false);
		};

		socket.on("connect", () => {
			console.log("Connected to server with ID:", socket.id);
		});

		socket.on("flux-generate", onFluxGenerate);
		socket.on("flux-msg", handleFluxEvent);

		return () => {
			socket.off("flux-generate", onFluxGenerate);
			socket.off("flux-msg", handleFluxEvent);
		};
	}, []);

	const handleFluxEvent = (res: FluxGenResponse) => {
		console.log("flux-msg", res);
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

	const handleClick = () => {
		setImage(encodeURI(genImg));
	};
	const handleMenuClick: MenuProps["onClick"] = (e) => {
		if (e.key === "edit") {
			handleClick();
			return;
		}
	};

	return (
		<div className="w-full flex flex-col">
			<div className="w-full flex flex-row gap-x-4">
				<div className="flex flex-col min-w-[400px] max-w-[750px] gap-y-4 gap-x-4">
					<PromptForm socket={socket} loading={loading} setLoading={setLoading} />
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
							"w-[calc(100% - 2rem)] p-4 flex flex-wrap flex-row gap-y-4 justify-center",
						)}
					>
						{isEmpty(genImg) ? undefined : (
							<div className="relative">
								<Dropdown
									menu={{ items, onClick: handleMenuClick }}
									placement="bottomLeft"
									trigger={["click"]}
								>
									<Button
										className="absolute top-0 left-0 text-white cursor-pointer"
										variant="outlined"
										color="default"
									>
										☰
									</Button>
								</Dropdown>
							</div>
						)}
						<img src={genImg} className="w-auto h-full max-h-[750px]" />
					</div>
					<Progress percent={process} status="active" />
				</div>
			</div>
		</div>
	);
};
