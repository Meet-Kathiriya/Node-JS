const jwt = require("jsonwebtoken")

module.exports.checkAuth = (req,res,next) => {
    let token = req.header("Authorization")

    if (!token) {
        return res.status(401).json({msg: "Token not found"})
    }

    let newToken = token.slice(7, token.length)

    let decode = jwt.verify(newToken, "asd")

    req.employee = decode

    if (decode.role !== "employee") {
        return res.status(403).json({msg: "Access denied. employee only"})        
    }

    next();
}