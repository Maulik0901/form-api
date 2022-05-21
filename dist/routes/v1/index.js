"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const role_route_1 = __importDefault(require("./role.route"));
const company_route_1 = __importDefault(require("./company.route"));
const forms_route_1 = __importDefault(require("./forms.route"));
const router = (0, express_1.Router)();
router.use('/auth', user_route_1.default);
router.use('/role', role_route_1.default);
router.use('/company', company_route_1.default);
router.use('/form', forms_route_1.default);
exports.default = router;
