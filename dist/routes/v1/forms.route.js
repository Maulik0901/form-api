"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forms_controller_1 = __importDefault(require("../../controller/v1/forms.controller"));
const basic_auth_1 = __importDefault(require("../../middleware/basic.auth"));
const router = (0, express_1.Router)();
router.get('/', basic_auth_1.default.basicAuthUser, forms_controller_1.default.get);
router.post('/', basic_auth_1.default.basicAuthUser, forms_controller_1.default.formInsertValidation, forms_controller_1.default.create);
router.put('/', basic_auth_1.default.basicAuthUser, forms_controller_1.default.formUpdateValidation, forms_controller_1.default.update);
router.delete("/:id", basic_auth_1.default.basicAuthUser, forms_controller_1.default.delete);
exports.default = router;
