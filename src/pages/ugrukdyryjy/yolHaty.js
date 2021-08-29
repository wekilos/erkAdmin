import React,{useState,useEffect} from 'react';
import { Button,Input,Drawer } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';
import YolHatyGosh from './yolHatyGosh';
import YolHatyGozle from './yolHatyGozle';
import YolHatyTable from './yolHatyTable';
import { axiosInstance } from '../../utils/axiosIntance';

import './yolHaty.css';

const YolHaty = prop =>{

    const [Gosh,setGosh]=useState(false);
    const [sany,setSany] = useState(0);
    const GoshButton = ()=>{
            setGosh(!Gosh);
            console.log(Gosh);
    }    
    const [data, setData] = useState([]);
    // geting all data from database with api
    
    useEffect(()=>{
      getData();
      
    },[])
    
    const getData = ()=>{
      axiosInstance.get("/api/soraglar").then((data)=>{
        console.log(data.data);
        setData(data.data);
        setSany(data.data.length);
      }).catch((err)=>{
        console.log(err);
      })
    }

    return(
        <div className='yolHaty'>
            {/* <div className='yolHaty--top'>
                <h2 className="yolHaty--header">Ýol Hatlar</h2>
                <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='suruji--gosh'>Ýol Haty Döret</Button>
            </div> */}
            {/* {Gosh && <YolHatyGosh onClick={GoshButton}/>} */}
            <Drawer
                width={400}
                className='lukman-table--drawer'
                title="Market Goş"
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={()=>GoshButton()}
                visible={Gosh}
            >
                     <YolHatyGosh getData={getData} onClick={GoshButton}/>

            </Drawer>
            <div className='yolHaty--gozleg'>
                <YolHatyGozle sany={sany} GoshButton={GoshButton}/>
            </div>
            <div className='yolHaty-Table'>
                <YolHatyTable getData={getData} data={[data,setData]}/>
            </div>
        </div>
    );
};

export default YolHaty;