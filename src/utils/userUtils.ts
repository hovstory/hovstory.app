import jwtDecode, { JwtPayload } from "jwt-decode";

export const verifyToken = (): boolean => {
	const token = localStorage.getItem("token");
	if (!token) {
		return false;
	}
	var isExpired = false;
	var decodedToken = jwtDecode<JwtPayload>(token ? token : "");
	var dateNow = new Date();

	if (
		decodedToken &&
		decodedToken.exp &&
		decodedToken.exp < dateNow.getTime()
	) {
		isExpired = true;
	}

	return isExpired;
};
