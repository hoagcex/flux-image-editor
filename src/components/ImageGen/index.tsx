import { ImageTemplates } from "@/common";
import { PromptForm } from "@/components";
import { FluxGenerateResp, FluxGenRequest, FluxGenResponse } from "@/model";
import { useGenLoadingImage, useImagesTemplate, useSelectedImage } from "@/store";
import { cn } from "@/utils";
import { EditOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Progress } from "antd";
import { isEmpty, isNil, round } from "lodash";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { useShallow } from "zustand/react/shallow";
import { ImageTemplateList } from "../ImageTemplateList";

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
	const [setImage] = useSelectedImage(useShallow((stt) => [stt.setImage]));

	const [setLoading, setGen] = useGenLoadingImage(useShallow((stt) => [stt.setLoading, stt.setGen]));
	const [step, setImageUrl, pushImage, increaseStep] = useImagesTemplate(
		useShallow((stt) => [stt.step, stt.setImageUrl, stt.pushImage, stt.increaseStep]),
	);
	const promptRef = useRef("");
	const stepRef = useRef(1);

	useEffect(() => {
		stepRef.current = step;
	}, [step]);

	useEffect(() => {
		const onFluxGenerate = (res: FluxGenerateResp) => {
			if (res.status === false) {
				setLoading(false);
				return;
			}
			if (res.status && !isNil(res.prompt)) {
				promptRef.current = res.prompt;
				setGen(res.prompt);
				return;
			}
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
		// console.log("flux-msg", res);
		if (res.socket_intention === "close") {
			setLoading(false);
			onContinueGen();
		}

		if (!isNil(res.gen_progress)) {
			setProcess(round((res.gen_progress.current_percent ?? 0) * 100));
			if (!isNil(res.gen_progress.preview)) {
				setGenImg(res.gen_progress.preview);
				setImageUrl(ImageTemplates[stepRef.current - 1].name, res.gen_progress.preview);
			}
		}
		if (!isNil(res.image)) {
			const url = encodeURI(import.meta.env.REACT_APP_BASE_URL + res.image);
			setGenImg(url);
			setImageUrl(ImageTemplates[stepRef.current - 1].name, url);
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

	const onContinueGen = () => {
		if (stepRef.current > ImageTemplates.length - 1) return;
		setTimeout(() => {
			const imgTemplate = ImageTemplates[stepRef.current];

			const request: FluxGenRequest = {
				prompt: promptRef.current,
				enhancePrompt: false,
				edit: false,
				width: imgTemplate.width,
				height: imgTemplate.height,
			};
			console.log("onContinueGen-request", request);
			socket.emit("flux-generate", JSON.stringify(request));

			pushImage(ImageTemplates[stepRef.current]);
			increaseStep();
			setLoading(true);
		}, 1000);

		return;
	};

	return (
		<div className="w-full flex flex-col">
			<div className="w-full flex flex-row gap-x-4">
				<div className="flex flex-col min-w-[400px] max-w-[750px] gap-y-4 gap-x-4">
					<PromptForm socket={socket} />
				</div>
				<div className="flex flex-1 flex-col w-full gap-y-2">
					<div
						style={{
							borderRadius: 4,
						}}
						className={cn(
							`border-[1px] border-solid border-[#d1d5db] dark:border-[#55585B]`,
							`focus-within:border-primaryColor dark:focus-within:border-primaryColor`,
							// "min-h-[300px] overflow-y-scroll w-[calc(100% - 2rem)]",
							"h-[250px] will-change-contents",
							" p-4 flex flex-wrap flex-row gap-y-4 justify-center",
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
						<img src={genImg} className="h-[225px] w-auto" />
					</div>
					<Progress percent={process} status="active" />
				</div>
			</div>
			<ImageTemplateList />
		</div>
	);
};
