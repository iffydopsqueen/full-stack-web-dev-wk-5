import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Form, FormGroup, Input, Label } from "reactstrap";

function CreateList(props) {
  const [formData, setFormData] = useState({
    title: "",
    author: ""
  });

  const handleClose = () => props.navigateBack(); // Directly use navigateBack to go back

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const createList = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(result => {
        console.log("Item created successfully:", result);
        props.reloadLists(); // Reload the lists after successful creation
        handleClose(); // Navigate back to the book list
      })
      .catch(error => {
        console.error("Error creating item:", error);
      });
  };

  return (
    <React.Fragment>
      <Container>
        <h2 className="mt-3">Add Book</h2>
        <Form onSubmit={createList}>
          <FormGroup>
            <Label for="title" className="h5 mt-3">
              Book Title
            </Label>
            <Input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="d-block my-3"
            />
          </FormGroup>
          <FormGroup>
            <Label for="author" className="h5 mt-3">
              Author
            </Label>
            <Input
              type="text"
              placeholder="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="d-block my-3"
            />
          </FormGroup>
          <Button variant="primary" type="submit" className="mt-3">
            Save
          </Button>{" "}
          <Button variant="secondary" className="mt-3" onClick={handleClose}>
            Cancel
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default CreateList;