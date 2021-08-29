import React,{useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import TextArea from 'antd/lib/input/TextArea';
import { axiosInstance } from '../../utils/axiosIntance';

const Option = {Select};

const SurujiYagdayy = props =>{
    
    const getConfig = props.getConfig;
    const [maglumat,setMaglumat] = props.mag;
    console.log(maglumat)
    const [delivery_price,setDelivery_price]=useState();
    const [online_hire,setOnline_hire]=useState();
    const [phone,setPhone]=useState();
    const [start_time, setStart_time] = useState();
    const [end_time, setEnd_time] = useState();
    const [currency_exchange,setCurrency_exchange] = useState();
    
    useEffect(()=>{
      setDelivery_price(maglumat && maglumat.delivery_price)
      setCurrency_exchange(maglumat && maglumat.currency_exchange);
      setPhone(maglumat && maglumat.footer_phone_number)
      setStart_time(maglumat && maglumat.work_start_time)
      setEnd_time(maglumat && maglumat.work_end_time);
    },[maglumat])
    
    const EditStatus = async()=>{


      console.log("config_id",maglumat.id)
      axiosInstance.patch("/api/config/update/"+maglumat.id,{
        delivery_price:delivery_price, 
        currency_exchange:currency_exchange, 
        footer_phone_number:phone,  
        work_start_time:start_time, 
        work_end_time:end_time
      }).then((data)=>{
        console.log(data.data);
        message.success(data.data.msg);
        getConfig();
        // setName_tm();
        // setName_ru();
        // setName_en();
      }).catch((err)=>{
        console.log(err);
      })
    }

    return (
        <div
            className='suruji-yagdayy'>
            <form className='suruji-yagdayy--form' >
            <Input style={{width:"90%"}} value={delivery_price} onChange={(e)=>{setDelivery_price(e.target.value)}} addonBefore='Dastawka Baha'  className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={currency_exchange} onChange={(e)=>{setCurrency_exchange(e.target.value)}} addonBefore='Walýuta'  className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={phone} onChange={(e)=>{setPhone(e.target.value)}} addonBefore='Footer Telefon'  className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={start_time} onChange={(e)=>{setStart_time(e.target.value)}} addonBefore='Başlaýan wagty'  className='suruji-yagdayy--input' />
            <Input style={{width:"90%"}} value={end_time} onChange={(e)=>{setEnd_time(e.target.value)}} addonBefore='Gutarýan wagty'  className='suruji-yagdayy--input' />
           
                
                <Button onClick={EditStatus} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Üýtget</Button>
                <Button onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Goýbolsyn</Button>
            </form>
        </div>
    );
};

export default SurujiYagdayy;