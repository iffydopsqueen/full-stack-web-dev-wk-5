import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";

import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Lists = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [setShow] = useState(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setIsLoading(true);

    fetch("/api/books")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data);
        setBooks(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const removeBook = async (id) => {
    await fetch(`/api/books/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("Remove Done!");
    setBooks(books.filter((b) => b._id !== id));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const bookList = books.map((book) => (
    <tr key={book._id}>
      <td style={{ whiteSpace: "nowrap" }}>{book.title}</td>
      <td>{book.author}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="info" tag={Link} to={"/books/update/" + book._id}>Update</Button>
          <Button size="sm" color="warning" onClick={() => removeBook(book._id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  ));

  return (
    <div>
      <Container fluid>
        <div className="float-right">
          <Button onClick={handleShow} color="primary" className="my-4" tag={Link} to={"/books/create"}>Add Book</Button>
        </div>
        <h3>Book List</h3>
        <Table className="mt-4">
          <thead>
            <tr>
              <th width="40%">Book Title</th>
              <th width="30%">Author</th>
              <th width="30%">Actions</th>
            </tr>
          </thead>
          <tbody>{bookList}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Lists;