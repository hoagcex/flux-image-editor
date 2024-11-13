import { useSelectedImage } from "@/store";
import { Slider } from "antd";
import React, { useState } from "react";
import { MaskEditor as ME, toMask } from "react-mask-editor";
import { useShallow } from "zustand/react/shallow";

export const MaskEditor = () => {
	const [cursorSize, setCursorSize] = useState(10);
	const [maskImage, setMaskImage] = useState<string | undefined>(undefined);
	const canvas = React.useRef<HTMLCanvasElement>(null);
	const [image] = useSelectedImage(useShallow((stt) => [stt.image]));

	const handleMouseMove = () => {
		if (canvas.current) {
			setMaskImage(toMask(canvas.current));
		}
	};

	// useEffect(() => {
	// 	setMaskImage(undefined);
	// }, [image]);

	return (
		<div onMouseMove={handleMouseMove} className="overflow-hidden">
			<Slider defaultValue={cursorSize} min={3} max={15} onChange={setCursorSize} />
			<ME src={image ?? ""} canvasRef={canvas} cursorSize={cursorSize} />
			<img src={maskImage} />
		</div>
	);
};
