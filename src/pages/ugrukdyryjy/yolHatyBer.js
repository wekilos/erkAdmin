import React, { useState, useEffect } from "react";

import { Input, Steps, Button, Drawer, message, Select } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled, CloseCircleOutlined,SearchOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import KategoriyaGosh from "./Kategorigosh";
import YolHatyGozle from "./yolHatyGozle";
import YolHatyBerTable from "./yolHatyBerTable";

import "./yolHatyBer.css";
const { Option } = Select;

const YolHatyBer = (props) => {
  const [Gosh, setGosh] = useState(false);
  const GoshButton = () => {
    setGosh(!Gosh);
    console.log(Gosh);
  };

  const [data, setData] = useState([]);
  const [ kategoriya, setKategoriya ] = useState();
  const [ market_id , setMarket_id ] = useState();
    // geting all data from database with api
    
    useEffect(()=>{
      getData();
      
    },[])
    
    const getData = ()=>{
      axiosInstance.get("/api/shertler").then((data)=>{
        console.log(data.data);
        setData(data.data);
      }).catch((err)=>{
        console.log(err);
      })
    }

    const getKategoriyas = (e)=>{
      // axiosInstance.get("/api/shertler/kategoriya/"+e).then((data)=>{
      //   console.log(data.data);
      //   setKategoriya(data.data);
      // }).catch((err)=>{
      //   console.log(err);
      // });
    }

    function onChange(value) {
      console.log(`selected ${value}`);
      setMarket_id(value);
      getKategoriyas(value);
    }
    function onSearch(val) {
      console.log('search:', val);
    }

  return (
    <div className="yolHatyBer">
      <Drawer
                width={500}
                className='lukman-table--drawer'
                title="Market Goş"
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={()=>GoshButton()}
                visible={Gosh}
            >
                     <KategoriyaGosh  getData={getData}  onClick={GoshButton}/>

            </Drawer>
      <div className="yolHaty--gozleg">
      <div className="yolHaty-gozle">
      <form className="yolHaty-gozle--form">
        <div>
          {/* <Select
            className="yolHaty-gozle--input"
            showSearch
            style={{ width: 200 }}
            placeholder="Market Saýla"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              data.map((market)=>{
                return <Option value={market.id}>{market.name_tm}</Option>
              })
            }
            
          </Select> */}
          <h1>
            Şertler Admin page
          </h1>
        </div>
        <div>
          <Button
            onClick={GoshButton}
            shape="round"
            type="primary"
            icon={<PlusCircleFilled />}
            className="yolHaty-gozle--button"
          >
            Şert Döret
          </Button>
        </div>
      </form>
    </div>
      </div>
      <div className="yolHaty-Table">
        <YolHatyBerTable getData={getData} getKategoriyas={getKategoriyas} data={[ data, setData ]}/>
      </div>
    </div>
  );
};

export default YolHatyBer;
