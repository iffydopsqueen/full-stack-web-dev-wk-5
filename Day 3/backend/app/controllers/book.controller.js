const mongoose = require("mongoose");
const bookModel = require("../models/book.model");
const Book = mongoose.model("Book");

exports.createBook = (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
    });

    // Save a book in the database
    book.save().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            message: "Fail!",
            error: err.message
        });
    });
};

exports.getBook = (req, res) => {
    Book.findById(req.params.id).select("-__v")
        .then(book => {
            res.status(200).json(book);
        }).catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.id,
                    error: err
                });
            }
            return res.status(500).send({
                message: "Error retrieving book with id " + req.params.id,
                error: err
            });
        });
};

exports.getBooks = (req, res) => {
    Book.find().select("-__v").then(bookInfos => {
        res.status(200).json(bookInfos);
    }).catch(error => {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
};

exports.deleteBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id).select("-__v-_id")
        .then(book => {
            if (!book) {
                res.status(404).json({
                    message: "No book found with id = " + req.params.id,
                    error: "404",
                });
            }
            res.status(200).json({});
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can't delete book with id = " + req.params.id,
                error: err.message
            });
        });
};

exports.updateBook = (req, res) => {
    // Find book and update it
    Book.findByIdAndUpdate(req.body._id, {
        title: req.body.title,
        author: req.body.author
    }, 
    { new: false }
    ).select("-__v")
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "Error -> Can't update a book with id = " + req.params.id,
                    error: "Not Found!"
                });
            }
            res.status(200).json(book);
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can't update a book with id = " + req.params.id,
                error: err.message
            });
        });
};