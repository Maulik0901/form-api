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
class Login {
    static registerValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                username: joi_1.default.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
                password: joi_1.default.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
                repeat_password: joi_1.default.ref('password'),
                access_token: [
                    joi_1.default.string(),
                    joi_1.default.number()
                ],
                birth_year: joi_1.default.number()
                    .integer()
                    .min(1900)
                    .max(2013),
                email: joi_1.default.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            });
            // .with('username', 'birth_year')
            // .xor('password', 'access_token')
            // .with('password', 'repeat_password');
            try {
                const value = yield schema.validateAsync(req.body);
                console.log({ value });
                // next();
                return true;
            }
            catch (err) {
                console.log({ err });
                // next();
                return true;
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
exports.default = Login;
