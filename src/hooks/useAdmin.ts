import { useEffect, useState } from "react";
import { IConfession } from "../interfaces/Confession";
import API from "../API";

const initialState: Array<IConfession> = [];
export const useAdmin = () => {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState(initialState);

	const getPending = async () => {
		try {
			setError("");
			setLoading(true);

			const token = localStorage.getItem("token");
			const confessions = await API.getConfessions("P", token?.toString());

			setState(confessions);
		} catch (error: any) {
			setError(error.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		getPending();
	}, []);

	return { error, loading, setLoading, state };
};
