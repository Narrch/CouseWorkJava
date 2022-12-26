import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ModalWindow(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddFish = () => {
        let fishInfo = {

          depth: parseFloat(document.getElementById("lureDepth").value),

          name: document.getElementById("lureName").value,
        };
        console.log(JSON.stringify(fishInfo));
        fetch('/api/lure/insert', {
            method: 'POST',
            headers: { 'Content-type': 'application/json', "Authorization": "Bearer " + props.token },
            body: JSON.stringify(fishInfo)
        });
        handleClose();
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow} disabled = {(props.role != "ADMIN")? "disabled" : ""}>
                Добавить наживку</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление наживки</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="lureName">
                            <Form.Label>Название</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group controlId="lureDepth">
                            <Form.Label>Глубина действия</Form.Label>
                            <Form.Control type="number" />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAddFish}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
