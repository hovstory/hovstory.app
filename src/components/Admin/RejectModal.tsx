import React from "react";
import { Form, Modal, Input, message } from "antd";
import { IConfession } from "../../interfaces/Confession";
import API from "../../API";

export interface Values {
	reason: string;
}

interface Props {
	confession: IConfession;
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const { TextArea } = Input;

const RejectModal: React.FC<Props> = ({ confession, visible, setVisible }) => {
	const [form] = Form.useForm();

	const reject = async (confession: IConfession, reason: string) => {
		try {
			const token = localStorage.getItem("token");
			const rejectedConfess = await API.reject(
				confession.id,
				reason,
				token?.toString()
			);
		} catch (error: any) {
			message.error("Đã có lỗi xảy ra khi từ chối Confession này!");
		}
	};
	const handleOk = () => {
		form.validateFields().then((values: Values) => {
			form.resetFields();
			// TODO Reject
		});
	};

	const handleCancel = () => {
		setVisible(false);
	};
	return (
		<Modal
			visible={visible}
			title="Lý do từ chối bài viết"
			okText="Từ chối"
			okType="danger"
			cancelText="Hủy bỏ"
			onCancel={handleCancel}
			onOk={handleOk}
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
						placeholder={`Bài viết không phù hợp... ${confession.id}`}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default RejectModal;
