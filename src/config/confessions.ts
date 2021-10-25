import config from "./index";

interface ConfessionProps {
	CONFESSION_URL: string;
}

export default {
	CONFESSION_URL: `${config.API_URL}/confession`,
} as ConfessionProps;
