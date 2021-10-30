import { useEffect, useState } from "react";
import { IUser } from "../interfaces/User";
import API from "../API";

const initialState: IUser = {} as IUser;
export const useAuth = () => {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [loginInfo, setLoginInfo] = useState(initialState);
	const [state, setState] = useState(false);

	const handleLogin = async (data: IUser) => {
		try {
			setError("");
			setLoading(true);
			setState(false);

			const loginData = await API.authenticate(data);
			localStorage.setItem("token", loginData.token);

			const userInfo = await API.getUser(data.email, loginData.token);
			localStorage.setItem("email", userInfo.email);
			localStorage.setItem("name", userInfo.name);

			if (userInfo && userInfo.email && userInfo.name) {
				setState(true);
			}
		} catch (error: any) {
			setLoading(false);
			setError(error.message);
		}
	};

	useEffect(() => {
		if (loginInfo.email && loginInfo.password) {
			handleLogin(loginInfo);
		}
	}, [loginInfo]);

	return { error, loading, state, setLoginInfo };
};
