import React, { useState } from "react";
import { Input, Button, message, Card, Typography } from "antd";

const { Title } = Typography;

const MakeAdmin = () => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMakeAdmin = async () => {
    if (!userId.trim()) {
      message.error("Please enter a user ID");
      return;
    }

    setLoading(true);
    try {
      // Call your PATCH API with role=admin query param
      const response = await fetch(
        `https://nikaahnest-server-side.vercel.app/users/${userId}/role?role=admin`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        message.success(data.message || "User promoted to admin");
        setUserId("");
      } else {
        message.error(data.message || "Failed to promote user");
      }
    } catch (error) {
      message.error("Network error, please try again", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "auto" }}>
      <Title level={4} style={{ textAlign: "center", marginBottom: 24 }}>
        Promote User to Admin
      </Title>
      <Input
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        disabled={loading}
        onPressEnter={handleMakeAdmin}
      />
      <Button
        type="primary"
        block
        style={{ marginTop: 16 }}
        onClick={handleMakeAdmin}
        className="!bg-rose-400"
        loading={loading}
      >
        Make Admin
      </Button>
    </Card>
  );
};

export default MakeAdmin;
