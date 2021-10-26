import { HomeOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

import React from "react";

type Props = {
	title?: string;
	message?: React.ReactNode;
	buttonType?:
		| "link"
		| "text"
		| "ghost"
		| "dashed"
		| "default"
		| "primary"
		| undefined;
	buttonIcon?: React.ReactNode;
	buttonText?: string;
	buttonLink?: string;
};
const Error404: React.FC<Props> = ({
	title,
	message,
	buttonType,
	buttonIcon,
	buttonText,
	buttonLink,
}) => {
	const buttonArr: Array<React.ReactNode> = [
		<Button
			key="btnHome"
			type="dashed"
			size="large"
			icon={<HomeOutlined />}
			href="/"
		>
			Trang chủ
		</Button>,
	];
	if (buttonText) {
		buttonArr.push(
			<Button
				key="btnOther"
				type={buttonType ? buttonType : "dashed"}
				size="large"
				icon={buttonIcon}
				href={buttonLink}
			>
				{buttonText}
			</Button>
		);
	}
	return (
		<Result
			status="404"
			title={title ? title : "Trang không tồn tại"}
			subTitle={
				message
					? message
					: "Đi đâu mà lạc vô đây dzậy nè!! Trang này hổng có truy cập vô được nhen"
			}
			extra={buttonArr}
		/>
	);
};

export default Error404;
