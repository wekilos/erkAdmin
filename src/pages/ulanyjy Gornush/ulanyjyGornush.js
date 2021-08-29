import React, { useState,useEffect } from 'react';
import {Table,Button,Space,Drawer,message,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined,PlusCircleFilled,PlusOutlined } from '@ant-design/icons';
import {BASE_URL,axiosInstance} from '../../utils/axiosIntance'
import UlanyjyYagdayy from './ulanyjyYagdayy';
import UlanyjyGosh from './ulanyjyYagdayyGosh';
import axios from 'axios'
import './ulanyjyGornush.css';


         
const UlanyjyGornush = (props)=>{

    let [data,setData]=useState([]); 

        useEffect(()=>{
        GetData()
        },[]);



    const GetData = async()=>{
    //   await axiosInstance.get('/api/user/type').then((data)=>{
    //     setData(data.data) ;
    //     console.log("gelen data:",data);
    //     }).catch((err)=>{
    //        console.log("get error:",err);
    //         setData("") ;
            
    //     })
    }
  
    // const GornushUytget = (event)=>{
    //     event.preventDefault();
    //     let type=event.target.type.value;
    //     let number=[];
    //     if(event.target.dashbord.checked){number.push(event.target.dashbord.value)}
    //     if(event.target.ugrukdyryjy.checked){number.push(event.target.ugrukdyryjy.value)}
    //     if(event.target.doktor.checked){number.push(event.target.doktor.value)}
    //     if(event.target.mashynlar.checked){number.push(event.target.mashynlar.value)}
    //     if(event.target.mehanik.checked){number.push(event.target.mehanik.value)}
    //     if(event.target.garaz.checked){number.push(event.target.garaz.value)}
    //     if(event.target.hasaphana.checked){number.push(event.target.hasaphana.value)}
    //     if(event.target.bildirishler.checked){number.push(event.target.bildirishler.value)}
    //     if(event.target.sazlamalar.checked){number.push(event.target.sazlamalar.value)}
    //     console.log("type: ",type," number: ",number);

    //     axiosInstance
    //     .post('/api/create_type', {
    //        data:{
    //           type: type,
    //           numbers: number
    //        }
    //     } ).then((data)=>{
    //     message.success(data.data.msg);
    //     setData("") ;
    //     }).catch((err)=>{
    //        console.log(err);
           
    //         message.error(data.data.msg);
    //         setData("") ;
            
    //     });

        

    // }

    const Barla=(item,tertip)=>{
        let count=0;
console.log("ARR"+ JSON.stringify(item));
for (let i = 0; i < item.length; i++) {

if(item[i].number===tertip){
   count+=1;
}}
if(count===0){
  return false
}else{
 return true   
}
}



    let renk;
    const columns = [
        {
           title:"Ady",
           dataIndex:"type_tm",
           with:"100px",
           
        },
        {
            with:"20px",
            title:"Dashbort",
            dataIndex:"dashbort",
            render: (text, record) => (
                <div  className="divTable">

                    {
                        Barla(record.permissions,1) ? <div style={{backgroundColor:"green"}} className="Nokat" />  : <div style={{backgroundColor:"red"}} className="Nokat" />
                    }
              
                </div>
              ),
        },
        {
            with:"20px",
            title:"Ugrukdyryjy",
            dataIndex:"ugrukdyryjy",
            render: (text, record) => (
                <div  className="divTable">
                   {
                        Barla(record.permissions,2) ? <div style={{backgroundColor:"green"}} className="Nokat" />  : <div style={{backgroundColor:"red"}} className="Nokat" />
                    }
                </div>
              ),
        },
        {
            title:"Doktor",
            dataIndex:"doctor",
            render: (text, record) => (
                <div  className="divTable">
                    {
                        Barla(record.permissions,3) ? <div style={{backgroundColor:"green"}} className="Nokat" />  : <div style={{backgroundColor:"red"}} className="Nokat" />
                    }
                </div>
              ),
        },
        {
            title:"Maşynlar",
            dataIndex:"mashynlar",
            render: (text, record) => (
                <div className="divTable">
                     {
                        Barla(record.permissions,4) ? <div style={{backgroundColor:"green"}} className="Nokat" />  : <div style={{backgroundColor:"red"}} className="Nokat" />
                    }
                </div>
              ),
        },
        {
            title:"Mehanik",
            dataIndex:"mehanik",
            render: (text, record) => (
                <div  className="divTable">
                     {
                        Barla(record.permissions,5) ? <div style={{backgroundColor:"green"}} className="Nokat" />  : <div style={{backgroundColor:"red"}} className="Nokat" />
                    }
                </div>
              ),
        },
        {
            title:"Garaž",
            dataIndex:"garaz",
            render: (text, record) => (
                <div  className="divTable">
                    {
                        Barla(record.permissions,6) ? <div style={{backgroundColor:"green"}} className="Nokat" />  : <div style={{backgroundColor:"red"}} className="Nokat" />
                    }
                </div>
              ),
        },
        {
            title:"Hasaphana",
            dataIndex:"hasaphana",
            render: (text, record) => (
                <div  className="divTable">
                     {
                        Barla(record.permissions,7) ? <div style={{backgroundColor:"green"}} className="Nokat" />  : <div style={{backgroundColor:"red"}} className="Nokat" />
                    }
                </div>
              ),
        },
        {
            title:"Bildirişler",
            dataIndex:"bildirishler",
            render: (text, record) => (
                <div  className="divTable">
                     {
                        Barla(record.permissions,8) ? <div style={{backgroundColor:"green"}} className="Nokat" />  : <div style={{backgroundColor:"red"}} className="Nokat" />
                    }
                </div>
              ),
        },
        {
            title:"Sazlamalar",
            dataIndex:"sazlamalar",
            render: (text, record) => (
                <div  className="divTable">
                     {
                        Barla(record.permissions,9) ? <div style={{backgroundColor:"green"}} className="Nokat" />  : <div style={{backgroundColor:"red"}} className="Nokat" />
                    }
                </div>
              ),
        },
        {
            title:"Özgertmek we Öçürmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    <Popconfirm
                    title="Çyndan öçürmek isleýärsiňizmi?  Eger öçürseňiz şuňa degişli ulanyjylaram pozular!"
                    onConfirm={()=>TypeDelete(record.id)}
                    >
                    <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>                  
                    </Popconfirm>
                </Space>
              ),
        },
       
    ];

    const [edit,setEdit]=useState(false);
    const [gosh,setGosh]=useState(false);
    const [maglumat,setMaglumat]=useState({typeId:0,type:"",dashbord:false,ugrukdyryjy:false,doktor:false,mashynlar:false,mehanik:false,garaz:false,hasaphana:false,bildirishler:false,sazlamalar:false});
    let dashbord=false;
    let ugrukdyryjy=false;
    let doktor=false;
    let mashynlar=false;
    let mehanik=false;
    let garaz=false;
    let hasaphana=false;
    let bildirishler=false;
    let sazlamalar=false;

    const [color,setColor]=useState(false);

    
    const TypeDelete =async (event)=>{
console.log("IDDD"+event);

    //   await  axiosInstance.post("/api/type_delete/"+event).then((data)=>{
    //         message.success(data.data.msg);
    //         GetData();
    //     }).catch((err)=>{
    //         console.log(err);
            
    //     })
       
    }
    const ShowDrawerClose=()=>{
        setEdit(false);
        setMaglumat({...maglumat,typeId:0,type:"",dashbord:false,ugrukdyryjy:false,doktor:false,mashynlar:false,mehanik:false,garaz:false,hasaphana:false,bildirishler:false,sazlamalar:false});
        console.log("yapylanda:",maglumat);
    }
    const ShowDrawer =(event)=>{
          setEdit(true);
          console.log("show drawer:",event);
          let typeId=event.id;
          console.log(typeId);
          let type=event.type;
          let numbers = event.permissions;
    numbers.map((number)=>{
        console.log(number.number);
        if(number.number===1){dashbord=true;}
        if(number.number===2){ugrukdyryjy=true;}
        if(number.number===3){doktor=true;}
        if(number.number===4){mashynlar=true;}
        if(number.number===5){mehanik=true;}
        if(number.number===6){garaz=true;}
        if(number.number===7){hasaphana=true;}
        if(number.number===8){bildirishler=true;}
        if(number.number===9){sazlamalar=true;}
    })
    setMaglumat({
        ...maglumat,
        typeId:typeId,
        type:type,
        dashbord:dashbord,
        ugrukdyryjy:ugrukdyryjy,
        doktor:doktor,
        mashynlar:mashynlar,
        mehanik:mehanik,
        garaz:garaz,
        hasaphana:hasaphana,
        bildirishler:bildirishler,
        sazlamalar:sazlamalar
    });
    

    }
    const ShowDrawer2 =(event)=>{
        setGosh(!gosh);
  }
    
    

    const GornushGosh = (event)=>{
        event.preventDefault();
        let type=event.target.gornushi;
        let number = [];


        const formData = new FormData()
        formData.append('type', type)
        formData.append('number', number)

        // axiosInstance
        // .post( '/api/create_type', formData ).then((data)=>{
        // message.success(data.msg);
        // }).catch((err)=>{
        //     message.error(err.message);
            
        // })
    }

    

   




    return(
        <div className='UlanyjyGornush'>
                <Drawer
                width={400}
                className='ulanyjyGornush--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={(e)=>ShowDrawerClose(e)}
                visible={edit}
                footer={[
                    
                  ]}>
                    <UlanyjyYagdayy value={maglumat} GetData={GetData}  ShowDrawerClose={ShowDrawerClose}/>
                </Drawer>
                <Drawer
                width={400}
                className='ulanyjyGornush--drawer'
                title="Ulanyjy Goşmak"
                placement="right"
                onClose={()=>ShowDrawer2()}
                visible={gosh}
                footer={[
                    
                  ]}>
                    <UlanyjyGosh onClick={ShowDrawer2} GornushGosh={GornushGosh} GetData={GetData} ShowDrawer2={ShowDrawer2} />
                </Drawer>
            <Table columns={columns} dataSource={data} />
            <div className="goshmakButtonn-div" onClick={ShowDrawer2}>
                <PlusOutlined className="goshmakButtonn"/>
            </div>            
        </div>
    );
};

export default UlanyjyGornush;