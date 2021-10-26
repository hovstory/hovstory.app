import { MessageOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import React from "react";

type Props = {
	message?: string;
};
const Error: React.FC<Props> = ({ message }) => {
	const subTitleDisplay = (
		<div>
			<p>Đã có lỗi xảy ra trong quá trình lấy dữ liệu. Vui lòng thử lại sau.</p>
			{message ? (
				<p>
					Nội dung: <em>{`${message}`}</em>
				</p>
			) : (
				<p></p>
			)}
		</div>
	);
	return (
		<Result
			status="error"
			title="Đã có lỗi xảy ra"
			subTitle={subTitleDisplay}
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
};

export default Error;
