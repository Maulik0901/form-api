import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt-nodejs';

import { IUser } from '../interfaces/models/user';
import mongoose from '../config/db';
import { ObjectId } from 'mongodb';

// Create the model schema & register your custom methods here
export interface IUserModel extends IUser, mongoose.Document {
	// billingAddress(): string;
	comparePassword(password: string, cmppassword: string | undefined): Boolean;
	validPassword(password: string, cb: any): string;
	// gravatar(_size: number): string;
}


export const UserSchema = new mongoose.Schema<IUserModel>({
	name: { 
        type: String 
    },
	email: { 
        type: String, 
        unique: true 
    },
	password: { 
        type: String 
    },	
	picture: { 
		type: String 
	},
	roleId: {
		type: mongoose.Types.ObjectId,
        ref: "Role"
	},
	companyId: {
		type: mongoose.Types.ObjectId,
        ref: "Company"
	},
	createdAt: Number,
    updatedAt: Number,
}, {
	timestamps: true
});



// Password hash middleware
UserSchema.pre<IUserModel>('save', function (_next) {
	const user = this;
	if (!user.isModified('password')) {
		return _next();
	}

	bcrypt.genSalt(10, (_err: any, _salt: string) => {
		if (_err) {
			return _next(_err);
		}
		if(user.password){
			bcrypt.hash(user.password, _salt, null, (_err:any, _hash: string) => {
				if (_err) {
					return _next(_err);
				}
	
				user.password = _hash;
				return _next();
			});
		}
		
	});
});


// Compares the user's password with the request password
UserSchema.methods.comparePassword = function (_requestPassword: string, hashPassword: string): Boolean {
	return bcrypt.compareSync(_requestPassword,hashPassword);	
};

const User = mongoose.model<IUserModel>('User', UserSchema,"User");

export default User;