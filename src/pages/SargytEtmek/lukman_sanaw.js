import React,{useEffect, useState} from 'react';

import {Button,Input,Drawer,Select} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined,PlusCircleFilled } from '@ant-design/icons';

import LukmanFilter from './lukmanFilter'; 
import StatusGosh from './StatusGosh';
import LukmanSanawTable from './LukmanSanawTable';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';
const {Option} = Select;
const Lukman = () =>{

    const [ data, setData ] = useState([]);
    const [ number,setNumber] = useState(null);
    const [all,setAll ] = useState(null);
    const [select,setSelect ] = useState(null);


    useEffect(()=>{
        const time= setTimeout(() => {
            
           getStatuses();
           }, 500);
       
           return ()=> clearTimeout(time);
    },[all,select,number])

    

    const getStatuses = async()=>{
         await axiosInstance.get("/api/users",{
            params:{
                all:all,
                typeId:select,
                number:number
            }
        }).then((data)=>{
            setData(data.data);
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
    
    return(
        <div className="lukman">
             {/* <div className='lukman--top'>
                <h2 className="lukman--header">Lukman Gözegçiligi</h2>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman--gosh'>Hasaba Al</Button>
            </div> */}
            <Drawer
            width={500}
            className='lukman-gosh--drawer'
            title="Status Goş"
            placement="right"
            onClose={()=>Close()}
            visible={state}
            >
              <StatusGosh getStatuses={getStatuses}  onClick={Close}/>
            </Drawer>
            
             <div className='lukman--gozleg'>
             <div className='lukman-gozleg'>
            <form className='lukman-gozleg--form'>
                <div>
                <Input style={{width:"300px",marginRight:"10px"}} addonBefore='Umumy' value={all} onChange={(e)=>setAll(e.target.value)}/>
                <Input style={{width:"300px",marginRight:"10px"}}  addonBefore='Phone Number' value={number} onChange={(e)=>setNumber(e.target.value)}/>
                <Select
                    style={{width:"250px",marginRight:"10px"}} 
                    placeholder='Status Saýlaň!'
                    showSearch
                 element='select'
                 label="Status"
                 defaultOption='Statusy saýlaň!' name='status'  className='ulanyjy-gozle--input' value={select} onChange={(e)=>{setSelect(e)}}
                >
                    <Option value={null}>Ählisi</Option>
                    <Option value="1">User</Option>
                    <Option value="2">Admin</Option>
                  

               </Select>
                </div>
                <div>
                {/* <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Status goş</Button>  */}

                </div>
                </form>
            
        </div>

            </div>
            <div className='lukman-Table'>
                <LukmanSanawTable data={[ data, setData]} getStatuses={getStatuses} />
            </div>
        </div>
    );
};

export default Lukman; 