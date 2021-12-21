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

	const [confessionError, setConfessionError] = useState("");
	const [confessionId, setConfessionId] = useState("");
	// Approve Confession
	const [approveClick, setApproveClick] = useState(false);
	const [approvedConfession, setApprovedConfession] = useState(
		{} as IConfession
	);
	const [approved, setApproved] = useState(true);

	const approve = async (confessId: string) => {
		try {
			setApproved(false);
			setConfessionError("");

			const token = localStorage.getItem("token");
			const approvedConfess = await API.approve(confessId, token?.toString());

			setApprovedConfession(approvedConfess);
			setApproved(true);
		} catch (error: any) {
			setConfessionError(error.message);
		}
		setApproveClick(false);
		setConfessionId("");
	};

	useEffect(() => {
		if (approveClick && confessionId) {
			approve(confessionId);
		}
	}, [approveClick, confessionId]);

	// Reject Confession
	const [rejectClick, setRejectClick] = useState(false);
	const [reason, setReason] = useState("");
	const [rejectedConfession, setRejectedConfession] = useState(
		{} as IConfession
	);
	const [rejected, setRejected] = useState(false);
	const reject = async (confessId: string, reason: string) => {
		try {
			setRejected(false);
			setConfessionError("");

			const token = localStorage.getItem("token");
			const rejectedConfess = await API.reject(
				confessId,
				reason,
				token?.toString()
			);

			setRejectedConfession(rejectedConfess);
			setRejected(true);
		} catch (error: any) {
			setConfessionError(error.message);
		}
		setRejectClick(false);
		setConfessionId("");
	};

	useEffect(() => {
		if (rejectClick && confessionId && reason) {
			reject(confessionId, reason);
		}
	}, [rejectClick, confessionId, reason]);

	return {
		error,
		loading,
		setLoading,
		state,
		confessionError,
		setConfessionId,
		setApproveClick,
		approvedConfession,
		approved,
		setRejectClick,
		setReason,
		rejectedConfession,
		rejected,
	};
};
