import { User } from "../Data/User";

declare const Roles: {[key:string]: string};

export function HasRole(user: User, roleName: string){
	if (user.RoleIds?.find(role => Roles[role] === roleName) ) {
		return true;
	}
}
export function PopulateRoles(roles: {Name: string, Id: string}[]) {
	roles.forEach(element => {
		Roles[element.Id] = element.Name;
	});
}