import React from "react";
import { Redirect } from "react-router";
import { verifyToken } from "../utils/userUtils";

const Admin: React.FC = ({ children }) => {
	if (!verifyToken()) {
		return <Redirect to="/login" />;
	}
	return <>{children}</>;
};

export default Admin;
