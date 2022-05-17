"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const joi_1 = __importDefault(require("joi"));
const i18n_1 = __importDefault(require("../../config/i18n"));
class Auth {
    static registerValidation(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("=========");
            const schema = joi_1.default.object().keys({
                name: joi_1.default.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required()
                    .messages({
                    'any.required': i18n_1.default.__('UserNameRequired')
                }),
                password: joi_1.default.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
                roleId: joi_1.default.number()
                    .integer()
                    .min(1900)
                    .max(2013).required(),
                email: joi_1.default.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
            });
            // .with('username', 'birth_year')
            // .xor('password', 'access_token')
            // .with('password', 'repeat_password');
            try {
                console.log("adkfjnajsdf", req.body);
                const value = yield schema.validate(req.body);
                if (value.error) {
                    console.log((_a = value.error) === null || _a === void 0 ? void 0 : _a.details);
                    next({ code: 400, error: (_b = value.error) === null || _b === void 0 ? void 0 : _b.details });
                }
                else {
                    next();
                }
            }
            catch (err) {
                console.log({ err });
                next(err);
            }
        });
    }
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const _email = req.body.email;
            const _password = req.body.password;
            const user = new User_1.default({
                email: _email,
                password: _password
            });
            var userFind = yield User_1.default.findOne({ email: _email });
            var userInsert = yield user.save();
            return res;
        });
    }
}
exports.default = Auth;
