import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Checkbox, Col, Input, Modal, Row, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import classes from "./SaleInvoicePopup.module.css";
import LineItemsTable from "./LineItemsTable";
import { toast } from "react-hot-toast";
import CustomerSearchSelect from "../CustomerSearchSelect";
import { useGetCustomersQuery } from "../../features/customer/customersAPI";
import getColumnTotal from "../../utils/getTotal";

type SIPProps = any;

function SaleInvoicePopup({
  modalVisible,
  setModalVisible,
  customerViaProp,
}: SIPProps) {
  const saleDate = new Date();
  const { data: customers = [], isLoading: customerLoading } =
    useGetCustomersQuery(true); //need to adjust this

  const [autoSelect, setAutoSelect] = useState(true);

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [lineItems, setLineItems] = useState([{ id: Date.now(), subtotal: 0 }]);
  const [payment, setPayment] = useState(0);
  const [printEnabled, setPrintEnabled] = useState(false);

  const refetch = () => {};

  const location = useLocation();
  const path = location.pathname;
  const extractedPath = path.split("/");

  const handleCustomerChange = (customer: any) => {
    setSelectedCustomer(customer);
  };

  useEffect(() => {
    if (
      extractedPath.length > 2 &&
      extractedPath[1] === "customers" &&
      autoSelect &&
      !customerLoading
    ) {
      const customerId = +extractedPath[2];
      const customer = customers.find((c: any) => c._id === customerId);
      handleCustomerChange(customer);
    }
  }, [customers]);

  useEffect(() => {
    if (customerViaProp?._id) {
      handleCustomerChange(customerViaProp);
    }
  }, [customerViaProp]);

  const handleAddLineItems = () => {
    const newlineItems = [...lineItems, { id: Date.now(), subtotal: 0 }];
    setLineItems(newlineItems);
  };

  const validate = () => {
    if (!selectedCustomer) {
      toast.error("You must select a customer first");
      return false;
    }

    let lineItemsError = false;
    lineItems.every((item, index) => {
      if (!item.subtotal) {
        toast.error(`Please fill up line item ${index + 1}`);
        lineItemsError = true;
        return false; // will break every loop
      }
      return true; // required to continue every loop
    });
    if (lineItemsError) return false; // wil return false if errors in line items

    return true; // Default return
  };

  const handleNewSale = () => {
    console.log("before validation");

    const isValid = validate(); // validating invoice data
    if (isValid) {
      const transactionData = {
        buyerId: selectedCustomer._id,
        buyerName: selectedCustomer.name,
        lineItems,
        previousDue: selectedCustomer?.dueAmount,
        totalWithDue:
          getColumnTotal(lineItems, "subtotal") + selectedCustomer?.dueAmount,
        paid: payment,
        date: saleDate,
      };
      console.log(transactionData, "hhh");
    }
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        centered
        onCancel={() => setModalVisible(false)}
        bodyStyle={{ padding: "0px" }}
        width={850}
        footer={null}
      >
        <div className={classes.modalBody}>
          <Row justify="space-between">
            <Col>
              <h2>Add New Sale</h2>
            </Col>
            <Col>
              <h2>{`Date: ${saleDate.toLocaleDateString()}`}</h2>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col>
              <div className={classes.dropdownContainer}>
                <CustomerSearchSelect
                  customers={customers}
                  handleCustomerChange={handleCustomerChange}
                  selectedCustomer={selectedCustomer}
                  customerLoading={customerLoading}
                  refetch={refetch}
                  setAutoSelect={setAutoSelect}
                />
              </div>
            </Col>
            <Col>
              <div className={classes.dropdownContainer}>
                <Space direction="vertical">
                  <span>Buyer Previous Due</span>
                  <Input
                    type={"text"}
                    value={selectedCustomer?.dueAmount}
                    disabled
                  />
                </Space>
              </div>
            </Col>
          </Row>
          <div className={classes.liteItemsTable}>
            <LineItemsTable
              lineItems={lineItems}
              sellers={customers}
              loading={customerLoading}
              setLineItems={setLineItems}
              selectedCustomer={selectedCustomer}
              payment={payment}
              setPayment={setPayment}
            />
          </div>

          <div className={classes.paidBy}>
            <Row justify="space-between" align="middle">
              <Button
                onClick={handleAddLineItems}
                className={classes.primaryButton}
                type="primary"
                ghost
              >
                <PlusOutlined />
                Add Line Items
              </Button>
              <Row align="middle">
                <Space direction="vertical" style={{ marginRight: "8px" }}>
                  <h3>Buyer Payment: </h3>
                </Space>
                <Space direction="vertical">
                  <Input
                    onChange={(e) => setPayment(+e.target.value)}
                    placeholder="Payment"
                    value={payment}
                    type="number"
                    min={0}
                  />
                </Space>
              </Row>
            </Row>
          </div>
        </div>
        <Row justify="end" align="middle" className={classes.actionButtons}>
          <Checkbox onChange={(e) => setPrintEnabled(e.target.checked)}>
            Print
          </Checkbox>
          <Button type="link" onClick={handleNewSale} className={classes.saveButton}>
            Save
          </Button>
        </Row>
      </Modal>
    </>
  );
}

export default SaleInvoicePopup;
