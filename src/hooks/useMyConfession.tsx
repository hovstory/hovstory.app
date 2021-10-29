import { useEffect, useState } from "react";
import { IConfession } from "../interfaces/Confession";
import { getMyConfession } from "../utils/confessionUtils";
import API from "../API";

const initialState: Array<IConfession> = [];

export const useMyConfession = () => {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState(initialState);

	const myConfession = async () => {
		try {
			setError("");
			setLoading(true);

			const confessions = await getMyConfession();
			const confessionIds = confessions.map((conf) => conf.objectId);
			const myConfessData = await API.getMyConfessions(confessionIds);
			setState(myConfessData);
		} catch (error: any) {
			setError(error.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		myConfession();
	}, []);

	return { error, loading, setLoading, state };
};
