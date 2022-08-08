
export type Forum = {

	Id: number;
	Name: string;
	Description: string;

	ParentForumId?: number;
	SubForumIds?: Int32Array;
	TopicIds?: Int32Array;

	ModeratorIds?: string[];
	RestrictedRoleId?: string;
}