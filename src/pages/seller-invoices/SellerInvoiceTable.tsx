import { Table } from "antd";
import { getFormattedDate } from "../../utils/formatDate";
import { formatBangladeshiCurrency } from "../../utils/formatNumber";
import DisplayLineItems from "../../components/DisplayLineItems";
import classes from "./SellerInvoiceTable.module.css";

type SITProps = {
  salesByDate: any;
  title: string;
  loading: boolean;
};

function SaleInvoiceTable({ salesByDate, title, loading }: SITProps) {
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
      <h3 style={{ marginBottom: "5px", marginTop: "20px", paddingLeft: "5px" }}>
        Sales of {title}
      </h3>
      <div>
        <Table
          {...{ loading }}
          rowKey="_id"
          columns={columns}
          dataSource={filteredSales}
          pagination={false}
        />
      </div>
    </>
  );
}

export default SaleInvoiceTable;
