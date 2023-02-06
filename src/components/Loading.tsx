import { Row } from "antd";
import React from "react";
import loading from "../assets/images/loading.svg";

const Loading = () => {
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <img src={loading} alt="loading" />
    </Row>
  );
};

export default Loading;
