const {getUser} = require('../service/auth')

//this function will handle authentication
function checkForAuthentication(req,res,next){
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if(!tokenCookie)
    return next();

   const token = tokenCookie;
   const user = getUser(token);

   req.user = user;
   return next();
}


//this function will handle authorization
//admin 
function restrictTo(roles){
   return function(req,res,next){
    if(!req.user)
      return res.redirect("/login");
   
    if(!roles.includes(req.user.role))
      res.end('unauthorized')

    return next();
  }
}


module.exports = {
  checkForAuthentication,
  restrictTo,
} 




// async function restrictToLoginUserOnly(req,res,next){
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers["Authorization"];
//   if(!userUid) return res.redirect("/login");
//   const token = userUid.split('Bearer ')[0]//"Bearer 324nnvbkn"
//   const user  = getUser(token);

//   if(!user) return res.redirect("/login");
//   req.user = user;
//   next();

// }


// async function checkAuth(req,res,next){
//     const userUid = req.cookies?.uid; 
//     const user  = getUser(userUid);
//     req.user = user;
//     next();

// }