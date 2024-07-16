const sessionIdTouserMap = new Map();//this is maintain the state
const jwt = require("jsonwebtoken");
const secretKey = "jatin$12@";

// this particular function gemerate tokens for us:
function setUser(user){
    return jwt.sign({
        _id : user._id,
        email : user.email,
        role : user.role,
    },secretKey)
}

function getUser(token){
    if(!token)  return null;
    try{
        return jwt.verify(token, secretKey)
    }
    catch(error){
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}