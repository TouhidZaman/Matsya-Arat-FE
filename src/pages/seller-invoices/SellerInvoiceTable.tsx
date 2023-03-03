import { useState } from "react";
import { Button, Table } from "antd";

import { getFormattedDate } from "../../utils/formatDate";
import DisplayLineItems from "../../components/DisplayLineItems";
import classes from "./SellerInvoiceTable.module.css";
import InvoiceView from "./invoice-view/InvoiceView";

type SITProps = {
  salesByDate: any;
  saleDate: string;
  loading: boolean;
};

function SaleInvoiceTable({ salesByDate, saleDate, loading }: SITProps) {
  const [invoiceViewModalData, setInvoiceViewModalData] = useState(null);

  const filteredSales = salesByDate?.filter((sale: any) => sale.lineItems.length);
  if (!filteredSales.length) return null;
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
    <>
      <div className={classes.displayTitle}>
        <h3>Sales of {getFormattedDate(new Date(saleDate))}</h3>
        <Button type="link" onClick={() => setInvoiceViewModalData(salesByDate)}>
          Generate Invoice
        </Button>
      </div>

      <div>
        <Table
          {...{ loading }}
          rowKey="_id"
          columns={columns}
          dataSource={filteredSales}
          pagination={false}
        />
      </div>
      {invoiceViewModalData ? (
        <InvoiceView
          invoiceViewModalData={invoiceViewModalData}
          setInvoiceViewModalData={setInvoiceViewModalData}
        />
      ) : null}
    </>
  );
}

export default SaleInvoiceTable;
