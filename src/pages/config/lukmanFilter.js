import React, { useContext } from 'react';

import {Button,Input,Select,DatePicker} from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';

import './lukmanGozleg.css';
import { ErkContext } from '../../context/Condex';
const { RangePicker } = DatePicker;
const {Option}=Select;
const LukmanGozleg = props=>{
    const {dil } = useContext(ErkContext)
    const GoshButton=props.GoshButton;
    return(
        <div className='lukman-gozleg'>
            <form className='lukman-gozleg--form'>
                <div>
                {/* <Input placeholder='Umumy gözleg' className='lukman-gozleg--input' /> */}
                <h1 className='lukman-gozleg--input'> {dil=="tm"?"Habarlaşmak sahypasy":"Страница контактов"} </h1>
                </div>
                <div>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>{dil=="tm"?"Goş":"Добавлять"}</Button>

                </div>
                </form>
            
        </div>
    );
};

export default LukmanGozleg;

