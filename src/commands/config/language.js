"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "language",
    description: "change the bot language.",
    type: 1,
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "ADMINISTRATOR", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            if (lang == "en")
                await settingsTable.set(`Lang_${guild.id}`, "ar");
            else if (lang == "ar")
                await settingsTable.set(`Lang_${guild.id}`, "en");
            (0, respond_1.respond)(interaction, message, {
                content: REPLYS.langChange.replace("{lang}", lang),
            }, isSlash);
        }
    },
};
