import React from "react";
import { Card } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const dataPie = [
  { name: "Users", value: 400 },
  { name: "Admins", value: 50 },
  { name: "Premium Users", value: 120 },
];

const dataBar = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 7000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const OverviewPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Pie Chart */}
      <Card title="User Distribution">
        <PieChart width={300} height={300}>
          <Pie
            data={dataPie}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {dataPie.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </Card>

      {/* Bar Chart */}
      <Card title="Monthly Revenue">
        <BarChart width={400} height={300} data={dataBar}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#82ca9d" />
        </BarChart>
      </Card>
    </div>
  );
};

export default OverviewPage;
