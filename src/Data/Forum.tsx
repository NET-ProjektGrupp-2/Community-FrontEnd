import { loadedForums } from "App";

export type Forum = {

	Id: number;
	Name: string;
	Description: string;

	ParentForumId?: number;
	SubForumIds?: number[];
	TopicIds?: number[];

	ModeratorIds?: string[];
	RestrictedRoleId?: string;

	TimeUpdated?: number;
}
export function filterToplevelForums() {
	let result: Forum[] = [];
	for (let id in loadedForums) {
		if (!loadedForums[id].ParentForumId) {
			result.push(loadedForums[id]);
		}
	}
	return result;
}
export function GetPath(forum: Forum | null) {
	if (!forum) {
		return "/forum/";
	}
	let path: number[] = [];
	while (forum) {
		path.push(forum.Id);
		forum = forum.ParentForumId? loadedForums[forum.ParentForumId] : null;
	}
	return "/forum/".concat(path.reverse().join('/').concat('/'));
}