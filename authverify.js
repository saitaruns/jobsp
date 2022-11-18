const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next)=>{

    if(!req.headers.authorization){
        return res.status(401).send('Unauthorised request')
    }
    const token = req.headers.authorization.split(' ')[1];

    console.log(token)

    if(!token){
        return res.status(400).send("Token required for Authorization")
    }

    try{
        const decodedUser = jwt.verify(token,process.env.TOKEN_KEY)
        req.user = decodedUser
    }
    catch(err){
        return res.status(400).send("Invalid Token")
    }
    return next();
}

module.exports = verifyToken