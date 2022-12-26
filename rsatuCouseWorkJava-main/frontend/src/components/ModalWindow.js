import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ModalWindow(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const check = () => console.log(props.role);
    const handleAddFish = () => {
        let fishInfo = {
            name: document.getElementById("fishName").value,
            kind: document.getElementById("fishType").value,
            depth: parseFloat(document.getElementById("fishDepth").value),
            weight: parseFloat(document.getElementById("fishWeight").value),
        };
        console.log(JSON.stringify(fishInfo));
        fetch('/api/fish/insert', {
            method: 'POST',
            headers: { 'Content-type': 'application/json', "Authorization": "Bearer " + props.token },
            body: JSON.stringify(fishInfo)
        });
        handleClose();

    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow} disabled = {(props.role != "ADMIN")? "disabled" : ""}>
                Добавить рыбу</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление рыбы</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="fishName">
                            <Form.Label>Название</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="fishType">
                            <Form.Label>Семейство</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="fishDepth">
                            <Form.Label>Глубина обитания</Form.Label>
                            <Form.Control type="number" />
                        </Form.Group>
                        <Form.Group controlId="fishWeight">
                            <Form.Label>Средний вес</Form.Label>
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
