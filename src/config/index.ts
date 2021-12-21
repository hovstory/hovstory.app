const parseEnvString = (key: string): string | undefined => {
	return process.env[key];
};

const parseEnvNumber = (key: string): number | undefined => {
	if (process.env[key]) {
		return Number(process.env[key]);
	}
	return undefined;
};

const parseEnvBoolean = (key: string): boolean | undefined => {
	if (process.env[key]) {
		return String(process.env[key]).toLowerCase() === "true";
	}
	return undefined;
};

interface ConfigProps {
	APP_URL: string;
	API_URL: string;
	APP_NAME: string;
	RECAPTCHA_SITE_KEY: string;
	CONFESSION_HASHTAG: string;
}

export default {
	APP_URL:
		parseEnvString("REACT_APP_URL") || "https://hovstory-app.herokuapp.com",
	API_URL:
		parseEnvString("REACT_APP_API_URL") ||
		"https://hovstory-api.herokuapp.com/api",
	APP_NAME: parseEnvString("REACT_APP_NAME") || "HOV Story",
	RECAPTCHA_SITE_KEY: parseEnvString("REACT_APP_RECAPTCHA_SITE_KEY") || "",
	CONFESSION_HASHTAG:
		parseEnvString("REACT_APP_CONFESSION_HASHTAG") || "#HOVStory",
} as ConfigProps;
