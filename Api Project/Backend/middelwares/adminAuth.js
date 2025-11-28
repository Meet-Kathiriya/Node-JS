const jwt = require("jsonwebtoken");

module.exports.checkAuth = (req,res,next) => {
    let token = req.header("Authorization")

    if (!token) {
        res.status(401).json({msg: "Token not found"})
    }

    let newToken = token.slice(7, token.length)

    let decode = jwt.verify(newToken, "asd")

    if (decode.role !== "admin") {
       return res.status(403).json({msg: "Access denied. Admin only"})
    }

    req.admin = decode
    
    next()
}