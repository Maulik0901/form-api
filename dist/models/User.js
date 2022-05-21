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
        type: db_1.default.Types.ObjectId,
        ref: "Role"
    },
    companyId: {
        type: db_1.default.Types.ObjectId,
        ref: "Company"
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
        if (user.password) {
            bcrypt.hash(user.password, _salt, null, (_err, _hash) => {
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
exports.UserSchema.methods.comparePassword = function (_requestPassword, hashPassword) {
    return bcrypt.compareSync(_requestPassword, hashPassword);
};
const User = db_1.default.model('User', exports.UserSchema, "User");
exports.default = User;
