import React,{useState,useEffect, useContext} from 'react';
import { Input,Button,Select, message } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import './ulanyjyGosh.css';
import { BASE_URL,axiosInstance } from '../../../utils/axiosIntance';
import { ErkContext } from '../../../context/Condex';

const UlanyjyGosh = (props)=>{
    const {dil} = useContext(ErkContext)
    const ulanyjyGosh=props.ulanyjyGosh;
    const Close=props.onClick;
    const [typeId ,setTypeId] = useState(null)
    const { Option } = Select;
    const [data,setData]=props.data;
    const [select,setSelect]=useState();
    const userTypes=props.userTypes;
    console.log("user type:",userTypes);
    const GetData=props.GetData;

  

    const onSubmit=(event)=>{
        event.preventDefault();

        console.log("ulanujy gosh:",event);
        let name=event.target.name.value;
        let password=event.target.password.value;
        let password2=event.target.password2.value;
        let lastname=event.target.lastname.value;
        let phoneNumber = event.target.phoneNumber.value;
        let email = event.target.email.value;
   if(password===password2){
    
        axiosInstance.post("/api/user/create",{
            name:name, 
            lastname:lastname,
            phoneNumber:phoneNumber,
            password:password,
            type:typeId,
            phoneNumber:phoneNumber,
            email:email,
        }).then((data)=>{
            message.success(data.data.msg);
            GetData();
        }).catch((err)=>{
            console.log(err);
        });
        Close();
    }else{
        message.error("Password meňzeş girizmeli!");
    }
    }
    const InputHandler=props.InputHandler;

    return(
        <div className='ulanyjyGosh'>
            <form className='ulanyjylar--form' onSubmit={onSubmit}>
                <Input addonBefore={dil=="tm"?'Ady':"Имя"} value={ulanyjyGosh.name} name='name' onChange={InputHandler} className='ulanyjylar-gosh--input' />
                <Input addonBefore={dil=="tm"?'Familýasy':"Фамилия"} value={ulanyjyGosh.lastname} name='lastname' onChange={InputHandler} className='ulanyjylar-gosh--input'  />
                <Input addonBefore={dil=="tm"?'Mail':"Почта"} value={ulanyjyGosh.email} name='email' onChange={InputHandler} className='ulanyjylar-gosh--input' />
                <Input addonBefore={dil=="tm"?'Telefon belgi':"Номер телефона"} value={ulanyjyGosh.phoneNumber} name='phoneNumber' onChange={InputHandler} className='ulanyjylar-gosh--input'  />
                <Input addonBefore={dil=="tm"?'password':"пароль"} type="password" value={ulanyjyGosh.password} name='password' onChange={InputHandler} className='ulanyjylar-gosh--input'/>
                <Input addonBefore={dil=="tm"?'password':"пароль"}  type="password" value={ulanyjyGosh.password2} name='password2' onChange={InputHandler} className='ulanyjylar-gosh--input'/>
                <Select
                    placeholder={dil=="tm"?'Status Saýlaň!':"Выбрать Статус!"}
                    showSearch
                 element='select'
                 label="Status" 
                 onChange={(value)=> setTypeId(value)}
                 defaultOption='Statusy saýlaň!' name='typeID' id="typeID" className='ulanyjylar-gosh--input'
                >
                    <Option value="1">{dil=="tm"?"Ulanyjy":"Пользователь"}</Option>
                    <Option value="2">{dil=="tm"?"Admin":"Админ"}</Option>

               </Select>
                <Button icon={<PlusCircleFilled/>} shape='round' type='primary'htmlType="submit" className='ulanyjylar-gosh--button'>{dil=="tm"?"Hasaba al":"Регистр"}</Button>
                <Button onClick={()=>Close()} shape='round' danger type='primary' className='ulanyjylar-gosh--button'>{dil=="tm"?"Cancel":"Отмена"}</Button>
            </form>
        </div>
    );
};

export default UlanyjyGosh;