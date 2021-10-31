import React from "react";
import { Form, Modal, Input } from "antd";

export interface Values {
	reason: string;
}

interface Props {
	visible: boolean;
	onReject: (confessionId: string, values: Values) => void;
	onCancel: () => void;
	confessionId: string;
}

const { TextArea } = Input;

const RejectModal: React.FC<Props> = ({
	visible,
	onReject,
	onCancel,
	confessionId,
}) => {
	const [form] = Form.useForm();

	return (
		<Modal
			visible={visible}
			title="Lý do từ chối bài viết"
			okText="Từ chối"
			okType="danger"
			cancelText="Hủy bỏ"
			onCancel={onCancel}
			onOk={() => {
				form.validateFields().then((values) => {
					form.resetFields();
					onReject(confessionId, values);
				});
			}}
		>
			<Form form={form} layout="vertical" name="reject-form">
				<Form.Item
					name="reason"
					label="Lý do từ chối"
					rules={[
						{
							required: true,
							message: "Tại sao bạn lại muốn từ chối bài viết này?",
						},
					]}
				>
					<TextArea
						rows={5}
						placeholder={`Bài viết không phù hợp... ${confessionId}`}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default RejectModal;
