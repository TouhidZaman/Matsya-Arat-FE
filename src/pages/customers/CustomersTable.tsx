import { useState } from "react";
import { Link } from "react-router-dom";
import { EditOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table, Tooltip } from "antd";

import UpdateCustomerModal from "./UpdateCustomerModal";
import SaleInvoicePopup from "../../components/saleInvoice/SaleInvoicePopup";

function CustomersTable({
  customers,
  loading,
}: {
  customers: [];
  loading: boolean;
}) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [saleModalVisible, setSaleModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleNewSaleOpen = (customer: any) => {
    setSelectedCustomer(customer);
    setSaleModalVisible(true);
  };

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
        <Row justify="center">
          <Col>
            <Tooltip title="New Sale">
              <Button type="text" onClick={() => handleNewSaleOpen(customer)}>
                <PlusSquareOutlined />
              </Button>
            </Tooltip>
          </Col>
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
      {saleModalVisible ? (
        <SaleInvoicePopup
          modalVisible={saleModalVisible}
          setModalVisible={setSaleModalVisible}
          customerViaProp={selectedCustomer}
        />
      ) : null}
    </>
  );
}

export default CustomersTable;
