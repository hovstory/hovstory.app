import { Typography } from "antd";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { APP_NAME } from "../../config";

const SendConfession: React.FC = () => {
	return (
		<HelmetProvider>
			<Helmet>
				<title>Gửi Confessions | {APP_NAME}</title>
			</Helmet>
			<Typography.Paragraph>
				Bạn có câu chuyện muốn chia sẻ? Bạn muốn được lắng nghe, được tâm sự với
				mọi người? Hay chỉ đơn giản bạn muốn viết gì đó? Hãy chia sẻ ngay với{" "}
				<strong>HOV Story - Thay lời kể chuyện</strong> và bọn mình sẽ giúp bạn
				lan tỏa câu chuyện của bạn đến với mọi người nhé!
			</Typography.Paragraph>
		</HelmetProvider>
	);
};

export default SendConfession;
