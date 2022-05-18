"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsSchema = void 0;
const db_1 = __importDefault(require("../config/db"));
exports.FormsSchema = new db_1.default.Schema({
    name: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    },
    type: {
        type: String
    },
    field: {
        type: String
    },
    step: {
        type: Number
    },
    order: {
        type: Number
    },
    companyId: {
        type: db_1.default.Schema.Types.ObjectId,
        ref: "Company"
    },
    createdAt: Number,
    updatedAt: Number,
}, {
    timestamps: true
});
const Forms = db_1.default.model('Forms', exports.FormsSchema);
exports.default = Forms;
