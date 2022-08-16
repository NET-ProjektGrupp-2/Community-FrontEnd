import { loadedForums } from "App";
import * as Forum from 'Data/Forum';

export type Topic = {

	Id: number;
	Title: string;
	CreationDate: number;

	NewsArticleId?: number;
	AuthorId?: string;
	ForumId: number;
	PostIds?: number[];
	
	TimeUpdated?: number;
}

export function GetLocation(forumPath?: string, topic?: Topic) {
	if (forumPath) {
		return forumPath.concat('topic/');
	}

	if (!topic) {
		return "";
	}
	let path = Forum.GetPath(loadedForums[topic.ForumId]);

	return path.concat('topic/');
}
