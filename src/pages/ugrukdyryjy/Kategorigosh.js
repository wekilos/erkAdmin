import React, { useState } from "react";

import { Input, Steps, Button, message, Upload } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled, CloseCircleOutlined ,UploadOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import "./yolHatyGosh.css";
import axios from "axios";
import fetch from "node-fetch";


const YolHatyGosh = (props) => {
let getData = props.getData;
  const [ name_tm ,setName_tm] = useState("");
  const [ name_ru ,setName_ru] = useState("");
  const [ description_tm ,setDescription_tm] = useState("");
  const [ description_ru ,setDescription_ru] = useState("");
  const [sene_tm, setSene_tm] = useState("");
  const [sene_ru, setSene_ru] = useState("");
  const [details_tm,setDetails_tm ] = useState("");
  const [details_ru,setDetails_ru ] = useState("");

  const ShertGosh = ()=>{
    
    axiosInstance.post("/api/shert/create",{
      name_tm:name_tm,
      name_ru:name_ru,
      description_tm:description_tm,
      description_ru:description_ru,
      sene_tm:sene_tm,
      sene_ru:sene_ru,
      details_tm:details_ru,
      details_ru:details_ru,
    }).then((data)=>{
      console.log(data.data);
      message.success(data.data.msg);
      setName_tm();
      setName_ru();
      setDescription_tm();
      setDescription_ru();
      setSene_tm();
      setSene_ru();
      setDescription_tm();
      setDescription_ru();
      setDetails_tm();
      setDetails_ru();
      getData();
    }).catch((err)=>{
      console.log(err);
    })
  }
    

  return (
    <div className="yolHaty-gosh">
      <form className="yolHaty--form" >
    
        <div className="steps-content">
            <div className="step1">
              <div className="yolHatyTable--uytgetmeler">
                <div className="yolHatyTable--uytgetmeler" style={{width:"100%",justifyContent:"center"}}>
                <Input
                    style={{margin:"10px 0px"}}
                    addonBefore="Ady tm"
                    className="suruji-uytget--input"
                    name="name_tm"
                    value={name_tm}
                    onChange={(e)=>setName_tm(e.target.value)}
                    />
                    <Input
                    style={{margin:"10px 0px"}}
                    addonBefore="Ady ru"
                    className="suruji-uytget--input"
                    value={name_ru}
                    onChange={(e)=>setName_ru(e.target.value)}
                    />
                    <Input
                    style={{margin:"10px 0px"}}
                    addonBefore="Description tm"
                    className="suruji-uytget--input"
                    value={description_tm}
                    onChange={(e)=>setDescription_tm(e.target.value)}
                    />
                    <Input
                    style={{margin:"10px 0px"}}
                    addonBefore="Description ru"
                    className="suruji-uytget--input"
                    value={description_ru}
                    onChange={(e)=>setDescription_ru(e.target.value)}
                    />
                    <Input
                    style={{margin:"10px 0px"}}
                    addonBefore="Sene tm"
                    className="suruji-uytget--input"
                    value={sene_tm}
                    onChange={(e)=>setSene_tm(e.target.value)}
                    />
                    <Input
                    style={{margin:"10px 0px"}}
                    addonBefore="Sene ru"
                    className="suruji-uytget--input"
                    value={sene_ru}
                    onChange={(e)=>setSene_ru(e.target.value)}
                    />
                    <Input
                    style={{margin:"10px 0px"}}
                    addonBefore="Details tm"
                    className="suruji-uytget--input"
                    value={details_tm}
                    onChange={(e)=>setDetails_tm(e.target.value)}
                    />
                    <Input
                    style={{margin:"10px 0px"}}
                    addonBefore="Details ru"
                    className="suruji-uytget--input"
                    value={details_ru}
                    onChange={(e)=>setDetails_ru(e.target.value)}
                    />
                </div>
                    <Button
                    type="primary"
                    shape="round"
                    onClick={()=>ShertGosh()}
                    >
                    Gosh
                    </Button>
                </div>
            </div>
         
        </div>
        {/* <div className="steps-action">
         
          
            <Button
              type="primary" 
              onClick={()=>{onSubmit()}}
            >
              Döret
            </Button>
       
        </div> */}
      </form>
    </div>
  );
};

export default YolHatyGosh;
