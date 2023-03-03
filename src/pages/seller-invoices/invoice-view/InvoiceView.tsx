import React, { useRef } from "react";
import { Modal, Popover, Space, Table } from "antd";
import { useReactToPrint } from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";

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

function InvoiceView({ invoiceViewModalData, setInvoiceViewModalData }: IVProps) {
  const componentRef = useRef<React.Component>(null);
  const filteredSales = invoiceViewModalData?.filter(
    (sale: any) => sale.lineItems.length
  );
  if (!filteredSales.length) return null;
  const {
    invoice_number: invoiceNumber = 10,
    lineItems,
    sub_total = 0,
    total = 0,
  } = invoiceViewModalData;

  const totalQuantity = getColumnTotal(lineItems, "quantity");

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
      title: "Summary",
      dataIndex: "lineItems",
      render: (lineItems: any) => <DisplayLineItems lineItems={lineItems} />,
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
                <h3>
                  {`Sub-Total: ${formatBangladeshiCurrency(
                    sub_total
                  )} (${getBDFormattedNumber(totalQuantity)} L)`}
                </h3>
                <div>
                  <h3>{`Total: ${formatBangladeshiCurrency(total)}`}</h3>
                </div>
              </div>
            </div>
          </div>
        </PrintMe>
      </div>
    </Modal>
  );
}

export default InvoiceView;
