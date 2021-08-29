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
                <Input placeholder='Umumy gözleg' className='lukman-gozleg--input' />
                <Select defaultValue="all" className='lukman-gozleg--input'>
                    <Option value='all'>Ählisi</Option>
                    <Option value="healthy">Serpay</Option>
                    <Option value="unhealthy">Çhynar</Option>
                </Select>
                <Select defaultValue="all" className='lukman-gozleg--input'>
                    <Option value='all'>Ählisi</Option>
                    <Option value="healthy">suwlar</Option>
                    <Option value="unhealthy">iymitler</Option>
                </Select>
                </div>
                <div>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Haryt goş</Button>

                </div>
                </form>
            
        </div>
    );
};

export default LukmanGozleg;

