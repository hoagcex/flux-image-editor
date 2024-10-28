import { Input, Skeleton } from "antd";
import { TextAreaProps } from "antd/es/input";
import { TextAreaRef } from "antd/es/input/TextArea";
import { BorderWrapper } from "@/components";
import { Ref } from "react";
import { twMerge } from "tailwind-merge";

const { TextArea } = Input;

interface TextAreaBaseProps extends TextAreaProps {
	ref?: Ref<TextAreaRef>;
	value?: string;
	label?: string;
	placeholder?: string;
	width?: string;
	widthInput?: string;
	inputSize?: number;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	error?: boolean;
	errorMessage?: string;
	loading?: boolean;
}

const TextAreaBase: React.FC<TextAreaBaseProps> = ({
	ref,
	value,
	label,
	placeholder = "Nhập thông tin",
	inputSize = 3,
	width,
	widthInput,
	onChange,
	className,
	error = false,
	errorMessage,
	loading = false,
}) => {
	if (loading) return <Skeleton.Input active />;
	return (
		<BorderWrapper
			className={twMerge(
				"justify-center",
				width && "w-[${width}]",
				error && "border-dangerColor text-dangerColor dark:border-dangerColor dark:text-dangerColor",
				className,
			)}
			label={label}
		>
			{/* <div className="mb-1 w-auto absolute text-xs title-label">{label}</div> */}
			<TextArea
				ref={ref}
				className={widthInput ? `w-[${widthInput}] m-auto` : `m-auto`}
				value={value}
				variant="borderless"
				autoSize={{ minRows: inputSize, maxRows: inputSize + 5 }}
				onChange={onChange}
				placeholder={placeholder}
			/>
			{error && (
				<p className="text-dangerColor pl-4 border-t-4 border-indigo-500 divide-y divide-slate-700">
					{errorMessage}
				</p>
			)}
		</BorderWrapper>
	);
};

export { TextAreaBase };
