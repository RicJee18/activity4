
var client;

function connectFunc(){
    
    document.getElementById('status').value = "";
    document.getElementById('status').value += "Connecting ....";
    
    client = mqtt.connect(document.getElementById('broker').value)

    client.on("connect", function(){
        document.getElementById('status').value = "";
        document.getElementById('status').value += "Connected!";
    })
    
    client.on("message", function (topic, payload) {
      var date = new Date();
      if (topic == document.getElementById('sub-topic').value){
        document.getElementById('incomingMessage').innerHTML += `<tr><td>${topic}</td><td>${payload}</td><td>${date.toDateString()+" "+ date.toLocaleTimeString()}</td></tr>`
      }
    })
}

function publishFunc() {
    var date = new Date();
    if (document.getElementById('pub-topic').value != "" && document.getElementById('pub-payload').value != "") {
        client.publish(document.getElementById('pub-topic').value, document.getElementById('pub-payload').value)
        document.getElementById('displayPubMessage').innerHTML += `<tr><td>${document.getElementById('pub-topic').value}</td><td>${document.getElementById('pub-payload').value}</td><td>${date.toDateString()+" "+ date.toLocaleTimeString()} </td></tr>`
        
    } else {
        alert("Please fill in the topic and payload! ")
    }
}

function subscribeFunc(){
    var date = new Date();
    if (document.getElementById('sub-topic').value != "") {
        client.subscribe(document.getElementById('sub-topic').value, function (err) {
            if (err) {
                console.log("Error in subscribing topic!")
            }
        document.getElementById('displaySubMessage').innerHTML  += `<tr><td>${document.getElementById('sub-topic').value }</td><td>${date.toDateString()+" "+ date.toLocaleTimeString()}</td></tr>`
        })
    } else {
        alert("Please fill in the topic! ")
    }
}

function disconFunc()
{
    console.log("hello")
    client.disconnect();
}
  
