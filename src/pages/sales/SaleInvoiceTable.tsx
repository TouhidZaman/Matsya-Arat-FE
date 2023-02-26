import { Table } from "antd";
import { getFormattedDate } from "../../utils/formatDate";
import { formatBangladeshiCurrency } from "../../utils/formatNumber";
import DisplayLineItems from "../../components/DisplayLineItems";
import classes from "./SaleInvoiceTable.module.css";

type SITProps = any;

function SaleInvoiceTable({ sales, loading }: SITProps) {
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
      title: "Previous Due",
      dataIndex: "previousDue",
      render: (previousDue: number) => formatBangladeshiCurrency(previousDue),
    },
    {
      title: "Total with Due",
      dataIndex: "totalWithDue",
      render: (totalWithDue: number) => formatBangladeshiCurrency(totalWithDue),
    },
    {
      title: "Paid",
      dataIndex: "paid",
      render: (paid: number) => formatBangladeshiCurrency(paid),
    },
    {
      title: "Summary",
      dataIndex: "lineItems",
      render: (lineItems: any) => <DisplayLineItems lineItems={lineItems} />,
    },
  ];

  const displayTitle = () => <h3 style={{ margin: "0px" }}>All Sales of Buyers</h3>;

  return (
    <>
      <div className={classes.marginTop}>
        <Table
          {...{ loading }}
          rowKey="_id"
          columns={columns}
          dataSource={sales}
          pagination={false}
          title={() => displayTitle()}
        />
      </div>
    </>
  );
}

export default SaleInvoiceTable;
