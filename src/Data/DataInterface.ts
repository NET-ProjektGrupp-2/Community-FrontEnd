
export default abstract class DataInterface {
	constructor(json: any) {
		
	}
	// ConvertJson (json: []) {
	// 	let returnArray = new Array<this>();
	// 	try {
	// 		 (JSON.parse(json) as this[]).forEach(item => item.Validate() ? returnArray.push(item):null);
			
	// 	} catch (error) {
	// 		let errorMessage = new Error("JSON string invalid");
	// 		// send error somewhere
	// 	}
	// 	return returnArray;
	// }
	abstract TimeUpdated?: number;
	abstract Validate() : boolean;
	abstract LastModified(): number;
}