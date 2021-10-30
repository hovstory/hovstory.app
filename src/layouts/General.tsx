import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Affix, Drawer, Layout, Typography } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import MyConfess from "../components/Confessions/MyConfess";
import SendConfession from "../components/Confessions/SendConfession";
import NotFound from "../components/Error/NotFound";
import GeneralMenu from "./General.Menu";
import AdminRequired from "./Admin";
import Login from "../components/Admin/Login";
import Admin from "../components/Admin/Admin";

const General: React.FC = () => {
	const [showDrawer, setShowDrawer] = useState(false);

	return (
		<Layout>
			<Affix offsetTop={0}>
				<Header style={{ background: "white" }}>
					<nav>
						<GeneralMenu inDrawer={false} setShowDrawer={setShowDrawer} />

						<MenuOutlined
							className="bars-menu"
							onClick={() => setShowDrawer(true)}
							style={{ fontSize: "30px" }}
						/>
						<Drawer
							title="HOV Story"
							placement="left"
							closable={true}
							closeIcon={<CloseOutlined />}
							onClose={() => setShowDrawer(false)}
							visible={showDrawer}
							width="280px"
						>
							<GeneralMenu inDrawer={true} setShowDrawer={setShowDrawer} />
						</Drawer>
					</nav>
				</Header>
			</Affix>

			<Content>
				<Switch>
					<Route exact path="/">
						<SendConfession />
					</Route>
					<Route exact path="/my-confess">
						<MyConfess />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/admin">
						<AdminRequired>
							<Admin />
						</AdminRequired>
					</Route>
					<Route>
						<NotFound />
					</Route>
				</Switch>
			</Content>

			<Footer style={{ textAlign: "center" }}>
				<Typography.Paragraph style={{ marginBottom: "0" }}>
					Sử dụng các trình duyệt ở phiên bản mới nhất (trừ Opera Mini) để có
					được trải nghiệm tốt nhất
				</Typography.Paragraph>

				<Typography.Paragraph>
					Phát triển bởi
					<Typography.Link
						href="https://www.facebook.com/HumansVTS/"
						rel="noreferrer"
						target="_blank"
					>
						{" "}
						Humans Of Vo Thi Sau{" "}
					</Typography.Link>
					© 2021 dựa trên Ant Design, React, TypeScript, .NET 5
				</Typography.Paragraph>
			</Footer>
		</Layout>
	);
};

export default withRouter(General);
