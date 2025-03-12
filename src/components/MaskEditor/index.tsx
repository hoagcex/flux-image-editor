import { useSelectedImage } from "@/store";
import { Button, Modal, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { MaskEditor as ME, toMask, fetchImageAsBase64 } from "react-mask-editor";
import { useShallow } from "zustand/react/shallow";
import { TextAreaBase } from "../Input";
import { Socket } from "socket.io-client";

interface MaskEditorProps {
	socket: Socket;
}

export const MaskEditor = (props: MaskEditorProps) => {
	const { socket } = props;
	const [cursorSize, setCursorSize] = useState(10);
	const [maskImage, setMaskImage] = useState<string | undefined>(undefined);
	const [initImage, setInitImage] = useState<string | undefined>(undefined);
	const canvas = React.useRef<HTMLCanvasElement>(null);
	const [image, showMaskEdit, clear] = useSelectedImage(
		useShallow((stt) => [stt.image, stt.showMaskEdit, stt.clear]),
	);
	const [prompt, setPrompt] = useState("");

	useEffect(() => {
		if (showMaskEdit) {
			const getInitImage = async () => {
				const init = await fetchImageAsBase64(image ?? "");
				setInitImage(init);
			};

			getInitImage();
			return;
		}
		setInitImage(undefined);
		setMaskImage(undefined);
	}, []);

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
			initimage: initImage,
			edit: true,
		};

		// console.log(request);
		// console.log(JSON.stringify(request));

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
					{/* <img src={maskImage} /> */}
				</div>
				<TextAreaBase className="w-full" label="Input" onChange={(e) => setPrompt(e.target.value)} itemRef="" />
			</div>

			<div className="flex flex-row gap-x-4 mt-4 self-end w-full">
				<Button danger type="primary" onClick={handleCancel}>
					Hủy
				</Button>
				<Button type="primary" onClick={onSubmit}>
					Submit
				</Button>
			</div>
		</Modal>
	);
};
