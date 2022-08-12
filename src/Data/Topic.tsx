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