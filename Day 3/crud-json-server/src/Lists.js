import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
// import UpdateList from "./UpdateList";
// import DeleteList from "./DeleteList";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isLoading: true,
    };
  }

  // Fetch data from the database once this component has been mounted
  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("/api/books")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data); // Add this line
        this.setState({ books: data, isLoading: false });
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Add this line
        this.setState({ isLoading: false });
      });
  }

  // Removes book
  removeBook = async (id) => {
    await fetch(`/api/books/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("Remove Done!");
    // Update book state minus removed item
    let updatedBooks = [...this.state.books].filter((b) => b._id !== id);
    this.setState({ books: updatedBooks });
  };

  render() {
    const { books, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const bookList = books.map((book) => {
      return (
        <tr key={book._id}>
          <td style={{ whiteSpace: "nowrap" }}>{book.title}</td>
          <td>{book.author}</td>
          <td>
            <ButtonGroup>
              <Button 
                size="sm"
                color="info"
                tag={Link}
                to={"/books/update/" + book._id}
              >Update</Button>
              <Button
                size="sm"
                color="warning"
                onClick={() => this.removeBook(book._id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button
              color="primary"
              className="my-4"
              tag={Link}
              to="/books/new"
            >
              Add Book
            </Button>
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
  }
}

export default Lists;