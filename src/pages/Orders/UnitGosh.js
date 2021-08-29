import React,{useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import { axiosInstance } from '../../utils/axiosIntance';


const UnitGosh = props =>{
    const getUnits = props.getUnits;
    const [name,setName] = useState();

    const UnitGosh = ()=>{
        // axiosInstance.post("/api/unit/create",{
        //     name:name
        // }).then((data)=>{
        //     console.log(data.data);
        //     message.success(data.data.msg);
        //     setName();
        //     getUnits();
        // }).catch((err)=>{
        //     console.log(err);
        // })
    }

    return (
        <div className='suruji-yagdayy'>
            <form className='suruji-yagdayy--form' >
            
                <Input value={name} onChange={(e)=>{setName(e.target.value)}}  name='surujiNo' addonBefore='Unit ady'  className='suruji-yagdayy--input' />
         

                <Button onClick={UnitGosh} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Goş</Button>
                <Button onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Cancel</Button>
            </form>
        </div>
    );
};

export default UnitGosh;