"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = __importDefault(require("../../controller/v1/role.controller"));
const router = (0, express_1.Router)();
router.post('/', role_controller_1.default.roleInsertValidation, role_controller_1.default.create);
exports.default = router;
