import { db } from "../indexedDb";

export const saveConfess = async (objectId: string) => {
	db.myConfess.add({ objectId });
};
