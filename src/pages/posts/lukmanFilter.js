import React from 'react';

import {Button,Input,Select,DatePicker} from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';

import './lukmanGozleg.css';
const { RangePicker } = DatePicker;
const {Option}=Select;
const LukmanGozleg = props=>{
    const GoshButton=props.GoshButton;
    let sany;
    if(props.sany<=2){
        sany=true;
    }else{sany=false}
    return(
        <div className='lukman-gozleg'>
            <form className='lukman-gozleg--form'>
                <div>
                {/* <Input placeholder='Umumy gözleg' className='lukman-gozleg--input' /> */}
                <h2 style={{margin:"10px 10px"}}>Admin Post page</h2>
                </div>
                <div>
                {sany && <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Status goş</Button> }

                </div>
                </form>
            
        </div>
    );
};

export default LukmanGozleg;

