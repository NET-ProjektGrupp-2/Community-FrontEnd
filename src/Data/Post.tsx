export type Post = {
	
	Id: number;
	PostDate: number;
	EditDate?: number;

	AuthorId?: string;
	ContextPostId?: number;
	Replies?: number[];
	TopicId: number;
	
	Content: string;
	
	TimeUpdated?: number;
}