import { ObjectId } from "mongodb";

export interface IUser {
	name?: string;
	email?: string;
	password?: string;	
	gender?: string;
	picture?: string;
	roleId?: ObjectId;
	companyId?: ObjectId;
	createdAt?: number;
    updatedAt?: number;
}

export default IUser;