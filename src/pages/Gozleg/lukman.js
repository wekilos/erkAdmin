import React,{useEffect, useState} from 'react';

import {Button,Input,Drawer,Select} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined } from '@ant-design/icons';

import LukmanGozleg from './lukmanGozleg'; 
import UnitGosh from './UnitGosh';
import LukmanTable from './LukmanTable';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';
const {Option} = Select;

const Lukman = () =>{

    const [units,setUnits] = useState([]);
            const [ statuses,setStatuses] = useState([]);
            const [ statusId, setStatusId] = useState(null);
            const [ all, setAll ] = useState(null);
            const [ yol, setYol ] = useState(null);

    useEffect(()=>{
        const time = setTimeout(() => {
            getOrders();
            console.log(all,statusId)
          }, 500);
        return ()=> clearTimeout(time);
    },[all,statusId,yol]);

    

    const getOrders = ()=>{
        axiosInstance.get("/api/gozlegdakiler",{
            params: {
              all: all,
              statusId:statusId,
              yol:yol
            }
          }).then((data)=>{
            console.log(data.data);
            setUnits(data.data)
        }).catch((err)=>{
            console.log(err);
        })
    }

    const [Gosh,setGosh]=useState(false);
    const [state,setState] = useState(false)
    const GoshButton = ()=>{
        setState(true);
            setGosh(true);
            console.log(Gosh);
    }
    const Close=()=>{
        setState(false)
        setGosh(false);
         }

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
        <div className="lukman">
             {/* <div className='lukman--top'>
                <h2 className="lukman--header">Lukman Gözegçiligi</h2>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman--gosh'>Hasaba Al</Button>
            </div> */}
            <Drawer
            width={400}
            className='lukman-gosh--drawer'
            title="Unit Goş"
            placement="right"
            // closable={true}
            onClose={()=>Close()}
            visible={state}
            style={{zIndex:"100"}}
            >
              <UnitGosh getOrders={getOrders}  onClick={Close}/>
            </Drawer>
            
             <div className='lukman--gozleg'>
             <div className='lukman-gozleg'>
            <form className='lukman-gozleg--form'>
                <div>
                <Input onChange={(e)=>{setAll(e.target.value)}} placeholder = 'Umumy Gözleg' className='lukman-gozleg--input' />
                {/* <Select
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
                    <Option value={null}>Ählisi</Option>
                    <Option value="1" >Gelmegine garaşylýar</Option>
                    <Option value="2" >Ammara geldi</Option>
                    <Option value="3" >Ýüküňiz ugradyldy!</Option>
                    <Option value="4" >Ýolda</Option>
                    <Option value="5" >Türkmenistanyň ammaryna geldi</Option>
                    <Option value="6" >Gowşurma nokadyna ugradyldy</Option>
                            
                </Select> */}
                {/* <Input addonBefore='Sene' type='date' className='lukman-gozleg--input' /> */}
                </div>
                {/* <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Unit Goş</Button> */}
            </form>
            
        </div>
            </div>
            <div className='lukman-Table'>
                <LukmanTable getOrders={getOrders}  data={[units,setUnits]}/>
            </div>
        </div>
    );
};

export default Lukman; 