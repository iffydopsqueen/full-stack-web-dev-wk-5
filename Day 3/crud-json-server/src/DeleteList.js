import React from "react";
import { Button, Container, Form, FormGroup, Label } from "reactstrap";

function DeleteList(props) {
    return (
        <Container>
            <Form>
                <FormGroup>
                    <Label for="title" className="h5 mt-3">Title</Label>
                    <input 
                        type="text"
                        placeholder="Title" 
                        name="title" 
                        value={props.singledata.title}
                        disabled={true}
                        className="d-block my-3 form-control" 
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="author" className="h5 mt-3">Author</Label>
                    <input 
                        type="text"
                        placeholder="Author" 
                        name="author" 
                        value={props.singledata.author}
                        disabled={true}
                        className="d-block my-3 form-control" 
                    />
                </FormGroup>
                <Button color="primary" className="mt-3" onClick={(event) => {
                    props.deleteList(event, props.elementId);
                    props.toggle();
                }}>Delete</Button>{' '}
                <Button color="secondary" className="mt-3" onClick={props.toggle}>Cancel</Button>
            </Form>
        </Container>
    )
}

export default DeleteList;