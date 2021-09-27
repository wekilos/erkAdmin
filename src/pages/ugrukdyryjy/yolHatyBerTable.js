import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Space, Modal, Input, Checkbox, Drawer, Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./yolHatyTable.css";
import axios from "axios";
import { axiosInstance,BASE_URL } from "../../utils/axiosIntance";
import { ErkContext } from "../../context/Condex";

const YolHatyTable = (props) => {
  const {dil} = useContext(ErkContext)
  
// geting all data from database with api
  const [data, setData] = props.data;
  console.log("Data:",data)
  const getData = props.getData;
  const getKategoriyas = props.getKategoriyas;

  const columns = [
    {
      title: (dil=="tm"?"No":"Но"),
      dataIndex: "id",
      render:(text,record)=>(
        <div style={{padding:"16px"}}>
          {record.id}
        </div>
      )
    },
    {
      title: (dil=="tm"?"Ady":"Имя"),
      dataIndex: "name_tm",
    },
    {
      title: (dil=="tm"?"Description":"Описание"),
      dataIndex: "description_tm",
    },
    {
      title: (dil=="tm"?"Sene tm":"Дата"),
      dataIndex: "sene_tm",
    },
    {
      title: (dil=="tm"?"Details":"Подробности"),
      dataIndex: "details_tm",
    },
    
    {
      title: (dil=="tm"?"Goşmaça maglumat we Özgertmek":"Дополнительная информация и редактирование"),
      dataIndex: "goshmacha",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowModal(record)}
          >
            {dil=="tm"?"Goşmaça":"Дополнительная инф"}
          </Button>
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowDrawer(record)}
          >
            <EditOutlined />
          </Button>
          {/* <Button
            type="primary"
            shape="round"
            onClick={() => ShowTelefon(record)}
          >
             Kategoriýalar 
          </Button> */}
          {/* <Button
            type="primary"
            shape="round"
            onClick={() => ShowSurat(record)}
          >
             Kategoriýa Gosh 
          </Button> */}
          <Popconfirm
            title={dil=="tm"?"Siz çyndan öçürmek isleýärsinizmi?":"Вы действительно хотите удалить?"}
            onConfirm={() => DeleteMarket(record)}
            // onCancel={cancel}
                        okText={dil=="tm"?"Howa":"да"}
                        cancelText={dil=="tm"?"Ýok":"нет"}
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
  const [ tel, setTel ] = useState(false);
  const [ img, setImg ] = useState(false);
  const [maglumat, setMaglumat] = useState([]);
  const [ phone, setPhone ] = useState([]);
  const [ newPhone, setNewPhone ] = useState();
  const [ name_tm, setName_tm ] = useState();
  const [ name_ru, setName_ru ] = useState();
  const [ name_en, setName_en ] = useState();
  const [ market , setMarket ] = useState();
  /////////////////////////////////////////////////////
  
  ////////////////////////////////////////////////////
  const DeleteMarket = (event) => {
    axiosInstance.delete("/api/shert/delete/"+event.id).then((data)=>{
      console.log(data.data);
      message.success(data.data.msg)
      getData();
    }).catch((err)=>{
      console.log(err)
;    })
    console.log(event);
  };
  
  const ShowSurat = (event) => {
    setImg(!img);
    if(event){console.log("market:",event); setMarket(event)};
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
  
  const KategoriyaGosh = (event)=>{
    console.log(event);
    let market_id = event.MarketId;
    // axiosInstance.post("/api/market/kategoriya/create/"+market_id,{
    //   name_tm:name_tm,
    //   name_ru:name_ru,
    //   name_en:name_en,
    //   active:true
    // }).then((data)=>{
    //   console.log(data.data);
    //   message.success(data.data.msg);
    //   setName_tm();
    //   setName_ru();
    //   setName_en();
    //   getKategoriyas(market_id);
    // }).catch((err)=>{
    //   console.log(err);
    // })
  }

  const saveData = (event) => {
    console.log(event)
    let market_id = event.MarketId;
    // setData([...data, maglumat]);
    setEdit(false);
    axiosInstance.patch("/api/shert/update/"+event.id,{
      name_tm:maglumat.name_tm,
      name_ru:maglumat.name_ru,
      description_tm:maglumat.description_tm,
      description_ru:maglumat.description_ru,
      sene_tm:maglumat.sene_tm,
      sene_ru:maglumat.sene_ru,
      details_tm:maglumat.details_tm,
      details_ru:maglumat.details_ru,
    }).then((data)=>{
      message.success(data.data.msg)
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
        title={dil=="tm"?"Goşmaça":"Дополнительная информация"}
        placement="right"
        onClose={() => ShowModal()}
        visible={visible}
      >
        {maglumat && (
          <table border="1" className="goshmacha--ul">
            <tr  className="modalLi" key={maglumat && maglumat.id}>
              <td>ID </td>
              <td>{maglumat && maglumat.id} </td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.name_tm}>
              <td>{dil=="tm"?"Ady tm":"Имя tm"} </td>
               {maglumat &&  maglumat.name_tm}
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.name_ru}>
              <td>{dil=="tm"?"Ady ru":"Имя ru"} </td>
              <td>{maglumat && maglumat.name_ru}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.description_tm}>
              <td>{dil=="tm"?"Düşündirilişi tm":"Описание tm"} </td>
              <td>{maglumat && maglumat.description_tm}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.description_ru}>
              <td>{dil=="tm"?"Düşündirilişi ru":"Описание ru"} </td>
              <td>{maglumat && maglumat.description_ru}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.sene_tm}>
              <td>{dil=="tm"?"Sene tm":"Дата tm"} </td>
              <td>{maglumat && maglumat.sene_tm}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.sene_ru}>
              <td>{dil=="tm"?"Sene ru":"Дата ru"} </td>
              <td>{maglumat && maglumat.sene_ru}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.details_tm}>
              <td>{dil=="tm"?"Giňişleýin tm":"Подробности tm"} </td>
              <td>{maglumat && maglumat.details_tm}</td>
            </tr>
            <tr className="modalLi" key={maglumat && maglumat.details_ru}>
              <td>{dil=="tm"?"Giňişleýin ru":"Подробности ru"} </td>
              <td>{maglumat && maglumat.details_ru}</td>
            </tr>
            
            
          </table>
          
        )}
        
      </Drawer>
      
      <Drawer
        width={500}
        className="lukman-table--drawer"
        title={dil=="tm"?"Üýtgetmeler":"Редактирование"}
        placement="right"
        onClose={() => ShowDrawer()}
        visible={edit}
        footer={
          <div className="DrawerButtons">
            <Button
              className="DrawerButton"
              key="back"
              shape="round"
              danger
              type="primary"
              onClick={()=>ShowDrawer()}
            >
              {dil=="tm"?"Goý bolsun":"Отмена"}
            </Button>
            <Button
              className="DrawerButton"
              key="submit"
              shape="round"
              type="primary"
              onClick={()=>saveData(maglumat)}
            >
              {dil=="tm"?"Üýtget":"Редактировать"} <EditOutlined />
            </Button>
          </div>
        }
      >
        <div className="yolHatyTable--uytgetmeler">
         
          <Input
            style={{ margin: "10px 0" }}
            addonBefore={dil=="tm"?"Ady tm":"Имя tm"}
            className="suruji-uytget--input"
            type="text"
            name="name_tm"
            value={maglumat && maglumat.name_tm}
            onChange={inputChangeHandler}
          />
          <Input
            style={{ margin: "10px 0" }}
            addonBefore={dil=="tm"?"Ady ru":"Имя ru"}
            className="suruji-uytget--input"
            name="name_ru"
            value={maglumat && maglumat.name_ru}
            onChange={inputChangeHandler}
          />
          <Input
            style={{ margin: "10px 0" }}
            addonBefore={dil=="tm"?"Düşündirilişi tm":"Описание tm"}
            className="suruji-uytget--input"
            name="description_tm"
            value={maglumat && maglumat.description_tm}
            onChange={inputChangeHandler}
          />
          <Input
            style={{ margin: "10px 0" }}
            addonBefore={dil=="tm"?"Düşündirilişi ru":"Описание ru"}
            className="suruji-uytget--input"
            name="description_ru"
            value={maglumat && maglumat.description_ru}
            onChange={inputChangeHandler}
          />
          <Input
            style={{ margin: "10px 0" }}
            addonBefore={dil=="tm"?"Sene tm":"Дата tm"}
            className="suruji-uytget--input"
            name="sene_tm"
            value={maglumat && maglumat.sene_tm}
            onChange={inputChangeHandler}
          />
          <Input
            style={{ margin: "10px 0" }}
            addonBefore={dil=="tm"?"Sene ru":"Дата ru"}
            className="suruji-uytget--input"
            name="sene_ru"
            value={maglumat && maglumat.sene_ru}
            onChange={inputChangeHandler}
          />
          <Input
            style={{ margin: "10px 0" }}
            addonBefore={dil=="tm"?"Giňişleýin tm":"Подробности tm"}
            className="suruji-uytget--input"
            name="details_tm"
            value={maglumat && maglumat.details_tm}
            onChange={inputChangeHandler}
          />
          <Input
            style={{ margin: "10px 0" }}
            addonBefore={dil=="tm"?"Giňişleýin ru":"Подробности ru"}
            className="suruji-uytget--input"
            name="details_ru"
            value={maglumat && maglumat.details_ru}
            onChange={inputChangeHandler}
          />
          
        </div>
      </Drawer>

      
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default YolHatyTable;
