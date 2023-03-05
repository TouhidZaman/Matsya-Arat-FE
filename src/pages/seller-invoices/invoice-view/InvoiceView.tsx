import React, { useRef, useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Menu,
  Modal,
  Popover,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { useReactToPrint } from "react-to-print";
import { PrinterOutlined, DownOutlined } from "@ant-design/icons";

import PrintMe from "../../../components/print-me/PrintMe";
import classes from "./InvoiceView.module.css";
import {
  formatBangladeshiCurrency,
  getBDFormattedNumber,
} from "../../../utils/formatNumber";
import { getFormattedDate } from "../../../utils/formatDate";
import getColumnTotal from "../../../utils/getTotal";
import DisplayLineItems from "../../../components/DisplayLineItems";

type IVProps = {
  invoiceViewModalData: any;
  setInvoiceViewModalData: (p: any) => void;
};

enum AdjustmentType {
  "PERCENTAGE" = "Percentage",
  "ABSOLUTE" = "Absolute",
}

function InvoiceView({ invoiceViewModalData, setInvoiceViewModalData }: IVProps) {
  const [adjustType, setAdjustType] = useState<string>(AdjustmentType.PERCENTAGE);
  const [adjustment, setAdjustment] = useState<number>(0);
  const componentRef = useRef<React.Component>(null);
  const filteredSales = invoiceViewModalData?.filter(
    (sale: any) => sale.lineItems.length
  );
  if (!filteredSales.length) return null;

  let subTotal = 0;
  let totalQuantity = 0;
  let adjustmentAmount = 0;

  filteredSales?.forEach((element: any) => {
    subTotal += getColumnTotal(element?.lineItems, "subtotal");
    totalQuantity += getColumnTotal(element?.lineItems, "quantity");
  });

  if (adjustType === AdjustmentType.PERCENTAGE && adjustment) {
    adjustmentAmount = (subTotal * adjustment) / 100;
  } else {
    adjustmentAmount = adjustment;
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onAdjustmentChange = (value: number | null) => {
    console.log("changed", value);
    if (
      adjustType === AdjustmentType.PERCENTAGE &&
      value &&
      value >= 0 &&
      value <= 100
    ) {
      setAdjustment(value);
    } else if (
      adjustType === AdjustmentType.ABSOLUTE &&
      value &&
      value >= 0 &&
      value <= subTotal
    ) {
      setAdjustment(value);
    } else {
      setAdjustment(0);
    }
  };

  const handleAdjustTypeChange = (value: {
    value: string;
    label: React.ReactNode;
  }) => {
    setAdjustType(value.value);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (date: Date) => getFormattedDate(new Date(date)),
    },
    {
      title: "Buyer Name",
      dataIndex: "buyerName",
    },
    {
      title: "Buyer Purchases History",
      dataIndex: "lineItems",
      render: (lineItems: any) => (
        <DisplayLineItems lineItems={lineItems} isSeller />
      ),
    },
  ];

  return (
    <Modal
      open={invoiceViewModalData}
      centered
      onCancel={() => setInvoiceViewModalData(null)}
      bodyStyle={{ padding: "0px" }}
      width={850}
      footer={null}
    >
      <div className={classes.modalBody}>
        <div className={classes.heading}>
          <h1>{`Invoice of Seller`}</h1>
          <Popover
            overlayStyle={{ zIndex: 1000 }}
            placement="left"
            content="Print Now"
          >
            <button type="button" className={classes.button} onClick={handlePrint}>
              <PrinterOutlined />
            </button>
          </Popover>
        </div>
        <PrintMe ref={componentRef} title={""}>
          <div className={classes.invoiceBody}>
            <div className={classes.spaceBetween}>
              <div>
                <h2>{`Seller: ${filteredSales[0]?.lineItems[0]?.sellerName}`}</h2>
              </div>
              <div>
                <h2>{`Date: ${getFormattedDate(
                  new Date(filteredSales[0]?.date)
                )}`}</h2>
              </div>
            </div>
            <div className={classes.liteItemsTable}>
              <Table
                dataSource={filteredSales}
                rowKey="id"
                pagination={false}
                columns={columns}
              />
              <div className={classes.lineItemsTotal}>
                <div className={classes.adjustment}>
                  <Row justify="space-between">
                    <Space direction="vertical">
                      <Select
                        labelInValue
                        defaultValue={{
                          value: AdjustmentType.PERCENTAGE,
                          label: AdjustmentType.PERCENTAGE,
                        }}
                        size="large"
                        style={{
                          width: 130,
                          textAlign: "left",
                        }}
                        onChange={handleAdjustTypeChange}
                        options={[
                          {
                            value: AdjustmentType.ABSOLUTE,
                            label: AdjustmentType.ABSOLUTE,
                          },
                          {
                            value: AdjustmentType.PERCENTAGE,
                            label: AdjustmentType.PERCENTAGE,
                          },
                        ]}
                      />
                    </Space>
                    <Space direction="vertical">
                      <Form autoComplete="off">
                        <Form.Item
                          name="adjustment"
                          rules={[
                            {
                              type: "number",
                              min: 0,
                              message: "Invalid Adjustment",
                            },
                            {
                              type: "number",
                              max:
                                adjustType === AdjustmentType.PERCENTAGE
                                  ? 100
                                  : subTotal,
                              message: "Invalid Adjustment",
                            },
                          ]}
                        >
                          <InputNumber
                            size="large"
                            style={{
                              width: 200,
                            }}
                            onChange={onAdjustmentChange}
                            placeholder="Adjustment"
                          />
                        </Form.Item>
                      </Form>
                    </Space>
                  </Row>
                </div>
                <h3>{`Sub-Total: ${formatBangladeshiCurrency(
                  subTotal
                )} ( ${getBDFormattedNumber(totalQuantity)} KG)`}</h3>
                <h3>{`Adjustment: ${formatBangladeshiCurrency(
                  adjustmentAmount
                )}`}</h3>
                <h3>{`Total: ${formatBangladeshiCurrency(
                  subTotal - adjustmentAmount
                )}`}</h3>
              </div>
            </div>
          </div>
        </PrintMe>
      </div>
    </Modal>
  );
}

export default InvoiceView;
