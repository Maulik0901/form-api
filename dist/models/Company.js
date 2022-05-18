"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanySchema = void 0;
const db_1 = __importDefault(require("../config/db"));
exports.CompanySchema = new db_1.default.Schema({
    name: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    },
    logo: {
        type: String
    },
    createdAt: Number,
    updatedAt: Number,
}, {
    timestamps: true
});
const Company = db_1.default.model('Company', exports.CompanySchema);
exports.default = Company;
