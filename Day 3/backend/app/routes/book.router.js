module.exports = function(app) {
    var books = require("../controllers/book.controller.js");

    app.post("/api/books", books.createBook);
    app.get("/api/books/:id", books.getBook);
    app.get("/api/books", books.getBooks);
    app.put("/api/books/:id", books.updateBook); 
    app.delete("/api/books/:id", books.deleteBook);
}