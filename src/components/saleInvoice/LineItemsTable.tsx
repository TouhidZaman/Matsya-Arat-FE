import React from "react";
import { Button, Row, Table } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import SearchableSelectField from "../SearchableSelectField";
import {
  formatBangladeshiCurrency,
  getBDFormattedNumber,
} from "../../utils/formatNumber";
import EditableNumberField from "../EditableNumberField";
import getColumnTotal from "../../utils/getTotal";

type LITProps = any;

function LineItemsTable({
  lineItems,
  setLineItems,
  loading,
  sellers,
  selectedCustomer,
  payment,
  setPayment,
}: LITProps) {
  // Adjusting camel case key issue
  const formattedSellers = sellers.map((seller: any) => ({
    sellerId: seller._id,
    sellerName: seller.name,
    // rate: 0,
  }));

  const handleSave = (lineItem: any) => {
    console.log("line item", lineItem);
    const newLineItems = [...lineItems];
    console.log("line items", newLineItems);
    const index = newLineItems.findIndex((item) => item.id === lineItem.id);
    const item = newLineItems[index];

    const newLineItem = { ...lineItem };
    if (newLineItem.quantity && newLineItem.rate) {
      console.log("Inside quantity", newLineItem.quantity);
      console.log("Inside quantity", newLineItem.rate);
      newLineItem.subtotal = newLineItem.rate * newLineItem.quantity;
    }

    newLineItems.splice(index, 1, { ...item, ...newLineItem });
    // console.log(newLineItems, 'line items');
    setLineItems(newLineItems);
    setPayment(0); // resetting payment
  };

  const handleDelete = (record: any) => {
    const updatedLineItems = lineItems.filter((item: any) => item.id !== record.id);
    setLineItems(updatedLineItems);
    setPayment(0); // resetting payment
  };

  const columns: any = [
    {
      title: "Sr. No.",
      render: (record: any) => lineItems.indexOf(record) + 1,
    },
    {
      title: "Seller Name",
      dataIndex: "sellerName",
      render: (_: any, lineItem: any) => (
        <SearchableSelectField
          selectOptions={formattedSellers}
          optionKey="sellerId"
          optionLabelKey="sellerName"
          onSelectChange={(seller: any) => handleSave({ ...lineItem, ...seller })}
          placeholder="Select Seller"
          value={lineItem.sellerId}
          // enableTextInput
          loading={loading}
          width={150}
        />
      ),
    },
    {
      title: "Fish Rate",
      dataIndex: "rate",
      render: (rate: any, lineItem: any) => (
        <EditableNumberField
          currentValue={rate}
          record={lineItem}
          handleSave={handleSave}
          fieldKey="rate"
          placeholder="rate"
          fieldNameForError="Rate"
          isRequired
          isInputOnly
          customFormatter={(value: any) => formatBangladeshiCurrency(value)}
        />
      ),
    },
    {
      title: "Quantity (Kg)",
      dataIndex: "quantity",
      render: (quantity: any, lineItem: any) => (
        <EditableNumberField
          currentValue={quantity}
          record={lineItem}
          handleSave={handleSave}
          fieldKey="quantity"
          fieldNameForError="Quantity"
          placeholder="quantity"
          isRequired
          isInputOnly
          customFormatter={(value: any) => getBDFormattedNumber(value)}
        />
      ),
    },
    {
      title: "Sub Total",
      dataIndex: "subtotal",
      render: (subtotal: any) => formatBangladeshiCurrency(subtotal),
    },
    {
      title: "Actions",
      align: "center",
      render: (_: any, record: any) => (
        <Row justify="center">
          <Button type="text" onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </Row>
      ),
    },
  ];

  const displayTotal = () => (
    <>
      <Row justify="end">
        <h3 style={{ margin: "0px" }}>
          {`Total: ${formatBangladeshiCurrency(
            getColumnTotal(lineItems, "subtotal")
          )} (${getColumnTotal(lineItems, "quantity") || "0.00"} Kg)`}
        </h3>
      </Row>
      <Row justify="end">
        <h3 style={{ margin: "0px" }}>
          {`Total with Due: ${formatBangladeshiCurrency(
            getColumnTotal(lineItems, "subtotal") +
              (selectedCustomer?.dueAmount || 0)
          )}`}
        </h3>
      </Row>
      <Row justify={"end"}>
        <h3 style={{ margin: "0px" }}>
          {`Total Due after payment: ${formatBangladeshiCurrency(
            getColumnTotal(lineItems, "subtotal") +
              (selectedCustomer?.dueAmount || 0) -
              payment
          )}`}
        </h3>
      </Row>
    </>
  );

  return (
    <Table
      rowClassName={() => "editable-row"}
      dataSource={lineItems}
      rowKey="id"
      pagination={false}
      columns={columns}
      footer={displayTotal}
    />
  );
}

export default LineItemsTable;
