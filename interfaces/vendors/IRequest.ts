import { Request } from 'express';


export interface IRequest extends Request {
	user?: {
		companyId?: {
			_id?: string;
			"name"?: string;
			"status"?: number;
			"createdAt"?: number;
			"updatedAt"?: number;
		};
		name?: string;
		email?: string;
	};
	Authorization?: string;
	// logIn(user: any, callback: any): any;
	// user(): any;
	// logout(): void;
}