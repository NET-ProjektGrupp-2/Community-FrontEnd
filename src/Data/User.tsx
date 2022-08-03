
export type User = {
	
	Id: string;
	Email?: string;
	UserName?: string;
	DisplayName: string;
	Firstname?: string;
	Surname?: string;
	HidePersonalInfo: boolean;
	CreationDate?: Date;
	AboutMe?: string[];
	ModeratedForums?: Int32List;
	Topics?: Int32List;
	Posts?: Int32List;
	Articles?: Int32List;
	IdentityUserRoles?: string[];
}
function validate(user: User){
	if (user.Id && user.DisplayName && user.CreationDate && user.IdentityUserRoles?.length) {
		return true;
	}
	return false;
}
export function UserFactory(props:string){
	var user: User = JSON.parse(props);
	if (validate(user)) {
		return user;
	}
}
export const RegisterFields = {
	Email: {
		required: true,
		type: "email",
		display: "E-mail address"
	},
	UserName: {
		required: true,
		type: "string",
		display: "Account name (Hidden identifier you will use for logging in to the site, can not be changed)"
	},
	DisplayName: {
		required: true,
		type: "string",
		display: "Nickname (The name that will be shown on your profile and anywhere it is linked to)"
	},
	FirstName: {
		required: false,
		type: "string",
		display: "First name"
	},
	Surname: {
		required: false,
		type: "string",
		display: "Surname"
	},
	HidePersonalInfo: {
		required: true,
		type: "boolean",
		display: "Hide personal details (E-mail, proper names)"
	}
}