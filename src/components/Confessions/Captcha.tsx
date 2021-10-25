import React from "react";
import ReCaptcha from "react-google-recaptcha";
import config from "../../config";

type Props = {
	setCaptcha: React.Dispatch<React.SetStateAction<boolean>>;
};
const Captcha: React.FC<Props> = ({ setCaptcha }) => {
	const handleCaptchaOnChange = (value: string | null) => {
		value ? setCaptcha(true) : setCaptcha(false);
	};
	return (
		<ReCaptcha
			sitekey={config.RECAPTCHA_SITE_KEY}
			onChange={handleCaptchaOnChange}
		/>
	);
};

export default Captcha;
