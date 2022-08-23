
import DataInterface from "./DataInterface";
import { User } from "./User";

export interface QueryParams {
	
	lastUpdate?: number, //unix time
	sequence?: number, //number of entries already received
	volume?: number,
	searchParams?: string[],
	matchType?: "all" | "any",

}

export default class FetchService {
	server: string;
	user?: User;
	
	constructor(serverConnection: string, user?: User,) {
		this.server = serverConnection;
		this.user = user;
	}

	async QueueGetData<T extends DataInterface>(path: string, callback: (receivedData: Array<T>) => void, queryParams?: QueryParams) {
		let fetching = fetch(`${this.server}${path}`, this.GenerateRequestInit(queryParams));
		
		// let tInstance = T;
		let array = new Array<T>();
		let json = await (await fetching).json() as T[];
		json.forEach(item => (item as T).Validate() ? array.push(item):null);
		//tInstance.ConvertJson(await (await fetching).json());
		callback(array);
	}

	async QueueUpdateData<T extends DataInterface>(path: string, callback: (receivedData: Array<T>) => void, queryParams?: string[]) {

	}

	// async Queue<T extends DataInterface>(promise: Promise<Response>, callback: (receivedData: T[]) => void, queryParams?: QueryParams) {
	// }

	GenerateRequestInit(queryParams?: QueryParams) {
		let headers = new Headers();
		if (this.user?.Token) {
			headers.append('Authorization', `Bearer ${this.user.Token}`);
		}
		headers.append('Accept', 'application/json');
		let options = JSON.stringify({options: queryParams});
		
		let init: RequestInit = {
			credentials: (this.user?.Token ? 'include' : 'omit'),
			method: 'GET',
			headers: headers
		};
		return init;
	}
}