import React from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const DrawPieChart = ({ data, firstDataKey, secondDataKey, ...props }: any) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart {...props}>
        <Tooltip />
        {/* <Legend verticalAlign="bottom" height={36} wrapperStyle={{ lineHeight: '60px' }}/> */}

        <Pie
          data={data}
          dataKey={firstDataKey}
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#8884d8"
        />
        <Pie
          data={data}
          dataKey={secondDataKey}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          fill="#82ca9d"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DrawPieChart;
