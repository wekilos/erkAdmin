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
            title:"Order No",
            dataIndex:"id"
        },
        
        {
            title:"Umumy baha",
            dataIndex:"total_price"
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
            title:"Haýsy Ýol",
            render:(text,record)=>(
               <div>
                <div>{record.yol==1 && "Deňiz gatnawlary"}</div> 
                <div>{record.yol==2 && "Howa gatnawlary"}</div> 
                <div>{record.yol==3 && "Demirýol gatnawlary"}</div> 
                <div>{record.yol==4 && "Awtoulag gatnawlary"}</div> 
            </div>
            )

        },
        {
            title:"Zakaz edilen wagty",
            dataIndex:"order_date_time",
            render:(text,record)=>(
                <div>
                   <p> { record.ordered_date && record.ordered_date.slice(0,10) }</p> 
                   <p>{ record.ordered_date && record.ordered_date.slice(11,19)}</p>
                    
                </div>
            )
        },
        {
            title:"Haryt Ugratýan",
            dataIndex:"ugradyjy_ady",
            // render:(text,record)=>(
            //     <div>
            //         {record.is_cash && "Nagt töleg"}
            //         {!record.is_cash && "Kart bilen töleg"}
            //     </div>
            // )
        },
        {
            title:"Haryt Kabul etýän",
            dataIndex:"kabulediji_ady",
            render:(text,record)=>(
                <div>
                    <div>{record.kabulediji_ady}</div>
                    <div>{record.phoneNumber }</div>
                </div>
            )
        },
        {
            title:"Ýük Häzir",
            dataIndex:"yukHazir",
            // render:(text,record)=>(
            //     <div>
            //         {record.is_cash && "Nagt töleg"}
            //         {!record.is_cash && "Kart bilen töleg"}
            //     </div>
            // )
        },
        {
            title:"Zakaz status",
            render:(text,record)=>(
                <div>
                    {record.statusId==1 && "Gelmegine garaşylýar"}
                    {record.statusId==2 && "Ammara geldi"} 
                    {record.statusId==3 && "Ýüküňiz ugradyldy!"} 
                    {record.statusId==4 && "Ýolda"} 
                    {record.statusId==5 && "Türkmenistanyň ammaryna geldi"} 
                    {record.statusId==6 && "Gowşurma nokadyna ugradyldy"}
                </div>
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
                     <Button type='primary'shape='round'onClick={()=>ShowInformation(record)} >Goşmaça</Button>
                     <Popconfirm
                        title="Çyndan Sargyt Kabul edildimi?"
                        onConfirm={()=>Gowshuryldy(record)} 
                        // onCancel={cancel}
                        okText="Howa"
                        cancelText="Ýok"
                    >
                    <Button type='primary'shape='round' >Gowşuryldy</Button>               

                    </Popconfirm>
                    </Space>
                    <Space style={{marginTop:"10px"}}>
                     <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                     
                     <Popconfirm
                        title="Çyndan Sargyt ýatyryldymy?"
                        onConfirm={()=>Yatyryldy(record)} 
                        // onCancel={cancel}
                        okText="Howa"
                        cancelText="Ýok"
                    >
                    <Button danger type='primary'shape='round' >Ýatyryldy</Button>               

                    </Popconfirm>
                    <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteOrder(record)} 
                        // onCancel={cancel}
                        okText="Howa"
                        cancelText="Ýok"
                    >
                        <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>                 

                    </Popconfirm>
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
        <div className='LukmanTable'>
                <Drawer
                    width={500}
                    className='lukman-table--drawer'
                    title="Goşmaça Maglumat"
                    placement="right"
                    onClose={()=>ShowInformation()}
                    visible={info}>
                         { maglumat && <React.Fragment>
                          <table style={{width:"100%"}} border="1" className="goshmacha--ul">
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
                            </table>
                            <h1 className="modalLi" key={maglumat && maglumat.id}>
                             Haryt Surat
                            </h1>
                            <div>
                            {maglumat && maglumat.product_image && <img style={{width:"400px", height:"200px",objectFit:"contain"}} src={BASE_URL+"/"+maglumat.product_image} alt={BASE_URL+maglumat.product_image} />} 
                            
                            {maglumat && maglumat.surat2 && <img style={{width:"400px", height:"200px",objectFit:"contain"}} src={BASE_URL+"/"+maglumat.surat2} alt="product Img" />}
                             
                            {maglumat && maglumat.surat3 && <img style={{width:"400px", height:"200px",objectFit:"contain"}} src={BASE_URL+"/"+maglumat.surat3} alt="product Img" />}
                                </div>
                                <h1 style={{marginTop:"20px"}} className="modalLi" key={maglumat && maglumat.id}>
                             Haryt Surat Admin Goşan
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