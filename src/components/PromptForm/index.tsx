import { AntdButton, TextAreaBase } from "@/components";
import { Switch, Typography } from "antd";
import { useState } from "react";
import { Socket } from "socket.io-client";

interface PromptFormProps {
	socket: Socket;
	loading?: boolean;
	setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PromptForm = (props: PromptFormProps) => {
	const [prompt, setPrompt] = useState("");
	const [enhancePrompt, setEnhancePrompt] = useState(true);
	const onChange = (checked: boolean) => {
		setEnhancePrompt(checked);
	};

	const { socket, loading = false, setLoading } = props;

	const onSubmit = () => {
		const request = {
			prompt: prompt,
			enhancePrompt: enhancePrompt,
			edit: false,
		};

		socket.emit("flux-generate", JSON.stringify(request));
		setLoading?.(true);
	};

	return (
		<>
			<div>
				<TextAreaBase className="w-full" label="Input" onChange={(e) => setPrompt(e.target.value)} itemRef="" />
				<div className="flex mt-4 gap-x-2">
					<Switch value={enhancePrompt} defaultChecked={enhancePrompt} onChange={onChange} />
					<Typography.Text>Cải thiện prompt</Typography.Text>
				</div>
			</div>
			<AntdButton type="primary" className="w-full" onClick={onSubmit} loading={loading}>
				Tạo
			</AntdButton>
		</>
	);
};
