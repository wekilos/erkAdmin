import React,{useState} from 'react';

import {Select,Input,Button, Checkbox,message,Space} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';
import {BASE_URL,axiosInstance} from "../../utils/axiosIntance";
import './ulanyjyYagdayy.css';

const Option = {Select};

const UlanyjyYagdayy = (props) =>{

   const GetData=props.GetData;
    const [data,setData]=useState();

    const ShowDrawer2=props.ShowDrawer2;

    const inputChangeHandlerInput=(event)=>{
        console.log("ine:",event.target.name);
        let name=event.target.name;
        let value=event.target.value;
      
        setData({
            ...data,
            [name]:value
        })            
      }
      const inputChangeHandler=(event)=>{
         console.log("ine checkbox:",event.target.checked);
         let name=event.target.name;
        let value=event.target.checked;
        setData({
         ...data,
         [name]:value
     }) 
      }

      const GornushGosh = (event)=>{
        event.preventDefault();
        let type=event.target.type.value;
        let number=[];
        if(event.target.dashbord.checked){number.push(event.target.dashbord.value)}
        if(event.target.ugrukdyryjy.checked){number.push(event.target.ugrukdyryjy.value)}
        if(event.target.doktor.checked){number.push(event.target.doktor.value)}
        if(event.target.mashynlar.checked){number.push(event.target.mashynlar.value)}
        if(event.target.mehanik.checked){number.push(event.target.mehanik.value)}
        if(event.target.garaz.checked){number.push(event.target.garaz.value)}
        if(event.target.hasaphana.checked){number.push(event.target.hasaphana.value)}
        if(event.target.bildirishler.checked){number.push(event.target.bildirishler.value)}
        if(event.target.sazlamalar.checked){number.push(event.target.sazlamalar.value)}
        console.log("type: ",type," number: ",number);

 

      //   axiosInstance
      //   .post('/api/create_type', {
      //      data:{
      //         type: type,
      //         numbers: number
      //      }
      //   } ).then((data)=>{
      //   message.success(data.data.msg);
      //   setData("") ;
      //    GetData();
      //   }).catch((err)=>{
      //      console.log(err);
           
      //       message.error(data.data.msg);
      //       setData("") ;
            
      //   })

       

    }
    

  
  

    return (
        <div className='ulanyjy-yagdayy'>
            <form className='ulanyjy-yagdayy--form' onSubmit={GornushGosh} method="POST">
                <Input name='type' addonBefore='Görnüşi' value={data && data.type} onChange={inputChangeHandlerInput}  className='ulanyjy-yagdayy--input' />
                <ul >
                    <li className="List_item">
                       <Checkbox className="check" value="1" checked={data && data.dashbord} onChange={inputChangeHandler}  name="dashbord"> Dashboard </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="2"  checked={data && data.ugrukdyryjy} onChange={inputChangeHandler}  name="ugrukdyryjy"> Ugrukdyryjy </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="3"  checked={data && data.doktor} onChange={inputChangeHandler}  name="doktor"> Doktor </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="4"  checked={data && data.mashynlar} onChange={inputChangeHandler}  name="mashynlar"> Maşynlar </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="5"  checked={data && data.mehanik} onChange={inputChangeHandler}  name="mehanik"> Mehanik </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="6"  checked={data && data.garaz} onChange={inputChangeHandler}  name="garaz"> Garaž </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="7"  checked={data && data.hasaphana} onChange={inputChangeHandler}  name="hasaphana"> Hasaphana </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="8"  checked={data && data.bildirishler} onChange={inputChangeHandler}  name="bildirishler"> Bildirişler </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="9"  checked={data && data.sazlamalar} onChange={inputChangeHandler}  name="sazlamalar"> Sazlamalar </Checkbox>
                    </li>
                </ul>
                <Space className='buttons'>
                    <Button icon={<PlusCircleFilled/>} 
                     shape='round' 
                    type='primary'htmlType="submit" 
                    className='ulanyjy-yagdayy--button'>Döretmek
                    </Button>
                    <Button onClick={ShowDrawer2} 
                    shape='round' danger type='primary'
                     className='ulanyjy-yagdayy--button'>Goýbolsyn
                     </Button>
                     </Space>
            </form>
        </div>
    );
};

export default UlanyjyYagdayy;