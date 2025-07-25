import React, { useEffect, useState } from "react";
import { Table, Button, Badge, Card } from "antd";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";

// format date helper
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return isNaN(date) ? "-" : date.toLocaleDateString();
};

const ApprovedContactRequest = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contact requests from backend
  const fetchContactRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://nikaahnest-server-side.vercel.app/contact-requests"
      );
      if (!res.ok) throw new Error("Failed to fetch contact requests");
      const data = await res.json();
      setContactRequests(data);
    } catch (error) {
      toast.error("Failed to fetch contact requests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactRequests();
  }, []);

  // Approve a pending contact request by _id
  const handleApprove = async (id) => {
    try {
      const res = await fetch(
        `https://nikaahnest-server-side.vercel.app/contact-requests/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "approved" }),
        }
      );
      if (!res.ok) throw new Error("Failed to approve request");
      toast.success("Contact request approved");
      fetchContactRequests(); // refresh data after approval
    } catch (error) {
      toast.error("Failed to approve request", error);
    }
  };

  // Define Ant Design table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "biodataName",
      key: "biodataName",
      render: (text) => text || "-",
    },
    {
      title: "Biodata ID",
      dataIndex: "receiverId",
      key: "receiverId",
      render: (id) => (id ? `#${id}` : "-"),
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
      render: (text) => text || "-",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) =>
        record.status === "approved" ? (
          <Badge color="green" text="Approved" />
        ) : (
          <Badge color="orange" text="Pending" />
        ),
    },
    {
      title: "Request Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDate(date),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "pending" ? (
          <Button
            type="primary"
            onClick={() => handleApprove(record._id)}
            danger
            size="small"
          >
            Approve
          </Button>
        ) : (
          <span style={{ color: "green", fontWeight: "600" }}>Approved</span>
        ),
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <Card
        title={
          <span className="flex items-center gap-2">
            <MessageSquare className="text-blue-600" /> Contact Requests
          </span>
        }
      >
        <Table
          columns={columns}
          dataSource={contactRequests}
          rowKey={(record) => record._id}
          loading={loading}
          pagination={{ pageSize: 5 }}
          locale={{ emptyText: "No contact requests found." }}
        />
      </Card>
    </div>
  );
};

export default ApprovedContactRequest;
