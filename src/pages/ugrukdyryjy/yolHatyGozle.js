import React, { useContext } from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import {
  PlusCircleFilled,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import "./yolHatyGozle.css";
import { ErkContext } from "../../context/Condex";

const YolHatyGozle = (props) => {
  const {dil} = useContext(ErkContext)
  const GoshButton = props.GoshButton;
  let sany=false;
console.log(props.sany)
if(props.sany<=3){sany=true}else{sany=false}
  return (
    <div className="yolHaty-gozle">
      <form className="yolHaty-gozle--form">
        <div>
        <h2 style={{margin:"10px 10px"}}>{dil=="tm"?"Soraglar sahypasy":"Страница вопросов"}</h2>
          {/* <Input
            className="yolHaty-gozle--input"
            placeholder="Id No"
            addonAfter={<SearchOutlined />}
          />
          <Input
            className="yolHaty-gozle--input"
            placeholder="Umumy Gözleg"
            addonAfter={<SearchOutlined />}
          /> */}
        </div>
        <div>
           <Button
            onClick={GoshButton}
            shape="round"
            type="primary"
            icon={<PlusCircleFilled />}
            className="yolHaty-gozle--button"
          >
           {dil=="tm"?" Sorag Döret":"Создать вопрос"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default YolHatyGozle;
