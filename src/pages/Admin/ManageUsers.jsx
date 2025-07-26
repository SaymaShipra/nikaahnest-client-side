import React, { useEffect, useState } from "react";
import { Button, Input, Badge, Table, Space, Popconfirm, message } from "antd";
import {
  SearchOutlined,
  UserSwitchOutlined,
  CrownOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://nikaahnest-server-side.vercel.app/users"
      );
      setUsers(res.data);
    } catch (error) {
      message.error("Failed to load users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAdmin = async (email, isAdmin) => {
    setLoading(true);
    try {
      const url = isAdmin
        ? `https://nikaahnest-server-side.vercel.app/users/remove-admin/${email}`
        : `https://nikaahnest-server-side.vercel.app/users/make-admin/${email}`;
      await axios.patch(url);
      message.success(`User ${isAdmin ? "removed from" : "promoted to"} admin`);
      fetchUsers();
    } catch (error) {
      message.error("Operation failed", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePremium = async (userId, isPremium) => {
    setLoading(true);
    try {
      const url = `https://nikaahnest-server-side.vercel.app/users/${userId}/premium`;
      await axios.patch(url, { isPremium: !isPremium });
      message.success(
        `User ${isPremium ? "removed from" : "promoted to"} premium`
      );
      fetchUsers();
    } catch (error) {
      message.error("Operation failed", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://nikaahnest-server-side.vercel.app/users/${userId}`
      );
      message.success("User deleted");
      fetchUsers();
    } catch (error) {
      message.error("Failed to delete user", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter users by search text
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Badge color={role === "admin" ? "green" : "blue"} text={role} />
      ),
      filters: [
        { text: "Admin", value: "admin" },
        { text: "User", value: "user" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Premium",
      dataIndex: "isPremium",
      key: "isPremium",
      render: (isPremium) =>
        isPremium ? (
          <Badge color="gold" text="Premium" />
        ) : (
          <Badge color="gray" text="Standard" />
        ),
      filters: [
        { text: "Premium", value: true },
        { text: "Standard", value: false },
      ],
      onFilter: (value, record) => record.isPremium === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {/* Toggle Admin */}
          <Button
            type={record.role === "admin" ? "default" : "primary"}
            icon={<UserSwitchOutlined />}
            onClick={() => toggleAdmin(record.email, record.role === "admin")}
          >
            {record.role === "admin" ? "Demote Admin" : "Make Admin"}
          </Button>

          {/* Toggle Premium */}
          <Button
            type={record.isPremium ? "default" : "gold"}
            icon={<CrownOutlined />}
            onClick={() => togglePremium(record._id, record.isPremium)}
          >
            {record.isPremium ? "Remove Premium" : "Make Premium"}
          </Button>

          {/* Delete */}
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => deleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<CloseCircleOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>

      <Input
        placeholder="Search by name or email"
        prefix={<SearchOutlined />}
        className="mb-4 max-w-sm"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
      />

      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey={(record) => record._id}
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default ManageUsers;
