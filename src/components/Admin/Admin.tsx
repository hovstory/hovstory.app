import { InfoCircleTwoTone } from "@ant-design/icons";
import {
	Button,
	Divider,
	Image,
	List,
	message,
	Modal,
	Popconfirm,
	Skeleton,
	Space,
	Typography,
} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Redirect } from "react-router";
import config from "../../config";
import { useAdmin } from "../../hooks/useAdmin";
import { convertDate } from "../../utils/confessionUtils";
import Error500 from "../Error/500";
import Error from "../Error/Error";
import "./Admin.less";
import RejectModal, { Values } from "./RejectModal";

const Admin: React.FC = () => {
	const {
		error,
		loading,
		state,
		confessionError,
		setConfessionId,
		setApproveClick,
		approvedConfession,
		approved,
		setRejectClick,
		setReason,
		rejectedConfession,
		rejected,
	} = useAdmin();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [rejectId, setRejectId] = useState("");
	const [isApproveVisible, setIsApproveVisible] = useState(false);

	const { sm } = useBreakpoint();
	if (error) {
		switch (error) {
			case "500":
				return <Error500 />;
			case "401":
				return <Redirect to="/login" />;
			case "error":
				return <Error />;
			default:
				return <Error message={error} />;
		}
	}

	const approve = (confessionId: string) => {
		setApproveClick(true);
		setConfessionId(confessionId);
	};

	const reject = (confessionId: string, values: Values) => {
		setRejectClick(true);
		setConfessionId(confessionId);
		setReason(values.reason);
	};

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
					{confessionError ? (
						confessionError === "401" ? (
							<Redirect to="/login" />
						) : (
							message.error(
								`Đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ với admin`
							)
						)
					) : (
						<></>
					)}

					{approved ? (
						<>
							{setIsApproveVisible(true)}
							{message.success(
								`Confession đã được duyệt thành công với ID ${approvedConfession.comment}`
							)}
							<Modal
								title={`Duyệt thành công confession ${config.CONFESSION_HASHTAG}_${approvedConfession.comment}`}
								visible={isApproveVisible}
								okText="Đã copy xong"
								cancelText="Hủy bỏ"
								onOk={() => setIsApproveVisible(false)}
								onCancel={() => setIsApproveVisible(false)}
							>
								<Typography.Paragraph>
									{`${config.CONFESSION_HASHTAG}_${
										approvedConfession.comment
									} [${convertDate(approvedConfession.createdAt)}]`}
								</Typography.Paragraph>
								<Typography.Paragraph>
									<span
										dangerouslySetInnerHTML={{
											__html: approvedConfession.content,
										}}
									/>
								</Typography.Paragraph>
								<Typography.Paragraph>
									----------------------
								</Typography.Paragraph>
								<Typography.Paragraph>{`-${approvedConfession.admin}-`}</Typography.Paragraph>
								<Typography.Paragraph>{`${config.CONFESSION_HASHTAG}`}</Typography.Paragraph>
								<Typography.Paragraph>#HumansOfVTS #HOV</Typography.Paragraph>
							</Modal>
						</>
					) : (
						<></>
					)}

					{rejected ? message.success(`Từ chối confession thành công!`) : <></>}
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
												onConfirm={() => approve(item.id)}
											>
												<Button type="primary">Duyệt</Button>
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
					{/* <RejectModal
						visible={isModalVisible}
						onCancel={() => setIsModalVisible(false)}
						onReject={reject}
						confessionId={rejectId}
					/> */}
				</>
			)}
		</HelmetProvider>
	);
};

export default Admin;
