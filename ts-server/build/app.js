"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { onlinePeopleType } from './schema/onlinePeople.schema';
const onlineList_1 = require("./db/onlineList");
const onlineListFunctions_1 = require("./utils/onlineListFunctions");
const logger_1 = __importDefault(require("./utils/logger"));
const express_1 = __importDefault(require("express"));
const http = require("http");
const { Server } = require("socket.io");
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const port = process.env.PORT || 3001;
const app = (0, express_1.default)();
const server = http.createServer(app);
const io = new Server(server, corsOptions_1.default);
app.get("/", (req, res) => {
    logger_1.default.info("hitted");
    res.send("sadasd");
});
app.post("/", (req, res) => {
    logger_1.default.info(req);
    res.send("oksdfsdfsdf");
});
io.on("connection", (socket) => {
    logger_1.default.info("connected on " + socket.id);
    socket.emit("rooms-update", onlineList_1.online_people);
    socket.on("join-room", (room, username) => {
        try {
            socket.join(room);
        }
        catch (error) {
            logger_1.default.error(error);
        }
        var currentTime = new Date().toLocaleString('en-US', { timeZone: "Asia/Kolkata", hour: 'numeric', minute: 'numeric', hour12: true });
        socket.to(room).emit("someone-joined", username, currentTime);
        logger_1.default.warn(`user => Id: ${socket.id} Name: ${username} joined the Room: ${room}`);
        (0, onlineListFunctions_1.addActivemember)(room, username);
        logger_1.default.info(onlineList_1.online_people);
        socket.emit("online-member-update", onlineList_1.online_people);
        // i dont know why i put this here this is not needed. the above line does the same work
        // online_people.forEach(element => {
        //     if(element.room == room){
        //         socket.to(room).emit("online-member-update",online_people)
        //     }
        // });
        socket.on("disconnect", () => {
            socket.to(room).emit("someone-left", username, currentTime);
            (0, onlineListFunctions_1.removeActivemember)(room, username);
            logger_1.default.warn(`${username} left the room at ${currentTime}`);
            logger_1.default.warn(onlineList_1.online_people);
            socket.to(room).emit("online-member-update", onlineList_1.online_people);
        });
    });
    socket.on("new-message", (data) => {
        logger_1.default.info(data);
        socket.to(data.room).emit("recieve-message", data);
    });
    socket.emit("me", socket.id);
    logger_1.default.info("emitted me");
    socket.on("disconnect", () => {
        logger_1.default.info("call Ended");
        socket.broadcast.emit("callEnded");
    });
    socket.on("callUser", (data) => {
        logger_1.default.info("callUser");
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name });
    });
    socket.on("answerCall", (data) => {
        logger_1.default.info("answerCall");
        io.to(data.to).emit("callAccepted", data.signal);
    });
});
server.listen(port, () => {
    console.log("\x1b[1m\x1b[33mS\x1b[31mE\x1b[32mR\x1b[34mV\x1b[35mE\x1b[36mR\x1b[37m \x1b[33mR\x1b[31mU\x1b[32mN\x1b[34mN\x1b[35mI\x1b[36mN\x1b[37m\x1b[33mG \x1b[31mO\x1b[32mN \x1b[34mP\x1b[35mO\x1b[36mR\x1b[37m\x1b[33mT\x1b[0m", "3001");
});
