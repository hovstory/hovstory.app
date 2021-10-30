import {
	Skeleton,
	List,
	Typography,
	Image,
	Space,
	Divider,
	Button,
	Popconfirm,
} from "antd";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import config from "../../config";
import { useAdmin } from "../../hooks/useAdmin";
import { convertDate } from "../../utils/confessionUtils";
import Error500 from "../Error/500";
import Error from "../Error/Error";
import "./Admin.css";
import { InfoCircleTwoTone } from "@ant-design/icons";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const Admin: React.FC = () => {
	const { error, loading, state } = useAdmin();

	const { sm } = useBreakpoint();
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

	const approve = () => {};

	return (
		<HelmetProvider>
			<Helmet>
				<title>Admin | {config.APP_NAME}</title>
			</Helmet>
			<h1>Quản lý Confession</h1>
			{loading ? (
				<Skeleton active />
			) : (
				<List
					itemLayout="vertical"
					size="default"
					dataSource={state}
					renderItem={(item) => {
						item.content = item.content.replace(/\n/g, "<br />");

						return (
							<List.Item
								key={item.id}
								extra={
									item.image ? (
										<Image
											width={sm ? "272px" : "100%"}
											alt="confession"
											src={item.image}
										/>
									) : (
										<></>
									)
								}
								actions={[
									<Space split={<Divider type="vertical" />}>
										<Popconfirm
											title="Bạn có chắc duyệt cái này chứ?"
											okText="Duyệt"
											cancelText="Không"
											icon={<InfoCircleTwoTone />}
											arrowPointAtCenter={true}
										>
											<Button type="primary" onClick={() => {}}>
												Duyệt
											</Button>
										</Popconfirm>
										<Button type="primary" danger>
											Từ chối
										</Button>
									</Space>,
								]}
							>
								<List.Item.Meta
									description={`Được gửi vào lúc ${convertDate(
										item.createdAt
									)}`}
									style={{ marginBottom: "5px" }}
								/>
								<Typography.Text>
									<span dangerouslySetInnerHTML={{ __html: item.content }} />
								</Typography.Text>
							</List.Item>
						);
					}}
				/>
			)}
		</HelmetProvider>
	);
};

export default Admin;
