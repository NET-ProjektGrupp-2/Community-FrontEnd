import { loadedForums } from "Data/DataStore";
import * as Forum from 'Data/Forum';
import ChronologicalList from "./ChronologicalList";
import DataInterface from "./DataInterface";
import { Post } from "./Post";
import { Settings_EntiresPerPage as PageSize } from 'GlobalConst';

export class Topic extends DataInterface {

	Id!: number;
	Title!: string;
	CreationDate!: number;
	LastPostDate?: number;

	NewsArticleId?: number;
	AuthorId?: string;
	ForumId!: number;
	PostIds = new Set<number>();
	OriginalPostId?: number;

	TimeUpdated?: number;

	PostList = new ChronologicalList<Post>();
	
	Update(copyObject: Topic) {
		this.Title = copyObject.Title;
		this.LastPostDate = copyObject.LastPostDate;
		this.NewsArticleId = copyObject.NewsArticleId;
		this.ForumId = copyObject.ForumId;
		this.PostIds = copyObject.PostIds;
		this.TimeUpdated = Date.now();
	}

	PageCount = () => Math.ceil(this.PostIds.size/PageSize);

	// ConvertJson(json: string) {
	// 	return super.ConvertJson(json);
	// }
	Validate() {
		if (
			(this.Id === 0 || undefined) ||
			(this.Title === "" || undefined) ||
			(this.CreationDate === 0 || undefined) ||
			(this.ForumId === 0 || undefined)) {
			return false;
		}
		return true;
	}
	LastModified(): number {
		return this.LastPostDate ?? this.CreationDate;
	}
}

export function GetLocation(forumPath?: string, topic?: Topic) {
	if (forumPath) {
		return forumPath.concat('topic/');
	}
	if (topic) {
		return Forum.GetPath(loadedForums.get(topic.ForumId)).concat('topic/');
	}
	return "";
}
