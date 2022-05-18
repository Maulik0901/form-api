"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const i18n_1 = __importDefault(require("./config/i18n"));
const index_1 = __importDefault(require("./routes/index"));
const express_2 = __importDefault(require("express"));
const index_2 = require("./interfaces/vendors/index");
dotenv_1.default.config();
const app = (0, express_1.default)();
db_1.Database.init();
const port = process.env.PORT;
app.use(express_2.default.json());
app.use(express_2.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
    var _a;
    var lang = "en";
    if ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.lang) {
        lang = req.headers.lang;
    }
    i18n_1.default.setLocale(lang);
    next();
});
app.use('/', index_1.default);
app.use((err, req, res, next) => {
    var errRes = new index_2.ErrorRespones(err.code, err.message, err.error);
    return res.status(errRes.status).json(errRes);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
exports.default = app;
