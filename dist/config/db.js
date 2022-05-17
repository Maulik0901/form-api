"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// import Log from '../middlewares/Log';
class Database {
    // Initialize your database pool
    static init() {
        var dsn = process.env.MONGODB_URI;
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        // (<any>mongoose).Promise = bluebird;
        // mongoose.set('useCreateIndex', true);
        mongoose_1.default.connect(dsn, options, (error) => {
            // handle the error case
            if (error) {
                // Log.info('Failed to connect to the Mongo server!!');
                console.log(error);
                throw error;
            }
            else {
                console.log("connected to mongo server at:" + dsn);
                // Log.info('connected to mongo server at: ' + dsn);
            }
        });
    }
}
exports.Database = Database;
exports.default = mongoose_1.default;
