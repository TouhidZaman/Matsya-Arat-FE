import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { EditOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table, Tooltip } from "antd";

function CustomersTable({
  customers,
  loading,
}: {
  customers: [];
  loading: boolean;
}) {
  const columns = [
    {
      title: "Customer Name",
      render: (customer: any) => (
        <Link to={`/customers/${customer.id}/vehicles`}>{customer.name}</Link>
      ),
    },
    {
      title: "Mobile Number",
      dataIndex: "phone",
    },
    {
      title: "Customer Type",
      dataIndex: "type",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Shortcuts",
      //   className: classes.excludeMeFromPrint,
      render: (_: any, customer: any) => (
        <Row justify="center">
          <Col>
            <Tooltip title="New Sale">
              <Button type="text">
                <PlusSquareOutlined />
              </Button>
            </Tooltip>
          </Col>
          <Col offset={1}>
            <Tooltip title="Edit">
              <Button type="text">
                <EditOutlined />
              </Button>
            </Tooltip>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Table
      {...{ loading }}
      rowKey="_id"
      columns={columns}
      dataSource={customers}
      pagination={{
        pageSize: 14,
        hideOnSinglePage: true,
        //   className: classes.excludeMeFromPrint,
      }}
    />
  );
}

export default CustomersTable;
