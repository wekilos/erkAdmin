import React,{useContext, useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import TextArea from 'antd/lib/input/TextArea';
import { axiosInstance } from '../../utils/axiosIntance';
import upload from "../../img/upload.png";
import { ErkContext } from '../../context/Condex';

const Option = {Select};

const SurujiYagdayy = props =>{
    const {dil} = useContext(ErkContext);
    const getOrders = props.getOrders;
    const [emaglumat,setEmaglumat] =  props.order;
    const [status,setStatus ] = useState([]);
    const [statusId,setStatusId] = useState();
    const [yukHazir,setYukHazir] = useState();
    const [img1,setImg1]= useState();
    const [img2,setImg2]= useState();
    const [img3,setImg3]= useState();
    console.log("orders",emaglumat);

    useEffect(()=>{
        getStatus()
    },[])

    const getStatus =()=>{
        axiosInstance.get("/api/statuslar").then((data)=>{
            console.log(data.data);
            setStatus(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const Uytget=async()=>{
        console.log(statusId,yukHazir,emaglumat.id)
        
        await axiosInstance.patch("/api/sargyt/update/staus/"+emaglumat.id,{
            status_id:statusId,
            yukHazir:yukHazir
        }).then((data)=>{
            console.log(data.data);
            message.success(data.data.msg);
            getOrders();
            setStatusId(null);
        }).catch((err)=>{
            console.log(err);
        })
    }
    
    const onChangeS = (value)=>{
        console.log(value,emaglumat.id);
        setStatusId(value);
        
    }
    

    const SuratGosh = async()=>{
        let formData = new FormData();
        if(img1){
        formData.append("surat4",img1);}
        if(img2){
        formData.append("surat5",img2);}
        if(img3){
        formData.append("surat6",img3);}
           
            console.log(img1,img2,img3)
        axiosInstance.patch("/api/sargyt/update/admin/"+emaglumat.id,formData).then((data)=>{
            console.log(data.data);
            message.success("successfully");
            getOrders();
            setImg1(null);
            setImg2(null);
            setImg3(null);
        }).catch((err)=>{
            console.log("errorr createing sargyt",err);
            message.error("maglumatlary dogry giriziň")
        })
    }
 
      

    return (
        <div className='suruji-yagdayy'>
            <form className='suruji-yagdayy--form' >
                <h1 style={{width:"90%"}}>{emaglumat && emaglumat.Status && emaglumat.Status.name_tm}</h1>
                <Input value={yukHazir} onChange={(e)=>setYukHazir(e.target.value)} addonBefore={dil=="tm"?"Yük Häzir":"Груз сейчас"} />
                <Select
                    style={{width:"90%"}}
                    className='suruji-yagdayy--input' 
                    // className="yolHaty-gozle--input"
                    showSearch
                    // style={{ width: 200 }}
                    placeholder={dil=="tm"?"Status üýtget":"Изменить статус"}
                    optionFilterProp="children"
                    value={statusId}
                    onChange={onChangeS}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
            
            <Option value="1" >{dil=="tm"?"Gelmegine garaşylýar":"Ожидается к прибытью"}</Option>
            <Option value="2" >{dil=="tm"?"Ammara geldi":"Груз прибыл на склад"}</Option>
            <Option value="3" >{dil=="tm"?"Ýüküňiz ugradyldy":"Груз отправлен"}</Option>
            <Option value="4" >{dil=="tm"?"Ýolda":"В пути"}</Option>
            <Option value="5" >{dil=="tm"?"Türkmenistanyň gümrügine geldi":"Прибыл на таможню Туркменистана"}</Option>
            <Option value="6" >{dil=="tm"?"Gowşurma nokadyna ugradyldy":"Отправлен в пункт доставки"}</Option>
          </Select>

                <Button onClick={Uytget} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>{dil=="tm"?"Status üýtget":"Изменить статус"}</Button>
                <Button onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>{dil=="tm"?"Goýbolsun":"Отменить"}</Button>
            </form>
            <form style={{marginTop:"30px",height:"45px"}}>
                    <div className="upload-input" style={{height:"45px"}}>
                        <Input  onChange={(e)=>setImg1(e.target.files[0])} hidden id="file-upload-button1" type="file" addonBefore={img1?dil=="tm"?"Ýüklendi":"Загружено":dil=="tm"?"Haryt Surat 1":"Изображение груза 1"} className="form-input" />
                        <label for="file-upload-button1">
                            <img for="file-upload-button1" src={upload} alt="upload"/>
                        </label>
                    </div>
                    <div className="upload-input" style={{marginTop:"30px",height:"45px"}} >
                        <Input onChange={(e)=>setImg2(e.target.files[0])} hidden id="file-upload-button2" type="file" addonBefore={img2?dil=="tm"?"Ýüklendi":"Загружено":dil=="tm"?"Haryt Surat 2":"Изображение груза 2"} className="form-input" />
                        <label for="file-upload-button2">
                            <img for="file-upload-button2" src={upload} alt="upload"/>
                        </label>
                    </div>
                    <div className="upload-input" style={{marginTop:"30px",height:"45px"}}>
                        <Input onChange={(e)=>setImg3(e.target.files[0])} hidden id="file-upload-button3" type="file" addonBefore={img3?dil=="tm"?"Ýüklendi":"Загружено":dil=="tm"?"Haryt Surat 3":"Изображение груза 3"} className="form-input" />
                        <label for="file-upload-button3">
                            <img for="file-upload-button3" src={upload} alt="upload"/>
                        </label>
                    </div>
                    <Button style={{width:"210px",margin:"30px 20%"}} onClick={SuratGosh} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>{dil=="tm"?"Surat goş":"Добавить изображение"}</Button>
            
            </form>
        </div>
    );
};

export default SurujiYagdayy;