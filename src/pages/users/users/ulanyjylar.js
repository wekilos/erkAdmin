import React,{useState,useEffect, useContext} from 'react';
import { Button,Input,Drawer,Select, message } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled,MailOutlined,MailFilled } from '@ant-design/icons';

import UlanyjyGozle from './ulanyjyGozle';
import UlanyjyTable from './ulanyjyTable';

import UlanyjyGosh from './ulanyjyGosh';
import './ulanyjylar.css';
import { BASE_URL,axiosInstance } from '../../../utils/axiosIntance';
import { ErkContext } from '../../../context/Condex';

const Option = {Select};
const {TextArea} = Input;
const Ulanyjylar =(props)=>{

    const {dil} = useContext(ErkContext)
    const [Gosh,setGosh]=useState(false);
    const [mail,setMail] = useState(false);

    const [ulanyjyGosh,setUlanyjyGosh]=useState([]);
    const [data,setData]=useState([]);
    const [userTypes,setUserTypes]=useState([]);
    const [select,setSelect]=useState(null);
    const [all,setAll]=useState(null);
    const [number,setNumber] = useState(null);
    const [ulanyjyAdy,setUlanyjyAdy]=useState(null);

    const [text,setText] = useState();
    const [subject,setSubject]=useState();
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        GetData();
        GetTypes();
    },[]);

    useEffect(()=>{
     const time= setTimeout(() => {
            
     GetDataWithFilter();

     console.log(all);
    }, 500);

    return ()=> clearTimeout(time);
       
    },[select,all,number])
    
    const GetDataWithFilter= async ()=>{
        await axiosInstance.get("/api/users",{
            params:{
                all:all,
                typeId:select,
                number:number
            }
        }).then((data)=>{
            setData(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const GetTypes= async (event)=>{
        // await axiosInstance.get("/api/user/type").then((data)=>{
        //     setUserTypes(data.data);
        //     console.log("user type",data.data)
        // }).catch((err)=>{
        //     console.log(err);
        // })
    }
    const GetData=()=>{
        axiosInstance.get("/api/users").then((data)=>{
            console.log("get.user_list:",data.data);
            setData(data.data);
        }).catch((err)=>{
            console.log(err);
        });
    }
    const GoshButtonClose=(event)=>{
        setGosh(false);
        console.log(event);
        setUlanyjyGosh([]);
    }
    const GoshButton = event=>{
        setGosh(true);
    }
    const OpenMail = ()=>{
        setMail(!mail);
    }
    const InputHandler=(event)=>{
        console.log(event.target.value);
        setUlanyjyGosh(
            {   ...ulanyjyGosh,
                [event.target.name]:event.target.value
            }
        );
        console.log("typing:",ulanyjyGosh);
    }

    const SentMailtoAllUser = async()=>{
        await axiosInstance.get("/api/users").then((data)=>{
            axiosInstance.post("/api/mail/send/allUser",{
                users:data.data,
                subject:subject,
                text:text,
            }).then((data)=>{
                message.success("successfully");
                setSubject("");
                setText("");
            }).catch((err)=>{
                console.log(err);
            })
        }).catch((err)=>{
            console.log(err);
        });
        

        console.log(subject,text);
    }
    return(
        <div className='ulanyjylar'>
            {/* <div className='ulanyjylar--top'>
                <h2 className="ulanyjylar--header">Ulanyjylar</h2>
                <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='ulanyjylar--gosh'> Ulanyjy Goş </Button>
            </div> */}
            {/* {Gosh && <UlanyjyGosh data={[data,setData]} onClick={GoshButton} />} */}
            <Drawer
                width={400}
                className='lukman-table--drawer'
                title={dil=="tm"?"Ulanyjy Goş":"Добавить пользователя"}
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={()=>GoshButtonClose()}
                visible={Gosh}
            >
                     <UlanyjyGosh data={[data,setData]} onClick={GoshButtonClose} userTypes={userTypes} GetData={GetDataWithFilter} InputHandler={InputHandler} ulanyjyGosh={ulanyjyGosh} />

            </Drawer>
            <Drawer
                width={500}
                className='ulanyjylar-table--drawer'
                title={dil=="tm"?"Mail ugrat":"Отправить письмо"}
                placement="right"
                onClose={()=>OpenMail()}
                visible={mail}>
            
              <React.Fragment>
                  <h2>{dil=="tm"?"Siz Ähli ulanyjylara ugratýarsyňyz!":"Вы отправляете его всем пользователям!"}</h2>
           <div>
             <Input addonBefore={dil=="tm"?"Tema":"Тема"} style={{margin:"20px 0"}} 
             value={subject} onChange={(e)=>setSubject(e.target.value)} />
             <label style={{fontSize:"16px",marginTop:"20px"}} for="text" > {dil=="tm"?"Tekst":"Текст"} </label>
             <TextArea id="text" rows={8}
             value={text} onChange={(e)=>setText(e.target.value)}
             />
           </div>
           <div>
             <Button type="primary"
             shape="round"
             style={{width:"50%",margin:"20px 25%"}}
             onClick={()=>SentMailtoAllUser()}
             >{dil=="tm"?"Mail ugrat":"Отправить письмо"}</Button>
           </div>
           </React.Fragment>
            
          </Drawer>
            <div className='ulanyjylar--gozleg'>
            <div className='ulanyjy-gozle'>
            <form className='ulanyjy-gozle--form'>
                <div>
                <Input className='ulanyjy-gozle--input' addonBefore={dil=="tm"?'Umumy':"Общий"} value={all} onChange={(e)=>setAll(e.target.value)}/>
                <Input className='ulanyjy-gozle--input' addonBefore={dil=="tm"?'Telefon belgi':"Номер телефона"} value={number} onChange={(e)=>setNumber(e.target.value)}/>
                <Select
                    placeholder={dil=="tm"?'Status Saýlaň!':"Выбрать Статус!"}
                    showSearch
                 element='select'
                 label="Status"
                 defaultOption='Statusy saýlaň!' name='status'  className='ulanyjy-gozle--input' value={select} onChange={(e)=>{setSelect(e)}}
                >
                    <Option value={null}>{dil=="tm"?"Ählisi":"Все"}</Option>
                    <Option value="1">{dil=="tm"?"Ulanyjy":"Пользователь"}</Option>
                    <Option value="2">{dil=="tm"?"Admin":"Админ"}</Option>
                  

               </Select>
               </div>
               <Button onClick={OpenMail} shape='round' type='primary' icon={<MailFilled />} className='ulanyjy-gozle--button'> {dil=="tm"?'Mail':"Почта"}</Button>
               <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='ulanyjy-gozle--button'> {dil=="tm"?"Ulanyjy":"Пользователь"}</Button>

            </form>
        </div>
            </div>
            <div className='ulanyjylar-Table'>
                <UlanyjyTable data={[data,setData]} userTypes={userTypes} GetData={GetDataWithFilter}/>
            </div>

        </div>
    );
};

export default Ulanyjylar;