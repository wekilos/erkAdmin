import React,{useState} from 'react';

import {Button,Space,message,Table,Input,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined,PlusCircleFilled } from '@ant-design/icons';

import StatusEdit from './SurujiYagdayy';
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';

const LukmanTable = props=>{

    const [data,setData]=props.data;
    const getConfig = props.getConfig;
    
    const columns = [
        {
            title:"Config No",
            dataIndex:"id"
        },
        {
            title:"Phone Number",
            dataIndex:"phoneNumber",
            
        },
        {
            title:"Mail",
            dataIndex:"mail",
            
        },
        {
            title:"Üýtgetmek we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteUser(record)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger  ><DeleteOutlined /></Button>                 
               
                    </Popconfirm>
                     </Space>
              ),
        }
    ];

    const [edit,setEdit]=useState(false);
    const [maglumat,setMaglumat]=useState([]);
    const [showInfo,setShowInfo]=useState(false);
    const [phoneNumber,setPhoneNumber]=useState();
    const [mail,setMail]=useState();
    const [config_id,setConfig_id ] = useState();
    const DeleteUser = (event)=>{
        console.log(event);
        axiosInstance.delete("/api/config/delete/"+event.id).then((data)=>{
            console.log(data.data);
            message.success(data.data.msg);
            getConfig()
        }).catch((err)=>{
            console.log(err);
        })
       
    }
    const MoreInformation = async(event)=>{
        console.log("maglummat",event);
        setShowInfo(!showInfo);
        await setMaglumat(event);
        
}
const ShowDrawer = async(event)=>{
    setEdit(!edit);
    console.log("maglumat edit",event);
    if(event){
    await setConfig_id(event.id);
    await setMaglumat(event);
    await setPhoneNumber(event.phoneNumber);
    await setMail(event.mail);
    }
}

const saveData = (event)=>{
    setData([
        ...data,
        maglumat
    ]);
    setEdit(false);
};

const EditConfig = (id)=>{
    axiosInstance.patch("/api/config/update/"+id,{
        phoneNumber:phoneNumber,
        mail:mail,
    }).then((data)=>{
        console.log(data.data);
        message.success("successfully");
        getConfig();
        ShowDrawer();
    }).catch((err)=>{
        console.log(err);
    })
}


    return(
        <div className='LukmanTable'>
                <Drawer
                width={500}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    <Input style={{width:"90%"}} value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}} addonBefore='Phone Number'  className='suruji-yagdayy--input' />
                    <Input style={{width:"90%"}} value={mail} onChange={(e)=>{setMail(e.target.value)}} addonBefore='Mail'  className='suruji-yagdayy--input' />
                
                    <Button style={{width:"40%"}} onClick={()=>EditConfig(config_id)} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>üýtget</Button>
                    <Button style={{width:"40%"}} onClick={()=>ShowDrawer()} shape='round' danger type='primary' className='suruji-yagdayy--button'>Goýbolsyn</Button>
            
                </Drawer>
                <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default LukmanTable;