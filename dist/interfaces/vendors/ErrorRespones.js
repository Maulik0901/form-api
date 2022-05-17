"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRespones = void 0;
class ErrorRespones {
    constructor(status, message, error) {
        this.status = status;
        this.message = message;
        this.error = error;
    }
}
exports.ErrorRespones = ErrorRespones;
