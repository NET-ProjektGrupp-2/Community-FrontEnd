import { loadedForums } from "Data/DataStore";
import ChronologicalList from "./ChronologicalList";
import DataInterface from "./DataInterface";
import { Topic } from "./Topic";
import { Settings_EntiresPerPage as PageSize } from 'GlobalConst';

export class Forum extends DataInterface {

	constructor(json: any) {
		super(json);
		for (const key in json) {
			if (Object.prototype.hasOwnProperty.call(this, key)) {
				// this[key];
				
			}
		}
	}
	Id!: number;
	Name!: string;
	Description!: string;

	ParentForumId?: number;
	SubForumIds?: number[];
	TopicIds = new Set<number>();
	LastActivity?: number;

	ModeratorIds?: string[];
	RestrictedRoleId?: string;

	TimeUpdated?: number;
	
	TopicList = new ChronologicalList<Topic>();

	Update(copyObject: Forum) {
		this.Name = copyObject.Name;
		this.Description = copyObject.Description;
		this.ParentForumId = copyObject.ParentForumId;
		this.SubForumIds = copyObject.SubForumIds;
		this.TopicIds = copyObject.TopicIds;
		this.ModeratorIds = copyObject.ModeratorIds;
		this.RestrictedRoleId = copyObject.RestrictedRoleId;
		this.TimeUpdated = Date.now();
	}

	PageCount = () => Math.ceil(this.TopicIds.size/PageSize);

	// ConvertJson(json: string) {
	// 	return super.ConvertJson(json);
	// }

	Validate() {
		if (
			(this.Id === 0 || undefined) ||
			(this.Name === "" || undefined) ||
			(this.Description === "" || undefined)) {
			return false;
		}
		return true;
	}
	LastModified(): number {
		return this.LastActivity??-1;
	}
}
export function filterToplevelForums() {
	let result: Forum[] = [];
	for (let forum of loadedForums.values()) {
		if (!forum.ParentForumId) {
			result.push(forum);
		}
	}
	return result;
}
export function GetPath(forum?: Forum) {
	if (!forum) {
		return "/forum/";
	}
	let path: number[] = [];
	while (forum) {
		path.push(forum.Id);
		forum = forum.ParentForumId ? loadedForums.get(forum.ParentForumId) : undefined;
	}
	return "/forum/".concat(path.reverse().join('/').concat('/'));
}