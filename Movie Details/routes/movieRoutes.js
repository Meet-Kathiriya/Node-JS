const express = require('express');
const route = express.Router();
const movieController = require('../controllers/movieController');
const multer = require('../middlewares/multer');

route.get('/', movieController.firstPage);

route.get('/addmovie', (req, res) => {
    res.render('addmovie');
});

route.post('/addmovie', multer.single('poster'), movieController.Addfunction);

route.get('/deletemovie', movieController.deletefunction);

route.get('/editmovie', movieController.editfunction);

route.post('/updatemovie', multer.single('poster'), movieController.updatefunction);

module.exports = route;
