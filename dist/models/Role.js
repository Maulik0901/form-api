"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSchema = void 0;
const db_1 = __importDefault(require("../config/db"));
exports.RoleSchema = new db_1.default.Schema({
    name: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    },
    createdAt: Number,
    updatedAt: Number,
}, {
    timestamps: true
});
const Role = db_1.default.model('Role', exports.RoleSchema, "Role");
exports.default = Role;
