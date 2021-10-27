import Dexie from "dexie";

export interface IConfessionDb {
	id?: number;
	objectId: string;
}

class HOVStory extends Dexie {
	myConfess: Dexie.Table<IConfessionDb, number>;

	constructor() {
		super("HOVStory");
		this.version(1).stores({
			myConfess: "++id,objectId",
		});

		this.myConfess = this.table("myConfess");
	}
}

export var db = new HOVStory();
