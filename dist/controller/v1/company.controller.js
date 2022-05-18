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
const Role_1 = __importDefault(require("../../models/Role"));
const joi_1 = __importDefault(require("joi"));
const i18n_1 = __importDefault(require("../../config/i18n"));
class CompanyController {
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var roleFind = yield Role_1.default.find({ status: 1 });
            var successRes = new index_1.SuccessRespones(200, i18n_1.default.__('roleSuccessGetRes'), roleFind);
            return res.status(successRes.status).json(successRes);
        });
    }
    static roleInsertValidation(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                name: joi_1.default.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required()
                    .messages({
                    'any.required': i18n_1.default.__('NameRequired')
                }),
            });
            try {
                const value = yield schema.validate(req.body);
                if (value.error) {
                    console.log((_a = value.error) === null || _a === void 0 ? void 0 : _a.details);
                    // next({code: 400,error: value.error?.details})
                    next({ code: 400, message: (_b = value.error) === null || _b === void 0 ? void 0 : _b.details[0].message, error: (_c = value.error) === null || _c === void 0 ? void 0 : _c.details });
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
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.body.name.toLowerCase();
            const role = new Role_1.default({
                name: name
            });
            var roleFind = yield Role_1.default.findOne({ name: name });
            console.log({ roleFind });
            if (roleFind) {
                var errorRes = new index_1.ErrorRespones(400, i18n_1.default.__('roleExits'), i18n_1.default.__('roleExits'));
                return res.status(errorRes.status).json(errorRes);
            }
            var roleInsert = yield role.save();
            var successRes = new index_1.SuccessRespones(200, i18n_1.default.__('roleSuccessRes'), roleInsert);
            return res.status(successRes.status).json(successRes);
        });
    }
    static roleUpdateValidation(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                _id: joi_1.default.string()
                    .alphanum()
                    .required()
                    .messages({
                    'any.required': i18n_1.default.__('IdRequired')
                }),
                name: joi_1.default.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required()
                    .messages({
                    'any.required': i18n_1.default.__('NameRequired')
                }),
            });
            try {
                const value = yield schema.validate(req.body);
                if (value.error) {
                    next({ code: 400, message: (_a = value.error) === null || _a === void 0 ? void 0 : _a.details[0].message, error: (_b = value.error) === null || _b === void 0 ? void 0 : _b.details });
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
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.body._id;
            const name = req.body.name.toLowerCase();
            var roleFind = yield Role_1.default.findOne({ _id: _id });
            if (!roleFind) {
                var errorRes = new index_1.ErrorRespones(400, i18n_1.default.__('roleNotFound'), i18n_1.default.__('roleNotFound'));
                return res.status(errorRes.status).json(errorRes);
            }
            roleFind.name = name;
            var roleUpdate = yield roleFind.save();
            var successRes = new index_1.SuccessRespones(200, i18n_1.default.__('roleUpdateSuccessRes'), roleUpdate);
            return res.status(successRes.status).json(successRes);
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            console.log({ _id });
            var roleFind = yield Role_1.default.findOne({ _id: _id, status: 4 });
            if (!roleFind) {
                var errorRes = new index_1.ErrorRespones(400, i18n_1.default.__('roleNotFound'), i18n_1.default.__('roleNotFound'));
                return res.status(errorRes.status).json(errorRes);
            }
            roleFind.status = 4;
            var roleUpdate = yield roleFind.save();
            var successRes = new index_1.SuccessRespones(200, i18n_1.default.__('roleDeleteSuccessRes'), roleUpdate);
            return res.status(successRes.status).json(successRes);
        });
    }
}
exports.default = CompanyController;
