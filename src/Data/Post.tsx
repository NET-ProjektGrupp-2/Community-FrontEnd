import DataInterface from "./DataInterface";


export class Post extends DataInterface {
	
	Id!: number;
	PostDate!: number;
	EditDate?: number;

	AuthorId?: string;
	ContextPostId?: number;
	Replies?: number[];
	TopicId!: number;
	
	Content!: string;
	
	TimeUpdated?: number;

	Update(copyObject: Post) {
		this.EditDate = copyObject.EditDate;
		this.Replies = copyObject.Replies;
		this.Content = copyObject.Content;
		this.TimeUpdated = Date.now();
	}
	// ConvertJson(json: string) {
	// 	return super.ConvertJson(json);
	// }
	Validate() {
		if (
			(this.Id === 0 || undefined) || 
			(this.PostDate === 0 || undefined) || 
			(this.TopicId === 0 || undefined) || 
			(this.Content === "" || undefined)) {
			return false;
		}
		return true;
	}
	LastModified(): number {
		return this.EditDate??this.PostDate;
	}
}