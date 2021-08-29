import React from 'react';

import {Button,Input,Select,DatePicker} from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';

import './lukmanGozleg.css';
const { RangePicker } = DatePicker;
const {Option}=Select;
const LukmanGozleg = props=>{
    const GoshButton=props.GoshButton;
    return(
        <div className='lukman-gozleg'>
            <form className='lukman-gozleg--form'>
                <div>
                {/* <Input placeholder='Umumy gözleg' className='lukman-gozleg--input' /> */}
                <h2 style={{margin:"10px 10px"}}>Admin Zakazlar Status page</h2>
                
                </div>
                <div>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Status goş</Button>

                </div>
                </form>
            
        </div>
    );
};

export default LukmanGozleg;

