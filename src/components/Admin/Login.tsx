import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Spin } from "antd";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Redirect } from "react-router";
import config from "../../config";
import { useAuth } from "../../hooks/useAuth";
import { IUser } from "../../interfaces/User";
import { verifyToken } from "../../utils/userUtils";
import "./Login.less";

const Login: React.FC = () => {
	const { error, loading, state, setLoginInfo } = useAuth();

	return verifyToken() || state ? (
		<Redirect to="/admin" />
	) : (
		<HelmetProvider>
			<Helmet>
				<title>Đăng nhập | {config.APP_NAME}</title>
			</Helmet>
			<h1>Đăng nhập</h1>

			<Spin tip="Đang đăng nhập..." spinning={loading} delay={100}>
				<div className="horizontal-center">
					<Form
						name="admin-login"
						className="form-admin-login"
						onFinish={(values: IUser) => setLoginInfo(values)}
					>
						<Form.Item
							name="email"
							rules={[
								{
									required: true,
									message: "Điền email nè bạn ơi!",
								},
							]}
						>
							<Input prefix={<UserOutlined />} placeholder="Email" />
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: "Điền mật khẩu nè bạn ơi!",
								},
							]}
						>
							<Input
								prefix={<LockOutlined />}
								placeholder="Mật khẩu"
								type="password"
							/>
						</Form.Item>
						<Form.Item>
							<div className="horizontal-center">
								<Button
									type="primary"
									htmlType="submit"
									icon={<LoginOutlined />}
									className="btn-login"
								>
									Đăng nhập
								</Button>
							</div>
						</Form.Item>
					</Form>

					<div className="break"></div>
					{error !== "" ? (
						error === "401" ? (
							<Alert
								message="Thông tin đăng nhập không chính xác. Vui lòng thử lại."
								type="error"
								showIcon
							/>
						) : error === "error" ? (
							<Alert
								message={`Đã có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.`}
								type="error"
								showIcon
							/>
						) : (
							// Default Error
							<Alert
								message={`Đã có lỗi xảy ra trong quá trình đăng nhập. Chi tiết:\n${error}`}
								type="error"
								showIcon
							/>
						)
					) : (
						<></>
					)}
				</div>
			</Spin>
		</HelmetProvider>
	);
};

export default Login;
