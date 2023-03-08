import { useState } from "react";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  PlusSquareOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Table, Tooltip } from "antd";

import UpdateCustomerModal from "../../components/customers/UpdateCustomerModal";
import SaleInvoicePopup from "../../components/saleInvoice/SaleInvoicePopup";
import { formatBangladeshiCurrency } from "../../utils/formatNumber";
import PaymentModal from "../../components/payment-modal/PaymentModal";

function BuyersTable({ customers, loading }: { customers: []; loading: boolean }) {
  const [newSaleModalVisible, setNewSaleModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const showModal = (customer: any, setModalVisible: any) => {
    setSelectedBuyer(customer);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Buyer Name ( পাইকার )",
      render: (customer: any) => (
        <Link to={`/buyers/${customer._id}`}>{customer.name}</Link>
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
      title: "Due Amount",
      dataIndex: "dueAmount",
      render: (dueAmount: any) => formatBangladeshiCurrency(dueAmount),
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
          <Col>
            <Tooltip title="New Sale">
              <Button
                type="text"
                onClick={() => showModal(customer, setNewSaleModalVisible)}
              >
                <PlusSquareOutlined />
              </Button>
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title="New Credit Payment">
              <Button
                type="text"
                onClick={() => showModal(customer, setPaymentModalVisible)}
              >
                <TransactionOutlined />
              </Button>
            </Tooltip>
          </Col>
          <Col offset={1}>
            <Tooltip title="Edit Buyer">
              <Button
                type="text"
                onClick={() => showModal(customer, setEditModalVisible)}
              >
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
      {paymentModalVisible ? (
        <PaymentModal
          modalVisible={paymentModalVisible}
          setModalVisible={setPaymentModalVisible}
          buyer={selectedBuyer}
        />
      ) : null}
      {editModalVisible ? (
        <UpdateCustomerModal
          modalVisible={editModalVisible}
          setModalVisible={setEditModalVisible}
          customerInfo={selectedBuyer}
        />
      ) : null}
      {newSaleModalVisible ? (
        <SaleInvoicePopup
          modalVisible={newSaleModalVisible}
          setModalVisible={setNewSaleModalVisible}
          customerViaProp={selectedBuyer}
        />
      ) : null}
    </>
  );
}

export default BuyersTable;
