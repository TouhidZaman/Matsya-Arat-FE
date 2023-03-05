import React from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DrawLineChart = ({ data, xAxis, dataKey, ...props }: any) => {
  const margin = {
    top: 10,
    right: 30,
    left: 0,
    bottom: 0,
  };
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart margin={margin} data={data} {...props}>
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ lineHeight: "50px" }}
        />

        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#82ca9d"
          fill="#82ca9d"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DrawLineChart;
