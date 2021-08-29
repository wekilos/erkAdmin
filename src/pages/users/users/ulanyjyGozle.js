import React,{useState,useEffect} from 'react';
import {Input,Button,Select} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined,SearchOutlined } from '@ant-design/icons';

import './ulanyjyGozle.css';

const UlanyjyGozle = (props)=>{
    const GoshButton=props.GoshButton;
    const {Option}=Select;
    const [select,setSelect]=useState(null);
useEffect(()=>{
    alert(select);
},[])





    return(
        <div className='ulanyjy-gozle'>
            <form className='ulanyjy-gozle--form'>
                <div>
                <Input className='ulanyjy-gozle--input' addonBefore='Ady Familýasy'/>
                <Input className='ulanyjy-gozle--input' addonBefore='Ulanyjy Ady'/>
                <Select
                    placeholder='Status Saýlaň!'
                    showSearch
                 element='select'
                 label="Status"
                 defaultOption='Statusy saýlaň!' name='status'  className='ulanyjy-gozle--input' value={select} onChange={(e)=>{setSelect(e)}}
                >
                    <Option value='dispetcher' >Dispetçer</Option>
                    <Option value='mehanik' >Mehanik</Option>
                    <Option value='lukman'>Lukman</Option>

               </Select>
               </div>
               <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='ulanyjy-gozle--button'> Ulanyjy Goş </Button>
            </form>
        </div>
    );
};

export default UlanyjyGozle;