import React,{useState} from 'react';

import {Button,Space,message,Table,Modal,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';

import UnitEdit  from '../Orders/UnitEdit';
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';

const LukmanTable = props=>{

    const [data,setData]=props.data;
    const getOrders = props.getOrders;

    const columns = [
        {
            title:"Gözleg No",
            dataIndex:"id"
        },
        
        {
            title:"Haryt ady",
            dataIndex:"product_name"
        },
        {
            title:"Umumy baha",
            dataIndex:"baha"
        },
        {
            title:"Sany",
            dataIndex:"sany"
        },
        // {
        //     title:"Gg",
        //     dataIndex:"kg"
        // },
        // {
        //     title:"Metrkub(m3)",
        //     dataIndex:"m3"
        // },
        // {
        //     title:"Haýsy Ýol",
        //     render:(text,record)=>(
        //        <div>
        //         <div>{record.yol==1 && "Deňiz gatnawlary"}</div> 
        //         <div>{record.yol==2 && "Howa gatnawlary"}</div> 
        //         <div>{record.yol==3 && "Demirýol gatnawlary"}</div> 
        //         <div>{record.yol==4 && "Awtoulag gatnawlary"}</div> 
        //     </div>
        //     )

        // },
        {
            title:"Gözlege goylan wagty",
            dataIndex:"order_date_time",
            render:(text,record)=>(
                <div>
                   <p> { record.ordered_date && record.ordered_date.slice(0,10) }</p> 
                   <p>{ record.ordered_date && record.ordered_date.slice(11,19)}</p>
                    
                </div>
            )
        },
        {
            title:"Önümçilik möhleti",
            dataIndex:"onumchilik_mohleti",
            render:(text,record)=>(
                <div>
                   <p> { record.ordered_date && record.ordered_date.slice(0,10) }</p> 
                   <p>{ record.ordered_date && record.ordered_date.slice(11,19)}</p>
                    
                </div>
            )
        },
        {
            title:"Saýtlar",
            dataIndex:"saytlar",
        },
        {
            title:"Goşmaça talaplar",
            dataIndex:"goshmachaTalaplar",
        },
        {
            title:"Ulanyjy",
            render:(text,record)=>(
                
                <div>
                     <h3>{record && record.User && record.User.fname} {record && record.User && record.User.lastname} </h3> 
                     <p>{record.User && record.User.phoneNumber}</p>
                     <p>{record.User && record.User.email}</p>
                 </div>
            )
        },
        {
            title:"Üýygetmek we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <div size="middle">
                   
                    <Space>
                    <Popconfirm
                        title="Çyndan Sargyt tapyldymy?"
                        onConfirm={()=>Gowshuryldy(record)} 
                        // onCancel={cancel}
                        okText="Howa"
                        cancelText="Ýok"
                    >
                    <Button type='primary'shape='round' >Tapyldy</Button>               

                    </Popconfirm>
                     <Popconfirm
                        title="Çyndan Sargyt tapylmadymy?"
                        onConfirm={()=>Yatyryldy(record)} 
                        // onCancel={cancel}
                        okText="Howa"
                        cancelText="Ýok"
                    >
                    <Button danger type='primary'shape='round' >Tapylmady</Button>               

                    </Popconfirm>
                    {/* <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteOrder(record)} 
                        // onCancel={cancel}
                        okText="Howa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>                 

                    </Popconfirm> */}
                    </Space>
                    <Space  style={{marginTop:"10px"}}>
                     <Button type='primary'shape='round'onClick={()=>ShowInformation(record)} >Goşmaça</Button>
                     
                    </Space>
                </div>
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
    axiosInstance.patch("/api/tapyldy/"+event.id).then((data)=>{
        message.success("successfully!");
        getOrders()
    }).catch((err)=>{
        console.log(err);
    })
}

    const Yatyryldy = async(event)=>{
        axiosInstance.patch("/api/tapylmady/"+event.id).then((data)=>{
            message.success("successfully!");
            getOrders()
        }).catch((err)=>{
            console.log(err);
        })
    }




    return(
        <div className='LukmanTable'>
                <Drawer
                    width={500}
                    className='lukman-table--drawer'
                    title="Goşmaça Maglumat"
                    placement="right"
                    onClose={()=>ShowInformation()}
                    visible={info}>
                         { maglumat && <React.Fragment>
                          {/* <table style={{width:"100%"}} border="1" className="goshmacha--ul">
                            <tr className="modalLi" key={maglumat && maglumat.id}>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>ID </td>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>{maglumat && maglumat.id} </td>
                            </tr>
                            <tr className="modalLi" key={maglumat && maglumat.guty_sany}>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>Guty Sany </td>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>{maglumat && maglumat.guty_sany} </td>
                            </tr>
                            <tr className="modalLi" key={maglumat && maglumat.kg}>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>Kg </td>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>{maglumat && maglumat.kg} </td>
                            </tr>
                            <tr className="modalLi" key={maglumat && maglumat.m3}>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>Metrkub(m3) </td>
                            <td style={{width:"50%",height:"50px",fontSize:"20px"}}>{maglumat && maglumat.m3} </td>
                            </tr>
                            </table> */}
                            <h1 className="modalLi" key={maglumat && maglumat.id}>
                             Haryt Surat
                            </h1>
                            <div>
                            {maglumat && maglumat.product_image && <img style={{width:"400px", height:"200px",objectFit:"contain"}} src={BASE_URL+"/"+maglumat.product_image} alt="product Img" />} 
                            
                            {maglumat && maglumat.surat2 && <img style={{width:"400px", height:"200px",objectFit:"contain"}} src={BASE_URL+"/"+maglumat.surat2} alt="product Img" />}
                             
                            {maglumat && maglumat.surat3 && <img style={{width:"400px", height:"200px",objectFit:"contain"}} src={BASE_URL+"/"+maglumat.surat3} alt="product Img" />}
                                </div>
                            </React.Fragment>
                        }
                </Drawer>
                <Drawer
                width={400}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
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