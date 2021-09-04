const express = require("express");
const jwt = require("jsonwebtoken");
const authorize = require('./auth-middleware')
const config = require('./config')

const app = express();
const port = process.env.PORT || 5000;

//For requesting a token
app.get('/token',(req, res) =>{
    const payload = {
        name: "faraz",
        scopes: ["user:create"]
    };

    const token = jwt.sign(payload, config.JWT_SECRETE);
res.send(token);
});



app.get("/user", authorize("user:reads"),(req, res) => {
    res.send("User Information");
})

const server = app.listen(port, () => {
    console.log(`server is running on port no. ${server.address().port}`)
})