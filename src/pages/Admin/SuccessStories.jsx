import React, { useEffect, useState } from "react";
import {
  EyeOutlined,
  HeartOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Card, Button, Badge, Table, Typography, message, Modal } from "antd";

const { Title, Text } = Typography;

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Your backend API URL (without trailing slash)
  const API_URL = "https://nikaahnest-server-side.vercel.app";

  useEffect(() => {
    fetchSuccessStories();
  }, []);

  const fetchSuccessStories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/success-stories`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStories(data);
    } catch (error) {
      message.error("Failed to fetch success stories");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Male Biodata ID",
      dataIndex: "selfBiodataId",
      key: "selfBiodataId",
      render: (id) => <Text type="secondary">#{id}</Text>,
    },
    {
      title: "Female Biodata ID",
      dataIndex: "partnerBiodataId",
      key: "partnerBiodataId",
      render: (id) => <Text type="secondary">#{id}</Text>,
    },
    {
      title: "Male Name",
      dataIndex: "maleName",
      key: "maleName",
    },
    {
      title: "Female Name",
      dataIndex: "femaleName",
      key: "femaleName",
    },
    {
      title: "Submitted Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "approved" ? (
          <Badge status="success" text="Approved" />
        ) : (
          <Badge status="warning" text="Pending" />
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedStory(record);
            setModalVisible(true);
          }}
          type="default"
          size="small"
        >
          View Story
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <HeartOutlined style={{ fontSize: 32, color: "#f43f5e" }} />
        <div>
          <Title level={2} style={{ marginBottom: 0 }}>
            Success Stories Management
          </Title>
          <Text type="secondary">
            View and manage success stories from married couples
          </Text>
        </div>
      </div>

      <Card
        title={
          <span className="flex items-center gap-2">
            <UsergroupAddOutlined style={{ fontSize: 18 }} />
            All Success Stories
          </span>
        }
      >
        <Table
          columns={columns}
          dataSource={stories}
          rowKey={(record) => record._id || record.id}
          loading={loading}
          pagination={{ pageSize: 5 }}
          locale={{ emptyText: "No success stories found." }}
        />
      </Card>

      <Modal
        title={
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <HeartOutlined style={{ color: "#f43f5e" }} />
            Success Story Details
          </span>
        }
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedStory && (
          <>
            <div style={{ textAlign: "center" }}>
              <img
                src={
                  selectedStory.coupleImageLink || "/api/placeholder/400/300"
                }
                alt={`${selectedStory.maleName} and ${selectedStory.femaleName}`}
                style={{
                  maxWidth: "100%",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
            </div>
            <div
              style={{
                marginTop: 20,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <Text>
                <b>Self Biodata ID:</b>{" "}
                <span style={{ color: "#1890ff" }}>
                  #{selectedStory.selfBiodataId}
                </span>
              </Text>
              <Text>
                <b>Partner Biodata ID:</b>{" "}
                <span style={{ color: "#eb2f96" }}>
                  #{selectedStory.partnerBiodataId}
                </span>
              </Text>
              <Text>
                <b>Male Name:</b> {selectedStory.name}
              </Text>
              <Text>
                <b>Female Name:</b> {selectedStory.name}
              </Text>
            </div>

            <div style={{ marginTop: 20 }}>
              <Title level={5}>Their Success Story:</Title>
              <div
                style={{
                  backgroundColor: "#fafafa",
                  padding: 16,
                  borderRadius: 8,
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.5,
                }}
              >
                {selectedStory.successStoryReview}
              </div>
            </div>

            <div
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #f0f0f0",
                paddingTop: 12,
              }}
            >
              <Text type="secondary">
                Submitted on{" "}
                {new Date(selectedStory.createdAt).toLocaleDateString()}
              </Text>
              {selectedStory.status === "approved" ? (
                <Badge status="success" text="Approved" />
              ) : (
                <Badge status="warning" text="Pending" />
              )}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default SuccessStories;
