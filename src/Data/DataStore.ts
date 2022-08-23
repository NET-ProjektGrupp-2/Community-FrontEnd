import { filterToplevelForums, Forum } from './Forum';
import { Topic } from './Topic';
import { Post } from './Post';
import DataInterface from './DataInterface';
import FetchService, { QueryParams } from './FetchService';
import { Article } from './Article';
import { User } from './User';
import ChronologicalList from './ChronologicalList';
import * as keys from 'GlobalConst';

// type DataTypes = Forum | Topic | Post;
export const loadedArticles = new Map<number, Article>();
export const loadedForums = new Map<number, Forum>();
export const loadedTopics = new Map<number, Topic>();
export const loadedPosts = new Map<number, Post>();
export const loadedUsers = new Map<number, User>();

export interface Request<T> {
	Callback: () => void,
	Item?: T,
	Sequence: number,
	ParentId: number
}

export default class DataStore {
	fetchService = new FetchService(keys.ApiPaths.baseApiUrl);
	// 
	awaitingTopicsForForum = new Set<[forumId: number, sequence: number]>();
	// 
	awaitingPostsForTopic = new Set<[topicId: number, sequence: number]>();
	// awaitingPosts = new Set<number>();

	activeForum = 0;
	forumCallback = () => { };
	activeTopic = 0;
	topicCallback = () => { };

	trackedForums = new Set<Request<Forum[]>>();
	trackedTopics = new Set<Request<ChronologicalList<Topic>>>();
	trackedPosts = new Set<Request<ChronologicalList<Post>>>();

	async Init() {
		await this.fetchService.QueueGetData(keys.ApiPaths.getForums, this.AddNewForums);
	}

	GetForum(forumId: number, newDataCallback: () => void) {
		this.activeForum = forumId;
		this.forumCallback = newDataCallback;
		let forum = loadedForums.get(forumId);
		if (forum) {
			this.LoadForumTopics(forum);
		}
		return forum;
	}
	GetTopic(topicId: number, newDataCallback: () => void) {
		this.activeTopic = topicId;
		this.topicCallback = newDataCallback;
		let topic = loadedTopics.get(topicId);
		if (topic) {
			this.LoadTopicPosts(topic);
		}
		return topic;
	}

	GetForums(forum: Forum | undefined, newDataCallback = (() => { }), oldRequest?: Request<Forum[]>) {
		let request: Request<Forum[]> = oldRequest ?? {
			Callback: newDataCallback,
			Item: forum ? filterData(loadedForums, forum.SubForumIds) : filterToplevelForums(),
			Sequence: 0,
			ParentId: forum ? forum.Id : 0
		};

		this.StartFetch(
			keys.ApiPaths.getForums,
			this.AddNewForums,
			forum?.TimeUpdated ?? 0,
			request.Sequence * keys.Settings_EntiresPerPage
		);
		this.trackedForums.add(request);
		return request;
	}
	GetForumTopics(forum: Forum, newDataCallback = (() => { }), oldRequest?: Request<ChronologicalList<Topic>>) {
		let request: Request<ChronologicalList<Topic>> = oldRequest ?? {
			Callback: newDataCallback,
			Item: forum?.TopicList,
			Sequence: 0,
			ParentId: forum.Id
		};
		if (!this.awaitingTopicsForForum.has([forum.Id, request.Sequence])) {
			this.StartFetch(
				keys.ApiPaths.getForumTopics + forum.Id,
				(data: Topic[]) => {
					this.AddNewTopics(data, forum)
				},
				forum.TimeUpdated ?? 0,
				request.Sequence * keys.Settings_EntiresPerPage,
				keys.Settings_EntiresPerPage
			);
		}
		this.trackedTopics.add(request);
		return request;
	}
	GetTopicPosts(topic: Topic, newDataCallback = (() => { }), oldRequest?: Request<ChronologicalList<Post>>) {
		let request: Request<ChronologicalList<Post>> = oldRequest ?? {
			Callback: newDataCallback,
			Item: topic?.PostList,
			Sequence: 0,
			ParentId: topic.Id
		};
		if (!this.awaitingPostsForTopic.has([topic.Id, request.Sequence])) {
			this.StartFetch(
				keys.ApiPaths.getTopicPosts + topic.Id,
				(data: Post[]) => {
					this.AddNewPosts(data, topic)
				},
				topic.TimeUpdated ?? 0,
				request.Sequence * keys.Settings_EntiresPerPage,
				keys.Settings_EntiresPerPage
			);
		}
		this.trackedPosts.add(request);
		return request;
	}

