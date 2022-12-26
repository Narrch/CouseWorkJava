import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ModalWindow(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddFish = () => {
        let fishInfo = {

          area: parseFloat(document.getElementById("lakeArea").value),
          depth: parseFloat(document.getElementById("lakeDepth").value),
          name: document.getElementById("lakeName").value,
        };
        console.log(JSON.stringify(fishInfo));
        fetch('/api/lake/insert', {
            method: 'POST',
            headers: { 'Content-type': 'application/json', "Authorization": "Bearer " + props.token },
            body: JSON.stringify(fishInfo)
        });
        handleClose();
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow} disabled = {(props.role != "ADMIN")? "disabled" : ""}>
                Добавить озеро</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление озера</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="lakeName">
                            <Form.Label>Название</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="lakeArea">
                            <Form.Label>Площадь</Form.Label>
                            <Form.Control type="number" />
                        </Form.Group>
                        <Form.Group controlId="lakeDepth">
                            <Form.Label>Глубина</Form.Label>
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
