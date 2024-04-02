import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function UpdateList(props) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({}); // State to hold form data

    const handleShow = () => {
        setFormData(props.item); // Set initial form data when modal is shown
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };    

    const updateList = () => {
        fetch(`/api/books/${props.item._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(result => {
            console.log("Item updated successfully:", result);
            handleClose(); // Close the modal
            props.updateList(props.item._id, formData); // Pass updated data to the updateList function
            
            // Trigger the reload of lists by calling a callback function provided by the parent component
            props.reloadLists(); 
        })
        .catch(error => {
            console.error("Error updating item:", error);
            handleClose(); // Close the modal
        });
    };          

    return (
        <React.Fragment>
            <Button variant="primary" onClick={handleShow}>
                Update
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input 
                        type="text"
                        placeholder="Title" 
                        name="title" 
                        value={formData.title || ""} 
                        onChange={handleChange} 
                        className="d-block my-3" 
                    />
                    <input 
                        type="text"
                        placeholder="Author" 
                        name="author" 
                        value={formData.author || ""} 
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
                        onClick={updateList} 
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default UpdateList;