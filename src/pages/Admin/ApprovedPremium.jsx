import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Card, Table, Tag, Typography, Spin, Empty } from "antd";
import { CrownFilled } from "@ant-design/icons";

const { Title, Text } = Typography;

const ApprovedPremium = () => {
  const [premiumUsers, setPremiumUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPremiumUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://nikaahnest-server-side.vercel.app/users?role=premium&approved=true"
      );
      if (!res.ok) throw new Error("Failed to fetch premium users");
      const data = await res.json();
      setPremiumUsers(data);
    } catch (error) {
      Swal.fire(
        "Error",
        error.message || "Could not fetch premium users",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPremiumUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
      render: (text) => (
        <Text strong style={{ color: "#222" }}>
          {text || "N/A"}
        </Text>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <Text type="secondary" ellipsis style={{ maxWidth: 200 }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Joined",
      dataIndex: "creationTime",
      key: "creationTime",
      sorter: (a, b) =>
        new Date(a.creationTime || a.createdAt) -
        new Date(b.creationTime || b.createdAt),
      render: (_, record) =>
        new Date(record.creationTime || record.createdAt).toLocaleDateString(),
    },
    {
      title: "Status",
      key: "status",
      filters: [{ text: "Approved", value: "approved" }],
      onFilter: () => true,
      render: () => (
        <Tag
          color="success"
          style={{
            fontWeight: "bold",
            borderRadius: 9999,
            padding: "4px 12px",
            fontSize: 14,
            boxShadow:
              "0 1px 6px rgba(0, 128, 0, 0.2), 0 0 10px rgba(0, 128, 0, 0.15)",
          }}
        >
          Approved
        </Tag>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Loading premium users..." />
      </div>
    );
  }

  if (premiumUsers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Empty
          description="No approved premium users found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <span style={{ fontSize: 36 }}>👑</span>
      </div>
    );
  }

  return (
    <Card
      style={{
        maxWidth: 960,
        margin: "40px auto",
        borderRadius: 20,
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        border: "none",
        overflow: "hidden",
      }}
      bodyStyle={{ padding: 24 }}
      title={
        <div className="flex items-center space-x-3">
          <CrownFilled style={{ color: "#fadb14", fontSize: 28 }} />
          <Title level={3} style={{ margin: 0 }}>
            Approved Premium Users
          </Title>
        </div>
      }
    >
      <Table
        columns={columns}
        dataSource={premiumUsers}
        rowKey={(record) => record._id || record.id}
        pagination={{ pageSize: 8, showSizeChanger: true }}
        bordered
        size="middle"
        scroll={{ x: "max-content" }}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bg-gray-50" : "bg-white"
        }
        style={{ transition: "all 0.3s ease-in-out" }}
        // Hover effect with simple style
        onRow={() => ({
          style: { cursor: "pointer" },
        })}
      />
    </Card>
  );
};

export default ApprovedPremium;
