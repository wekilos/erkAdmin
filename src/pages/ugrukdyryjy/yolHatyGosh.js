import React, { useContext, useState } from "react";

import { Input, Steps, Button, message, Upload } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled, CloseCircleOutlined ,UploadOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import "./yolHatyGosh.css";
import axios from "axios";
import fetch from "node-fetch";
import { ErkContext } from "../../context/Condex";


const YolHatyGosh = (props) => {
  const {dil} = useContext(ErkContext)
let getData = props.getData;

  const [ name_tm ,setName_tm] = useState();
  const [ name_ru ,setName_ru] = useState("");
  const [ description_tm ,setDescription_tm] = useState("");
  const [ description_ru ,setDescription_ru] = useState("");
  const [ question_tm ,setQuestion_tm] = useState("");
  const [ question_ru ,setQuestion_ru] = useState("");
  
  const onSubmit = async(event) => {
    

    await axiosInstance.post("/api/sorag/create",{
      name_tm:name_tm,
      name_ru:name_ru,
      question_tm:question_tm,
      question_ru:question_ru,
      description_tm:description_tm,
      description_ru:description_ru,
    }).then((data)=>{
      console.log(data.data);
      getData();
      setName_tm("");
      setName_ru("");
      setQuestion_ru("");
      setQuestion_tm("");
      setDescription_ru("");
      setDescription_tm("");
    }).catch((err)=>{
      console.log(err);
    })
  };
  
    

  return (
    <div className="yolHaty-gosh">
      <form className="yolHaty--form" >
    
        <div className="steps-content">
            <div className="step1">
              <Input 
              onChange={(e)=>{setName_tm(e.target.value)}} 
              value={name_tm} 
              addonBefore={dil=="tm"?"Ady tm":"Имя tm"}
              className="yolHaty-gosh--input" />
              <Input 
              onChange={(e)=>{setName_ru(e.target.value)}} 
              value={name_ru} 
              addonBefore={dil=="tm"?"Ady ru":"Имя ru"}
              className="yolHaty-gosh--input" />
             
              <br></br>
              
              <Input
                onChange={(e)=>{setQuestion_tm(e.target.value)}}
                value={question_tm}
                addonBefore={dil=="tm"?" Sorag tm ":"Вопрос tm"}
                className="yolHaty-gosh--input"
              />
              <Input
                onChange={(e)=>{setQuestion_ru(e.target.value)}}
                value={question_ru}
                addonBefore={dil=="tm"?" Sorag ru ":"Вопрос ru"}
                className="yolHaty-gosh--input"
              />
              <br></br>
              <Input
                onChange={(e)=>{setDescription_tm(e.target.value)}}
                value={description_tm}
                addonBefore={dil=="tm"?"Jogap tm":"Ответ tm"}
                className="yolHaty-gosh--input suruji"
              />
              <Input
                onChange={(e)=>{setDescription_ru(e.target.value)}}
                value={description_ru}
                addonBefore={dil=="tm"?"Jogap ru":"Ответ ru"}
                className="yolHaty-gosh--input"
              />
              <br></br>
              
            </div>
         
        </div>
        <div className="steps-action">
         
          
            <Button
              type="primary" 
              onClick={()=>{onSubmit()}}
            >
              {dil=="tm"?"Döret":"Создать"}
            </Button>
       
        </div>
      </form>
    </div>
  );
};

export default YolHatyGosh;
