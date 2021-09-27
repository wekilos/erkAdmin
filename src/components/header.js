import React,{useContext} from "react";
import "antd/dist/antd.css";
import "./header.css";
import { Layout, Menu, Input, Dropdown, Badge, Popover } from "antd";

import { UserOutlined, GlobalOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "../utils/index";
import {ErkContext} from "../context/Condex";
const { Search } = Input;
const content = (
  <div>
    <p>Notification 1</p>
    <p>Notification 2</p>
  </div>
);
const { Header } = Layout;
const profile_menu = (
  <Menu>
    <Menu.Item>
      {/* <a target="_blank" rel="noopener noreferrer">
        <UserOutlined /> Profile
      </a> */}
    </Menu.Item>
    <Menu.Item >
      <a target="_blank" rel="noopener noreferrer">
        <LogoutOutlined /> Logout
      </a>
    </Menu.Item>
  </Menu>
);

 const Headers = ()=> {
  const {dil,ChangeDil} = useContext(ErkContext);
  const dil_menu = (
    <Menu>
      <Menu.Item onClick={()=>ChangeDil("tm")}>
        <a href="#"  rel="noopener noreferrer">
         {dil=="tm"?"Turkmen":"Туркменский"}
        </a>
      </Menu.Item>
      <Menu.Item onClick={()=>ChangeDil("ru")}>
        <a href="#"  rel="noopener noreferrer">
           {dil=="tm"?"Rus":"Русский"}
        </a>
      </Menu.Item>
    </Menu>
  );
    return (
      <Header
        className="site-layout-background header"
        style={{ position: "fixed" }}
      >
        {/* <Search
          placeholder="input search text"
          onSearch={(value) => console.log(value)}
          className="search"
        /> */}
        <div className="App-title">
          Erk Trading
        </div>
        <div className="profile" style={{display:"inline-flex",padding:"0 15px"}}>
        <Dropdown overlay={dil_menu} style={{marginRight:"25px"}}>
              <div style={{marginRight:"25px"}}
                className="ant-dropdown-link"
                // onClick={()=>logout()}
              >
                 {/* <img className="headerIcon" src={dilImg} alt="logout" /> */}
                 <GlobalOutlined className="headerIcon"/>
              </div>
            </Dropdown>
          <Dropdown overlay={profile_menu}>
            <div
              className="ant-dropdown-link"
              onClick={logout}
            >
              <UserOutlined />
            </div>
          </Dropdown>
          
        </div>
        <div className="dil">
            
          </div>

        <div className="notify">
          {/* <Popover
            placement="bottom"
            title="Notification"
            content={content}
            trigger="click"
          >
            <Badge count={5}>
              <BellOutlined style={{ fontSize: 22 }} />
            </Badge>
          </Popover> */}
        </div>
      </Header>
    );
  }

  export default  Headers;