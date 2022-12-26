import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Alert } from 'react-bootstrap';
import ModalCompetitonMembers from './ModalCompetitonMembers';
import UploadButton from './UploadButton';
import moment from 'moment'

export default function CompetitionsTable(props) {


    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        style: { backgroundColor: 'LightGrey' },
        onSelect: (row, isSelect, rowIndex, e) => {
            console.log(row);
            setCompetition(row);
            if (canAddMember(row)) {
                setShowAddMember(true);
            } else {
                setShowAddMember(false);
            }
            if (row.fileInfo != null) {
                setShowDownload(true);
                setShowUpload(false);
            } else {
                setShowDownload(false);
                setShowUpload(true);
            }
            setShowMemberList(true);
        }
    };

    const columns = [{
        dataField: 'isCompleted',
        text: 'Статус',
        sort: true,
        formatter: (value, row) => { return getStatus(value, row) }
    },
    {
        dataField: 'id',
        text: 'ID',
        sort: true
    }, {
        dataField: 'startDate',
        text: 'Дата начала',
        sort: true
    }, {
        dataField: 'members.length',
        text: 'Тек./Макс. кол-во участников',
        formatter: (value, row) => { return `${value}/${row.maxMembers}` }
    }, {
        dataField: 'prize',
        text: 'Приз',
        sort: true
    }, {
        dataField: 'type',
        text: 'Вид соревнования',
        sort: true,
        formatter: (cell) => { return getFormatedCompType(cell) }
    }, {
        dataField: 'lake.name',
        text: 'Озеро',
        sort: true
    }, {
        dataField: 'lure.name',
        text: 'Наживка',
        sort: true
    }, {
        dataField: 'endDate',
        text: 'Дата окончания',
        sort: true
    }
    ];


    const [data, setData] = useState([]);
    const [competition, setCompetition] = useState([]);
    const [showAddMember, setShowAddMember] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [showMemberList, setShowMemberList] = useState(false);
    const [showModalMembers, setShowModalMembers] = useState(false);
    const [showDownload, setShowDownload] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [members, setMembers] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let res = null;
        if (props.filter == "" || props.filter == null) {
            res = await fetch(
                'api/competition/get',
                {
                    headers: { "Authorization": "Bearer " + props.token }
                }
            );
        } else {
            res = await fetch(
                `api/competition/${props.filter}`,
                {
                    headers: { "Authorization": "Bearer " + props.token }
                }
            );
        }
        const json = await res.json();
        console.log(json);
        setData(json);
    };

    const updateData = () => {
        fetchData();
        setShowDownload(true);
        setShowUpload(false);
        setShowAddMember(false);
    }

    function getStatus(value, row) {
        if (value)
            return "Завершен";
        else {
            let currDate = moment();
            var day = moment(row.startDate);
            console.log(day);
            if (currDate >= moment(row.startDate) && currDate <= moment(row.endDate)) {
                return "Идёт";
            } else {
                return "Не начался"
            }
        }
    }

    function canAddMember(row) {
        var ids = row.members.map(function (member) {
            return member.id;
        });

        if (row.isCompleted || row.maxMembers < row.members.length ||
            ids.includes(props.user.id)) {
            return false;
        } else return true;
    }

    function getFormatedCompType(type) {
        switch (type) {
            case 'WITH_BOAT':
                return 'На лодке'
            case 'FROM_SHORE':
                return 'С берега'
            case 'ON_ICE':
                return 'На льду'
        }
    }

    function GetAlert() {
        return (
            <Alert show={showAlert} variant="success">
                <Alert.Heading>Сообщение</Alert.Heading>
                <p>
                    Вы зарегистрированы на соревнование!
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShowAlert(false)} variant="outline-success">
                        Закрыть
                    </Button>
                </div>
            </Alert>
        );
    }

    const handleAddMe = () => {
        let competitionId = competition.id;
        let userId = props.user.id;
        console.log(JSON.stringify(userId));

        fetch(`api/competition/${competitionId}/members/${userId}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json', "Authorization": "Bearer " + props.token },
            body: JSON.stringify({
                idCompetition: competitionId,
                idMember: userId
            })
        }).then((result) => {
            console.log(result);
            fetchData();
            setShowAddMember(false);
            setShowAlert(true);
        });
    }

    const handleDownloadFile = () => {
        fetch(`api/file/download/competitions/${competition.id}`,
            {
                headers: { "Authorization": "Bearer " + props.token }
            }).then(response => {
                const filename = response.headers.get('Content-Disposition').split('filename=')[1];
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    a.click();
                    alert("Протокол соревнования загружен!");
                });
            })
    }


    const rowStyle = (row, rowIndex) => {
        var ids = row.members.map(function (member) {
            return member.id;
        });
        if (ids.includes(props.user.id)) {
            return {
                //backgroundColor: "lightgreen",
                border: "3px solid lightgreen"
            };
        }
        return null;
    };

    return <div>
        <BootstrapTable keyField='id' data={data} columns={columns} selectRow={selectRow} rowStyle={rowStyle} />
        {showAddMember && (<div className='m-2'><Button onClick={handleAddMe}>Записаться на соревнование</Button></div>)}
        {showUpload && (<UploadButton competitionId={competition.id} token={props.token} updateData={updateData} />)}
        {showDownload && (<div className='m-2'><Button onClick={handleDownloadFile}>Скачать отчёт о соревновании</Button></div>)}
        {showMemberList && (<div className='m-2'><ModalCompetitonMembers membersList={[competition.id, props.token]} /></div>)}
        {GetAlert()}
    </div>
}
