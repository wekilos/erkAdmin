import React,{useEffect, useState} from 'react';

import {Button,Input,Drawer} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined } from '@ant-design/icons';

import LukmanGozleg from './lukmanGozleg'; 
import UnitGosh from './UnitGosh';
import LukmanTable from './LukmanTable';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';

const Lukman = () =>{

    const [units,setUnits] = useState([]);

    useEffect(()=>{
        // getUnits();
    },[]);

    const getUnits = ()=>{
        // axiosInstance.get("/api/units").then((data)=>{
        //     console.log(data.data);
        //     setUnits(data.data)
        // }).catch((err)=>{
        //     console.log(err);
        // })
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
            width={400}
            className='lukman-gosh--drawer'
            title="Unit Goş"
            placement="right"
            // closable={true}
            onClose={()=>Close()}
            visible={state}
            style={{zIndex:"100"}}
            >
              <UnitGosh getUnits={getUnits}  onClick={Close}/>
            </Drawer>
            
             <div className='lukman--gozleg'>
                <LukmanGozleg  GoshButton={GoshButton}/>
            </div>
            <div className='lukman-Table'>
                <LukmanTable getUnits={getUnits}  data={[units,setUnits]}/>
            </div>
        </div>
    );
};

export default Lukman; 