import React from "react";

import classes from "./Dashboard.module.css";
import DrawLineChart from "../../components/draw-charts/DrawLineChart";
import DrawAreaChart from "../../components/draw-charts/DrawAreaChart";
import DrawBarChart from "../../components/draw-charts/DrawBarChart";
import DrawPieChart from "../../components/draw-charts/DrawPieChart";

const CHART_DATA = [
  {
    month: "Mar",
    investment: 100000,
    sell: 241,
    revenue: 10401,
  },
  {
    month: "Apr",
    investment: 200000,
    sell: 423,
    revenue: 24500,
  },
  {
    month: "May",
    investment: 500000,
    sell: 726,
    revenue: 67010,
  },
  {
    month: "Jun",
    investment: 500000,
    sell: 529,
    revenue: 40405,
  },
  {
    month: "Jul",
    investment: 600000,
    sell: 601,
    revenue: 50900,
  },
  {
    month: "Aug",
    investment: 700000,
    sell: 670,
    revenue: 61000,
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className={classes.charts}>
      <div className={classes.chartsContainer}>
        <div className={classes.lineChart}>
          <DrawLineChart data={CHART_DATA} xAxis="month" dataKey={"sell"} />
        </div>
        <div className={classes.pieChart}>
          <DrawPieChart
            data={CHART_DATA}
            firstDataKey={"investment"}
            secondDataKey={"revenue"}
          />
        </div>
        <div className={classes.barChart}>
          <DrawBarChart
            data={CHART_DATA}
            xAxis="month"
            firstDataKey={"investment"}
            secondDataKey={"revenue"}
          />
        </div>
        <div className={classes.areaChart}>
          <DrawAreaChart
            data={CHART_DATA}
            xAxis="month"
            firstDataKey={"investment"}
            secondDataKey={"revenue"}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
