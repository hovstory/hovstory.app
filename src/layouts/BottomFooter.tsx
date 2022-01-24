import { Typography } from "antd";
import { Footer } from "antd/lib/layout/layout";
import React from "react";

const BottomFooter: React.FC = () => {
	return (
		<Footer style={{ textAlign: "center" }}>
			<Typography.Paragraph style={{ marginBottom: "0" }}>
				Sử dụng các trình duyệt ở phiên bản mới nhất (trừ Opera Mini) để có được
				trải nghiệm tốt nhất
			</Typography.Paragraph>

			<Typography.Paragraph>
				Phát triển bởi
				<Typography.Link
					href="https://www.facebook.com/HumansVTS/"
					rel="noreferrer"
					target="_blank"
				>
					{" "}
					Humans Of Vo Thi Sau{" "}
				</Typography.Link>
				© 2021 dựa trên Ant Design, React, TypeScript, .NET 5
			</Typography.Paragraph>
		</Footer>
	);
};

export default BottomFooter;
