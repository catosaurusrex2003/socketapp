"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeActivemember = exports.addActivemember = void 0;
const onlineList_1 = require("../db/onlineList");
const addActivemember = (room, username) => {
    var bool = false;
    onlineList_1.online_people.forEach(element => {
        if (element.room == room) {
            bool = true;
            element.members.push(username);
        }
    });
    if (!bool) {
        onlineList_1.online_people.push({
            room: room,
            members: [username]
        });
    }
};
exports.addActivemember = addActivemember;
const removeActivemember = (room, username) => {
    onlineList_1.online_people.forEach((each) => {
        if (each.room == room) {
            each.members = each.members.filter((each2) => {
                if (each2 != username) {
                    console.log(each2);
                    return (username);
                }
            });
            if (!each.members.length) {
                var newList = onlineList_1.online_people.filter((each) => {
                    if (each.room != room) {
                        return (each);
                    }
                });
                (0, onlineList_1.setOnlinePeople)(newList);
            }
        }
    });
};
exports.removeActivemember = removeActivemember;
