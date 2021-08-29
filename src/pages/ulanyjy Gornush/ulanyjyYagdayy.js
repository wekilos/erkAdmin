import React,{useState,useEffect} from 'react';

import {Select,Input,Button, Checkbox,message,Space} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';
import {BASE_URL,axiosInstance} from "../../utils/axiosIntance";
import './ulanyjyYagdayy.css';

const Option = {Select};

const UlanyjyYagdayy = props =>{

    const ShowDrawerClose=props.ShowDrawerClose;
   
    
    const [maglumat,setMaglumat]=useState();
    useEffect(()=>{
        setMaglumat(props.value);
    },[props.value])
    const [data,setData]=useState();
    console.log("maglumat shu:",maglumat);
    

   

    const inputChangeHandlerInput=(event)=>{
        console.log(event.target.name);
        let name=event.target.name;
        let value=event.target.value;
      
        setMaglumat({
            ...maglumat,
            [name]:value
        })            
      }

      const inputChangeHandler=(event)=>{
        console.log("ine checkbox:",event.target.checked);
        let name=event.target.name;
       let value=event.target.checked;
       setMaglumat({
        ...maglumat,
        [name]:value
    }) 
     }
     const GetData=props.GetData;
      const GornushGosh = (event)=>{
        event.preventDefault();
        let typeId=event.target.type.id;
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
      //   .post('/api/permission_delete', {
      //      data:{
      //         typeId: typeId,
      //         numbers: number
      //      }
      //   } ).then((data)=>{
      //   message.success(data.data.msg);
      //   setData("") ;
      //   GetData();
      //   }).catch((err)=>{
      //      console.log(err);
           
        
      //       setData("") ;
            
      //   });

        

    }


    return (
        <div className='ulanyjy-yagdayy'>
            <form className='ulanyjy-yagdayy--form' onSubmit={GornushGosh}>
                <Input value={maglumat && maglumat.type} id={maglumat && maglumat.typeId} onChange={(e)=>inputChangeHandlerInput(e)}  name='type' addonBefore='Görnüşi'  className='ulanyjy-yagdayy--input' />
                <ul >
                <li className="List_item">
                       <Checkbox className="check" value="1" checked={maglumat && maglumat.dashbord} onChange={inputChangeHandler}  name="dashbord"> Dashboard </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="2"  checked={maglumat && maglumat.ugrukdyryjy} onChange={inputChangeHandler}  name="ugrukdyryjy"> Ugrukdyryjy </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="3"  checked={maglumat && maglumat.doktor} onChange={inputChangeHandler}  name="doktor"> Doktor </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="4"  checked={maglumat && maglumat.mashynlar} onChange={inputChangeHandler}  name="mashynlar"> Maşynlar </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="5"  checked={maglumat && maglumat.mehanik} onChange={inputChangeHandler}  name="mehanik"> Mehanik </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="6"  checked={maglumat && maglumat.garaz} onChange={inputChangeHandler}  name="garaz"> Garaž </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="7"  checked={maglumat && maglumat.hasaphana} onChange={inputChangeHandler}  name="hasaphana"> Hasaphana </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="8"  checked={maglumat && maglumat.bildirishler} onChange={inputChangeHandler}  name="bildirishler"> Bildirişler </Checkbox>
                    </li>
                    <li className="List_item">
                       <Checkbox className="check" value="9"  checked={maglumat && maglumat.sazlamalar} onChange={inputChangeHandler}  name="sazlamalar"> Sazlamalar </Checkbox>
                    </li>
                </ul>
                <Space className='buttons'>
                    <Button icon={<PlusCircleFilled/>} 
                    shape='round' 
                    type='primary'htmlType="submit" 
                    className='ulanyjy-yagdayy--button'>Üýtgetme
                    </Button>
                    <Button onClick={ShowDrawerClose} 
                    shape='round' danger type='primary'
                     className='ulanyjy-yagdayy--button'>Goýbolsyn
                     </Button>
                     </Space>
            </form>
        </div>
    );
};

export default UlanyjyYagdayy;