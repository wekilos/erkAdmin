import {useState,useEffect} from 'react';
import {BASE_URL,axiosInstance} from '../../utils/axiosIntance'
import { message,Input } from 'antd';
import {token} from '../../utils/token'
import {Redirect,useHistory} from 'react-router-dom'
import axios from 'axios'

  import { Button } from "antd";

import { Select } from "antd";
import "antd/dist/antd.css";
import "./login.css";
import { async } from 'q';

const Login = () =>{

    const history = useHistory()
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("")


const onSubmit=async()=>{
  
await axiosInstance.post('/api/user/login',{
 
phoneNumber:username,
password: password,
     
} ).then((res)=>{
 
 console.log(res.data)
  if(res.data.login===true && res.data.type=="2"){
        localStorage.setItem("profile", JSON.stringify(res.data))
        message.success("Successfully")
        if(res.data.type && res.data.type==="2"){
          history.push('/orders')
        }else{
          history.push("/");
          // message.error("nädogry Telefon belgi yada password")
        }
         
    }else{
        message.warn("nädogry Telefon belgi yada password")
    }
    

}).catch((err)=>{
    console.log(err);
    
})

}

return(
    <div  className="login-page" >
    <div className="login " >
    <div className="login--form">
      <h2 className="login--header">Içeri Gir</h2>
      {/* <Input      type='text' 
                          element='input'  
                          label="Ady" 
                          validators={[VALIDATOR_REQUIRE()]}  
                          errorText='Adyňyzy Giriziň!' /> */}
      <label >Admin Telefon:</label>
      <Input
        name="login"
        value={username} onChange={(e)=>setUsername(e.target.value)}
      />
      <label >Password</label>
      <Input
        type="password" name="password"
        value={password} onChange={(e)=>setPassword(e.target.value)}
      />
      <Button className="Button" onClick={()=>onSubmit()}  >Içeri Gir</Button>
    </div> 
  </div>
  </div>

    // <div>
    //     Login page
        
    //     <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="login"/>
    //     <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
    //     <button onClick={()=>onSubmit()}>Login</button>

    //     {token()}
    // </div>
)


}



export default Login;