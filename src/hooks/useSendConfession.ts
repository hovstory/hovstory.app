import { useEffect, useState } from "react";
import API from "../API";
import { IConfession } from "../interfaces/Confession";
import { saveConfess } from "../utils/confessionUtils";

const initialState: IConfession = {} as IConfession;
const intialData: IConfession = {} as IConfession;

export const useSendConfession = () => {
	const [error, setError] = useState("");
	const [sending, setSending] = useState(false);
	const [data, setData] = useState(intialData);
	const [state, setState] = useState(initialState);

	const sendConfession = async (data: IConfession) => {
		try {
			setError("");
			setSending(true);

			const confession = await API.sendConfession(data);
			setState(confession);
			saveConfess(confession.id);
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
