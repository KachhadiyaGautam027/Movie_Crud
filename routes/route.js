const express = require('express');
const routes = express();
const bodyParser = require('body-parser');
const upload = require('../middleware/upload');
const movieCon = require('../controllers/movieController');


routes.get('/', movieCon.defaultController);
routes.get('/viewMovie', movieCon.viewController);
routes.post('/addMovie', upload.single('movieImg'), movieCon.addController);
routes.get('/deleteMovie/:id', movieCon.deleteController);
routes.get('/editMovie/:id', movieCon.editController);

module.exports = routes;
