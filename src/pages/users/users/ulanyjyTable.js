import React,{useState,useEffect} from 'react';
import {Table,Button,Space,Modal,Input, Drawer,Tabs,Select, message ,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined,PlusCircleFilled,MailOutlined } from '@ant-design/icons';

import './ulanyjyTable.css';
import { axiosInstance } from '../../../utils/axiosIntance';

const { TabPane } =Tabs;
const {Option}=Select;
const {TextArea } = Input;
const UlanyjyTable = (props)=>{
    const [data,setData]=props.data;
    const [select,setSelect]=useState(null);
    const GetData=props.GetData;


    const Cancel=()=>{
    }
    const Confirm=(record)=>{
      DeleteUser(record);
    }

    const columns = [
      {
        title:"Ulanyjy Id",
        dataIndex:"id",
     },
        {
           title:"Ady ",
           dataIndex:"name",
        },
        {
          title:"Familýasy",
          dataIndex:"lastname",
       },
        {
            title:"Telofon belgi",
            dataIndex:"phoneNumber",
        },
        {
          title:"Mail",
          dataIndex:"email",
        },
        {
            title:"Ulanyjy Görnüş",
            dataIndex:"type",
            render:(text,record) =>(
              <div>
                {record.type==1 && "User"}
                {record.type==2 && "Admin"}
              </div>
            )
            
        },
        {
            title:"Goşmaça maglumat we Özgertmek",
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'shape='round'onClick={()=>ShowModal2(record)} ><EditOutlined /></Button>
                    {/* <Button type='primary'shape='round'onClick={()=>Sargyt(record)} >Sargyt</Button> */}
                    <Popconfirm 
                    title="Çyndan öçürmek isleýärsiňmi?"
                    onConfirm={()=>Confirm(record)}
                    onCancel={()=>Cancel()}
                    >
                    <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>
                    </Popconfirm>
                    <Button type='primary'shape='round'onClick={()=>ShowModal(record)} ><MailOutlined /></Button>


                </Space>
              ),
        }
    ];
    const [visible,setVisible]=useState(false);
    const [edit,setEdit]=useState(false);
    const [maglumat,setMaglumat]=useState([]);
    const [password2,setPasword2]=useState();
    const [password1,setPasword1]=useState();

    const [subject,setSubject] = useState();
    const [text, setText] = useState();


    const Sargyt =(event)=>{
      console.log(event);
    }

    const DeleteUser = (event)=>{
     axiosInstance.delete("/api/user/delete/"+event.id).then((data)=>{
       console.log(data.data)
       message.success(data.data.msg);
       GetData();
     }).catch((err)=>{
       console.log(err);
     })
  }
  const ShowModal = (event)=>{
    setVisible(true);
    console.log( "goshmaça:",event);
    setMaglumat(event);
}
const ShowModalClose=(event)=>{
  setVisible(false);
 setMaglumat([]);
}
const ShowModal2 =(event)=>{
    setEdit(true);
    // console.log(event);
    setMaglumat(event);
    if(event){
      setSelect(event.type);
    }
    setPasword1(null);
    setPasword2(null);
    
  }
  const ShowModal2Close=(even)=>{
    setEdit(false);
     setMaglumat([]);
     setSelect(null);
  }
  const inputChangeHandler=(event)=>{
    // console.log(event.target.name);
    let name=event.target.name;
    let value=event.target.value;
  
    setMaglumat({
        ...maglumat,
        [name]:value
    })            
  };
  const onSubmit=(event)=>{
    event.preventDefault();
    console.log("ulanujy uytget:",event.target);
    let name=event.target.name.value;
    let password=event.target.password.value;
    let password2=event.target.password2.value;
    let lastname=event.target.lastname.value;
    let email = event.target.email.value;
    let id=event.target.name.id;
if(password===password2){

    axiosInstance.patch("/api/user/update/"+id,{
            email:email,
            name:name,
            lastname:lastname,
            password:password,
            type:select
        
    }).then((data)=>{
        message.success(data.data.msg);
        GetData();
    }).catch((err)=>{
        console.log(err);
    });
    ShowModal2Close()
    console.log("data",data);
}else{
    message.error("Iki Password meňzeş girizmeli!");
}
  }

  const SentMailtoUser = async(user)=>{
    console.log(user);
    axiosInstance.post("/api/mail/send/user",{
      userMail:user.email,
      subject:subject,
      text:text,
    }).then((data)=>{
      message.success("successfully!")
      setSubject("");
      setText("");
    }).catch((err)=>{
      console.log(err);
    })
  }
  

    return(
        <div className='ulanyjyTable'>
            <Drawer
                width={500}
                className='ulanyjylar-table--drawer'
                title="Mail ugrat"
                placement="right"
                onClose={()=>ShowModalClose()}
                visible={visible}>
            {maglumat &&
              <React.Fragment>
              <ul  style={{width:"120%",listStyle:"none",marginLeft:"-30px",marginTop:"-30px"}}>
                <li className='modalLi'  key={maglumat.name}>Ady: <b>{maglumat.name}</b></li>
                <li className='modalLi'  key={maglumat.lastname}>Familýasy: <b>{maglumat.lastname}</b></li>
                <li className='modalLi'  key={maglumat.email}>Ulanyjy Email: <b>{maglumat.email}</b></li>
                <li className='modalLi'  key={maglumat.phoneNumber}>Ulanyjy Tel: <b>{ maglumat.phoneNumber}</b></li>
           </ul>
           <div>
             <Input addonBefore="Subject" style={{margin:"20px 0"}} 
             value={subject} onChange={(e)=>setSubject(e.target.value)} />
             <label style={{fontSize:"16px",marginTop:"20px"}} for="text" > Text </label>
             <TextArea id="text" rows={8}
             value={text} onChange={(e)=>setText(e.target.value)}
             />
           </div>
           <div>
             <Button type="primary"
             shape="round"
             style={{width:"50%",margin:"20px 25%"}}
             onClick={()=>SentMailtoUser(maglumat)}
             >Mail Ugrat</Button>
           </div>
           </React.Fragment>
            }
          </Drawer>
          <Drawer
                width={400}
                className='ulanyjylar-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowModal2Close()}
                visible={edit}>
                  {maglumat && 
                    
                          <form className='ulanyjylar--form' onSubmit={onSubmit}>
                          <Input addonBefore="Ady:" name='name' id={maglumat.id} className='ulanyjy-uytget--input' value={maglumat.name}  onChange={inputChangeHandler}/>
                          <Input addonBefore='Familýasy:' id="lastname" className='ulanyjy-uytget--input' name='lastname' value={maglumat.lastname} onChange={inputChangeHandler}  />
                          <Input addonBefore='Mail:' id="email" className='ulanyjy-uytget--input' name='email' value={maglumat.email} onChange={inputChangeHandler}  />
                          <Input addonBefore="Password" type="password" id="password" className='ulanyjy-uytget--input'name='password' value={password1} onChange={(e)=>setPasword1(e.target.value)} />
                          <Input addonBefore="Password" type="password" id="password2" className='ulanyjy-uytget--input'name='password2' value={password2} onChange={(e)=>setPasword2(e.target.value)} />
                          <Select
                            placeholder='Status Saýlaň!'
                            showSearch
                            label="Status" onChange={(e)=>{setSelect(e)}}
                            name='typeID'  className='ulanyjylar-gosh--input' id="typeID" value={select==1?"User":"Admin"}  placeholder={select==1?"User":"Admin"}
                            >
                               <Option value="1">User</Option>
                               <Option value="2">Admin</Option>

                            </Select>
                            <div className='ulanyjylar-table--buttons'>
                              <Button icon={<PlusCircleFilled/>} shape='round' type='primary'htmlType="submit" className='ulanyjylar-table--button'>Üýget</Button>
                              <Button onClick={ShowModal2Close} shape='round' danger type='primary' className='ulanyjylar-table--button'>Cancel</Button>
                            </div>
                            </form>
                        
                    }
               </Drawer>
            <Table columns={columns} dataSource={data} />
        
        </div>
    );
};

export default UlanyjyTable;