import React, { useState } from 'react';
import { Modal, Form, Button , Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ModalWindow(props) {

    const [show, setShow] = useState(false);

    const [dataLake, setDataLake] = useState([]);
    const [dataLure, setDataLure] = useState([]);

    const fetchDataLake = async () => {
        const res = await fetch(
            'api/lake/get',
            {
                headers: { "Authorization": "Bearer " + props.token }
            }
        );
        const json = await res.json();
        setDataLake(json);
    };
    const fetchDataLure = async () => {
        const res = await fetch(
            'api/lure/get',
            {
                headers: { "Authorization": "Bearer " + props.token }
            }
        );
        const json = await res.json();
        setDataLure(json);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => {
        fetchDataLake();
        fetchDataLure();
        setShow(true);
    }


    const handleAddCompetition = () => {
        let typeComp = document.getElementById("exampleFormControlSelect1").value;
        switch (typeComp) {
            case 'На лодке':
                typeComp = 'WITH_BOAT'
                break;
            case 'С берега':
                typeComp = 'FROM_SHORE'
                break;
            case 'На льду':
                typeComp = 'ON_ICE'
                break;
        }

        const fetchData = async () => {
            const lakeName = document.getElementById("selectCompLake").value;
            const lureName = document.getElementById("selectCompLure").value;

            const lakeData = await fetch(`/api/lake/get/${lakeName}`, {
                headers: { "Authorization": "Bearer " + props.token }
            }).then(res => res.json());

            const lureData = await fetch(`/api/lure/get/${lureName}`, {
                headers: { "Authorization": "Bearer " + props.token }
            }).then(res => res.json());

            let compInfo = {
                startDate: document.getElementById("compDateBegin").value,
                type: typeComp,
                isCompleted:false,
                maxMembers: parseFloat(document.getElementById("compMaxSize").value),
                prize: parseFloat(document.getElementById("compPrize").value),
                endDate: document.getElementById("compDateEnd").value,
                lake: lakeData,
                lure: lureData
            };

            if (compInfo.endDate=="")
            {
              alert("Укажите дату конца соревнования");

              return;
            }
            if (compInfo.startDate>=compInfo.endDate)
            {
              alert("Дата окончания соревнования не может быть раньше даты начала!");

              return;
            }
            if (compInfo.startDate=="")
            {
              alert("Укажите дату старта соревнования");

              return;
            }

            if (isNaN(compInfo.prize))
            {
              alert("Укажите приз");

              return;
            }
            if (compInfo.prize<=0)
            {
              alert("Приз должен быть положительным!");

              return;
            }
            if (isNaN(compInfo.maxMembers))
            {
              alert("Укажите максимальное количество участников");

              return;
            }
            if (compInfo.maxMembers<=0)
            {
              alert("Количество участников не может быть меньше нуля!");

              return;
            }
            if (lakeName=="")
            {
              alert("Выберите или добавьте озеро!");

              return;
            }
            if (lureName=="")
            {
              alert("Выберите или добавьте наживку!");

              return;
            }
            await fetch('/api/competition/insert', {
                method: 'POST',
                headers: { 'Content-type': 'application/json',"Authorization": "Bearer " + props.token },
                body: JSON.stringify(compInfo)
            })
            setShow(false);
            window.location.reload(false);
        };

        fetchData();
    }

    return (
        <div>
            <button type="button" className="btn btn-outline-primary" onClick={handleShow} disabled = {(props.user.role != "ORGANIZER")? "disabled" : ""}> <img src="https://pic.onlinewebfonts.com/svg/img_360305.png" alt="" width="40" height="40"></img> </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание соревнования</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="compDateBegin">
                            <Form.Label>Дата начала соревнования</Form.Label>
                            <Form.Control required type="date"/>
                        </Form.Group>
                        <Form.Group controlId="compType">
                            <Form.Label>Вид соревнования </Form.Label>
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option>На лодке</option>
                                <option>С берега</option>
                                <option>На льду</option>
                            </select>
                        </Form.Group>
                        <Form.Group controlId="compMaxSize">
                            <Form.Label>Максимальное число участников</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>
                        <Form.Group controlId="compPrize">
                            <Form.Label>Денежный приз</Form.Label>
                            <Form.Control type="number" />
                        </Form.Group>
                        <Form.Group controlId="compDateEnd">
                            <Form.Label>Дата конца соревнования</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group controlId="compLake">
                            <Form.Label>Озеро соревнования </Form.Label>
                            <select className="form-control" id="selectCompLake">
                                {dataLake.map(item => (
                                    <option>{item.name}</option>
                                ))}
                            </select>
                        </Form.Group>
                        <Form.Group controlId="compLure">
                            <Form.Label>Применяемая на соревании наживка</Form.Label>
                            <select className="form-control" id="selectCompLure">
                                {dataLure.map(item => (
                                    <option>{item.name}</option>
                                ))}
                            </select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAddCompetition}>Создать</Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}
