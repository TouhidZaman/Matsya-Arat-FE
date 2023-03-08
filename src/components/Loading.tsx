import { Row } from "antd";
import React from "react";
import loading from "../assets/images/loading.svg";

const Loading = () => {
  return (
    <Row justify={"center"} align={"middle"} style={{ marginTop: "200px" }}>
      <img src={loading} alt="loading" />
    </Row>
  );
};

export default Loading;
