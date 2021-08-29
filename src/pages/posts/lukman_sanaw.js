import React,{useEffect, useState} from 'react';

import {Button,Input,Drawer} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined,PlusCircleFilled } from '@ant-design/icons';

import LukmanFilter from './lukmanFilter'; 
// import StatusGosh from './StatusGosh';
import LukmanSanawTable from './LukmanSanawTable';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';

const Lukman = () =>{

    const [ data, setData ] = useState([]);
    const [ sany,setSany] = useState(0);

    useEffect(()=>{
        getStatuses();
    },[])

    

    const getStatuses = ()=>{
        // axiosInstance.get("/api/posts").then((data)=>{
        //     console.log(data.data);
        //     setData(data.data);
        //     // setSany(data.data.length);
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
            width={500}
            className='lukman-gosh--drawer'
            title="Status Goş"
            placement="right"
            onClose={()=>Close()}
            visible={state}
            >
              {/* <StatusGosh getStatuses={getStatuses}  onClick={Close}/> */}
            </Drawer>
            
             <div className='lukman--gozleg'>
                <LukmanFilter GoshButton={GoshButton} />
            </div>
            <div className='lukman-Table'>
                <LukmanSanawTable data={[ data, setData]} getStatuses={getStatuses} />
            </div>
        </div>
    );
};

export default Lukman; 