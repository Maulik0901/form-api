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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const i18n_1 = __importDefault(require("../config/i18n"));
const jwtSecrate_1 = __importDefault(require("../config/jwtSecrate"));
class AuthMiddelware {
    static basicAuthUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.headers.authorization) {
                    var decoded = jsonwebtoken_1.default.verify(req.headers.authorization, jwtSecrate_1.default);
                    console.log({ decoded });
                    if (decoded) { //@ts-ignore
                        req.user = decoded;
                    }
                    else {
                        next({ code: 403, error: i18n_1.default.__("TokenRequired") });
                    }
                    next();
                }
                else {
                    next({ code: 403, error: i18n_1.default.__("TokenRequired") });
                }
            }
            catch (err) {
                console.log({ err });
                next(err);
            }
        });
    }
}
exports.default = AuthMiddelware;
