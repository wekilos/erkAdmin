import React,{useContext, useEffect, useState} from 'react';

import {Button,Input,Drawer,Select} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined } from '@ant-design/icons';

import LukmanGozleg from './lukmanGozleg'; 
import UnitGosh from './UnitGosh';
import LukmanTable from './gowshurlanTable';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';
import { ErkContext } from '../../context/Condex';
const {Option} = Select;

const Lukman = () =>{

    const {dil} = useContext(ErkContext)
    const [units,setUnits] = useState([]);
            const [ statuses,setStatuses] = useState([]);
            const [ statusId, setStatusId] = useState();
            const [ all, setAll ] = useState(null);

    useEffect(()=>{
        const time = setTimeout(() => {
            getOrders();
          }, 500);
        return ()=> clearTimeout(time);
    },[all]);

    

    const getOrders = ()=>{
        axiosInstance.get("/api/sargytlar/delivered",{
            params: {
              all: all
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
                <Input onChange={(e)=>{setAll(e.target.value)}} placeholder = {dil=="tm"?'Umumy Gözleg':"Общий поиск"} className='lukman-gozleg--input' />
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
                    <Option value="0">Ählisi</Option>
                    {
                    statuses.map((status)=>{
                        return <Option value={status.id}>{status.name_tm}</Option>
                    })
                    }
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