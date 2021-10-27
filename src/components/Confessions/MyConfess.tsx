import { Skeleton, List } from "antd";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import config from "../../config";
import { useMyConfession } from "../../hooks/useMyConfession";
import { IConfession } from "../../interfaces/Confession";
import Error500 from "../Error/500";
import Error from "../Error/Error";

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
				<ul>
					{state.map((confession) => {
						console.log(confession);
						return <li key={confession.id}>{confession.content}</li>;
					})}
				</ul>
			)}
		</HelmetProvider>
	);
};

export default MyConfess;
