import { AntdButton, TextAreaBase } from "@/components";
import { useState } from "react";

interface PromptFormProps {
	onSubmit: (prompt: string) => void;
}

export const PromptForm = (props: PromptFormProps) => {
	const [prompt, setPrompt] = useState("");
	const { onSubmit } = props;

	const handleSubmit = () => {
		onSubmit(prompt);
	};

	return (
		<>
			<div>
				<TextAreaBase className="w-full" label="Prompt" onChange={(e) => setPrompt(e.target.value)} />
			</div>
			<AntdButton type="primary" className="w-full" onClick={handleSubmit}>
				Tạo
			</AntdButton>
		</>
	);
};
