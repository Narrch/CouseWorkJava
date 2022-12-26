import React, { useState , useEffect} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ModalWindow(props) {

  const [members, setMembers] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function onPress() {
    const fetchData = async () => {
      let competitionId = props.membersList[0];
      const res = await fetch(
          `api/competition/get/${competitionId}/members`,
          {
              headers: { "Authorization": "Bearer " + props.membersList[1] }

          }
      );
      const json = await res.json();
      console.log(json);
      setMembers(json);
      console.log(members);
    };
    fetchData();
    handleShow();
  }

  
    return (
      <div>
          <Button variant="primary" onClick={onPress}>
              Просмотр списка участников</Button>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Просмотр участников</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form>
                  <table className="table">
                      <thead>
                          <tr>
                              <th>ФИО</th>
                              <th>Email</th>
                              <th>Роль</th>

                          </tr>
                      </thead>
                      <tbody>
                      {members.map(item => (
                          <tr key={item.id}>
                          <td>{item.fio}</td>
                          <td>{item.email}</td>
                          <td>{item.role}</td>
                          </tr>
                      ))}
                      </tbody>
                  </table>
                  </Form>
              </Modal.Body>

          </Modal>
      </div>
    )
}
