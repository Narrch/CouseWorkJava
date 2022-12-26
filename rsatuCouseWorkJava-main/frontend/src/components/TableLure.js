import React from 'react';
import ModalWindow from './ModalWindow'
import ModalWindowLure from './ModalWindowLure'
export default props => (
  <div>
    <table className="table">
        <thead>
            <tr>
                <th>Название</th>
                <th>Глубина</th>

            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id}>
                    <td>{item.name}</td>

                    <td>{item.depth}</td>

                </tr>
            ))}
        </tbody>
    </table>

    <ModalWindowLure role={props.role} token = {props.token}/>
    </div>
)
