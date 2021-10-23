import { ThunderboltOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import config from "../../config";
import Captcha from "./Captcha";
import UploadImage from "./UploadImage";

const { TextArea } = Input;

const SendConfession: React.FC = () => {
	const [imageUrl, setImageUrl] = useState("");
	const [captcha, setCaptcha] = useState(false);

	const onFinish = (values: any) => {
		console.log(values["confession-content"]);
	};
	return (
		<HelmetProvider>
			<Helmet>
				<title>Gửi Confessions | {config.APP_NAME}</title>
			</Helmet>
			<Typography.Paragraph>
				Bạn có câu chuyện muốn chia sẻ? Bạn muốn được lắng nghe, được tâm sự với
				mọi người? Hay chỉ đơn giản bạn muốn viết gì đó? Hãy chia sẻ ngay với{" "}
				<strong>HOV Story - Thay lời kể chuyện</strong> và bọn mình sẽ giúp bạn
				lan tỏa câu chuyện của bạn đến với mọi người nhé!
			</Typography.Paragraph>
			<Form name="send-confession" onFinish={onFinish}>
				<Form.Item
					name="confession-content"
					rules={[
						{
							required: true,
							message:
								"Bạn muốn chia sẻ gì với chúng mình thì nhập vào đây nè...",
						},
					]}
				>
					<TextArea
						rows={7}
						placeholder="Chia sẻ câu chuyện của bạn với chúng mình tại đây..."
					/>
				</Form.Item>

				<Form.Item name="btn-upload">
					{captcha && <UploadImage setImageUrl={setImageUrl} />}{" "}
					{/* TODO Code */}
					{!captcha && (
						<Alert
							message="Xác nhận Captcha để có thể đính kèm ảnh vào câu chuyện của bạn"
							showIcon
							type="info"
							style={{
								marginBottom: "10px",
							}}
						/>
					)}
				</Form.Item>

				<Form.Item name="recaptcha">
					<Captcha setCaptcha={setCaptcha} />
				</Form.Item>

				<Input name="image-url" value={imageUrl} type="hidden" />
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						icon={<ThunderboltOutlined />}
						disabled={captcha ? false : true}
					>
						Gửi thôiii
					</Button>
				</Form.Item>
			</Form>
		</HelmetProvider>
	);
};

export default SendConfession;
