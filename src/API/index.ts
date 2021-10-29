import confessionConfig from "../config/confessions";
import { IConfession } from "../interfaces/Confession";

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
	sendConfession: async (confession: IConfession): Promise<IConfession> => {
		const endpoint: string = confessionConfig.CONFESSION_URL;
		return await fetch(endpoint, {
			...POST,
			body: JSON.stringify(confession),
		}).then((response) => {
			if (response.status === 500) {
				throw new Error("500");
			} else if (!response.ok) {
				throw new Error("error");
			}
			return response.json();
		});
	},

	getConfession: async (confessionId: string): Promise<IConfession> => {
		const endpoint: string = `${confessionConfig.CONFESSION_URL}/${confessionId}`;
		return await fetch(endpoint, {
			...GET,
		}).then((response) => {
			if (response.status === 500) {
				throw new Error("500");
			} else if (response.status === 204) {
				return Error("204");
			} else if (!response.ok) {
				throw new Error("error");
			}
			return response.json();
		});
	},

	getMyConfessions: async (
		confessionIds: string[]
	): Promise<Array<IConfession>> => {
		const endpoint: string = `${confessionConfig.CONFESSION_URL}/my-confess`;
		return await fetch(endpoint, {
			...POST,
			body: JSON.stringify(confessionIds),
		}).then((response) => {
			if (response.status === 500) {
				throw new Error("500");
			} else if (!response.ok) {
				throw new Error("error");
			}
			return response.json();
		});
	},
};

export default apiSettings;
