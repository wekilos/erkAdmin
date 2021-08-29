import React from "react";
import "antd/dist/antd.css";
import "./header.css";
import { Layout, Menu, Input, Dropdown, Badge, Popover } from "antd";

import { UserOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "../utils/index";
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
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        <LogoutOutlined /> Logout
      </a>
    </Menu.Item>
  </Menu>
);

export default class Headers extends React.Component {
  render() {
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
        <div className="profile">
          <Dropdown overlay={profile_menu}>
            <div
              className="ant-dropdown-link"
              onClick={logout}
            >
              <UserOutlined />
            </div>
          </Dropdown>
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
}
