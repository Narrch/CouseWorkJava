import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ModalWindow(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdate = () => {
        props.user.fio = document.getElementById("fioMember").value;
        props.user.birthDate = document.getElementById("birthDateMember").value;
        props.user.sex = document.getElementById("sexMemberControl").value;
        console.log(props.user);
        fetch(`/api/member/get/${props.user.id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json', "Authorization": "Bearer " + props.token },
            body: JSON.stringify(props.user)
        }).then((response) => {
            console.log(response.json);
            handleClose();
        });
    }

    return (
        <div>
            <button type="button" className="btn btn-outline-primary" onClick={handleShow}> Профиль </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Профиль пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="fioMember">
                            <Form.Label>ФИО пользователя</Form.Label>
                            <Form.Control type="text" defaultValue={props.user.fio} />
                        </Form.Group>
                        <Form.Group controlId="birthDateMember">
                            <Form.Label>Дата рождения</Form.Label>
                            <Form.Control type="date" defaultValue={props.user.birthDate} />
                        </Form.Group>
                        <Form.Group controlId="sexMember">
                            <Form.Label>Пол пользователя </Form.Label>
                            <select className="form-control" defaultValue={props.user.sex} id="sexMemberControl">
                                <option value="MALE">Мужской</option>
                                <option value="FEMALE">Женский</option>
                                <option value="OTHER">Другое</option>
                            </select>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Назад</Button>
                    <Button variant="primary" onClick={handleUpdate}>Изменить</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
