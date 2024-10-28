import { BorderWrapper } from "@/components";
import { Input, InputProps, InputRef } from "antd";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputBaseProps extends InputProps {
	value?: string;
	label?: string;
	placeholder?: string;
	size?: "large" | "middle" | "small";
	width?: string;
	widthInput?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	error?: boolean;
	errorMessage?: string;
}

const InputBase = forwardRef<InputRef | null, InputBaseProps>((props, ref) => {
	const {
		label = "",
		placeholder = "Nhập thông tin",
		size,
		width,
		widthInput,
		onChange,
		type = "text",
		className,
	} = props;

	const InputClass = type === "password" ? Input.Password : Input;

	const inputRef = useRef<InputRef>(null);
	useImperativeHandle(ref, () => inputRef.current, []);

	const { errorMessage = "", error = false, ...rest } = props;

	return (
		<>
			<BorderWrapper
				className={twMerge(
					"justify-center",
					width && "w-[${width}]",
					error && "border-dangerColor text-dangerColor dark:border-dangerColor dark:text-dangerColor",
					className,
				)}
				label={label}
			>
				<InputClass
					ref={inputRef}
					variant="borderless"
					size={size ? size : "middle"}
					onChange={onChange}
					placeholder={placeholder}
					{...rest}
					className={twMerge(widthInput ? `w-[${widthInput}] m-auto` : `m-auto`, className)}
					type={type}
				/>
			</BorderWrapper>
			{error && <p className="text-dangerColor pl-4">{errorMessage}</p>}
		</>
	);
});

export { InputBase };
