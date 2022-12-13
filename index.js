require("dotenv").config()

const fs = require("node:fs")
const path = require("node:path")
const express = require("express")
const app = express()

const Discord = require("discord.js")
const client = new Discord.Client({intents : [Discord.GatewayIntentBits.Guilds]})
client.login(process.env.TOKEN)

client.once(Discord.Events.ClientReady,c=>{
    console.log("logged in");
})
