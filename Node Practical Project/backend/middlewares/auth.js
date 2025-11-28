const jwt = require("jsonwebtoken");

module.exports.checkauth = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(400).json({ msg: "token not found !" });
    }

    const newToken = token.split(" ")[1];

    jwt.verify(newToken, "pe", (err, decode) => {
        if (err) {
            return res.status(401).json({ msg: err.message });  // <— no crash
        }

        req.admin = decode;
        next();
    });
};

module.exports.checkBookAuth = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(400).json({ msg: "token not found !" });
    }

    const newToken = token.split(" ")[1];

    jwt.verify(newToken, "pe", (err, decode) => {
        if (err) {
            return res.status(401).json({ msg: err.message });  // <— no crash
        }

        req.book = decode;
        next();
    });
};
