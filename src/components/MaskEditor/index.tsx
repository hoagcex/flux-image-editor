import { useGenLoadingImage, useSelectedImage } from "@/store";
import { Button, Modal, Slider } from "antd";
import React, { useState } from "react";
import { fetchImageAsBase64, MaskEditor as ME, toMask } from "react-mask-editor";
import { Socket } from "socket.io-client";
import { useShallow } from "zustand/react/shallow";
import { TextAreaBase } from "../Input";

interface MaskEditorProps {
	socket: Socket;
}

export const MaskEditor = (props: MaskEditorProps) => {
	const { socket } = props;
	const [cursorSize, setCursorSize] = useState(10);
	const [maskImage, setMaskImage] = useState<string | undefined>(undefined);
	const canvas = React.useRef<HTMLCanvasElement>(null);
	const [image, showMaskEdit, setShowMaskEdit, clear] = useSelectedImage(
		useShallow((stt) => [stt.image, stt.showMaskEdit, stt.setShowMaskEdit, stt.clear]),
	);
	const [prompt, setPrompt] = useState("");

	const [loading, setLoading] = useGenLoadingImage(useShallow((stt) => [stt.loading, stt.setLoading]));

	const handleMouseMove = () => {
		if (canvas.current) {
			setMaskImage(toMask(canvas.current));
		}
	};

	const handleCancel = () => {
		clear();
	};

	const onSubmit = async () => {
		const request = {
			prompt: prompt,
			maskimage: maskImage,
			initimage: await fetchImageAsBase64(image ?? ""),
			edit: true,
		};

		setShowMaskEdit(false);
		setLoading(true);

		console.log("request", request);

		socket.emit("flux-generate", JSON.stringify(request));
	};

	return (
		<Modal title="Mask Edit" open={showMaskEdit} onCancel={handleCancel} destroyOnClose width={1200} footer={null}>
			<div onMouseMove={handleMouseMove} className="overflow-hidden">
				<Slider defaultValue={cursorSize} min={3} max={15} onChange={setCursorSize} />
				<div className="flex flex-row justify-around w-full">
					<ME
						src={image ?? ""}
						canvasRef={canvas}
						cursorSize={cursorSize}
						maskColor="#fff"
						maskBlendMode="screen"
					/>
				</div>
				<TextAreaBase className="w-full" label="Input" onChange={(e) => setPrompt(e.target.value)} itemRef="" />
			</div>

			<div className="flex flex-row gap-x-4 mt-4 self-end w-full">
				<Button danger type="primary" onClick={handleCancel}>
					Hủy
				</Button>
				<Button type="primary" onClick={onSubmit} loading={loading}>
					Submit
				</Button>
			</div>
		</Modal>
	);
};
