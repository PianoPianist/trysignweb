const express = require("express")
const bodyparser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()
app.use(bodyparser.urlencoded({extended:true})) //convert hex to normal text
app.use(express.static("public")) //we are in the public folder //to use local files

app.post("/",function(req, res){
    var firstn = req.body["firstn"]
    var lastn = req.body["lastn"]
    var emailid = req.body["emailid"]
    console.log(firstn, lastn, emailid)

    var data = {
        members:[
            {
                email_address: emailid,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstn,
                    LNAME:lastn
                }
            }
        ]
    }

    var jsondata = JSON.stringify(data)

    const url = "https://us21.api.mailchimp.com/3.0/lists/35457sd3c326"

    const options = {
        method:"POST",
        auth:"prisha:7907a27fb4418012e2a911115da49c8d-us21"
    }
    const request =https.request(url, options, function(response){
        if (response.statusCode == 200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")

        }
        response.on("data",function(data){
            
            console.log(JSON.parse(data))
        }) //to get the data
    })


    request.write(jsondata)
    request.end()
})
app.listen(3000,function(){
    console.log("helloasiaois")
})

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html")
})

app.post("/failure",function(req,res){
    res.redirect("/")
})
// API Key
// 7907a27fb4418012e2a911115da49c8d-us21