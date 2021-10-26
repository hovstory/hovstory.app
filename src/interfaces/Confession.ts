export interface IConfession {
	id: string;
	content: string;
	image: string;
	createdAt: Date;
	status: "A" | "R" | "P";
	admin: string;
	comment: string;
	modifiedOn: Date;
}
