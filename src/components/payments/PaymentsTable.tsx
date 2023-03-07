import { Link } from "react-router-dom";
import { Table } from "antd";
import { getFormattedDate } from "../../utils/formatDate";
import { formatBangladeshiCurrency } from "../../utils/formatNumber";
import classes from "./PaymentsTable.module.css";

type SITProps = {
  payments: any[];
  loading: boolean;
  title: string;
};

function PaymentsTable({ payments, loading, title }: SITProps) {
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
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
      title: "Paid Amount",
      dataIndex: "paid",
      render: (adjustment: number) => formatBangladeshiCurrency(adjustment),
    },
    {
      title: "Due After Payment",
      dataIndex: "currentDue",
      render: (currentDue: number) => formatBangladeshiCurrency(currentDue),
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
          dataSource={payments}
          pagination={false}
          title={() => displayTitle()}
        />
      </div>
    </>
  );
}

export default PaymentsTable;
