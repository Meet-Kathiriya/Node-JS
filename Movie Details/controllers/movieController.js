const fs = require("fs");
const Schema = require("../models/movieModel");

module.exports.firstPage = async (req, res) => {
    await Schema.find().then((data) => {
        res.render("home", { data });
    });
};

module.exports.Addfunction = async (req, res) => {
    req.body.poster = req.file.path;
    await Schema.create(req.body).then(() => {
        res.redirect("/");
    });
};

module.exports.deletefunction = async (req, res) => {
    let singleData = await Schema.findById(req.query.id);
    fs.unlinkSync(singleData.poster);
    await Schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/");
    });
};

module.exports.editfunction = async (req, res) => {
    await Schema.findById(req.query.id).then((singleData) => {
        res.render("editmovie", { singleData });
    });
};

module.exports.updatefunction = async (req, res) => {
    let singleData = await Schema.findById(req.body.id);
    let img = "";

    req.file ? img = req.file.path : img = singleData.poster;

    req.file && fs.unlinkSync(singleData.poster);

    req.body.poster = img;

    await Schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/");
    });
};
