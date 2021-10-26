import { ThunderboltOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Typography, Spin, Result } from "antd";
import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import config from "../../config";
import Captcha from "./Captcha";
import UploadImage from "./UploadImage";
import "./SendConfession.css";
import { useSendConfession } from "../../hooks/useSendConfession";
import { IConfession } from "../../interfaces/Confession";
import Error500 from "../Error/500";
import Error from "../Error/Error";
import { Link } from "react-router-dom";

const { TextArea } = Input;

const SendConfession: React.FC = () => {
	const [imageUrl, setImageUrl] = useState("");
	const [captcha, setCaptcha] = useState(false);

	const { error, sending, state, setData } = useSendConfession();

	const onFinish = (values: any) => {
		setData({
			content: values["confession-content"],
			image: imageUrl,
		} as IConfession);
	};

	if (error) {
		switch (error) {
			case "500":
				return <Error500 />;
			case "error":
				return <Error />;
			default:
				return <Error message={error} />;
		}
	}

	return (
		<HelmetProvider>
			<Helmet>
				<title>Gửi Confessions | {config.APP_NAME}</title>
			</Helmet>
			{state.id ? (
				<Result
					status="success"
					title="Gửi Confession thành công!"
					subTitle={
						<span>
							Câu chuyện của bạn đã được gửi đến hệ thống thành công. Truy cập{" "}
							<strong>
								<Link to="/my-confess">Confession của tui</Link>
							</strong>{" "}
							để xem trạng thái confession của bạn.
						</span>
					}
					extra={[
						<Button type="primary" key="btn-my-confess" href="/my-confess">
							Confession của tui
						</Button>,
						<Button key="another-one" href="/">
							Gửi Confession khác
						</Button>,
					]}
				/>
			) : (
				<Spin
					tip="Đang gửi Confession của bạn..."
					spinning={sending}
					delay={100}
				>
					<Typography.Paragraph>
						Bạn có câu chuyện muốn chia sẻ? Bạn muốn được lắng nghe, được tâm sự
						với mọi người? Hay chỉ đơn giản bạn muốn viết gì đó? Hãy chia sẻ
						ngay với <strong>HOV Story - Thay lời kể chuyện</strong> và bọn mình
						sẽ giúp bạn lan tỏa câu chuyện của bạn đến với mọi người nhé!
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
							<div
								style={!captcha ? { display: "none" } : { display: "block" }}
							>
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
			)}
		</HelmetProvider>
	);
};

export default SendConfession;
