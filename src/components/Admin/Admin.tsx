import { InfoCircleTwoTone } from "@ant-design/icons";
import {
	Button,
	Divider,
	Image,
	List,
	Popconfirm,
	Skeleton,
	Space,
	Typography,
} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import config from "../../config";
import { useAdmin } from "../../hooks/useAdmin";
import { convertDate } from "../../utils/confessionUtils";
import Error500 from "../Error/500";
import Error from "../Error/Error";
import "./Admin.css";
import RejectModal, { Values } from "./RejectModal";

const Admin: React.FC = () => {
	const { error, loading, state } = useAdmin();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [rejectId, setRejectId] = useState("");

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

	const approve = (confessionId: string) => {};

	const reject = (confessionId: string, values: Values) => {};

	return (
		<HelmetProvider>
			<Helmet>
				<title>Admin | {config.APP_NAME}</title>
			</Helmet>
			<h1>Quản lý Confession</h1>
			{loading ? (
				<Skeleton active />
			) : (
				<>
					<List
						itemLayout="vertical"
						size="default"
						dataSource={state}
						renderItem={(item) => {
							item.content = item.content.replace(/\n/g, "<br />");

							return (
								<List.Item
									id={item.id}
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
												<Button type="primary" onClick={() => approve(item.id)}>
													Duyệt
												</Button>
											</Popconfirm>
											<Button
												type="primary"
												danger
												onClick={() => {
													setRejectId(item.id);
													setIsModalVisible(true);
												}}
											>
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

					{/* Modal for Reject */}
					<RejectModal
						visible={isModalVisible}
						onCancel={() => setIsModalVisible(false)}
						onReject={reject}
						confessionId={rejectId}
					/>
				</>
			)}
		</HelmetProvider>
	);
};

export default Admin;
