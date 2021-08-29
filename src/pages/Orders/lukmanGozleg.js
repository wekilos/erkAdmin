import React, { useEffect, useState } from 'react';

import {Button,Input,Select} from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';

import './lukmanGozleg.css';
import { axiosInstance } from '../../utils/axiosIntance';
const Option = {Select}
const LukmanGozleg = props=>{
    const GoshButton=props.GoshButton;
    const getOrders= props.getOrders;
    const [ statuses,setStatuses] = useState([]);
    const [ statusId, setStatusId] = useState();
    const [ all, setAll ] = useState();

    useEffect(()=>{
        getOrders(all,statusId);
    },[all,statusId])

    useEffect(()=>{
        getStatuses();
    },[])
    const getStatuses = ()=>{
        // axiosInstance.get("/api/statuses").then((data)=>{
        //     setStatuses(data.data);
        // }).catch((err)=>{
        //     console.log(err);
        // })
    }

    return(
        <div className='lukman-gozleg'>
            <form className='lukman-gozleg--form'>
                <div>
                <Input onChange={(e)=>{setAll(e.target.value)}} placeholder = 'Umumy Gözleg' className='lukman-gozleg--input' />
                <Select
                    className='lukman-gozleg--input'
                    showSearch
                    // style={{ width: 200 }}
                    placeholder="Zakaz Status Saýla"
                    optionFilterProp="children"
                    onChange={(value)=>setStatusId(value)}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="0">Ählisi</Option>
                    {
                    statuses.map((status)=>{
                        return <Option value={status.id}>{status.name_tm}</Option>
                    })
                    }
                </Select>
                {/* <Input addonBefore='Sene' type='date' className='lukman-gozleg--input' /> */}
                </div>
                {/* <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Unit Goş</Button> */}
            </form>
            
        </div>
    );
};

export default LukmanGozleg;

