import { MessageOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

import React from "react";

const Error500: React.FC = () => (
	<Result
		status="500"
		title="Lỗi máy chủ"
		subTitle="Xin lỗi bạn, đã có lỗi xảy ra. Vui lòng thử lại sau."
		extra={[
			<Button
				key="reload"
				type="dashed"
				onClick={() => window.location.reload()}
				size="large"
				icon={<RedoOutlined />}
				style={{
					marginRight: "10px",
				}}
			>
				Tải lại trang
			</Button>,
			<Button
				key="message"
				type="primary"
				href="m.me/HumansVTS"
				size="large"
				icon={<MessageOutlined />}
				style={{
					marginRight: "10px",
				}}
			>
				Phản hồi đến HOV
			</Button>,
		]}
	/>
);

export default Error500;
