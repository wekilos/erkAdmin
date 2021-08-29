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
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            });
            let surat1={};
            let surat2={};
            let surat3={};
            if(img1){
             surat1 = {
                  img_name:img1.name,
                  img:await toBase64(img1)
                }
            }else{surat1 = null}
            if(img2){
            surat2 = {
                img_name:img2.name,
                img:await toBase64(img2)
                } 
            }else{surat2=null}
            if(img3){
            surat3 = {
                img_name:img3.name,
                img:await toBase64(img3)
                } 
            }else{surat3=null}  

            let ordered_date = new Date();
          let data={
                surat1:surat1,
                surat2:surat2,
                surat3:surat3,
                yol:yol,
                ugradyjy_ady:ugratyanAdy,
                kabulediji_ady:kabuledijinAdy,
                phoneNumber:phoneNumber,
                product_name:productName,
                guty_sany:guty,
                kg:kg,
                m3:m3,
                total_price:baha,
                // ordered_date:ordered_date,
                // status_date:ordered_date,
            }
            console.log("data:",data)
        axiosInstance.post("/api/sargyt/create/"+user.id,{
                data
        }).then((data)=>{
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