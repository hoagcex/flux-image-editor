import { useSelectedImage } from "@/store";
import { Modal, Slider } from "antd";
import React, { useState } from "react";
import { MaskEditor as ME, toMask } from "react-mask-editor";
import { useShallow } from "zustand/react/shallow";

export const MaskEditor = () => {
	const [cursorSize, setCursorSize] = useState(10);
	const [maskImage, setMaskImage] = useState<string | undefined>(undefined);
	const canvas = React.useRef<HTMLCanvasElement>(null);
	const [image, showMaskEdit, clear] = useSelectedImage(
		useShallow((stt) => [stt.image, stt.showMaskEdit, stt.clear]),
	);

	const handleMouseMove = () => {
		if (canvas.current) {
			setMaskImage(toMask(canvas.current));
		}
	};

	const handleCancel = () => {
		clear();
	};

	return (
		<Modal title="Mask Edit" open={showMaskEdit} onCancel={handleCancel} destroyOnClose width={700}>
			<div onMouseMove={handleMouseMove} className="overflow-hidden">
				<Slider defaultValue={cursorSize} min={3} max={15} onChange={setCursorSize} />
				<div className="flex flex-row justify-around w-full">
					<ME src={image ?? ""} canvasRef={canvas} cursorSize={cursorSize} />
					<img src={maskImage} />
				</div>
			</div>
		</Modal>
	);
};
