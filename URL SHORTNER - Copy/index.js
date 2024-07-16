const express = require("express");
const path = require("path");
const cookieParser  = require("cookie-parser");


const {connectToMongoDb} = require('./connection');
const {checkForAuthentication,restrictTo} = require('./middleware/auth')
const URL = require('./models/url');

// Routes
const urlRoute = require('./routes/url');
const staticRoute =require('./routes/staticRouter');
const userRoute = require('./routes/user')

const app = express();
const PORT = 8000;


//connection
connectToMongoDb('mongodb://localhost:27017/url_shortner')
.then(() => {
    console.log("mongodb connected")
})
.catch((err) => {
    console.log("Not connected",err);
})



//sabse pehle expess ko batana padta hai ki konsa templating engine ham use karrne wale hain:
app.set("view engine",'ejs');
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}))//this is used for pass the form data
app.use(cookieParser());
app.use(checkForAuthentication);///ye to har bar chlega hi chlega

app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute);//this route is restricted for normal user 
app.use("/user",userRoute);
app.use("/",staticRoute);





app.get('/url/:shortId', async(req,res) =>{
     const shortId = req.params.shortId;  
     const entry = await URL.findOneAndUpdate(
        {
        shortId,
        },
        {
        $push :{
        visitHistory :{
        timestamps : Date.now(),
        },
    },
},
);
    res.redirect(entry.redirectUrl);
});






app.listen(PORT ,()=> {
    console.log(`server started the port :${PORT}`)
});


//26:00




