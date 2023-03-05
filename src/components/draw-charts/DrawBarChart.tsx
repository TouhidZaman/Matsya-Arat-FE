import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DrawBarChart = ({
  data,
  xAxis,
  firstDataKey,
  secondDataKey,
  ...props
}: any) => {
  const margin = {
    top: 10,
    right: 30,
    left: 30,
    bottom: 0,
  };
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart margin={margin} data={data} {...props}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ lineHeight: "50px" }}
        />
        <Bar
          type="monotone"
          dataKey={firstDataKey}
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Bar
          type="monotone"
          dataKey={secondDataKey}
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DrawBarChart;
