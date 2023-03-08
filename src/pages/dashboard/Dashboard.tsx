import React from "react";
import { compareAsc } from "date-fns";

import classes from "./Dashboard.module.css";
import DrawLineChart from "../../components/draw-charts/DrawLineChart";
import DrawAreaChart from "../../components/draw-charts/DrawAreaChart";
import DrawBarChart from "../../components/draw-charts/DrawBarChart";
import DrawPieChart from "../../components/draw-charts/DrawPieChart";
import { useGetSalesByDateGroupQuery } from "../../features/saleInvoice/saleInvoicesAPI";
import { useGetPaymentsByDateGroupQuery } from "../../features/payment/paymentsAPI";
import Loading from "../../components/Loading";
import { getFormattedDate } from "../../utils/formatDate";

const Dashboard: React.FC = () => {
  const { data: salesByDate = [], isLoading } =
    useGetSalesByDateGroupQuery("limit=4");

  const { data: paymentsByDate = [], isLoading: paymentLoading } =
    useGetPaymentsByDateGroupQuery("limit=4");

  let salesChartData = [];
  let paymentsChartData = [];

  if (isLoading && paymentLoading) return <Loading />;

  // Formatting Sales data for chart
  if (salesByDate.length) {
    const sortedSales = salesByDate
      ?.slice()
      ?.sort((a: any, b: any) => compareAsc(new Date(a._id), new Date(b._id)));
    salesChartData = sortedSales.map((sale: any) => ({
      date: getFormattedDate(new Date(sale._id)),
      total_sell: sale.total,
      cash_received: sale.paid,
      sell_revenue: sale.adjustment,
      sell_quantity: sale.quantity,
    }));
  }
  // Formatting payments data for chart
  if (paymentsByDate.length) {
    const sortedPaymentsDate = paymentsByDate
      ?.slice()
      ?.sort((a: any, b: any) => compareAsc(new Date(a._id), new Date(b._id)));
    paymentsChartData = sortedPaymentsDate.map((pd: any) => ({
      date: getFormattedDate(new Date(pd._id)),
      total_credit_paid: pd.totalPaid,
    }));
  }

  return (
    <div className={classes.charts}>
      <div className={classes.chartsContainer}>
        <div className={classes.barChart}>
          <DrawBarChart
            data={salesChartData}
            xAxis="date"
            firstDataKey={"total_sell"}
            secondDataKey={"cash_received"}
          />
        </div>
        <div className={classes.lineChart}>
          <DrawLineChart
            data={paymentsChartData}
            xAxis="date"
            dataKey={"total_credit_paid"}
          />
        </div>

        <div className={classes.areaChart}>
          <DrawAreaChart
            data={salesChartData}
            xAxis="date"
            firstDataKey={"sell_revenue"}
            secondDataKey={"sell_quantity"}
          />
        </div>

        <div className={classes.pieChart}>
          <DrawPieChart
            data={salesChartData}
            firstDataKey={"cash_received"}
            secondDataKey={"total_sell"}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
