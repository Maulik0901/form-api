import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt-nodejs';

import { IUser } from '../interfaces/models/user';
import mongoose from '../config/db';
import { ObjectId } from 'mongodb';

// Create the model schema & register your custom methods here
export interface IUserModel extends IUser, mongoose.Document {
	// billingAddress(): string;
	comparePassword(password: string, cb: any): string;
	validPassword(password: string, cb: any): string;
	gravatar(_size: number): string;
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
		type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
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

		// bcrypt.hash(user.password, _salt, null, (_err:any, _hash: string) => {
		// 	if (_err) {
		// 		return _next(_err);
		// 	}

		// 	user.password = _hash;
		// 	return _next();
		// });
	});
});

// Custom Methods
// Get user's full billing address
UserSchema.methods.billingAddress = function (): string {
	const fulladdress = `${this.fullname.trim()} ${this.geolocation.trim()}`;
	return fulladdress;
};

// Compares the user's password with the request password
UserSchema.methods.comparePassword = function (_requestPassword: string, _cb: Function): void {
	bcrypt.compare(_requestPassword, this.password, (_err: Object, _isMatch: Boolean) => {
		return _cb(_err, _isMatch);
	});
};

// User's gravatar
UserSchema.methods.gravatar = function (_size: number): string {
	if (! _size) {
		_size = 200;
	}

	const url = 'https://gravatar.com/avatar';
	if (! this.email) {
		return `${url}/?s=${_size}&d=retro`;
	}

	const md5 = crypto.createHash('md5').update(this.email).digest('hex');
	return `${url}/${md5}?s=${_size}&d=retro`;
};

const User = mongoose.model<IUserModel>('User', UserSchema);

export default User;