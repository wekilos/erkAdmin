import React,{useState} from 'react';

import {Button,Space,message,Table,Modal,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';

import UnitEdit  from './UnitEdit';
import './LukmanTable.css';
import { axiosInstance } from '../../utils/axiosIntance';

const LukmanTable = props=>{

    const [data,setData]=props.data;
    const getUnits = props.getUnits;

    const columns = [
        {
            title:"Unit No",
            dataIndex:"id"
        },
        {
            title:"Unit ady",
            dataIndex:"name"
        },
        {
            title:"Üýygetmek we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteUnit(record)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>                 

                    </Popconfirm>
                </Space>
              ),
        }
    ];

    const [edit,setEdit]=useState(false);
    const [maglumat,setMaglumat]=useState();
    const DeleteUnit = (event)=>{
        console.log(event);
        // axiosInstance.delete("/api/unit/delete/"+event.id).then((data)=>{
        //     message.success(data.data.msg);
        //     getUnits();
        // }).catch((err)=>{
        //     console.log(err);
        // })
       
    }
    
const ShowDrawer =(event)=>{
    setEdit(!edit);
    console.log(event);
    setMaglumat();
    setMaglumat(event);
    
}




    return(
        <div className='LukmanTable'>
           
                <Drawer
                width={400}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    <UnitEdit onClick={ShowDrawer} unit={maglumat} getUnits={getUnits}/>
                </Drawer>
                <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default LukmanTable;