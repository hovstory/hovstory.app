import confessionConfig from "../config/confessions";
import userConfig from "../config/user";
import { IConfession } from "../interfaces/Confession";
import { IUser } from "../interfaces/User";

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
const PUT = {
	method: "PUT",
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

	authenticate: async (account: IUser): Promise<{ token: string }> => {
		const endpoint: string = `${userConfig.USER_URL}/login`;
		return await fetch(endpoint, {
			...POST,
			body: JSON.stringify(account),
		}).then((response) => {
			if (response.status === 401) {
				throw new Error("401");
			}
			if (!response.ok) {
				throw new Error("error");
			}
			return response.json();
		});
	},

	getUser: async (email: string, token: string): Promise<IUser> => {
		const endpoint: string = `${userConfig.USER_URL}/?email=${email}`;
		return await fetch(endpoint, {
			...GET,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			if (response.status === 401) {
				throw new Error("401");
			}
			if (!response.ok) {
				throw new Error("error");
			}
			return response.json();
		});
	},

	getConfessions: async (
		status: string,
		token?: string
	): Promise<Array<IConfession>> => {
		const orderByDate = true;
		const endpoint: string = `${confessionConfig.CONFESSION_URL}/?orderByDate=${orderByDate}&status=${status}`;
		return await fetch(endpoint, {
			...GET,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			if (response.status === 401) {
				throw new Error("401");
			}
			if (!response.ok) {
				throw new Error("error");
			}
			return response.json();
		});
	},

	approve: async (
		confessionId: string,
		token?: string
	): Promise<IConfession> => {
		const endpoint: string = `${confessionConfig.CONFESSION_URL}/approve/?id=${confessionId}`;
		return await fetch(endpoint, {
			...POST,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			if (response.status === 401) {
				throw new Error("401");
			}
			if (!response.ok) {
				throw new Error("error");
			}
			return response.json();
		});
	},

	reject: async (
		confessionId: string,
		comment: string,
		token?: string
	): Promise<IConfession> => {
		const endpoint: string = `${confessionConfig.CONFESSION_URL}/reject`;
		console.log(comment);
		console.log(JSON.stringify({ Id: confessionId, Reason: comment }));
		return await fetch(endpoint, {
			...POST,
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ Id: confessionId, Reason: comment }),
		}).then((response) => {
			if (response.status === 401) {
				throw new Error("401");
			}
			if (!response.ok) {
				throw new Error("error");
			}
			return response.json();
		});
	},
};

export default apiSettings;
