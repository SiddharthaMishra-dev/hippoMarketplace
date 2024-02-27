"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCredentialValidator = void 0;
var zod_1 = require("zod");
exports.AuthCredentialValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, { message: "Password must be 8 characters long" }),
});
