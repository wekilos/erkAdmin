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
                <h1 className='lukman-gozleg--input'> Admin Config page </h1>
                </div>
                <div>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Goş</Button>

                </div>
                </form>
            
        </div>
    );
};

export default LukmanGozleg;

