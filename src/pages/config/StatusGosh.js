import React,{useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import TextArea from 'antd/lib/input/TextArea';
import { axiosInstance } from '../../utils/axiosIntance';

const Option = {Select};

const SurujiYagdayy = props =>{
    
    const getData = props.getConfig;
    const [phoneNumber,setPhoneNumber]=useState();
    const [mail,setMail]=useState();
    
    


    const EditStatus = async()=>{
        axiosInstance.post("/api/config/create",{
          phoneNumber:phoneNumber,
          mail:mail,
        }).then((data)=>{
          message.success("successfully");
          message.success(data.data.msg);
          getData();
          props.onClick();
          setPhoneNumber("");
          setMail("");
        }).catch((err)=>{
          console.log(err);
        })
    }

    return (
        <div
            className='suruji-yagdayy'>
            <form className='suruji-yagdayy--form' >
            <Input style={{width:"90%"}} value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}} addonBefore='Phone Number'  className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={mail} onChange={(e)=>{setMail(e.target.value)}} addonBefore='Mail'  className='suruji-yagdayy--input' />
            
                
                <Button style={{width:"40%"}} onClick={EditStatus} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Goş</Button>
                <Button style={{width:"40%"}} onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Goýbolsyn</Button>
            </form>
        </div>
    );
};

export default SurujiYagdayy;