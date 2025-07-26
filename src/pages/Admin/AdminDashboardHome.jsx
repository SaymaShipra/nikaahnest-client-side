import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  TeamOutlined,
  CrownOutlined,
  DollarOutlined,
  MessageOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Card } from "antd";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const pieChartColors = {
    male: "#10b981",
    female: "#ec4899",
    premium: "#f59e0b",
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "https://nikaahnest-server-side.vercel.app/api/dashboard-stats"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const pieData = stats
    ? [
        {
          name: "Male Biodata",
          value: stats.maleBiodataCount,
          fill: pieChartColors.male,
        },
        {
          name: "Female Biodata",
          value: stats.femaleBiodataCount,
          fill: pieChartColors.female,
        },
        {
          name: "Premium Biodata",
          value: stats.premiumBiodataCount,
          fill: pieChartColors.premium,
        },
      ]
    : [];

  const statCards = [
    {
      title: "Total Biodata",
      value: stats?.totalBiodataCount,
      icon: <TeamOutlined className="text-blue-600 text-2xl" />,
    },
    {
      title: "Male Biodata",
      value: stats?.maleBiodataCount,
      icon: <UserOutlined className="text-green-600 text-2xl" />,
    },
    {
      title: "Female Biodata",
      value: stats?.femaleBiodataCount,
      icon: <UserOutlined className="text-pink-600 text-2xl" />,
    },
    {
      title: "Premium Biodata",
      value: stats?.premiumBiodataCount,
      icon: <CrownOutlined className="text-yellow-600 text-2xl" />,
    },
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue || 0}`,
      icon: <DollarOutlined className="text-purple-600 text-2xl" />,
    },
    {
      title: "Contact Requests",
      value: stats?.contactRequests,
      icon: <MessageOutlined className="text-indigo-600 text-2xl" />,
    },
  ];

  const recentActivities = stats?.recentActivities || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, idx) => (
          <Card key={idx} className="shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">
                  {loading ? "..." : stat.value}
                </p>
              </div>
              <div className="p-2 bg-gray-100 rounded-full">{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card title="Biodata Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card
          title={
            <span className="flex items-center gap-2">
              <EyeOutlined />
              Recent Activities
            </span>
          }
        >
          <div className="space-y-3">
            {recentActivities.length === 0 && (
              <p className="text-gray-500 text-sm">No recent activity</p>
            )}
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex justify-between p-3 border rounded hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-500">by {activity.user}</p>
                </div>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
