import { AntdButton, TextAreaBase } from "@/components";
import { FluxGenRequest } from "@/model";
import { useGenLoadingImage } from "@/store";
import { Switch, Typography } from "antd";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { useShallow } from "zustand/react/shallow";

interface PromptFormProps {
	socket: Socket;
}

export const PromptForm = (props: PromptFormProps) => {
	const [prompt, setPrompt] = useState("");
	const [enhancePrompt, setEnhancePrompt] = useState(true);
	const [loading, setLoading] = useGenLoadingImage(useShallow((stt) => [stt.loading, stt.setLoading]));
	const onChange = (checked: boolean) => {
		setEnhancePrompt(checked);
	};

	const { socket } = props;

	const onSubmit = () => {
		const request: FluxGenRequest = {
			prompt: prompt,
			enhancePrompt: true,
			edit: false,
			width: 128,
			height: 128,
		};

		socket.emit("flux-generate", JSON.stringify(request));
		setLoading(true);
	};

	return (
		<>
			<div>
				<TextAreaBase className="w-full" label="Input" onChange={(e) => setPrompt(e.target.value)} itemRef="" />
				{/* <div className="flex mt-4 gap-x-2">
					<Switch value={enhancePrompt} defaultChecked={enhancePrompt} onChange={onChange} />
					<Typography.Text>Cải thiện prompt</Typography.Text>
				</div> */}
			</div>
			<AntdButton type="primary" className="w-full" onClick={onSubmit} loading={loading}>
				Tạo
			</AntdButton>
		</>
	);
};
