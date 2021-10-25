import { ThunderboltOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Typography, Spin } from "antd";
import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import config from "../../config";
import Captcha from "./Captcha";
import UploadImage from "./UploadImage";
import "./SendConfession.css";
import { useSendConfession } from "../../hooks/useSendConfession";
import { Confession } from "../../interfaces/Confession";

const { TextArea } = Input;

const SendConfession: React.FC = () => {
	const [imageUrl, setImageUrl] = useState("");
	const [captcha, setCaptcha] = useState(false);

	const { error, sending, state, setData } = useSendConfession();

	const onFinish = (values: any) => {
		setData({
			content: values["confession-content"],
			image: imageUrl,
		} as Confession);
	};

	if (state) {
		console.log(state);
	}

	return (
		<HelmetProvider>
			<Helmet>
				<title>Gửi Confessions | {config.APP_NAME}</title>
			</Helmet>
			<Spin tip="Đang gửi Confession của bạn..." spinning={sending} delay={100}>
				<Typography.Paragraph>
					Bạn có câu chuyện muốn chia sẻ? Bạn muốn được lắng nghe, được tâm sự
					với mọi người? Hay chỉ đơn giản bạn muốn viết gì đó? Hãy chia sẻ ngay
					với <strong>HOV Story - Thay lời kể chuyện</strong> và bọn mình sẽ
					giúp bạn lan tỏa câu chuyện của bạn đến với mọi người nhé!
				</Typography.Paragraph>
				<Form onFinish={onFinish}>
					<Form.Item
						name="confession-content"
						rules={[
							{
								required: true,
								message:
									"Bạn muốn chia sẻ gì với chúng mình thì nhập vào đây nè...",
							},
							{
								min: 20,
								message:
									"Nội dung nên từ 20 kí tự trở lên sẽ có cơ hội được duyệt đăng bài cao hơn nè bạn ơi...",
							},
						]}
					>
						<TextArea
							rows={7}
							placeholder="Chia sẻ câu chuyện của bạn với chúng mình tại đây..."
						/>
					</Form.Item>
					{/* TODO Code */}
					{/* <Form.Item name="btn-upload"> */}
					<div className="upload-image">
						<div style={!captcha ? { display: "none" } : { display: "block" }}>
							<UploadImage setImageUrl={setImageUrl} />
						</div>
						<Alert
							message="Xác nhận Captcha để có thể đính kèm ảnh vào câu chuyện của bạn"
							showIcon={true}
							type="info"
							style={
								captcha
									? {
											marginBottom: "10px",
											display: "none",
									  }
									: {
											marginBottom: "10px",
											display: "flex",
											marginTop: "10px",
									  }
							}
						/>
					</div>
					{/* </Form.Item> */}
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
			</Spin>
		</HelmetProvider>
	);
};

export default SendConfession;
