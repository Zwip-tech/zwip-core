import { Client, GatewayIntentBits, Events } from "discord.js";

console.log("Hello via Bun!");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, () => {
  console.log("I am ready!");
});

client.login("MzIxNzEyOTI5NTg4Mzc5Njc5.Gq55_4.xNHfSd_c0QyzfOTjUrET9eGER93D42l3Tlctz8");

//MzIxNzEyOTI5NTg4Mzc5Njc5.Gq55_4.xNHfSd_c0QyzfOTjUrET9eGER93D42l3Tlctz8