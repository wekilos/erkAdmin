import React,{useContext, useEffect, useState} from 'react';

import {Button,Input,Drawer,Select} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined } from '@ant-design/icons';

import LukmanGozleg from './lukmanGozleg'; 
import UnitGosh from './UnitGosh';
import LukmanTable from './LukmanTable';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';
import { ErkContext } from '../../context/Condex';
const {Option} = Select;

const Lukman = () =>{

        const {dil} = useContext(ErkContext)
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
        axiosInstance.get("/api/sargytlar",{
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
                <Input onChange={(e)=>{setAll(e.target.value)}} placeholder = {dil=="tm"?'Umumy Gözleg':"Общий поиск"} className='lukman-gozleg--input' />
                <Select
                    className='lukman-gozleg--input'
                    showSearch
                    // style={{ width: 200 }}
                    placeholder={dil=="tm"?"Sargyt Status Saýla":"Выбрать статус заказа"}
                    optionFilterProp="children"
                    onChange={(value)=>setStatusId(value)}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value={null}>{dil=="tm"?"Ählisi":"Все"}</Option>
                    <Option value="1" >{dil=="tm"?"Gelmegine garaşylýar":"Ожидается к прибытью"}</Option>
                    <Option value="2" >{dil=="tm"?"Ammara geldi":"Груз прибыл на склад"}</Option>
                    <Option value="3" >{dil=="tm"?"Ýüküňiz ugradyldy":"Груз отправлен"}</Option>
                    <Option value="4" >{dil=="tm"?"Ýolda":"В пути"}</Option>
                    <Option value="5" >{dil=="tm"?"Türkmenistanyň gümrügine geldi":"Прибыл на таможню Туркменистана"}</Option>
                    <Option value="6" >{dil=="tm"?"Gowşurma nokadyna ugradyldy":"Отправлен в пункт доставки"}</Option>
                            
                </Select>
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