import confessionConfig from "../config/confessions";
import { Confession } from "../interfaces/Confession";

const POST = {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
};
const GET = {
	crossDomain: true,
	method: "GET",
	headers: {
		"Content-Type": "application/json",
	},
};

const apiSettings = {
	sendConfession: async (confession: Confession): Promise<Confession> => {
		const endpoint: string = confessionConfig.CONFESSION_URL;
		return await fetch(endpoint, {
			...POST,
			body: JSON.stringify(confession),
		}).then((response) => {
			if (!response.ok) {
				throw new Error("error");
			}
			return response.json();
		});
	},
};

export default apiSettings;
