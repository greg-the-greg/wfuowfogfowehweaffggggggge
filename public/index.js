var options = {
    method : "POST",
    headers: {
'Content-Type': 'application/json'
   },
   body: JSON.stringify({coords : "28,72,2,3",data: "wigga wogga", name : "SERVER"}) // body data type must match "Content-Type" header
}
console.log("here");
fetch("https://wfuowfogfowehweaffggggggge.greg-the-greg.repl.co/discord",options).then(re=>console.log(re))