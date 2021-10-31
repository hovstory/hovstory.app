import {
	CommentOutlined,
	MenuOutlined,
	StarOutlined,
	ThunderboltFilled,
	UserOutlined,
} from "@ant-design/icons";
import { Grid, Menu } from "antd";
import React from "react";
import {
	Link,
	RouteComponentProps,
	useHistory,
	withRouter,
} from "react-router-dom";
import siteLogo from "../images/logo.png";

const { useBreakpoint } = Grid;

// Types
type Props = {
	inDrawer: boolean;
	setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

const GeneralMenu: React.FC<Props & RouteComponentProps> = ({
	inDrawer,
	setShowDrawer,
}) => {
	const { lg } = useBreakpoint();

	// Handle selected key
	const history = useHistory();
	let currentKey = history.location.pathname;
	if (currentKey === "/") {
		currentKey = "/send";
	} else if (currentKey === "/login") {
		currentKey = "/admin";
	}

	return (
		<Menu
			overflowedIndicator={<MenuOutlined />}
			theme="light"
			mode={lg ? "horizontal" : "inline"}
			style={!lg && !inDrawer ? { display: "none" } : { borderRight: "none" }}
			selectedKeys={[currentKey.slice(1)]}
		>
			<Menu.Item
				key="logo"
				className="logo"
				onClick={() => setShowDrawer(false)}
			>
				<Link to="/">
					<img src={siteLogo} alt="HOV Story" />
				</Link>
			</Menu.Item>

			<Menu.Item
				key="send"
				icon={<ThunderboltFilled />}
				onClick={() => setShowDrawer(false)}
			>
				<Link to="/">Gửi Confession</Link>
			</Menu.Item>
			<Menu.Item
				key="my-confess"
				icon={<StarOutlined />}
				onClick={() => setShowDrawer(false)}
			>
				<Link to="/my-confess">Confession của tui</Link>
			</Menu.Item>
			<Menu.Item
				key="all-confess"
				icon={<CommentOutlined />}
				onClick={() => setShowDrawer(false)}
			>
				<Link to="/all-confess">Thư viện Confession</Link>
			</Menu.Item>
			<Menu.Item
				key="admin"
				icon={<UserOutlined />}
				onClick={() => setShowDrawer(false)}
			>
				<Link to="/admin">HOV Admin</Link>
			</Menu.Item>
		</Menu>
	);
};

export default withRouter(GeneralMenu);
