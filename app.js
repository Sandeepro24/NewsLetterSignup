const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app= express();

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.post("/",function(req,res){
  const firstName= req.body.fName;
  const lastName= req.body.lName;
  const email=req.body.email;

  const data={
    members:[
      {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
     }
    ]
  };
   const jsonData=JSON.stringify(data);

   const url= "https://us14.api.mailchimp.com/3.0/lists/31bd9f9de9";

   const options = {
     method: "POST",
     auth: "Jsan:aeae7c2f982f0f31cb3c3901029d99d6-us14"
   }
   const reqt = https.request(url,options,function(response){
       if(response.statusCode===200){
         res.sendFile(__dirname + "/success.html");
       }
       else{
         res.sendFile(__dirname + "/failure.html");
       }
        response.on("data",function(data){
          console.log(JSON.parse(data));
        })
   })

   reqt.write(jsonData);
   reqt.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
})



app.listen(process.env.PORT||3000,function(){
  console.log("server is running on port 3000");
});


// api key
//aeae7c2f982f0f31cb3c3901029d99d6-us14

//listid
//31bd9f9de9
