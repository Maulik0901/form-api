"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_controller_1 = __importDefault(require("../../controller/v1/company.controller"));
const router = (0, express_1.Router)();
router.get('/', company_controller_1.default.get);
router.post('/', company_controller_1.default.companyInsertValidation, company_controller_1.default.create);
router.put('/', company_controller_1.default.companyUpdateValidation, company_controller_1.default.update);
router.delete("/:id", company_controller_1.default.delete);
exports.default = router;
