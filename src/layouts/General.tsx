import { Affix, BackTop, Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Admin from "../components/Admin/Admin";
import Login from "../components/Admin/Login";
import MyConfess from "../components/Confessions/MyConfess";
import SendConfession from "../components/Confessions/SendConfession";
import NotFound from "../components/Error/NotFound";
import AdminRequired from "./Admin";
import BottomFooter from "./BottomFooter";
import TopHeader from "./TopHeader";

const General: React.FC = () => {
	return (
		<Layout>
			<Affix offsetTop={0}>
				<TopHeader />
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

			<BottomFooter />
			<BackTop />
		</Layout>
	);
};

export default withRouter(General);
