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
const index_1 = require("../../interfaces/vendors/index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../models/User"));
const joi_1 = __importDefault(require("joi"));
const i18n_1 = __importDefault(require("../../config/i18n"));
const jwtSecrate_1 = __importDefault(require("../../config/jwtSecrate"));
class Auth {
    static registerValidation(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                name: joi_1.default.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required()
                    .messages({
                    'any.required': i18n_1.default.__('UserNameRequired')
                }),
                email: joi_1.default.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                password: joi_1.default.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
                roleId: joi_1.default.string()
                    .required(),
                companyId: joi_1.default.string()
                    .required()
            });
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
                name: req.body.name,
                email: _email,
                password: _password,
                roleId: req.body.roleId,
                companyId: req.body.companyId
            });
            var userFind = yield User_1.default.findOne({ email: _email });
            if (userFind) {
                var errorRes = new index_1.ErrorRespones(400, i18n_1.default.__('UserExits'), i18n_1.default.__('UserExits'));
                return res.status(errorRes.status).json(errorRes);
            }
            var userInsert = yield user.save();
            var successRes = new index_1.SuccessRespones(200, i18n_1.default.__('UserSuccessRes'), userInsert);
            return res.status(successRes.status).json(successRes);
        });
    }
    static loginValidation(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                email: joi_1.default.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                password: joi_1.default.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            });
            try {
                const value = yield schema.validate(req.body);
                if (value.error) {
                    next({ code: 400, error: (_a = value.error) === null || _a === void 0 ? void 0 : _a.details });
                }
                else {
                    next();
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _email = req.body.email;
                const _password = req.body.password;
                const user = new User_1.default({
                    email: _email,
                    password: _password,
                });
                var userFind = yield User_1.default.findOne({ email: _email }).populate([{ path: "companyId" }, { path: "roleId" }]);
                if (!userFind) {
                    var errorRes = new index_1.ErrorRespones(400, i18n_1.default.__('UserNotFound'), i18n_1.default.__('UserNotFound'));
                    return res.status(errorRes.status).json(errorRes);
                }
                var comparePaasword = yield userFind.comparePassword(_password, userFind.password);
                if (!comparePaasword) {
                    var errorRes = new index_1.ErrorRespones(400, i18n_1.default.__('UserPasswordWrong'), i18n_1.default.__('UserPasswordWrong'));
                    return res.status(errorRes.status).json(errorRes);
                }
                var token = jsonwebtoken_1.default.sign({ name: userFind.name, email: userFind.email, companyId: userFind.companyId }, jwtSecrate_1.default);
                userFind = JSON.parse(JSON.stringify(userFind));
                if (userFind && userFind.password) {
                    delete userFind.password;
                }
                if (userFind) {
                    userFind['token'] = token;
                }
                var successRes = new index_1.SuccessRespones(200, i18n_1.default.__('UserSuccessRes'), userFind);
                return res.status(successRes.status).json(successRes);
            }
            catch (err) {
                console.log({ err });
                next({ code: 400, error: err });
            }
        });
    }
}
exports.default = Auth;
