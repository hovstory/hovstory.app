import React from "react";
import { IConfession } from "../../interfaces/Confession";
import config from "../../config";
import { Modal, Typography } from "antd";

type Props = {
	confession: IConfession;
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ApprovedModal: React.FC<Props> = ({
	confession,
	visible,
	setVisible,
}) => {
	const handleOk = () => {
		setVisible(false);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	return (
		<Modal
			title={`Duyệt thành công confession ${config.CONFESSION_HASHTAG}_${confession.comment}`}
			visible={visible}
			okText="Đã copy xong"
			cancelText="Hủy bỏ"
			onOk={handleOk}
			onCancel={handleCancel}
		>
			<Typography.Paragraph>
				{`${config.CONFESSION_HASHTAG}_${confession.comment} [${confession.createdAt}]`}
			</Typography.Paragraph>
			<Typography.Paragraph>
				<div className="confession-content">${confession.content}</div>
			</Typography.Paragraph>
			<Typography.Paragraph>----------------------</Typography.Paragraph>
			<Typography.Paragraph>{`-${confession.admin}`}</Typography.Paragraph>
			<Typography.Paragraph>{config.CONFESSION_HASHTAG}</Typography.Paragraph>
			<Typography.Paragraph>#HumansOfVTS #HOV</Typography.Paragraph>
		</Modal>
	);
};

export default ApprovedModal;
