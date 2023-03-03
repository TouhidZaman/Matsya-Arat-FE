import { Table } from "antd";
import { getFormattedDate } from "../../utils/formatDate";
import { formatBangladeshiCurrency } from "../../utils/formatNumber";
import DisplayLineItems from "../DisplayLineItems";
import classes from "./SalesTable.module.css";
import { Link } from "react-router-dom";

type SITProps = {
  sales: any[];
  loading: boolean;
  title: string;
};

function SalesTable({ sales, loading, title }: SITProps) {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (date: Date) => getFormattedDate(new Date(date)),
    },
    {
      title: "Buyer Name",
      render: (buyer: any) => (
        <Link to={`/buyers/${buyer.buyerId}`}>{buyer.buyerName}</Link>
      ),
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

  const displayTitle = () => (
    <div className={classes.displayTitle}>
      <h3>{title}</h3>
    </div>
  );

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

export default SalesTable;
