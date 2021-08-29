import React,{useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import TextArea from 'antd/lib/input/TextArea';
import { axiosInstance } from '../../utils/axiosIntance';

const Option = {Select};

const SurujiYagdayy = props =>{
    
    const getProducts = props.getProducts

    const [data,setData]=useState();
    const [markets,setMarkets] = props.markets;
    const [units,setUnits] = useState([]);
    const [ kategoriya, setKategoriya ] = useState([]);
    const [ market_id , setMarket_id ] = useState();
    const [ kategoriya_id, setKategoriya_id] = useState();
    const [unit_id, setUnit_id]=useState();
    const [name_tm,setName_tm] = useState();
    const [name_ru,setName_ru] = useState();
    const [name_en,setName_en] = useState();
    const [price,setPrice] = useState();
    const [sale_price,setSale_price] = useState();
    const [step,setStep] = useState();
    const [article_tm,setArticle_tm] = useState();
    const [article_ru,setArticle_ru] = useState();
    const [article_en,setArticle_en] = useState();
    const [description_tm,setDescription_tm] = useState();
    const [description_ru,setDescription_ru] = useState();
    const [description_en,setDescription_en] = useState();
    const [sale_until,setSale_until] = useState();
    const [total_amount,setTotal_amount] = useState();
    const [is_valyuta,setIs_valyuta] = useState(false);
    const [is_new, setIs_new] = useState(false);
    const [search,setSearch] = useState();
    const [surat,setSurat] = useState();
    

    // creating product
    const CreateProduct = async()=>{
      
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      });
      if(surat){
            setData({
            img_name:surat.name,
            img:await toBase64(surat),
            name_tm:name_tm,
            name_ru:name_ru,
            name_en:name_en,
            price:price,
            // sale_price:sale_price,
            // sale_until:sale_until,
            step:step,
            article_en:article_en,
            article_ru:article_ru,
            article_tm:article_tm,
            description_en:description_en,
            description_ru:description_ru,
            description_tm:description_tm,
            is_sale:false,
            is_active:true,
            total_amount:total_amount,
            view_count:0,
            is_valyuta_price:is_valyuta,
            search:search,
            MarketKategoriyaId:kategoriya_id,
            UnitId:unit_id,
            ConfigId:1,
            // is_new:is_new,
           })
          }else{
            setData({
              // img_name:surat.name,
              // img:await toBase64(surat),
              name_tm:name_tm,
              name_ru:name_ru,
              name_en:name_en,
              price:price,
              // sale_price:sale_price,
              // sale_until:sale_until,
              step:step,
              article_en:article_en,
              article_ru:article_ru,
              article_tm:article_tm,
              description_en:description_en,
              description_ru:description_ru,
              description_tm:description_tm,
              is_sale:false,
              is_active:true,
              total_amount:total_amount,
              view_count:0,
              is_valyuta_price:is_valyuta,
              search:search,
              MarketKategoriyaId:kategoriya_id,
              UnitId:unit_id,
              ConfigId:1,
              // is_new:is_new,
             })
          }

        // axiosInstance.post("/api/product/create/"+market_id,{data}).then((data)=>{
        //   console.log(data.data);
        //   getProducts();
        //   message.success(data.data.msg);
          
        //   setName_tm();
        //   setName_ru();
        //   setName_en();
        //   setPrice();
        //   setSale_price();
        //   setStep();
        //   setArticle_tm();
        //   setArticle_ru();
        //   setArticle_en();
        //   setDescription_tm();
        //   setDescription_ru();
        //   setDescription_en();
        //   setSale_until();
        //   setTotal_amount();
        //   setIs_valyuta(false);
        //   setIs_new(false);
        //   setSearch();
        // }).catch((err)=>{
        //   console.log("Errorrr",err);
        // })
    }

    /// geting data from Api
    
  useEffect(()=>{
    getUnits();
  },[])

      const getUnits = ()=>{
          // axiosInstance.get("/api/units").then((data)=>{
          //     setUnits(data.data);
          // }).catch((err)=>{
          //     console.log(err);
          // })
      }  
      const getKategoriyas = (e)=>{
        // axiosInstance.get("/api/market/kategoriya/"+e).then((data)=>{
        //   console.log(data.data);
        //   setKategoriya(data.data);
        // }).catch((err)=>{
        //   console.log(err);
        // });
      }

      function onChangeM(value) {
        console.log(`selected ${value}`);
        setMarket_id(value);
        getKategoriyas(value);
      }
      function onSearchM(val) {
        console.log('search:', val);
      }
      function onChangeK(value) {
        console.log(`selected ${value}`);
        setKategoriya_id(value);
      }
      function onSearchK(val) {
        console.log('search:', val);
      }
      function onChangeU(value) {
        console.log(`selected ${value}`);
        setUnit_id(value);
      }
      function onSearchU(val) {
        console.log('search:', val);
      }

      const ChangeCheckbox = ()=>{
        setIs_valyuta(!is_valyuta);
      }
      const ChangeCheckboxNew = ()=>{
        setIs_new(!is_new);
      }

    return (
        <div
            className='suruji-yagdayy'>
            <form className='suruji-yagdayy--form' >
            <Select
            className='suruji-yagdayy--input' 
            // className="yolHaty-gozle--input"
            showSearch
            // style={{ width: 200 }}
            placeholder="Market Saýla"
            optionFilterProp="children"
            onChange={onChangeM}
            onSearch={onSearchM}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              markets.map((market)=>{
                return <Option value={market.id}>{market.name_tm}</Option>
              })
            }
          </Select>
          <Select
           className='suruji-yagdayy--input'
            // className="yolHaty-gozle--input"
            showSearch
            // style={{ width: 200 }}
            placeholder="Market Kategoriýa Saýla"
            optionFilterProp="children"
            onChange={onChangeK}
            onSearch={onSearchK}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              kategoriya.map((kategor)=>{
                return <Option value={kategor.id}>{kategor.name_tm}</Option>
              })
            }
          </Select>
          <Select
            // className="yolHaty-gozle--input"
            className='suruji-yagdayy--input'
            showSearch
            // style={{ width: 200 }}
            placeholder="Unit Saýla"
            optionFilterProp="children"
            onChange={onChangeU}
            onSearch={onSearchU}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              units.map((unit)=>{
                return <Option value={unit.id}>{unit.name}</Option>
              })
            }
          </Select>
           <Input value={name_tm} onChange={(e)=>{setName_tm(e.target.value)}} addonBefore='ady tm'  className='suruji-yagdayy--input' />
           <Input value={name_ru} onChange={(e)=>{setName_ru(e.target.value)}} addonBefore='ady ru'  className='suruji-yagdayy--input' />                
           <Input value={name_en} onChange={(e)=>{setName_en(e.target.value)}} addonBefore='ady en'  className='suruji-yagdayy--input' />
           <Input value={price} onChange={(e)=>{setPrice(e.target.value)}} addonBefore='baha'  className='suruji-yagdayy--input' />
           {/* <Input value={sale_price} onChange={(e)=>{setSale_price(e.target.value)}} addonBefore='Satyş baha'  className='suruji-yagdayy--input' /> */}
           <Input value={step} onChange={(e)=>{setStep(e.target.value)}} addonBefore='Step'  className='suruji-yagdayy--input' />
           <Input value={article_tm} onChange={(e)=>{setArticle_tm(e.target.value)}} addonBefore='Article tm'  className='suruji-yagdayy--input' />
           <Input value={article_ru} onChange={(e)=>{setArticle_ru(e.target.value)}} addonBefore='Article ru'  className='suruji-yagdayy--input' />
           <Input value={article_en} onChange={(e)=>{setArticle_en(e.target.value)}} addonBefore='Article en'  className='suruji-yagdayy--input' />
           <Input value={description_tm} onChange={(e)=>{setDescription_tm(e.target.value)}} addonBefore='Description tm'  className='suruji-yagdayy--input' />
           <Input value={description_ru} onChange={(e)=>{setDescription_ru(e.target.value)}} addonBefore='Description ru'  className='suruji-yagdayy--input' />
           <Input value={description_en} onChange={(e)=>{setDescription_en(e.target.value)}} addonBefore='Description en'  className='suruji-yagdayy--input' />
           {/* <Input  onChange={(e)=>{setSale_until(e.target.value)}} type="date" addonBefore='Sale until'  className='suruji-yagdayy--input' /> */}
           <Input value={total_amount} onChange={(e)=>{setTotal_amount(e.target.value)}} addonBefore='Ambardaky Sany'  className='suruji-yagdayy--input' />
           <Input value={search} onChange={(e)=>{setSearch(e.target.value)}} addonBefore='Gözleg söz'  className='suruji-yagdayy--input' />
           <Input  onChange={()=>ChangeCheckboxNew()} type="checkbox" addonBefore='Täzemi'  className='suruji-yagdayy--input' />
           <Input  onChange={()=>ChangeCheckbox()} type="checkbox" addonBefore='Valýutamy'  className='suruji-yagdayy--input' />
           <Input style={{width:"94%"}}  onChange={(e)=>{setSurat(e.target.files[0])}} type="file" addonBefore='Haryt Surat'  className='suruji-yagdayy--input' />
           
                
                <Button style={{width:"35%"}} onClick={CreateProduct} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Hasaba al</Button>
                <Button style={{width:"35%"}} onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Cancel</Button>
            </form>
        </div>
    );
};

export default SurujiYagdayy;