import React from "react";
import { Result, Button } from "antd";

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sahypa tapylmady"
      extra={<Button type="primary">Bas shypa</Button>}
    />
  );
};

export default NotFound;
