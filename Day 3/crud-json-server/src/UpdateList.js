import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

function UpdateList(props) {
  const [formData, setFormData] = useState({});
  const { id } = useParams();

  const handleClose = () => props.navigateBack(); // Directly use navigateBack to go back

  useEffect(() => {
    // Fetch book data based on ID
    fetch(`/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error("Error fetching book data:", error));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Update book data
      const response = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Item updated successfully:", result);
      props.updateList(id, formData);
      props.fetchData(); // Fetch updated data
      window.location.reload(); // Reload the page
      props.navigateBack(); // Navigate back to the book list
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };     

  return (
    <Container>
      <h2 className="mt-3">Edit Book</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title" className="h5 mt-3">
            Book Title
          </Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={formData.title || ""}
            onChange={handleChange}
            autoComplete="title"
          />
        </FormGroup>
        <FormGroup>
          <Label for="author" className="h5 mt-3">
            Author
          </Label>
          <Input
            type="text"
            name="author"
            id="author"
            value={formData.author || ""}
            onChange={handleChange}
            autoComplete="author"
          />
        </FormGroup>
        <Button color="primary" type="submit" className="mt-3">
          Save
        </Button>{" "}
        <Button color="secondary" className="mt-3" onClick={handleClose}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateList;