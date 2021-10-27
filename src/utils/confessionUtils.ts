import { db, IConfessionDb } from "../indexedDb";
import { IConfession } from "../interfaces/Confession";

export const saveConfess = async (objectId: string) => {
	db.myConfess.add({ objectId });
};

export const getMyConfession = async (): Promise<Array<IConfessionDb>> => {
	return (await db.myConfess.toArray()).sort((c1, c2) => {
		if (c1.id && c2.id) {
			if (c1.id < c2.id) {
				return 1;
			}
			if (c1.id > c2.id) {
				return -1;
			}
			return 0;
		}
		return 0;
	});
};
