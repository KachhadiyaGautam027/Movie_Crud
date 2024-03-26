const movieModel = require('../models/movie.model');
const fs = require("fs");

const defaultController = (req, res) => {
    res.render('index', { title: "movie Crud" });
}

const viewController = async (req, res) => {

    let movies = await movieModel.find({});
    console.log("movies ==> ", movies);

    res.render("view", { movies });
}

const addController = async (req, res) => {

    let { editId } = req.body;
    console.log("req.file", req.file);
    console.log("req.body", req.body);

    if (!editId) {
        let doc = new movieModel({
            movieName: req.body.moviename,
            action: req.body.action,
            description: req.body.description,
            price: req.body.price,
            movieImg: req.file.path
        })

        doc.save();

        console.log("movie Created...");

    } else {
        let updatedMovie = await movieModel.updateOne({ "_id": editId }, {
            movieName: req.body.moviename,
            action: req.body.action,
            description: req.body.description,
            price: req.body.price
        });

        console.log("update Completed...", updatedMovie);

    }

    res.redirect('/viewMovie');

}

const deleteController = async (req, res) => {

    let { id } = req.params;

    let deletedMovie = await movieModel.findOne({ _id: id });
    console.log("deletedMovie", deletedMovie);

    fs.unlinkSync(`${deletedMovie.movieImg}`);

    await movieModel.deleteOne({ _id: id });

    res.redirect("/viewMovie");
}

const editController = async (req, res) => {

    let { id } = req.params;

    let singleMovie = await movieModel.findById(id);

    res.render('edit', { singleMovie });
}

module.exports = { defaultController, viewController, addController, deleteController, editController };