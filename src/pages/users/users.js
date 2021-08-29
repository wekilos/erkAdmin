import React, { useState, useEffect } from "react";
import {
  Table,
  Popconfirm,
  message,
  Drawer,
  Input,
  Select,
  Button,
} from "antd";
import Filter from "./filter";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Option } = Select;
const Users = () => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({
    ady: "",
    login: "",
    password: "",
    type: "",
  });
  const columns = [
    {
      title: "No",
      dataIndex: "key",
      width: 50,
    },
    {
      title: "Ady",
      dataIndex: "ady",
    },
    {
      title: "Login",
      dataIndex: "login",
    },
    {
      title: "Gizlin belgi",
      dataIndex: "password",
    },

    {
      title: "Görnüş",
      dataIndex: "type",
    },

    {
      title: "Üýtgetmek",
      dataIndex: "edit",
      width: 80,
    },

    {
      title: "Pozmak",
      dataIndex: "delete",
      width: 80,
    },
  ];
  function confirm() {
    message.success("Ustunlikli pozuldy!");
  }

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const data = [];
  for (let i = 1; i < 100; i++) {
    data.push({
      key: i,
      ady: `Kerim Täçgurbanow ${i}`,
      login: "kerim",
      password: i * 123,
      type: i % 2 === 1 ? "admin" : "Mehanik",
      edit: (
        <EditOutlined
          onClick={() => showDrawer()}
          style={{ textAlign: "center", fontSize: 22 }}
        />
      ),
      delete: (
        <Popconfirm
          placement="left"
          title="Pozmak isleyanizmi?"
          onConfirm={confirm}
          okText="Hawa"
          cancelText="Yok"
        >
          <DeleteOutlined style={{ textAlign: "center", fontSize: 22 }} />
        </Popconfirm>
      ),
    });
  }

  return (
    <div>
      <Filter />
      <Table
        columns={columns}
        style={{ textAlign: "center" }}
        dataSource={data}
        pagination={{ pageSize: 50 }}
      />
      <Drawer
        title="Ulanyjyny üýtgetmek"
        placement="right"
        closable={false}
        mask={false}
        width={340}
        onClose={() => onClose()}
        visible={visible}
        key="right"
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Button
              onClick={() => onClose()}
              style={{ marginRight: 16, borderRadius: 16 }}
            >
              Gerek dal
            </Button>
            <Button
              onClick={() => onClose()}
              style={{ borderRadius: 16 }}
              type="primary"
            >
              Tassyklamak
            </Button>
          </div>
        }
      >
        <label>
          <div style={{ fontWeight: "600", marginBottom: 3 }}>Ulanyjy ady:</div>
          <Input placeholder="Ulanyjy ady" />
        </label>
        <label>
          <div style={{ fontWeight: "600", marginBottom: 3, marginTop: 18 }}>
            Ulanyjy soz:
          </div>
          <Input placeholder="Login" />
        </label>

        <label>
          <div style={{ fontWeight: "600", marginBottom: 3, marginTop: 18 }}>
            Gizlin belgi:
          </div>
          <Input placeholder="Passoword" />
        </label>

        <label>
          <div
            style={{
              fontWeight: "600",
              marginBottom: 3,
              marginTop: 18,
            }}
          >
            Gornushi:
          </div>
          <Select defaultValue="admin" style={{ width: "100%" }}>
            <Option value="admin">Admin</Option>
            <Option value="Dispecher">Dispecher</Option>
            <Option value="lukman">Lukman</Option>
            <Option value="lukman">Mehanik</Option>
          </Select>
        </label>
      </Drawer>
    </div>
  );
};
export default Users;
