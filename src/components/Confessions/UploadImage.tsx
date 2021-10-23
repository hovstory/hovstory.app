import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import {
	getDownloadURL,
	ref,
	StorageError,
	uploadBytesResumable,
	UploadTaskSnapshot,
} from "firebase/storage";
import React, { useState } from "react";
import { storage } from "../../firebase/firebase";
import { generateImageName } from "../../utils/stringUtils";

const initialFileList: UploadFile[] = [];

type Props = {
	setImageUrl: React.Dispatch<React.SetStateAction<string>>;
	style?: React.CSSProperties | undefined;
};
const UploadImage: React.FC<Props> = ({ style, setImageUrl }) => {
	const [fileList, setFileList] = useState(initialFileList);

	const customRequest = ({ file, onSuccess, onError, onProgress }: any) => {
		const imageName = generateImageName(Math.floor(Math.random() * 20));
		const storageRef = ref(storage, `images/${imageName}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot: UploadTaskSnapshot) => {
				// Get task progress
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

				// Connect OnProgress
				onProgress(progress);
			},
			(error: StorageError) => {
				// Error
				onError(error);
			},
			() => {
				// Successful uploads
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					onSuccess(downloadURL);
					setImageUrl(downloadURL);
				});
			}
		);
	};

	const beforeUpload = (file: any) => {
		const isLt2M = file.size / 1024 / 1024 <= 2;
		if (!isLt2M) {
			message.error("Kích thước file ảnh nhỏ hơn 2MB bạn ơiii");
			file.status = "error";
			file.response = "Kích thước file ảnh nhỏ hơn 2MB bạn ơiii";
		}
		return isLt2M;
	};

	const handleUploadChange = (info: UploadChangeParam) => {
		let fileList = [...info.fileList];
		fileList = fileList.slice(-1);
		fileList = fileList.map((file) => {
			if (file.response) {
				file.url = file.response.url;
			}
			return file;
		});
		setFileList(fileList);

		if (info.file.status === "done") {
			message.success("Tải lên ảnh thành công!");
		} else if (info.file.status === "error") {
			message.error("Đã có lỗi xảy ra trong quá trình tải lên...");
		}
	};

	return (
		<Upload
			name="confession-image"
			beforeUpload={beforeUpload}
			onChange={handleUploadChange}
			customRequest={customRequest}
			fileList={fileList}
			accept="image/*"
			style={style}
		>
			<Button
				icon={<UploadOutlined />}
				type="dashed"
				style={{ marginTop: "10px" }}
			>
				Đính kèm ảnh
			</Button>
		</Upload>
	);
};

export default UploadImage;
