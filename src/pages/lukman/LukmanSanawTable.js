import React,{useState} from 'react';

import {Button,Space,message,Table,Modal,Drawer,Popconfirm,Input} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined,PlusCircleFilled } from '@ant-design/icons';

import ProductEdit from './ProductEdit';
import ProductSkidga from "./skidga"
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';

const LukmanTable = props=>{

    const [data,setData]=props.data;
    const getProducts = props.getProducts;

    const [edit,setEdit]=useState(false);
    const [skidka,setSkidka]=useState(false);

    const [maglumat,setMaglumat]=useState([]);
    const [showInfo,setShowInfo]=useState(false);


    const [editProId,setEditProId] = useState();
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
    const [search,setSearch] = useState();
    const [surat,setSurat] = useState(null);

   // updating product
   const EditProduct = async()=>{
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        });
        let data;
        if(surat!=null){
              data ={
              img_name:surat.name,
              img:await toBase64(surat),
              name_tm:name_tm,
              name_ru:name_ru,
              name_en:name_en,
              price:price,
              sale_price:sale_price,
              sale_until:sale_until,
              step:step,
              article_en:article_en,
              article_ru:article_ru,
              article_tm:article_tm,
              description_en:description_en,
              description_ru:description_ru,
              description_tm:description_tm,
              // is_sale:false,
              // is_active:true,
              total_amount:total_amount,
              // view_count:0,
              is_valyuta_price:is_valyuta,
              search:search,
              // MarketKategoriyaId:kategoriya_id,
              // UnitId:unit_id,
             }
            }else{
              data = {
                  name_tm:name_tm,
                  name_ru:name_ru,
                  name_en:name_en,
                  price:price,
                  sale_price:sale_price,
                  sale_until:sale_until,
                  step:step,
                  article_en:article_en,
                  article_ru:article_ru,
                  article_tm:article_tm,
                  description_en:description_en,
                  description_ru:description_ru,
                  description_tm:description_tm,
                  // is_sale:false,
                  // is_active:true,
                  total_amount:total_amount,
                  // view_count:0,
                  is_valyuta_price:is_valyuta,
                  search:search,
                  // MarketKategoriyaId:kategoriya_id,
                  // UnitId:unit_id,
                 }
            }
  console.log("product id:",editProId,data)

//  await   axiosInstance.patch("/api/product/update/"+editProId,{data}).then((data)=>{
//       console.log(data.data);
//       getProducts();
//       message.success(data.data.msg);
//       setName_tm();
//       setName_ru();
//       setName_en();
//       setPrice();
//       setSale_price();
//       setStep();
//       setArticle_tm();
//       setArticle_ru();
//       setArticle_en();
//       setDescription_tm();
//       setDescription_ru();
//       setDescription_en();
//       setSale_until();
//       setTotal_amount();
//       setIs_valyuta();
//       setSearch();
      
//     }).catch((err)=>{
//       console.log(err);
//     })
}


const ChangeCheckbox = ()=>{
    setIs_valyuta(!is_valyuta);
    console.log(is_valyuta)
  }



    const columns = [
        {
            title:"Haryt No",
            dataIndex:"id"
        },
        {
            title:"Haryt Surat",
            dataIndex:"surat",
            render:(text,record)=>(
                <div>
                    <img style={{width:"50px",height:"50px",objectFit:"contain"}} src={BASE_URL+"/"+record.surat} alt="Haryt Surat"/>
                </div>
            )
        },
        {
            title:"Haryt Ady",
            dataIndex:"name_tm",
        },
        {
            title:"Article",
            dataIndex:"article_tm"
        },
        {
            title:"Description",
            dataIndex:"description_tm"
        },
        {
            title:"Baha",
            dataIndex:"price"
        },
        {
            title:"Satyş Baha",
            dataIndex:"sale_price"
        },
        {
            title:"Satylyşy",
            dataIndex:"is_active",
            render:(text,record)=>(
                <div>
               { record.is_active && <p style={{color:"green"}}> Howa </p>}
               { !record.is_active && <p style={{color:"red"}}>Ýok</p>}
               </div>
            )
        },
        {
            title:"Skidka ",
            dataIndex:"is_active",
            render:(text,record)=>(
                <div>
               { record.is_sale && <p style={{color:"green"}}>Howa</p>}
               { !record.is_sale && <p style={{color:"red"}}>Ýok</p>}
               </div>
            )
        },
        {
            title:"Lukman Gözegçiligi we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'shape='round'onClick={()=>MoreInformation(record)}>Goşmaça</Button>
                    <Button type='primary'shape='round'onClick={()=>ShowSkidka(record)} >Skidka</Button>
                    {/* <Button type='primary'shape='round'onClick={()=>NewProduct(record)} >Täze</Button> */}
                    <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Popconfirm
                        title="Siz çyndan Gizlemek isleýärsinizmi?"
                        onConfirm={()=>Active(record)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                    <Button type='primary' danger shape='round' >Gizle</Button>
                    </Popconfirm>
                    <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteUser(record)} 
                        // onCancel={cancel}
                        okText="Howwa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger  ><DeleteOutlined /></Button>                 
               
                    </Popconfirm>
                     </Space>
              ),
        }
    ];

   
    const DeleteUser = (event)=>{
        console.log(event);
        // axiosInstance.delete("/api/product/delete/"+event.id).then((data)=>{
        //     console.log(data.data);
        //     message.success(data.data.msg);
        //     getProducts()
        // }).catch((err)=>{
        //     console.log(err);
        // })
       
    }
    const MoreInformation = async(event)=>{
        console.log("maglummat",event);
        setShowInfo(!showInfo);
        setMaglumat([]);
        await setMaglumat(event);
        
}
const ShowDrawer = async(event)=>{
    setEdit(!edit);
    console.log("maglumat edit",event);
    // setMaglumat([]);
    // await setMaglumat(event);
    if(event){
          setEditProId(event.id);
          setName_tm(event.name_tm);
          setName_ru(event.name_ru);
          setName_en(event.name_en);
          setPrice(event.price);
          setSale_price(event.sale_price);
          setStep(event.step);
          setArticle_tm(event.article_tm);
          setArticle_ru(event.article_ru);
          setArticle_en(event.article_en);
          setDescription_tm(event.description_tm);
          setDescription_ru(event.description_ru);
          setDescription_en(event.description_en);
          setSale_until(event.sale_until);
          setTotal_amount(event.total_amount);
          setIs_valyuta(event.is_valyuta);
          setSearch(event.search);
    }
}
const ShowSkidka = async(event)=>{
    setSkidka(!skidka);
    console.log("maglumat edit",event);
    setMaglumat([]);
    await setMaglumat(event);
}

