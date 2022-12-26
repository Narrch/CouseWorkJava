import React from 'react';
import { Dropdown } from 'react-bootstrap';

export default function DropDownMenu() {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                <img src="http://cdn.onlinewebfonts.com/svg/download_415638.png" alt="" width="40" height="40"></img>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
