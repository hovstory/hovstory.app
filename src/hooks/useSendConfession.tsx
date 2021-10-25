import { useEffect, useState } from "react";
import API from "../API";
import { Confession } from "../interfaces/Confession";

const initialState: Confession = {} as Confession;
const intialData: Confession = {} as Confession;

export const useSendConfession = () => {
	const [error, setError] = useState("");
	const [sending, setSending] = useState(false);
	const [data, setData] = useState(intialData);
	const [state, setState] = useState(initialState);

	const sendConfession = async (data: Confession) => {
		try {
			setError("");
			setSending(true);

			const confession = await API.sendConfession(data);
			setState(confession);
		} catch (error: any) {
			setError(error.message);
		}
		setSending(false);
	};

	useEffect(() => {
		if (data.content && data.content.length > 20) {
			sendConfession(data);
		}
	}, [data]);

	return { error, sending, state, setData };
};
