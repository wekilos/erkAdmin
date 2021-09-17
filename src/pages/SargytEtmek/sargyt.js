import React, { useState,useEffect } from "react";

import { Button, Input, message, Select } from "antd";
import { useLocation } from "react-router";
import upload from "../../img/upload.png"
import "./sargyt.css";
import { axiosInstance } from "../../utils/axiosIntance";
const {Option} =Select;
const Sargyt = ()=>{

    const [user,setUser] = useState({});
    const [yol,setYol] = useState(null);
    const [ugratyanAdy,setUgratyanAdy] = useState();
    const [kabuledijinAdy,setKabuledijinAdy] = useState();
    const [phoneNumber,setPhoneNumber] = useState();
    const [productName,setProductName] = useState();
    const [guty,setGuty] = useState();
    const [kg,setKg] = useState();
    const [m3,setM3] = useState();
    const [baha,setBaha] = useState();
    const [img1,setImg1]= useState();
    const [img2,setImg2]= useState();
    const [img3,setImg3]= useState();
    const [active,setActive] = useState(false);

    const SargytEt = async()=>{
       let formData = new FormData();
       if(img1){
        formData.append("surat1",img1)
       }
       if(img2){
        formData.append("surat2",img2)
       }
       if(img3){
        formData.append("surat3",img3)
       }
       if(yol){
        formData.append("yol",yol)
       }
       if(ugratyanAdy){
        formData.append("ugradyjy_ady",ugratyanAdy)
       }
       if(kabuledijinAdy){
        formData.append("kabulediji_ady",kabuledijinAdy)
       }
       if(phoneNumber){
        formData.append("phoneNumber",phoneNumber)
       }
       if(productName){
        formData.append("product_name",productName)
       }
       if(guty){
        formData.append("guty_sany",guty)
       }
       if(kg){
        formData.append("kg",kg)
       }
       if(m3){
        formData.append("m3",m3)
       }
       if(baha){
        formData.append("total_price",baha)
       }
        axiosInstance.post("/api/sargyt/create/"+user.id,formData).then((data)=>{
            console.log(data.data);
            message.success("successfully");
            setYol();
            setUgratyanAdy();
            setKabuledijinAdy();
            setPhoneNumber();
            setProductName();
            setPhoneNumber();
            setGuty();
            setKg();
            setM3();
            setBaha();
            setImg1(null);
            setImg2(null);
            setImg3(null);
        }).catch((err)=>{
            console.log("errorr createing sargyt",err);
            message.error("maglumatlary dogry giriziň")
        })
    }

    const location = useLocation();
   useEffect(() => {
      console.log(location.pathname); // result: '/secondpage'
      // console.log(location.search); // result: '?query=abc'
      console.log(location.state.user); // result: 'some_value'
      setUser(location.state.user);
   }, [location]);

   useEffect(()=>{
        if(yol!="" && ugratyanAdy!=null  && kabuledijinAdy!=null  && phoneNumber!=null  && productName!=null  && guty!=null  && kg!=null  && m3!=null  && baha!=null ){
            setActive(true);
        }else{
            setActive(false)
        }
   },[yol,ugratyanAdy,kabuledijinAdy,phoneNumber,productName,guty,kg,m3,baha])
    return(
        <div className="sargyt-page">
            <div className="sargyt-form">
                <div className="sargyt-etyan">Sargyt Etmek: <span> {user.name && user.name} {user.lastname && user.lastname}</span> <span>+{user.phoneNumber && user.phoneNumber}</span></div>
                <div className="form-inputs">
                    <Select
                    placeholder='Ugur Saýlaň!'
                    onChange={(e)=>{setYol(e)}}
                    name='Ugur'  className='sargyt-select'>
                        <Option value="1">Deňiz gatnawlary</Option>
                        <Option value="2">Howa gatnawlary</Option>
                        <Option value="3">Demirýol gatnawlary</Option>
                        <Option value="4">Awtoulag gatnawlary</Option>
                    </Select>
                    <Input onChange={(e)=>setUgratyanAdy(e.target.value)} value={ugratyanAdy} addonBefore="Ugradyjynyň ady" className="form-input" />
                    <Input onChange={(e)=>setKabuledijinAdy(e.target.value)} value={kabuledijinAdy} addonBefore="Kabuledijiň ady" className="form-input" />
                    <Input onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber} addonBefore=" Telefon belgisi " className="form-input" />
                    <Input onChange={(e)=>setProductName(e.target.value)} value={productName} addonBefore="Haryt Ady" className="form-input" />
                    <Input onChange={(e)=>setGuty(e.target.value)} value={guty} addonBefore="Guty sany" className="form-input" />
                    <Input onChange={(e)=>setKg(e.target.value)} value={kg} addonBefore=" KG " className="form-input" />
                    <Input onChange={(e)=>setM3(e.target.value)} value={m3} addonBefore=" metrKub(m3) " className="form-input" />
                    <Input onChange={(e)=>setBaha(e.target.value)} value={baha} addonBefore="Umumy baha" className="form-input" />
                    <div className="upload-input">
                        <Input onChange={(e)=>setImg1(e.target.files[0])} hidden id="file-upload-button1" type="file" addonBefore="Haryt Surat 1" className="form-input" />
                        <label for="file-upload-button1">
                            <img for="file-upload-button1" src={upload} alt="upload"/>
                        </label>
                    </div>
                    <div className="upload-input">
                        <Input onChange={(e)=>setImg2(e.target.files[0])} hidden id="file-upload-button2" type="file" addonBefore="Haryt Surat 2" className="form-input" />
                        <label for="file-upload-button2">
                            <img for="file-upload-button2" src={upload} alt="upload"/>
                        </label>
                    </div>
                    <div className="upload-input">
                        <Input onChange={(e)=>setImg3(e.target.files[0])} hidden id="file-upload-button3" type="file" addonBefore="Haryt Surat 3" className="form-input" />
                        <label for="file-upload-button3">
                            <img for="file-upload-button3" src={upload} alt="upload"/>
                        </label>
                    </div>
                    <div className="button">
            { active &&  <Button  onClick={()=>SargytEt()} className="Button" type="primary" shape="round">Sargyt Et</Button>}                   
            { active == false &&  <Button disabled  onClick={()=>SargytEt()} className="Button" type="primary" shape="round">Sargyt Et</Button>}                    </div>

                </div>
            </div>
        </div>
    )
}

export default Sargyt;