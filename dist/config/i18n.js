"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("i18n");
const path_1 = __importDefault(require("path"));
//@ts-ignore
const i18n = new i18n_1.I18n({
    locales: ['en', 'uk'],
    defaultLocale: 'en',
    directory: path_1.default.join('./', 'locales')
});
exports.default = i18n;
// module.exports = i18n;
