import config from "./index";

interface UserProps {
	USER_URL: string;
}

export default {
	USER_URL: `${config.API_URL}/user`,
} as UserProps;
