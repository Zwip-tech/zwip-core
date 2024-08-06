import { Zwip } from "./core/Zwip";

const zwip = new Zwip();

zwip.run();

export { Plugin } from "./core/plugins/Plugin";
export { Terminal } from "./core/logger/Terminal";
export { Zwip } from "./core/Zwip";
export { CommandBase } from "./core/commands/CommandBase";
export * as DiscordJS from 'discord.js'