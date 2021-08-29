import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Input, Checkbox, Drawer, Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./yolHatyTable.css";
import axios from "axios";
import { axiosInstance,BASE_URL } from "../../utils/axiosIntance";

const YolHatyTable = (props) => {
  
// geting all data from database with api
  const [data, setData] = props.data;
  const getData = props.getData;

  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "Sorag Ady",
      dataIndex: "name_tm",
    },
    {
      title: "Sorag",
      dataIndex: "question_tm",
    },
    {
      title: "Jogap",
      dataIndex: "description_tm",
    },
    {
      title: "Goşmaça maglumat we Özgertmek",
      dataIndex: "goshmacha",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowModal(record)}
          >
            Goşmaça
          </Button>
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowDrawer(record)}
          >
            <EditOutlined />
          </Button>
            <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => DeleteMarket(record.id)}
            // onCancel={cancel}
            okText="Howwa"
            cancelText="Ýok"
          >
             <Button
              type="primary"
              shape="round"
              danger
              // onClick={}
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
         
        </Space>
      ),
    },
  ];

  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [maglumat, setMaglumat] = useState([]);
  const [ name_tm, setName_tm ] = useState();
  const [ name_ru, setName_ru ] = useState();
  const [ question_tm, setQuestion_tm ] = useState();
  const [ question_ru, setQuestion_ru ] = useState();
  const [ description_tm, setDescription_tm ] = useState();
  const [ description_ru, setDescription_ru ] = useState();
  /////////////////////////////////////////////////////
  
  ////////////////////////////////////////////////////
  const DeleteMarket = (event) => {
    axiosInstance.delete("/api/sorag/delete/"+event).then((data)=>{
      console.log(data.data);
      message.success(data.data.msg)
      getData();
    }).catch((err)=>{
      console.log(err)
;    })
    console.log(event);
  };
  
  
  
 
 
  const ShowModal = (event) => {
    setVisible(!visible);
    console.log("goshmacha",event);
    setMaglumat([]);
    setMaglumat(event);
  };
  const ShowDrawer = (event) => {
    setEdit(!edit);
    setVisible(false);
    console.log(event);
    setMaglumat([]);
    setMaglumat(event);
    if(event){
    setName_tm(event.name_tm);
    setName_ru(event.name_ru);
    setQuestion_tm(event.question_tm);
    setQuestion_ru(event.question_ru);
    setDescription_tm(event.description_tm);
    setDescription_ru(event.description_ru);
    }
  };
  const inputChangeHandler = (event) => {
    console.log(event.target.name);
    let name = event.target.name;
    let value = event.target.value;

    setMaglumat({
      ...maglumat,
      [name]: value,
    });
  };
  
  const saveData = (event) => {
    console.log(event);
    setEdit(false);
    axiosInstance.patch("/api/sorag/update/"+event.id,{
      name_tm:name_tm,
      name_ru:name_ru,
      description_tm:description_tm,
      description_ru:description_ru,
      question_tm:question_tm,
      question_ru:question_ru,
    }).then((data)=>{
      console.log(data.data);
      getData();
    }).catch((err)=>{
      console.log(err);
    })
  
  };

  return (
    <div className="yolHatyTable">
      <Drawer
        width={500}
        className="lukman-table--drawer"
        title="Goşmaça"
        placement="right"
        onClose={() => ShowModal()}
        visible={visible}
      >
        {maglumat && (
          <table border="1" className="goshmacha--ul" style={{width:"95%",margin:"0 auto"}}>
            <tr style={{height:"35px"}} className="modalLi" key={maglumat && maglumat.id}>
              <td>ID </td>
              <td>{maglumat && maglumat.id} </td>
            </tr>
            <tr style={{height:"35px"}} className="modalLi" key={maglumat && maglumat.name_tm}>
              <td>Name_tm </td>
              {maglumat && maglumat.name_tm}
            </tr>
            <tr style={{height:"35px"}} className="modalLi" key={maglumat && maglumat.name_ru}>
              <td>Name_ru </td>
              <td>{maglumat && maglumat.name_ru}</td>
            </tr>
            <tr style={{height:"35px"}} className="modalLi" key={maglumat && maglumat.question_tm}>
              <td>Sorag_tm </td>
              {maglumat && maglumat.question_tm}
            </tr>
            <tr style={{height:"35px"}} className="modalLi" key={maglumat && maglumat.question_ru}>
              <td>Sorag_ru </td>
              <td>{maglumat && maglumat.question_ru}</td>
            </tr>
            <tr style={{height:"35px"}} className="modalLi" key={maglumat && maglumat.description_tm}>
              <td>Jogap_tm </td>
              {maglumat && maglumat.description_tm}
            </tr>
            <tr style={{height:"35px"}} className="modalLi" key={maglumat && maglumat.description_ru}>
              <td>Jogap_ru </td>
              <td>{maglumat && maglumat.description_ru}</td>
            </tr>
            
          </table>
          
        )}
        
      </Drawer>
      
      <Drawer
        width={500}
        className="lukman-table--drawer"
        title="Üýtgetmeler"
        placement="right"
        onClose={() => ShowDrawer()}
        visible={edit}
        
      >
        <div className="yolHatyTable--uytgetmeler">
         
          <Input
            style={{ marginTop: "10px" }}
            addonBefore="Ady tm"
            className="Sorag-Input"
            type="text"
            name="name_tm"
            value={name_tm}
            onChange={(e)=>setName_tm(e.target.value)}
          />
          <Input
            style={{ marginTop: "10px" }}
            addonBefore="Ady ru"
            className="Sorag-Input"
            name="name_ru"
            value={name_ru}
            onChange={(e)=>setName_ru(e.target.value)}
          />
          <Input
            style={{ marginTop: "10px" }}
            addonBefore="Sorag tm"
            className="Sorag-Input"
            name="question_tm"
            value={question_tm}
            onChange={(e)=>setQuestion_tm(e.target.value)}
          />
          <Input
            style={{ marginTop: "10px" }}
            addonBefore="Sorag ru"
            name="question_ru"
            className="Sorag-Input"
            value={question_ru}
            onChange={(e)=>setQuestion_ru(e.target.value)}
          />
         
          <Input
            style={{ marginTop: "10px" }}
            addonBefore="Jogap tm"
            name="description_tm"
            className="Sorag-Input"
            value={description_tm}
            onChange={(e)=>setDescription_tm(e.target.value)}
          />
          <Input
            style={{ marginTop: "10px" }}
            addonBefore="Jogap ru "
            name="description_ru"
            className="Sorag-Input"
            value={description_ru}
            onChange={(e)=>setDescription_ru(e.target.value)}
          />
        </div>
        <div style={{marginTop:"50px",width:"100%",display:"flex",justifyContent:"space-evenly"}}>
            <Button
              style={{width:"35%"}}
              key="back"
              shape="round"
              danger
              type="primary"
              onClick={()=>ShowDrawer()}
            >
              Goý bolsun
            </Button>
            <Button
              style={{width:"35%"}}
              key="submit"
              shape="round"
              type="primary"
              onClick={()=>saveData(maglumat)}
            >
              Üýtget <EditOutlined />
            </Button>
          </div>
      </Drawer>
      
     
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default YolHatyTable;
