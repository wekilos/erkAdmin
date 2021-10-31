import React, { useContext, useState } from "react";
import "./sidebar.css";
import { logout } from "../utils";
// import logo_ from "../../img/logo_.svg";
// import logo from "../../img/logo.svg";
import { Layout, Menu, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  NotificationOutlined,
  RiseOutlined,
  SettingOutlined,
  DashboardOutlined,
  SearchOutlined,
  LogoutOutlined,
  HeartFilled,
  ScheduleOutlined,
  FormOutlined,
  AlignLeftOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import { ErkContext } from "../context/Condex";

const { SubMenu } = Menu;
const { Sider } = Layout;

const   SiderDemo =()=> {
  const [collapsed,setCollapsed] = useState(false)
  
const {dil} = useContext(ErkContext)
const  toggle = () => {
    setCollapsed(!collapsed);
  };

    return (
      // <div>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
        className="Sider"
        width={220}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        {/* <div
          className="toggle"
          
        >
          {React.createElement(
            this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: this.toggle,
            }
          )}
        </div> */}
        <div align="center">
          { collapsed ? (
            <Tooltip color="green" placement="right" title="Open">
              {/* <img
                onClick={this.toggle}
                className="logo"
                src={logo}
                alt="logo"
              /> */}
              <div onClick={toggle} className="logo">
                Erk
              </div>
            </Tooltip>
          ) : (
            <Tooltip color="green" placement="right" title="Close">
              <div onClick={toggle} className="logo">
                Erk Trading
              </div>
            </Tooltip>
          )}
        </div>
        <Menu
          mode="inline"
          // defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          className="sidebar-left"
        >
          {/* 1  Dashboard   */}
          <SubMenu
            key="sub1"
            title={
              <span>
                <DashboardOutlined/>
                <span className="menuitem ">{dil=="tm"?"Sargytlar":"Заказы"}</span>
              </span>
            }
            
          >
            <Menu.Item className="menuitem menuitem2" key="1">
              <Link to="orders">{dil=="tm"?"Sargytlar":"Заказы"}</Link>
            </Menu.Item>
            {/* <Menu.Item className="menuitem menuitem2" key="2">
              <Link to="orderStatus">Sargydyň Statusy</Link>
            </Menu.Item> */}
            <Menu.Item className="menuitem menuitem2" key="3">
              <Link to="archiveOrders">{dil=="tm"?"Gowşurlan Sargytlar":"Доставленные заказы"}</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="63">
              <Link to="canceledOrders">{dil=="tm"?"Ýatyrylan Sargytlar":"Отмененные заказы"}</Link>
            </Menu.Item>
          </SubMenu>

            <SubMenu
            key="sub2"
            title={
              <span className="menuitem">
                <SearchOutlined />
                <span>{dil=="tm"?"Haryt Gözlegi":"Поиск товаров"}</span>
              </span>
            }
          >
            <Menu.Item className="menuitem menuitem2" key="5">
            <Link to="gozleg">{dil=="tm"?"Gözlegdäkiler":"В поиске"}</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="65">
            <Link to="tapylan">{dil=="tm"?"Tapylanlar":"Найденные"}</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="4">
            <Link to="tapylmadyk">{dil=="tm"?"Tapylmadyklar":"Не найденные"}</Link>
            </Menu.Item>            
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span className="menuitem">
                <FormOutlined />
                <span>{dil=="tm"?"Sargyt et":"Сделать заказ"}</span>
              </span>
            }
          >
            <Menu.Item className="menuitem menuitem2" key="6">
              <Link to="/sargytEt" >{dil=="tm"?"Sargyt et":"Сделать заказ"}</Link>
            </Menu.Item>
            {/* <Menu.Item className="menuitem menuitem2" key="7">
               <Link to="/busses">Awtobuslar</Link>
            </Menu.Item> */}
          </SubMenu>
          <SubMenu
            key="sub8"
            title={
              <span className="menuitem">
                <FileTextOutlined />
                <span>{dil=="tm"?"Maglumatlar":"Информации"}</span>
              </span>
            }
          >
            <Menu.Item className="menuitem menuitem2" key="17">
            <Link to="soraglar">{dil=="tm"?"Soraglar":"Вопросы"}</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="18">
            <Link to="shertler">{dil=="tm"?"Shertler":"Условии"}</Link>
            </Menu.Item>
          </SubMenu>
          

          

          {/* <SubMenu
            key="sub4"
            title={
              <span className="menuitem">
                <ToolOutlined />
                <span>Favourites</span>
              </span>
            }
          >
            <Menu.Item className="menuitem menuitem2" key="9">
              <Link to='mehanik'> Favourites </Link>
            </Menu.Item> */}
            {/* <Menu.Item className="menuitem menuitem2" key="8">
              <Link to='mehanik_sanaw'>Sanaw</Link>
            </Menu.Item>             */}
          {/* </SubMenu> */}

          <SubMenu
            key="sub9"
            title={
              <span className="menuitem">
               <AlignLeftOutlined />
                <span>{dil=="tm"?"Aragatnaşyk":"Контакты"}</span>
              </span>
            }
          >
            {/* <Menu.Item className="menuitem menuitem2" key="19">
            <Link to="posts">Posts</Link>
            </Menu.Item> */}
            <Menu.Item className="menuitem menuitem2" key="20">
            <Link to="config">{dil=="tm"?"Aragatnaşyk":"Контакты"}</Link>
            </Menu.Item>
            {/* <Menu.Item className="menuitem menuitem2" key="21">
            <Link to="#garaz_sanaw">Currency</Link>
            </Menu.Item> */}
          </SubMenu>

          {/* <SubMenu
            key="sub5"
            title={
              <span className="menuitem">
                <CalculatorOutlined />
                <span>Hasaphana</span>
              </span>
            }
          >
            <Menu.Item className="menuitem menuitem2" key="10">
              Hasaphana
            </Menu.Item>
          </SubMenu> */}

          {/* <SubMenu
            key="sub6"
            title={
              <span className="menuitem">
                <NotificationOutlined />
                <span>Bildirişler</span>
              </span>
            }
          >
            <Menu.Item className="menuitem menuitem2" key="11">
              <Link to="#">Bildirişler</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="12">
              <Link to="#">Habarlar</Link>
            </Menu.Item>
          </SubMenu> */}

          <SubMenu
            key="sub7"
            title={
              <span>
                <SettingOutlined />
                <span className="menuitem">{dil=="tm"?"Sazlamalar":"Настройки"}</span>
              </span>
            }
          >
            {/* <Menu.Item className="menuitem" key="9">
              Genral
            </Menu.Item> */}
            <Menu.Item className="menuitem menuitem2" key="13">
              <Link to="/users">{dil=="tm"?"Ulanyjylar":"Пользователи"}</Link>
            </Menu.Item>
            {/* <Menu.Item className="menuitem menuitem2" key="14">
              <Link to="/drivers">Sürüjiler</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="15">
              <Link to="/ulanyjy_hereket">Ulnyjy hereketler</Link>
            </Menu.Item> */}

            {/* <Menu.Item className="menuitem menuitem2" key="16">
              <Link to="/users_type">User Type</Link>
            </Menu.Item> */}

            {/* <Menu.Item className="menuitem menuitem2" key="16">
              <Link to="#">Ugurlar</Link>
            </Menu.Item> */}
          </SubMenu>
        </Menu>

        <div className="admin-footer">
          <center style={{ fontSize: 12, color: "#C0C0C0", fontWeight: 600 }}>
            Developed by:
            <br /> Sanly Garaýyş programmer team
          </center>
        </div>
      </Sider>
    );
  }

export default  SiderDemo