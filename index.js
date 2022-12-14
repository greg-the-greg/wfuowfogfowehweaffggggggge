require("dotenv").config()

const cors = require("cors")
const express = require("express")
const app = express()
app.use(express.static("public"))
app.use(express.json())

app.use(cors())

const Discord = require("discord.js")
const client = new Discord.Client({intents : [Discord.GatewayIntentBits.Guilds]})
client.login(process.env.TOKEN)

client.once(Discord.Events.ClientReady,c=>{
	client.channels.cache.get(process.env.CHANNEL_ID).send('\'m a gnome')
    console.log("logged in");
})

const webhookClient = new Discord.WebhookClient({ url: process.env.WEBHOOK_CLIENT});


app.listen(3000,()=>{
	console.log("listening at 3000");
})

var ignoreList = [process.env.COORDS.replace(/_/g,",")]

app.post("/discord",async(req, res)=>{
	console.log("I've listened");
	try {
		for (let index = 0; index < ignoreList.length; index++) {
			if (req.body.coords===ignoreList[index]){
				console.log(`found ${req.body.coords} at ignore list.`);
				return
			}
		}
		const channel = client.channels.cache.get(process.env.CHANNEL_ID);
		if (req.body.name === "SERVER" && !req.body.data.startsWith("Player")){//Player entered region! player
			channel.send(`<@&1052688208795811860> ${req.body.coords} activated!`)
		}
		var thread = channel.threads.cache.find(x => x.name === req.body.coords)
		if (thread){
			console.log("already exists! " + req.body.coords);
			await thread.setArchived(false)
		}else{
		thread = await channel.threads.create({
			name: req.body.coords,
			reason: 'region activated'
		})}
		webhookClient.send({
			content: req.body.data,
			username: req.body.name,
			threadId: thread.id
		})
	} catch (error) {
		console.log("SOMETHING WENT WRONG :  " + error);
	}
})



// SAMPLE: {coords : "58,7,4,3",data: "latrinii ratii", name : "bibi"}
// COMMANDS FOR SERVER: NAME: SERVER 
//						DATA: REGION ACTIVATED/PLAYER HAS ENTERED REGION