import { Skeleton, List, Tag } from "antd";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import config from "../../config";
import { useMyConfession } from "../../hooks/useMyConfession";
import { IConfession } from "../../interfaces/Confession";
import Error500 from "../Error/500";
import Error from "../Error/Error";
import "./MyConfess.css";
import { convertDate } from "../../utils/confessionUtils";
import { Typography } from "antd";

const MyConfess: React.FC = () => {
	const { error, loading, state } = useMyConfession();

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
	console.log(state);
	return (
		<HelmetProvider>
			<Helmet>
				<title>Confession của tui | {config.APP_NAME}</title>
			</Helmet>
			<h1>Confession của tui</h1>
			{loading ? (
				<Skeleton active />
			) : (
				<List
					itemLayout="vertical"
					size="default"
					dataSource={state}
					renderItem={(item) => {
						item.content = item.content.replace(/\n/g, "<br />");

						var actions: Array<React.ReactNode> = [];
						switch (item.status) {
							case "A":
								actions = [
									<Tag color="success">#HOVStory{item.comment}</Tag>,
									<Tag color="processing">{item.admin}</Tag>,
								];
								break;
							case "P":
								break;
							case "R":
								actions = [
									<Tag color="error">{item.comment}</Tag>,
									<Tag color="processing">{item.admin}</Tag>,
								];
								break;
						}
						return (
							<List.Item
								key={item.id}
								extra={
									item.image ? (
										<img width={272} alt="confession" src={item.image} />
									) : (
										<></>
									)
								}
								actions={actions}
							>
								<List.Item.Meta
									description={`Được gửi vào lúc ${convertDate(
										item.createdAt
									)}`}
									style={{ marginBottom: "5px" }}
								/>
								<Typography.Text delete={item.status === "R"}>
									<span
										dangerouslySetInnerHTML={{ __html: item.content }}
									></span>
								</Typography.Text>
							</List.Item>
						);
					}}
				/>
			)}
		</HelmetProvider>
	);
};

export default MyConfess;
