import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function CreateList(props) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        author: ""
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const createList = () => {
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
            handleClose();
            props.reloadLists(); // Reload the lists after successful creation
            props.navigateBack(); // Navigate back to the book list
        })
        .catch(error => {
            console.error("Error creating item:", error);
            handleClose();
        });
    };

    return (
        <React.Fragment>
            <Button variant="primary" onClick={handleShow}>
                Add Book
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input 
                        type="text"
                        placeholder="Title" 
                        name="title" 
                        value={formData.title}
                        onChange={handleChange} 
                        className="d-block my-3" 
                    />
                    <input 
                        type="text"
                        placeholder="Author" 
                        name="author" 
                        value={formData.author}
                        onChange={handleChange} 
                        className="d-block my-3" 
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={createList}
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default CreateList;