	// GetDataForIds<T extends DataInterface = Forum|Topic|Post>(
	// 		path: string,
	// 		source: Map<number, T>, 
	// 		ids: number[] | null | undefined, 
	// 		sequence: number,
	// 		newDataCallback?: () => void) {
	// 	if (!ids) {
	// 		return null;
	// 	}
	// 	let request = {callback: newDataCallback, type: ""};
	// 	let result = new Array<T>();
	// 	let missing: number[] = [];
	// 	ids.forEach(id => {
	// 		let x = source.get(id);
	// 		if (x) result.push(x);
	// 		else missing.push(id);
	// 	});
	// 	this.fetchService.QueueGetData(
	// 			path, 
	// 			(arr: Array<T>) => (this.AddNewData(arr, newDataCallback))
	// 			);
	// 	return result.length === 0 ? null : result;
	// }
	LoadForumTopics(forum: Forum) {
		if (forum.TopicIds.size === 0) {
			return 0;
		}
		forum.TopicIds.forEach(id => {
			let topic = loadedTopics.get(id);
			if (topic) forum.TopicList.Add(topic);
		});
		forum.TopicList.GeneratePages();
	}
	LoadTopicPosts(topic: Topic) {
		if (topic.PostIds.size === 0) {
			return 0;
		}
		topic.PostIds.forEach(id => {
			let post = loadedPosts.get(id);
			if (post) topic.PostList.Add(post);
		});
		topic.PostList.GeneratePages();
	}


	/**
	 * get topics at chronological positions of 
	 * (pageNumber*keys.Settings_EntiresPerPage) to 
	 * (pageNumber*keys.Settings_EntiresPerPage + keys.Settings_EntiresPerPage - 1)
	 * ex pageNumber = 0: 0*10 to 0*10 + 10-1 ( topics 0 to 9, 10 topics per page)
	 * ex pageNumber = 4: 4*10 to 4*10 + 10-1 ( topics 40 to 49, 10 topics per page)
	 */
	StartFetch<T extends DataInterface>(
		path: string,
		callback: (data: T[]) => void,
		lastUpdate?: number,
		sequence?: number,
		volume?: number,
		searchParams?: string[],
		matchType?: "all" | "any") {
		let queryParams: QueryParams | undefined;
		if (lastUpdate !== 0 || sequence !== 0 || volume !== 0 || searchParams || matchType) {
			queryParams = { lastUpdate, sequence, volume, searchParams, matchType };
		}
		this.fetchService.QueueGetData(
			path,
			callback,
			queryParams
		);
	}

	NotifyListeners(forum?: Forum, topic?: Topic, post?: Post) {
		if (forum) {
			if (this.activeForum === forum.Id) {
				this.forumCallback();
			}
			this.trackedForums.forEach(request => request.ParentId === forum.Id ? request.Callback() : null );
		}
		else if (topic) {
			if (this.activeTopic === topic.Id) {
				this.topicCallback();
			}
			this.trackedTopics.forEach(request => request.ParentId === topic.ForumId ? request.Callback() : null );
			this.trackedPosts.forEach(request => request.ParentId === topic.Id ? request.Callback() : null );
		}
		else if (post) {
			this.trackedPosts.forEach(request => request.ParentId === post.TopicId ? request.Callback() : null );
		}
	}
	// AddNewData<T extends DataInterface = Forum |Topic|Post>(data: Array<T>, requesterCallback?: () => void) {
	// 	if (isArrayOf(isInstanceOf(Forum))(data)) {
	// 		this.AddNewForums(data);
	// 	}
	// 	else if (isArrayOf(isInstanceOf(Topic))(data)) {
	// 		this.AddNewTopics(data);
	// 	}
	// 	else if (isArrayOf(isInstanceOf(Post))(data)) {
	// 		this.AddNewPosts(data);
	// 	}
	// 	requesterCallback?.();
	// }
	AddNewForums(forums: Forum[]) {
		let updatedForums = new Array<Forum>();
		forums.forEach(forum => {
			let existingEntry = loadedForums.get(forum.Id)
			if (existingEntry) {
				updatedForums.push(forum);
			}
			loadedForums.set(forum.Id, forum);
		});
		if (updatedForums.length > 0) this.UpdateForums(updatedForums)
	}
	UpdateForums(forums: Array<Forum>) {
		forums.forEach(forum => {
			let existingEntry = loadedForums.get(forum.Id)
			if (existingEntry) {
				// if (forum.SubForumIds?.length === existingEntry.SubForumIds?.length) {
				// 	if(!forum.SubForumIds?.every(id => existingEntry!.SubForumIds?.includes(id))){
				// 		updateRequests.add(existingEntry);
				// 	}
				// } else updateRequests.add(existingEntry);
				let diffSet = new Set<number>(existingEntry?.TopicIds);
				let newSet = new Set<number>();
				forum.TopicIds.forEach(id => {
					if (existingEntry!.TopicIds.has(id)) {
						diffSet.delete(id);
					}
					else { newSet.add(id); }
				});
				if (diffSet.size > 0 || newSet.size > 0) {
					existingEntry.TopicList.Clear();
					existingEntry.TopicIds = forum.TopicIds;
					this.LoadForumTopics(existingEntry);
				}
				existingEntry.TopicIds = forum.TopicIds;
				existingEntry.Update(forum);
			}
			this.NotifyListeners(existingEntry);
		});
	}
	AddNewTopics(topics: Topic[], forum: Forum) {
		let updatedTopics = new Array<Topic>();
		topics.forEach(topic => {
			if (loadedTopics.has(topic.Id)) {
				updatedTopics.push(topic);
			}
			else {
				loadedTopics.set(topic.Id, topic);
				if (forum.TopicIds.has(topic.Id)) {
					forum.TopicList?.Add(topic);
				}
			}
		});
		if (updatedTopics.length > 0) this.UpdateTopics(updatedTopics);
	}
	UpdateTopics(topics: Topic[]) {
		topics.forEach(topic => {
			let existingEntry = loadedTopics.get(topic.Id)
			if (existingEntry) {
				let forum = loadedForums.get(topic.ForumId);
				// if (existingEntry.ForumId !== topic.ForumId) {
				// 	let prevForum = loadedForums.get(existingEntry.ForumId);
				// 	if (prevForum) {
				// 		let index = prevForum.TopicIds.delete(existingEntry.Id);
				// 		if (index) {
				// 			prevForum.TopicList.Remove(existingEntry);
				// 		}
				// 	}
				// 	forum?.TopicIds.add(existingEntry.Id);
				// 	forum?.TopicList.Add(existingEntry);
				// }
				let diffSet = new Set<number>(existingEntry?.PostIds);
				let newSet = new Set<number>();
				topic.PostIds.forEach(id => {
					if (existingEntry!.PostIds.has(id)) {
						diffSet.delete(id);
					}
					else { newSet.add(id); }
				});
				if (diffSet.size > 0 || newSet.size > 0) {
					existingEntry.PostList.Clear();
					existingEntry.PostIds = topic.PostIds;
					this.LoadTopicPosts(existingEntry);
				}
				existingEntry.PostIds = topic.PostIds;
				existingEntry.Update(topic);
				forum?.TopicList.Update(existingEntry);
				this.NotifyListeners(undefined, existingEntry);
			}
		});
	}
	AddNewPosts(posts: Post[], topic: Topic) {
		let updatedPosts = new Array<Post>();
		posts.forEach(post => {
			if (loadedPosts.has(post.Id)) {
				updatedPosts.push(post);
			}
			else {
				loadedPosts.set(post.Id, post);
				if (topic.PostIds.has(post.Id)) {
					if (!post.ContextPostId) {
						topic.OriginalPostId = post.Id;
					}
					topic.PostList?.Add(post);
				}
			}
		});
		if (updatedPosts.length > 0) this.UpdatePosts(updatedPosts);
	}
	UpdatePosts(posts: Post[]) {
		posts.forEach(post => {
			let existingEntry = loadedPosts.get(post.Id)
			if (existingEntry) {
				let topic = loadedTopics.get(post.TopicId);
				existingEntry.Update(post);
				topic?.PostList.Update(existingEntry);
				this.NotifyListeners(undefined, undefined, existingEntry);
			}
		});
	}

