import React,{useState,useEffect, useContext} from 'react';
import {Table,Button,Space,Modal,Input, Drawer,Tabs,Select, message ,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined,PlusCircleFilled } from '@ant-design/icons';
import { useHistory } from 'react-router';
import './ulanyjyTable.css';
import { axiosInstance } from '../../utils/axiosIntance';
import { ErkContext } from '../../context/Condex';

const { TabPane } =Tabs;
const {Option}=Select;
const UlanyjyTable = (props)=>{

  const {dil} = useContext(ErkContext)
    const [data,setData]=props.data;
    const [select,setSelect]=useState(null);
    const GetData=props.GetData;
    const history = useHistory();


    const Cancel=()=>{
    }
    const Confirm=(record)=>{
      DeleteUser(record);
    }

    const columns = [
      {
        title:(dil=="tm"?"Ulanyjy Id":"ID пользователя"),
        dataIndex:"id",
        render:(text,record)=>(
          <div style={{padding:"16px"}}>
            {record.id}
          </div>
        )
     },
        {
           title:(dil=="tm"?"Ady ":"Имя"),
           dataIndex:"name",
        },
        {
          title:(dil=="tm"?"Familýasy":"Фамилия"),
          dataIndex:"lastname",
       },
        {
            title:(dil=="tm"?"Telofon belgi":"Номер телефона"),
            dataIndex:"phoneNumber",
        },
        {
          title:(dil=="tm"?"Mail":"Почта"),
          dataIndex:"email",
        },
        {
            title:(dil=="tm"?"Ulanyjy Görnüş":"Тип пользователя"),
            dataIndex:"type",
            render:(text,record) =>(
              <div>
                {record.type==1 && (dil=="tm"?"Ulanyjy":"Пользователь")}
                {record.type==2 && (dil=="tm"?"Admin":"Админ")}
              </div>
            )
            
        },
        {
            title:(dil=="tm"?"Goşmaça maglumat we Özgertmek":"Дополнительная информация и редактирование"),
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    {/* <Button type='primary'shape='round'onClick={()=>ShowModal2(record)} ><EditOutlined /></Button> */}
                    <Button type='primary'shape='round'onClick={()=>Sargyt(record)} >{dil=="tm"?"Sargyt et":"Сделать заказ"}</Button>
                    {/* <Popconfirm 
                    title="Çyndan öçürmek isleýärsiňmi?"
                    onConfirm={()=>Confirm(record)}
                    onCancel={()=>Cancel()}
                    >
                    <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>
                    </Popconfirm> */}
                   

                </Space>
              ),
        }
    ];
    const [visible,setVisible]=useState(false);
    const [edit,setEdit]=useState(false);
    const [maglumat,setMaglumat]=useState([]);
    const [password2,setPasword2]=useState();
    const [password1,setPasword1]=useState();


    const Sargyt =(event)=>{
      console.log(event);
      history.push({
        pathname: '/sargyt',
        // search: '?query=abc',
        state: { user: event }
    });
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
    // console.log( "goshmaça:",event.user_type.type);
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
  

    return(
        <div className='ulanyjyTable'>
            <Drawer
                width={400}
                className='ulanyjylar-table--drawer'
                title="Goşmaça Maglumat"
                placement="right"
                onClose={()=>ShowModalClose()}
                visible={visible}>
            {maglumat.user_type &&
              <ul className="Goshmacha--ul">
                <li className='modalLi'  key={maglumat.name+"1"}><b>Ady: </b>{maglumat.name}</li>
                <li className='modalLi'  key={maglumat.login}><b>Ulanyjy Ady: </b>{maglumat.login}</li>
                <li className='modalLi'  key={maglumat.password}><b>Ulanyjy Görnüş: </b>{ maglumat.user_type.type}</li>
                <li className='modalLi'  key={maglumat.createdAt}><b>Doredilen wagty: <br></br></b>{JSON.stringify(maglumat.createdAt).substr(1,10)+" ("+JSON.stringify(maglumat.createdAt).substr(12,8)+")"}</li>
                <li className='modalLi'  key={maglumat.createdAt}><b>Üýtgedilen wagty: <br></br></b>{JSON.stringify(maglumat.createdAt).substr(1,10)+" ("+JSON.stringify(maglumat.createdAt).substr(12,8)+")"}</li>
              </ul>
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