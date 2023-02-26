import { useState } from "react";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table, Tooltip } from "antd";

import UpdateCustomerModal from "../../components/customers/UpdateCustomerModal";

function SellersTable({ customers, loading }: { customers: []; loading: boolean }) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);

  const shoEditModal = (customer: any) => {
    setCustomerInfo(customer);
    setEditModalVisible(true);
  };

  const columns = [
    {
      title: "Customer Name",
      render: (customer: any) => (
        <Link to={`/customers/${customer._id}`}>{customer.name}</Link>
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
        <Row justify="start">
          <Col offset={1}>
            <Tooltip title="Edit">
              <Button type="text" onClick={() => shoEditModal(customer)}>
                <EditOutlined />
              </Button>
            </Tooltip>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <>
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
      {editModalVisible ? (
        <UpdateCustomerModal
          modalVisible={editModalVisible}
          setModalVisible={setEditModalVisible}
          customerInfo={customerInfo}
        />
      ) : null}
    </>
  );
}

export default SellersTable;
