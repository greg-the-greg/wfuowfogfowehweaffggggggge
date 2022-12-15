var options = {
    method : "POST",
    headers: {
'Content-Type': 'application/json'
   },
   body: JSON.stringify({coords : "snoop doog",data: "wigga wogga", name : "SERVER"}) // body data type must match "Content-Type" header
}
console.log("here");
fetch("/discord",options).then(re=>console.log(re))