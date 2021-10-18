import React from "react";

import { Grid, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";

import {
	MenuOutlined,
	ThunderboltFilled,
	StarOutlined,
	CommentOutlined,
	UserOutlined,
} from "@ant-design/icons";

import siteLogo from "../images/logo.png";

const { useBreakpoint } = Grid;

// Types
type Props = {
	inDrawer: boolean;
};

const GeneralMenu: React.FC<Props> = ({ inDrawer }) => {
	const { md } = useBreakpoint();

	// Handle selected key
	const history = useHistory();
	let currentKey = history.location.pathname;
	if (currentKey === "/") {
		currentKey = "/home";
	}

	return (
		<Menu
			overflowedIndicator={<MenuOutlined />}
			theme="light"
			mode={md ? "horizontal" : "inline"}
			style={
				!md && !inDrawer ? { display: "none" } : { borderRight: "none" }
			}
			selectedKeys={[currentKey.slice(1)]}
		>
			<Menu.Item key="logo" className="logo">
				<Link to="/">
					<img src={siteLogo} alt="HOV Story" />
				</Link>
			</Menu.Item>

			<Menu.Item key="send" icon={<ThunderboltFilled />}>
				<Link to="/">Gửi Confession</Link>
			</Menu.Item>
			<Menu.Item key="my-confess" icon={<StarOutlined />}>
				<Link to="/">Confession của tui</Link>
			</Menu.Item>
			<Menu.Item key="all-confess" icon={<CommentOutlined />}>
				<Link to="/">Thư viện Confession</Link>
			</Menu.Item>
			<Menu.Item key="admin" icon={<UserOutlined />}>
				<Link to="/">HOV Admin</Link>
			</Menu.Item>
		</Menu>
	);
};

export default GeneralMenu;
