import React,{useContext, useState} from 'react';

import {Button,Space,message,Table,Modal,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';

import UnitEdit  from '../Orders/UnitEdit';
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';
import { ErkContext } from '../../context/Condex';

const LukmanTable = props=>{

    const {dil} = useContext(ErkContext);
    const [data,setData]=props.data;
    const getOrders = props.getOrders;

    const columns = [
        {
            title:(dil=="tm"?"Sargyt №":"№ заказа"),
            dataIndex:"id",
            render:(text,record)=>(
                (record.statusId==null ? <div style={{backgroundColor:"rgba(243, 117, 117, 0.336)",height:"50px",padding:"40px 10px 60px"}}>
                    {record.id}
                </div>
                :(record.statusId ==1 ? <div style={{backgroundColor:"rgba(117, 172, 243, 0.336)",height:"50px",padding:"40px 10px 60px"}}>
                {record.id}
                </div>
                :(<div style={{backgroundColor:"rgba(121, 243, 117, 0.336)",height:"50px",padding:"40px 10px 60px"}}>
              {record.id}
            </div>
            )))
                
                
            )
        },
        
        {
            title:(dil=="tm"?"Umumy baha":"Итоговая цена"),
            dataIndex:"total_price",
            render:(text,record)=>(
                record.statusId==null ? <div style={{backgroundColor:"rgba(243, 117, 117, 0.336)",padding:"40px 10px 60px",height:"50px"}}>
                    {record.total_price}
                </div>
                :(record.statusId==1 ? <div style={{backgroundColor:"rgba(117, 172, 243, 0.336)",padding:"40px 10px 60px",height:"50px"}}>
                {record.total_price}
                </div>
                : <div style={{backgroundColor:"rgba(121, 243, 117, 0.336)",padding:"40px 10px 60px",height:"50px"}}>
                {record.total_price}
                </div>)
            )
        },
        // {
        //     title:"Guty sany",
        //     dataIndex:"guty_sany"
        // },
        // {
        //     title:"Gg",
        //     dataIndex:"kg"
        // },
        // {
        //     title:"Metrkub(m3)",
        //     dataIndex:"m3"
        // },
        {
            title:(dil=="tm"?"Haýsy Ýol":"Способ доставки"),
            render:(text,record)=>(
               ( record.statusId==null ? <div style={{backgroundColor:"rgba(243, 117, 117, 0.336)",padding:"40px 10px 60px 0px",height:"50px",textAlign:"left"}}>
                <div>{record.yol==1 && (dil=="tm"?"Deňiz gatnawlary":"Морские перевозки")}</div> 
                <div>{record.yol==2 && (dil=="tm"?"Howa gatnawlary":"Авиаперевозка")}</div> 
                <div>{record.yol==3 && (dil=="tm"?"Demirýol gatnawlary":"Ж-д перевозки")}</div> 
                <div>{record.yol==4 && (dil=="tm"?"Awtoulag gatnawlary":"Автоперевозка")}</div> 
              </div>
              : record.statusId==1 ? <div style={{backgroundColor:"rgba(117, 172, 243, 0.336)",padding:"40px 10px 60px 0px",height:"50px",textAlign:"left"}}>
              <div>{record.yol==1 && (dil=="tm"?"Deňiz gatnawlary":"Морские перевозки")}</div> 
              <div>{record.yol==2 && (dil=="tm"?"Howa gatnawlary":"Авиаперевозка")}</div> 
              <div>{record.yol==3 && (dil=="tm"?"Demirýol gatnawlary":"Ж-д перевозки")}</div> 
              <div>{record.yol==4 && (dil=="tm"?"Awtoulag gatnawlary":"Автоперевозка")}</div> 
            </div>
            :<div style={{backgroundColor:"rgba(121, 243, 117, 0.336)",padding:"40px 10px 60px 0px",height:"50px",textAlign:"left"}}>
            <div>{record.yol==1 && (dil=="tm"?"Deňiz gatnawlary":"Морской перевозки")}</div> 
            <div>{record.yol==2 && (dil=="tm"?"Howa gatnawlary":"Авиаперевозка")}</div> 
            <div>{record.yol==3 && (dil=="tm"?"Demirýol gatnawlary":"Ж-д перевозки")}</div> 
            <div>{record.yol==4 && (dil=="tm"?"Awtoulag gatnawlary":"Автоперевозка ")}</div> 
          </div>)
            )

        },
        {
            title:(dil=="tm"?"Sargyt wagty":"Время заказа"),
            dataIndex:"order_date_time",
            render:(text,record)=>(
                (record.statusId==null ? <div style={{backgroundColor:"rgba(243, 117, 117, 0.336)",padding:"25px 10px 75px 10px",height:"50px"}}>
                   <p> { record.ordered_date && record.ordered_date.slice(0,10) }</p> 
                   <p>{ record.ordered_date && record.ordered_date.slice(11,19)}</p>
                    
                </div>
                :record.statusId==1 ? <div style={{backgroundColor:"rgba(117, 172, 243, 0.336)",padding:"25px 10px 75px 10px",height:"50px"}}>
                <p> { record.ordered_date && record.ordered_date.slice(0,10) }</p> 
                <p>{ record.ordered_date && record.ordered_date.slice(11,19)}</p>
                 
             </div>
             :<div style={{backgroundColor:"rgba(121, 243, 117, 0.336)",padding:"25px 10px 75px 10px",height:"50px"}}>
             <p> { record.ordered_date && record.ordered_date.slice(0,10) }</p> 
             <p>{ record.ordered_date && record.ordered_date.slice(11,19)}</p>
              
          </div>)
            )
        },
        {
            title:(dil=="tm"?"Haryt Ugratýan":"Отправитель товара"),
            dataIndex:"ugradyjy_ady",
            render:(text,record)=>(
                (record.statusId==null ? <div style={{backgroundColor:"rgba(243, 117, 117, 0.336)",padding:"40px 0px 60px",height:"50px"}}>
                    {record.ugradyjy_ady}
                </div>
                :record.statusId==1 ? <div style={{backgroundColor:"rgba(117, 172, 243, 0.336)",padding:"40px 0px 60px",height:"50px"}}>
                {record.ugradyjy_ady}
                </div>
                :<div style={{backgroundColor:"rgba(121, 243, 117, 0.336)",padding:"40px 0px 60px",height:"50px"}}>
                {record.ugradyjy_ady}
            </div>)
            )
        },
        {
            title:(dil=="tm"?"Kabul ediji":"Получатель"),
            dataIndex:"kabulediji_ady",
            render:(text,record)=>(
                (record.statusId==null ?<div style={{backgroundColor:"rgba(243, 117, 117, 0.336)",padding:"30px 10px 70px",height:"50px"}}>
                    <div>{record.kabulediji_ady}</div>
                    <div>{record.phoneNumber }</div>
                </div>
                :record.statusId==1 ?<div style={{backgroundColor:"rgba(117, 172, 243, 0.336)",padding:"30px 10px 70px",height:"50px"}}>
                <div>{record.kabulediji_ady}</div>
                <div>{record.phoneNumber }</div>
            </div>
            :<div style={{backgroundColor:"rgba(121, 243, 117, 0.336)",padding:"30px 10px 70px",height:"50px"}}>
            <div>{record.kabulediji_ady}</div>
            <div>{record.phoneNumber }</div>
        </div>)
            )
        },
        {
            title:(dil=="tm"?"Ýük Häzir":"Груз сейчас"),
            dataIndex:"yukHazir",
            render:(text,record)=>(
                (record.statusId==null ?<div style={{backgroundColor:"rgba(243, 117, 117, 0.336)",padding:"40px 0px 60px",height:"50px"}}>
                    {record.yukHazir}
                </div>
                :record.statusId==1 ?<div style={{backgroundColor:"rgba(117, 172, 243, 0.336)",padding:"40px 0px 60px",height:"50px"}}>
                {record.yukHazir}
                </div>
                :<div style={{backgroundColor:"rgba(121, 243, 117, 0.336)",padding:"40px 0px 60px",height:"50px"}}>
                {record.yukHazir}
            </div>)
            )
        },
        {
            title:(dil=="tm"?"Sargydyň statusy":"Статус заказа"),
            render:(text,record)=>(
                (record.statusId==null ?<div style={{backgroundColor:"rgba(243, 117, 117, 0.336)",padding:"40px 0px 60px",height:"50px"}}>
                    {record.statusId==1 && (dil=="tm"?"Gelmegine garaşylýar":"Ожидается к прибытью")}
                    {record.statusId==2 && (dil=="tm"?"Ammara geldi":"Груз прибыл на склад")} 
                    {record.statusId==3 && (dil=="tm"?"Ýüküňiz ugradyldy":"Груз отправлен")} 
                    {record.statusId==4 && (dil=="tm"?"Ýolda":"В пути")} 
                    {record.statusId==5 && (dil=="tm"?"Türkmenistanyň gümrügine geldi":"Прибыл на таможню Туркменистана")} 
                    {record.statusId==6 && (dil=="tm"?"Gowşurma nokadyna ugradyldy":"Отправлен в пункт доставки")}
                </div>
                :record.statusId==1 ?<div style={{backgroundColor:"rgba(117, 172, 243, 0.336)",padding:"40px 0px 60px",height:"50px"}}>
                {record.statusId==1 && (dil=="tm"?"Gelmegine garaşylýar":"Ожидается к прибытью")}
                {record.statusId==2 && (dil=="tm"?"Ammara geldi":"Груз прибыл на склад")} 
                {record.statusId==3 && (dil=="tm"?"Ýüküňiz ugradyldy":"Груз отправлен")} 
                {record.statusId==4 && (dil=="tm"?"Ýolda":"В пути")} 
                {record.statusId==5 && (dil=="tm"?"Türkmenistanyň gümrügine geldi":"Прибыл на таможню Туркменистана")} 
                {record.statusId==6 && (dil=="tm"?"Gowşurma nokadyna ugradyldy":"Отправлен в пункт доставки")}
               </div>
               :<div style={{backgroundColor:"rgba(121, 243, 117, 0.336)",padding:"40px 0px 60px",height:"50px"}}>
               {record.statusId==1 && (dil=="tm"?"Gelmegine garaşylýar":"Ожидается к прибытью")}
               {record.statusId==2 && (dil=="tm"?"Ammara geldi":"Груз прибыл на склад")} 
               {record.statusId==3 && (dil=="tm"?"Ýüküňiz ugradyldy":"Груз отправлен")} 
               {record.statusId==4 && (dil=="tm"?"Ýolda":"В пути")} 
               {record.statusId==5 && (dil=="tm"?"Türkmenistanyň gümrügine geldi":"Прибыл на таможню Туркменистана")} 
               {record.statusId==6 && (dil=="tm"?"Gowşurma nokadyna ugradyldy":"Отправлен в пункт доставки")}
              </div>)
            )
        },
        // {
        //     title:"Zakaz Salgy",
        //     render:(text,record)=>(
                
        //         <div>
        //             <h3>{record.Address && record.Address.rec_name}</h3>
        //              <p>{record.Address && record.Address.rec_address} {record.Address && record.Address.rec_number}</p>
                     
        //          </div>
        //     )
        // },
        {
            title:(dil=="tm"?"Ulanyjy":"Пользователь"),
            width:"200px",
            render:(text,record)=>(
                
               (record.statusId==null ? <div style={{backgroundColor:"rgba(243, 117, 117, 0.336)",padding:"0px 0px 100px",height:"50px",width:"200px"}}>
                     <h3>{record && record.User && record.User.fname} {record && record.User && record.User.lastname} </h3> 
                     <p>{record.User && record.User.phoneNumber}</p>
                     <p>{record.User && record.User.email}</p>
                 </div>
                 :record.statusId==1 ? <div style={{backgroundColor:"rgba(117, 172, 243, 0.336)",padding:"0px 0px 100px",height:"50px",width:"200px"}}>
                 <h3>{record && record.User && record.User.fname} {record && record.User && record.User.lastname} </h3> 
                 <p>{record.User && record.User.phoneNumber}</p>
                 <p>{record.User && record.User.email}</p>
                </div>
                :<div style={{backgroundColor:"rgba(121, 243, 117, 0.336)",padding:"0px 0px 100px",height:"50px",width:"200px"}}>
                <h3>{record && record.User && record.User.fname} {record && record.User && record.User.lastname} </h3> 
                <p>{record.User && record.User.phoneNumber}</p>
                <p>{record.User && record.User.email}</p>
            </div>)
            )
        },
        {
            title:(dil=="tm"?"Üýygetmek we Özgertmek":"Изменить"),
            dataIndex:"goshmacha",
            render: (text, record) => (
               (record.statusId==null ?  <div size="middle" style={{backgroundColor:"rgba(243, 117, 117, 0.336)",padding:"30px 0px 70px",height:"50px"}}>
                    <Space>
                     <Button type='primary'shape='round'onClick={()=>ShowInformation(record)} >{dil=="tm"?"Goşmaça":"Дополнительно"}</Button>
                     <Popconfirm
                        title={dil=="tm"?"Çyndan Sargyt Kabul edildimi?":"Действительно ли заказ принят?"}
                        onConfirm={()=>Gowshuryldy(record)} 
                        // onCancel={cancel}
                        okText={dil=="tm"?"Howa":"да"}
                        cancelText={dil=="tm"?"Ýok":"нет"}
                    >
                    <Button type='primary'shape='round' >{dil=="tm"?"Gowşuryldy":"Доставлен"}</Button>               

                    </Popconfirm>
                    </Space>
                    <Space style={{marginTop:"10px"}}>
                     <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                     
                     <Popconfirm
                        title={dil=="tm"?"Çyndan Sargyt ýatyryldymy?":"Заказ действительно отменен?"}
                        onConfirm={()=>Yatyryldy(record)} 
                        // onCancel={cancel}
                        okText={dil=="tm"?"Howa":"да"}
                        cancelText={dil=="tm"?"Ýok":"нет"}
                    >
                    <Button danger type='primary'shape='round' >{dil=="tm"?"Ýatyryldy":"Отменено"}</Button>               

                    </Popconfirm>
                    <Popconfirm
                        title={dil=="tm"?"Siz çyndan öçürmek isleýärsinizmi?":"Вы действительно хотите удалить?"}
                        onConfirm={()=>DeleteOrder(record)} 
                        // onCancel={cancel}
                        okText={dil=="tm"?"Howa":"да"}
                        cancelText={dil=="tm"?"Ýok":"нет"}
                    >
                        <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>                 

                    </Popconfirm>
                    </Space>
                </div>
                :record.statusId==1 ?  <div size="middle" style={{backgroundColor:"rgba(117, 172, 243, 0.336)",padding:"30px 0px 70px",height:"50px"}}>
                <Space>
                 <Button type='primary'shape='round'onClick={()=>ShowInformation(record)} >{dil=="tm"?"Goşmaça":"Дополнительно"}</Button>
                 <Popconfirm
                    title={dil=="tm"?"Çyndan Sargyt Kabul edildimi?":"Действительно ли заказ принят?"}
                    onConfirm={()=>Gowshuryldy(record)} 
                    // onCancel={cancel}
                    okText={dil=="tm"?"Howa":"да"}
                    cancelText={dil=="tm"?"Ýok":"нет"}
                >
                <Button type='primary'shape='round' >{dil=="tm"?"Gowşuryldy":"Доставлен"}</Button>               

                </Popconfirm>
                </Space>
                <Space style={{marginTop:"10px"}}>
                 <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                 
                 <Popconfirm
                    title={dil=="tm"?"Çyndan Sargyt ýatyryldymy?":"Заказ действительно отменен?"}
                    onConfirm={()=>Yatyryldy(record)} 
                    // onCancel={cancel}
                    okText={dil=="tm"?"Howa":"да"}
                    cancelText={dil=="tm"?"Ýok":"нет"}
                >
                <Button danger type='primary'shape='round' >{dil=="tm"?"Ýatyryldy":"Отменено"}</Button>               

                </Popconfirm>
                <Popconfirm
                    title={dil=="tm"?"Siz çyndan öçürmek isleýärsinizmi?":"Вы действительно хотите удалить?"}
                    onConfirm={()=>DeleteOrder(record)} 
                    // onCancel={cancel}
                    okText={dil=="tm"?"Howa":"да"}
                    cancelText={dil=="tm"?"Ýok":"нет"}
                >
                    <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>                 

                </Popconfirm>
                </Space>
            </div>
            
            : <div size="middle" style={{backgroundColor:"rgba(121, 243, 117, 0.336)",padding:"30px 0px 70px",height:"50px"}}>
            <Space>
             <Button type='primary'shape='round'onClick={()=>ShowInformation(record)} >{dil=="tm"?"Goşmaça":"Дополнительно"}</Button>
             <Popconfirm
                title={dil=="tm"?"Çyndan Sargyt Kabul edildimi?":"Действительно ли заказ принят?"}
                onConfirm={()=>Gowshuryldy(record)} 
                // onCancel={cancel}
                okText={dil=="tm"?"Howa":"да"}
                cancelText={dil=="tm"?"Ýok":"нет"}
            >
            <Button type='primary'shape='round' >{dil=="tm"?"Gowşuryldy":"Доставлен"}</Button>               

            </Popconfirm>
            </Space>
            <Space style={{marginTop:"10px"}}>
             <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
             
             <Popconfirm
                title={dil=="tm"?"Çyndan Sargyt ýatyryldymy?":"Заказ действительно отменен?"}
                onConfirm={()=>Yatyryldy(record)} 
                // onCancel={cancel}
                okText={dil=="tm"?"Howa":"да"}
                cancelText={dil=="tm"?"Ýok":"нет"}
            >
            <Button danger type='primary'shape='round' >{dil=="tm"?"Ýatyryldy":"Отменено"}</Button>               

            </Popconfirm>
            <Popconfirm
                title={dil=="tm"?"Siz çyndan öçürmek isleýärsinizmi?":"Вы действительно хотите удалить?"}
                onConfirm={()=>DeleteOrder(record)} 
                // onCancel={cancel}
                okText={dil=="tm"?"Howa":"да"}
                cancelText={dil=="tm"?"Ýok":"нет"}
            >
                <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>                 

            </Popconfirm>
            </Space>
        </div>)
              ),
        }
    ];

    const [edit,setEdit]=useState(false);
    const [info,setInfo] = useState(false);
    const [emaglumat,setEmaglumat]=useState(null);
    const [ maglumat, setMaglumat ] = useState(null);
    const DeleteOrder = (event)=>{
        console.log(event);
        axiosInstance.delete("/api/sargyt/delete/"+event.id).then((data)=>{
            message.success(data.data.msg);
            getOrders();
        }).catch((err)=>{
            console.log(err);
        })
       
    }
    
const ShowDrawer =(event)=>{
    setEdit(!edit);
    console.log(event);
    setEmaglumat(event);
    console.log("maglumat",emaglumat)
    
}

const ShowInformation = (event)=>{
    setInfo(!info);
    console.log(event);
    setMaglumat(event);

}

const Gowshuryldy = (event)=>{
    axiosInstance.patch("/api/sargyt/update/delivered/"+event.id).then((data)=>{
        message.success("successfully!");
        getOrders()
    }).catch((err)=>{
        console.log(err);
    })
}

    const Yatyryldy = async(event)=>{
        axiosInstance.patch("/api/sargyt/update/yatyryldy/"+event.id).then((data)=>{
            message.success("successfully!");
            getOrders()
        }).catch((err)=>{
            console.log(err);
        })
    }




    return(
        <div className='LukmanTable' id="newOrders">
                <Drawer
                    width={500}
                    className='lukman-table--drawer'
                    title={dil=="tm"?"Goşmaça Maglumat":"Дополнительная информация"}
                    placement="right"
                    onClose={()=>ShowInformation()}
                    visible={info}>
                         { maglumat && <React.Fragment>
                          <table style={{width:"100%"}} border="1" className="goshmacha--ul">
                            <tr className="modalLi" key={maglumat && maglumat.id}>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>{dil=="tm"?"No":"Но"} </td>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>{maglumat && maglumat.id} </td>
                            </tr>
                            <tr className="modalLi" key={maglumat && maglumat.guty_sany}>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>{dil=="tm"?"Guty Sany ":"Количество коробок"}</td>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>{maglumat && maglumat.guty_sany} </td>
                            </tr>
                            <tr className="modalLi" key={maglumat && maglumat.kg}>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>{dil=="tm"?"Kg":"Кг"} </td>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>{maglumat && maglumat.kg} </td>
                            </tr>
                            <tr className="modalLi" key={maglumat && maglumat.m3}>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>{dil=="tm"?"Metr kub(m3)":"Метр куб(м3)"} </td>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>{maglumat && maglumat.m3} </td>
                            </tr>
                            </table>
                            <h1 className="modalLi" key={maglumat && maglumat.id}>
                             {dil=="tm"?"Haryt Surat":"Изображение груза"}
                            </h1>
                            <div>
                            {maglumat && maglumat.product_image && <img style={{width:"400px", height:"200px",objectFit:"contain"}} src={BASE_URL+"/"+maglumat.product_image} alt={BASE_URL+maglumat.product_image} />} 
                            
                            {maglumat && maglumat.surat2 && <img style={{width:"400px", height:"200px",objectFit:"contain"}} src={BASE_URL+"/"+maglumat.surat2} alt="product Img" />}
                             
                            {maglumat && maglumat.surat3 && <img style={{width:"400px", height:"200px",objectFit:"contain"}} src={BASE_URL+"/"+maglumat.surat3} alt="product Img" />}
                                </div>
                                <h1 style={{marginTop:"20px"}} className="modalLi" key={maglumat && maglumat.id}>
                              {dil=="tm"?"Adminiň goşan haryt suraty":"Изображение продукта добавлено администратором"}
                            </h1>
                            <div>
                            {maglumat && maglumat.surat4 && <img style={{width:"400px", height:"200px",objectFit:"contain"}} src={BASE_URL+"/"+maglumat.surat4} alt={BASE_URL+maglumat.product_image} />} 
                            
                            {maglumat && maglumat.surat5 && <img style={{width:"400px", height:"200px",objectFit:"contain"}} src={BASE_URL+"/"+maglumat.surat5} alt="product Img" />}
                             
                            {maglumat && maglumat.surat6 && <img style={{width:"400px", height:"200px",objectFit:"contain"}} src={BASE_URL+"/"+maglumat.surat6} alt="product Img" />}
                                </div>
                            </React.Fragment>
                        }
                </Drawer>
                <Drawer
                width={400}
                className='lukman-table--drawer'
                title={dil=="tm"?"Üýtgetmeler":"Изменить"}
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    <UnitEdit onClick={ShowDrawer} order={[emaglumat,setEmaglumat]} getOrders={getOrders}/>
                </Drawer>
                <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default LukmanTable;