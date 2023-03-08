import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DrawAreaChart = ({
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
      <AreaChart margin={margin} data={data} {...props}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ lineHeight: "50px" }}
        />

        <Area
          type="monotone"
          dataKey={firstDataKey}
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey={secondDataKey}
          stackId="2"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DrawAreaChart;
