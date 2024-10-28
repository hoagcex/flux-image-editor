import { Modal, ModalProps } from "antd";
import { isNil } from "lodash";
import React from "react";
import { twMerge } from "tailwind-merge";

interface AntdModalProps extends ModalProps {
	fullScreen?: boolean;
}

const AntdModal: React.FC<AntdModalProps> = (props) => {
	const { fullScreen, className, children, width, onOk } = props;
	return (
		<Modal
			{...props}
			className={twMerge(className)}
			styles={
				fullScreen
					? {
							body: {
								height: `calc(100dvh - (120px + ${isNil(onOk) ? "0px" : "40px"}))`,
								overflowY: "scroll",
								overflowX: "hidden",
								paddingBottom: "12px",
							},
							...props.styles,
					  }
					: props.styles
			}
			style={
				fullScreen
					? {
							top: 20,
							...props.style,
					  }
					: props.style
			}
			width={fullScreen ? 1440 : width}
		>
			{children}
		</Modal>
	);
};

export { AntdModal };
