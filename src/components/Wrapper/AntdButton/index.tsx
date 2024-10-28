import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, ButtonProps, Popconfirm } from "antd";
import { isNil } from "lodash";
import { AiFillEye, AiOutlineEdit } from "react-icons/ai";
import { BiSolidFileExport } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface AntdButtonProps extends ButtonProps {}

const AntdButton = (props: AntdButtonProps) => {
	const { children, className, ...rest } = props;
	return (
		<Button {...rest} className={twMerge("", className)}>
			{children}
		</Button>
	);
};

const Edit = (props: AntdButtonProps) => {
	const { children, ...rest } = props;
	return (
		<AntdButton
			type="text"
			className="mr-2 content-middle"
			shape="circle"
			icon={<AiOutlineEdit size={20} />}
			{...rest}
		>
			{children}
		</AntdButton>
	);
};
AntdButton.Edit = Edit;

interface DeleteButtonProps extends AntdButtonProps {
	deleteTitle?: string;
	onConfirmDelete?: () => void;
}
const Delete = (props: DeleteButtonProps) => {
	const { deleteTitle = "", onConfirmDelete, children, ...rest } = props;
	return (
		<Popconfirm
			title="Xóa"
			description={deleteTitle}
			onConfirm={onConfirmDelete}
			okText="Xóa"
			cancelText="Hủy"
			icon={<QuestionCircleOutlined style={{ color: "#ff7a7a" }} />}
		>
			<AntdButton
				className="content-middle"
				type="text"
				shape="circle"
				icon={<FaRegTrashAlt size={20} color="#ff7a7a" />}
				{...rest}
			>
				{children}
			</AntdButton>
		</Popconfirm>
	);
};
AntdButton.Delete = Delete;

const ViewDetail = (props: AntdButtonProps) => {
	const { children, ...rest } = props;
	return (
		<AntdButton type="text" className="content-middle" shape="circle" icon={<AiFillEye size={20} />} {...rest}>
			{children}
		</AntdButton>
	);
};
AntdButton.ViewDetail = ViewDetail;

const ExportExcel = (props: AntdButtonProps) => {
	const { children, className, onClick, ...rest } = props;

	return (
		<Popconfirm
			title="Xuất excel"
			// description={deleteTitle}
			onConfirm={onClick}
			okText="Xuất excel"
			cancelText="Hủy"
			icon={<QuestionCircleOutlined style={{ color: "#ff7a7a" }} />}
		>
			<AntdButton
				type="primary"
				className={twMerge("content-middle flex items-center", className)}
				icon={<BiSolidFileExport size={20} />}
				{...rest}
			>
				{isNil(children) ? "Xuất dữ liệu" : children}
			</AntdButton>
		</Popconfirm>
	);
};
AntdButton.ExportExcel = ExportExcel;

export { AntdButton };
