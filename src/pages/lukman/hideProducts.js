
import React,{useEffect, useState} from 'react';

import {Button,Input,Drawer,Select} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined,PlusCircleFilled } from '@ant-design/icons';

import LukmanFilter from './lukmanFilter'; 
import SurujiYagdayy from './SurujiYagdayy';
import HideProductsTable from './hideProductsTable';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';
const {Option}=Select;


const Lukman = () =>{

    const [ markets,setMarkets] = useState([]);
    const [ kategoriyalar,setKategoriyalar] = useState([]);
    const [ products, setProducts] = useState([]);

    const [all,setAll] = useState();
    const [market_id,setMarket_id] = useState();
    const [kategoriya_id, setKategoriya_id] = useState();
    const [is_sale, setIs_sale] = useState(); 

    useEffect(()=>{
        getMarkets();
        getProducts();
    },[])

    useEffect(()=>{
        const time = setTimeout(() => {
            getProducts();
          }, 500);
        return ()=> clearTimeout(time);
    },[all,market_id,kategoriya_id,is_sale])

    const getProducts = ()=>{
        // axiosInstance.get("/api/products/disActive",{
        //     params:{
        //         all:all,
        //         market_id:market_id, 
        //         kategoriya_id:kategoriya_id,
        //         is_sale:is_sale,
        //     }
        // }).then((data)=>{
        //         console.log(data.data);
        //         setProducts(data.data);
        // }).catch((err)=>{
        //     console.log(err);
        // })
    }

    const getMarkets = ()=>{
        // axiosInstance.get("/api/markets").then((data)=>{
        //     console.log(data.data);
        //     setMarkets(data.data);
        // }).catch((err)=>{
        //     console.log(err);
        // })
    }

    useEffect(()=>{
        getKategoriyas()
    },[market_id])

    const getKategoriyas = ()=>{
        // axiosInstance.get("/api/market/kategoriya/"+market_id).then((data)=>{
        //     setKategoriyalar(data.data);
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
            width={600}
            className='lukman-gosh--drawer'
            title="Haryt Goş"
            placement="right"
            onClose={()=>Close()}
            visible={state}
            >
            <SurujiYagdayy getProducts={getProducts} markets={[ markets,setMarkets]} onClick={Close}/>
            </Drawer>
            
             <div className='lukman--gozleg'>
                    <form className='lukman-gozleg--form'>
                        <div>
                        <Input value={all} onChange={(e)=>setAll(e.target.value)} placeholder='Umumy gözleg' className='lukman-gozleg--input' />
                        <Select onChange={(v)=>setMarket_id(v)} placeholder="Ählisi"  className='lukman-gozleg--input'>
                            <Option value={null}>Ählisi</Option>
                            {
                                markets.map((market)=>{
                                    return <Option value={market.id}>{market.name_tm}</Option>
                                })
                            }
                        </Select>
                        <Select onChange={(v)=>setKategoriya_id(v)} placeholder="Ählisi" className='lukman-gozleg--input'>
                            <Option value={null}>Ählisi</Option>
                            {
                                kategoriyalar.map((kategoriya)=>{
                                    return <Option value={kategoriya.id}>{kategoriya.name_tm}</Option>
                                })
                            }
                        </Select>
                        <Select onChange={(v)=>setIs_sale(v)} placeholder="Ählisi" className='lukman-gozleg--input'>
                            <Option value={null}>Ählisi</Option>
                            <Option value={true}>Skidkada</Option>
                            <Option value={false}>Skidka däl</Option>
                        </Select>
                        </div>
                        <div>
                        <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Haryt goş</Button>

                        </div>
                        </form>
 
            </div>
            <div className='lukman-Table'>
                <HideProductsTable data={[ products, setProducts]} getProducts={getProducts} />
            </div>
        </div>
    );
};

export default Lukman; 