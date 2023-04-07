"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsOptions = {
    cors: {
        origin: ["http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:5174", "https://mohammed-chat.netlify.app"]
    }
};
exports.default = corsOptions;
