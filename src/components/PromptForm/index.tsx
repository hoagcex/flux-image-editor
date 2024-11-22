import { AntdButton, TextAreaBase } from "@/components";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Socket } from "socket.io-client";

interface PromptFormProps {
	socket?: Socket;
}

export const PromptForm = forwardRef((props: PromptFormProps, ref) => {
	const [prompt, setPrompt] = useState("");
	const { socket } = props;

	const onSubmit = () => {
		socket?.emit("flux-connect");
	};

	useImperativeHandle(
		ref,
		() => ({
			getValue() {
				return prompt;
			},
		}),
		[prompt],
	);

	return (
		<>
			<div>
				<TextAreaBase
					className="w-full"
					label="Prompt"
					onChange={(e) => setPrompt(e.target.value)}
					itemRef=""
				/>
			</div>
			<AntdButton type="primary" className="w-full" onClick={onSubmit}>
				Tạo
			</AntdButton>
		</>
	);
});
