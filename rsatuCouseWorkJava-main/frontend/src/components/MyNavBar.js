import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Dropdown, Figure } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalCompetitionCreate from './ModalCompetitionCreate'
import ProfileModal from './ProfileModal'
import ModularHandBook from './ModularHandBook'
import DropDownMenu from './DropDownMenu';
import propsResolver from 'react-bootstrap-table-next/lib/src/props-resolver';


export default function MyNavBar(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogOut = () => props.keycloak.logout();

  const handleFillFilter = () => props.filter(document.getElementById("inputField").value);

  return <nav className="navbar navbar-light bg-white">
    <div className="container-fluid">
      <a className="btn btn-outline-primary" href="/"><img src="https://www.pinclipart.com/picdir/big/44-448226_file-home-icon-svg-wikimedia-commons-free-train.png" alt="" width="40" height="40" className="d-inline-block align-text-top"></img></a>
      <ModularHandBook token={props.token} user = {props.user}/>
      <a className="search-brand" href="#">
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Input ID" aria-label="Search" id="inputField"></input>
          <input type="image" img src="https://www.freeiconspng.com/uploads/search-icon-png-21.png" alt="" width="40" height="40" onClick={handleFillFilter}/>
        </form>
      </a>
      {setShow ? <ModalCompetitionCreate token={props.token} user = {props.user}/> : null}
      {props.user.email}
      <Dropdown>
        <Dropdown.Toggle variant="white" id="dropdown-basic">
          <img src="http://cdn.onlinewebfonts.com/svg/download_415638.png" alt="" width="40" height="40"></img>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <ProfileModal user = {props.user} token = {props.token}/>
          <p>
          </p>
          <button type="button" className="btn btn-outline-primary" onClick={handleLogOut}> Выход </button>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </nav>
};
