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
}

export default {
	APP_URL: parseEnvString("APP_URL") || "https://hovstory-app.herokuapp.com/",
	API_URL: parseEnvString("API_URL") || "https://hovstory-api.herokuapp.com/",
	APP_NAME: parseEnvString("APP_NAME") || "HOV Story",
	RECAPTCHA_SITE_KEY: parseEnvString("RECAPTCHA_SITE_KEY") || "",
} as ConfigProps;