	InitDummyData() {
		loadedForums.set(1, { Id: 1, Name: "First F", Description: "first", SubForumIds: [2] } as Forum);
		loadedForums.set(2, { Id: 2, Name: "Second F", Description: "second", TopicIds: new Set<number>([1, 2, 3]), ParentForumId: 1, SubForumIds: [3] } as Forum);
		loadedForums.set(3, { Id: 3, Name: "Third F", Description: "third", ParentForumId: 2 } as Forum);

		loadedTopics.set(1, { Id: 1, Title: "First T", CreationDate: Date.now(), AuthorId: "system", ForumId: 2 } as Topic);
		loadedTopics.set(2, { Id: 2, Title: "Second T", CreationDate: Date.now(), AuthorId: "system", ForumId: 2, PostIds: new Set<number>([1, 2, 3]) } as Topic);
		loadedTopics.set(3, { Id: 3, Title: "Third T", CreationDate: Date.now(), AuthorId: "system", ForumId: 2 } as Topic);

		loadedPosts.set(1, { Id: 1, PostDate: Date.now(), AuthorId: "system", Replies: [2, 3], TopicId: 2, Content: "Lorem ipsum" } as Post);
		loadedPosts.set(1, { Id: 2, PostDate: Date.now(), AuthorId: "system", ContextPostId: 1, TopicId: 2, Content: "Dolor" } as Post);
		loadedPosts.set(1, { Id: 3, PostDate: Date.now(), AuthorId: "system", ContextPostId: 2, TopicId: 2, Content: "Ichi, ni, san" } as Post);
	}
}

const isInstanceOf = <T>(ctor: new (...args: any) => T) =>
	(x: any): x is T => x instanceof ctor;

const isArrayOf = <T>(elemGuard: (x: any) => x is T) =>
	(arr: any[]): arr is Array<T> => arr.every(elemGuard);

export function filterData<T = {}>(source: Map<number, T>, ids: number[] | null | undefined) {
	if (!ids) {
		return undefined;
	}
	let result = Array<T>();
	ids.forEach((id, index) => {
		let x = source.get(id);
		if (x) result.push(x);
		else ids[index] = 0;
	});
	return result;
}
