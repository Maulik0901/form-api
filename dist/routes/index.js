"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("./v1/index"));
const router = (0, express_1.Router)();
console.log("v1");
router.use('/v1', index_1.default);
exports.default = router;
