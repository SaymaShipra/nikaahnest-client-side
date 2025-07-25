import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import {
  DashboardOutlined,
  UserOutlined,
  CheckCircleOutlined,
  StarOutlined,
  HeartOutlined,
  TeamOutlined,
  HomeOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography, Button } from "antd";
import { toast } from "sonner";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  // Fetch current admin info from backend API
  const fetchCurrentAdmin = async () => {
    setLoadingAdmin(true);
    try {
      const res = await fetch(
        "https://nikaahnest-server-side.vercel.app/admin/current"
      ); // replace with your API
      if (!res.ok) throw new Error("Failed to fetch admin info");
      const data = await res.json();
      setCurrentAdmin(data);
    } catch (err) {
      toast.error(err.message || "Failed to load admin info");
    } finally {
      setLoadingAdmin(false);
    }
  };

  useEffect(() => {
    fetchCurrentAdmin();
  }, []);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const sidebarItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard Home",
      to: "/admin",
    },
    {
      key: "manage-users",
      icon: <UserOutlined />,
      label: "Manage Users",
      to: "/admin/manage",
    },
    {
      key: "approved-premium",
      icon: <StarOutlined />,
      label: "Approved Premium",
      to: "/admin/approvedPremium",
    },
    {
      key: "approved-contact",
      icon: <CheckCircleOutlined />,
      label: "Approved Contact",
      to: "/admin/approvedContactRequest",
    },
    {
      key: "make-admin",
      icon: <TeamOutlined />,
      label: "Make Admin",
      to: "/admin/make-admin",
    },
    {
      key: "success-stories",
      icon: <HeartOutlined />,
      label: "Success Stories",
      to: "/admin/success-stories",
    },
    {
      key: "admin-management",
      icon: <TeamOutlined />,
      label: "Admin Management",
      to: "/admin/admin-management",
    },
  ];

  if (loadingAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading admin info...</p>
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible style={{ background: "#fff" }}>
        <div
          style={{
            height: 60,
            margin: "16px",
            textAlign: "center",
            color: "#000",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          <Title
            level={4}
            style={{ color: "#000", marginBottom: 0, lineHeight: "60px" }}
          >
            {currentAdmin?.name || "Admin User"}
          </Title>
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          style={{ background: "#fff", color: "#000" }}
        >
          {sidebarItems.map(({ key, icon, label, to }) => (
            <Menu.Item key={key} icon={icon}>
              <NavLink to={to} style={{ color: "#000" }}>
                {label}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout>
        {/* Custom Header */}
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            boxShadow: "0 2px 8px #f0f1f2",
          }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
            {/* Left side */}
            <div className="flex items-center gap-3 space-x-4">
              <Button
                type="default"
                icon={<HomeOutlined />}
                onClick={() => navigate("/")}
              >
                Home
              </Button>

              <div className="flex items-center space-x-2">
                <SafetyCertificateOutlined className="text-blue-600 text-2xl" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Welcome back, {currentAdmin?.name}
                  </p>
                  <p className="text-gray-500 text-sm truncate max-w-xs">
                    {currentAdmin?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side */}
            <Button
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="flex items-center"
            >
              Logout
            </Button>
          </div>
        </Header>

        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              background: "#fff",
              borderRadius: 8,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
