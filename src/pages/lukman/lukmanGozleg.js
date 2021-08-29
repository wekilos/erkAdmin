import React from 'react';

import {Button,Input} from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';

import './lukmanGozleg.css';

const LukmanGozleg = props=>{
    const GoshButton=props.GoshButton;
    return(
        <div className='lukman-gozleg'>
            <form className='lukman-gozleg--form'>
                <div>
                <h2 style={{margin:"10px 10px"}}>Admin Haryt Unit page</h2>
                {/* <Input placeholder = 'Umumy Gözleg' className='lukman-gozleg--input' /> */}
                {/* <Input addonBefore='Sene' type='date' className='lukman-gozleg--input' /> */}
                </div>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Unit Goş</Button>
            </form>
            
        </div>
    );
};

export default LukmanGozleg;