const NewProduct = async(event)=>{
    axiosInstance.patch("")
}

const Active = (event)=>{
    console.log(event);
    let is_active = !event.is_active;
    // axiosInstance.patch("/api/product/isActive/"+event.id,{
    //     is_active:is_active,
    // }).then((data)=>{
    //     message.success(data.data.msg);
    //     getProducts();
    // }).catch((err)=>{
    //     console.log(err);
    // })
}

const inputChangeHandler=(event)=>{
  console.log(event.target.name);
  let name=event.target.name;
  let value=event.target.value;

  setMaglumat({
      ...maglumat,
      [name]:value
  })            
}
const saveData = (event)=>{
    setData([
        ...data,
        maglumat
    ]);
    setEdit(false);
};


    return(
        <div className='LukmanTable'>
                <Drawer
                width={500}
                className='lukman-table--drawer'
                title="Goşmça Maglumat"
                placement="right"
                onClose={()=>MoreInformation()}
                visible={showInfo}>
                    { maglumat &&
                    <table style={{width:"100%"}} border="1" className="goshmacha--ul">
                    <tr className="modalLi" key={maglumat && maglumat.id}>
                    <td>ID </td>
                    <td>{maglumat && maglumat.id} </td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.name_tm}>
                    <td>Ady tm </td>
                    <td>{maglumat &&  maglumat.name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.name_ru}>
                    <td>Ady ru </td>
                    <td>{maglumat &&  maglumat.name_ru}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.name_en}>
                    <td>Ady en </td>
                    <td>{maglumat &&  maglumat.name_en}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.article_tm}>
                    <td>Article tm </td>
                    <td>{maglumat &&  maglumat.article_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.article_ru}>
                    <td>Article ru </td>
                    <td>{maglumat &&  maglumat.article_ru}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.article_en}>
                    <td>Article en </td>
                    <td>{maglumat &&  maglumat.article_en}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.description_tm}>
                    <td>Description tm </td>
                    <td>{maglumat &&  maglumat.description_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.description_ru}>
                    <td>Description ru </td>
                    <td>{maglumat &&  maglumat.description_ru}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.description_en}>
                    <td>Description en </td>
                    <td>{maglumat &&  maglumat.description_en}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && JSON.stringify(maglumat.is_active)}>
                    <td>Satylyşy</td>
                    <td>{maglumat &&  JSON.stringify(maglumat.is_active)}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && JSON.stringify(maglumat.is_sale)}>
                    <td>Skidka </td>
                    <td>{maglumat &&  JSON.stringify(maglumat.is_sale)}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && JSON.stringify(maglumat.is_valyuta_price)}>
                    <td>Is_Valyuta_Price </td>
                    <td>{maglumat &&  JSON.stringify(maglumat.is_valyuta_price)}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.price}>
                    <td>Bahasy</td>
                    <td>{maglumat &&  maglumat.price}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.sale_price}>
                    <td>Satylyş baha </td>
                    <td>{maglumat &&  maglumat.sale_price}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.sale_until}>
                    <td>Hachana chenli skidka </td>
                    <td>{maglumat &&  maglumat.sale_until}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.search}>
                    <td>Gözleg üçin söz </td>
                    <td>{maglumat &&  maglumat.search}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.step}>
                    <td>Step </td>
                    <td>{maglumat &&  maglumat.step}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.total_amount}>
                    <td>Ambardaky Umumy sany</td>
                    <td>{maglumat &&  maglumat.total_amount}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.total_amount}>
                    <td>Görenleriň sany</td>
                    <td>{maglumat &&  maglumat.view_count}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.Market && maglumat.Market.name_tm}>
                    <td>Market </td>
                    <td>{maglumat && maglumat.Market && maglumat.Market.name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.MarketKategoriya && maglumat.MarketKategoriya.name_tm}>
                    <td>Market Kategoriýa</td>
                    <td>{maglumat && maglumat.MarketKategoriya && maglumat.MarketKategoriya.name_tm}</td>
                    </tr>
                    <tr className="modalLi" key={maglumat && maglumat.Unit && maglumat.total_amount}>
                    <td>Unit</td>
                    <td>{maglumat && maglumat.Unit &&  maglumat.Unit.name}</td>
                    </tr>
            
            
            
          </table>
}
                </Drawer>
                <Drawer
                width={500}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    {/* <ProductEdit getProducts={getProducts} mag={maglumat} onClick={ShowDrawer}  /> */}
                    <form className='suruji-yagdayy--form' >
                            
                        <Input value={name_tm} onChange={(e)=>{setName_tm(e.target.value)}} addonBefore='ady tm'  className='suruji-yagdayy--input' />
                        <Input value={name_ru} onChange={(e)=>{setName_ru(e.target.value)}} addonBefore='ady ru'  className='suruji-yagdayy--input' />                
                        <Input value={name_en} onChange={(e)=>{setName_en(e.target.value)}} addonBefore='ady en'  className='suruji-yagdayy--input' />
                        <Input value={price} onChange={(e)=>{setPrice(e.target.value)}} addonBefore='baha'  className='suruji-yagdayy--input' />
                        <Input value={sale_price} onChange={(e)=>{setSale_price(e.target.value)}} addonBefore='Satyş baha'  className='suruji-yagdayy--input' />
                        <Input value={step} onChange={(e)=>{setStep(e.target.value)}} addonBefore='Step'  className='suruji-yagdayy--input' />
                        <Input value={article_tm} onChange={(e)=>{setArticle_tm(e.target.value)}} addonBefore='Article tm'  className='suruji-yagdayy--input' />
                        <Input value={article_ru} onChange={(e)=>{setArticle_ru(e.target.value)}} addonBefore='Article ru'  className='suruji-yagdayy--input' />
                        <Input value={article_en} onChange={(e)=>{setArticle_en(e.target.value)}} addonBefore='Article en'  className='suruji-yagdayy--input' />
                        <Input value={description_tm} onChange={(e)=>{setDescription_tm(e.target.value)}} addonBefore='Description tm'  className='suruji-yagdayy--input' />
                        <Input value={description_ru} onChange={(e)=>{setDescription_ru(e.target.value)}} addonBefore='Description ru'  className='suruji-yagdayy--input' />
                        <Input value={description_en} onChange={(e)=>{setDescription_en(e.target.value)}} addonBefore='Description en'  className='suruji-yagdayy--input' />
                        <Input  onChange={(e)=>{setSale_until(e.target.value)}} type="date" addonBefore='Sale until'  className='suruji-yagdayy--input' />
                        <Input value={total_amount} onChange={(e)=>{setTotal_amount(e.target.value)}} addonBefore='Ambardaky Sany'  className='suruji-yagdayy--input' />
                        <Input  onChange={()=>ChangeCheckbox()} type="checkbox" addonBefore='Valýutamy'  className='suruji-yagdayy--input' />
                        <Input value={search} onChange={(e)=>{setSearch(e.target.value)}} addonBefore='Gözleg söz'  className='suruji-yagdayy--input' />
                        <Input style={{width:"100%"}} onChange={(e)=>{setSurat(e.target.files[0])}} type="file" addonBefore='Haryt Surat'  className='suruji-yagdayy--input' />
                        
                                <div style={{width:"100%"}}>
                                <Button style={{width:"40%"}} onClick={EditProduct} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'> Üýget </Button>
                                <Button style={{width:"40%"}} onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'> Goýbolsun </Button>
                                </div>
                            </form>
                </Drawer>
                <Drawer
                width={500}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowSkidka()}
                visible={skidka}>
                    <ProductSkidga getProducts={getProducts} mag={maglumat} onClick={ShowDrawer}  />
                </Drawer>
                <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default LukmanTable;