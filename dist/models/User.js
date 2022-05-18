"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const crypto = __importStar(require("crypto"));
const bcrypt = __importStar(require("bcrypt-nodejs"));
const db_1 = __importDefault(require("../config/db"));
exports.UserSchema = new db_1.default.Schema({
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
        type: db_1.default.Schema.Types.ObjectId,
        ref: "Role"
    },
    createdAt: Number,
    updatedAt: Number,
}, {
    timestamps: true
});
// Password hash middleware
exports.UserSchema.pre('save', function (_next) {
    const user = this;
    if (!user.isModified('password')) {
        return _next();
    }
    bcrypt.genSalt(10, (_err, _salt) => {
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
exports.UserSchema.methods.billingAddress = function () {
    const fulladdress = `${this.fullname.trim()} ${this.geolocation.trim()}`;
    return fulladdress;
};
// Compares the user's password with the request password
exports.UserSchema.methods.comparePassword = function (_requestPassword, _cb) {
    bcrypt.compare(_requestPassword, this.password, (_err, _isMatch) => {
        return _cb(_err, _isMatch);
    });
};
// User's gravatar
exports.UserSchema.methods.gravatar = function (_size) {
    if (!_size) {
        _size = 200;
    }
    const url = 'https://gravatar.com/avatar';
    if (!this.email) {
        return `${url}/?s=${_size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `${url}/${md5}?s=${_size}&d=retro`;
};
const User = db_1.default.model('User', exports.UserSchema);
exports.default = User;
