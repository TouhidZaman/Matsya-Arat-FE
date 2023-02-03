import React, { useState } from "react";
import { Space } from "antd";
import Button from "antd/es/button";
import type { SizeType } from "antd/es/config-provider/SizeContext";

const Dashboard: React.FC = () => {
  const [size, setSize] = useState<SizeType>("large"); // default is 'middle'
  return (
    <div>
      <Space wrap>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
      </Space>
    </div>
  );
};

export default Dashboard;
