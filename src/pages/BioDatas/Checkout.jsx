import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, CreditCard, Shield } from "lucide-react";
import { Card, Button, Input, Form, Typography, message } from "antd";

const { Title, Text } = Typography;

const mockBiodatas = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  type: i % 2 === 0 ? "Male" : "Female",
  name: `Person ${i + 1}`,
  image: `/api/placeholder/300/400`,
  division: [
    "Dhaka",
    "Chattagram",
    "Rangpur",
    "Barisal",
    "Khulna",
    "Mymensingh",
    "Sylhet",
  ][i % 7],
  age: 22 + (i % 18),
  occupation: [
    "Student",
    "Software Engineer",
    "Teacher",
    "Doctor",
    "Business",
    "Government Service",
  ][i % 6],
}));

const Checkout = () => {
  const { biodataId } = useParams();
  const navigate = useNavigate();
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Mock current user email
  const currentUserEmail = "user@example.com";

  useEffect(() => {
    if (biodataId) {
      const foundBiodata = mockBiodatas.find(
        (b) => b.id === parseInt(biodataId)
      );
      setBiodata(foundBiodata);
    }
  }, [biodataId]);

  const handleCardNumberChange = (e) => {
    let value = e.target.value;
    // Format card number with spaces every 4 digits
    value = value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    if (value.length <= 19) {
      form.setFieldsValue({ cardNumber: value });
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful payment and contact request creation
      const contactRequest = {
        id: Date.now(),
        biodataId: parseInt(biodataId),
        requesterEmail: currentUserEmail,
        biodataName: biodata?.name,
        amount: 5.0,
        status: "Pending",
        createdAt: new Date().toISOString(),
        paymentId: `pay_${Math.random().toString(36).substr(2, 9)}`,
      };

      console.log("Contact request created:", contactRequest);
      message.success(
        "Payment successful! Your contact request has been submitted for admin approval."
      );

      setTimeout(() => {
        navigate("/dashboard/contact-requests");
      }, 1500);
    } catch (error) {
      message.error("Payment failed. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  if (!biodata) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Title level={2} className="mb-2">
            Biodata Not Found
          </Title>
          <Text type="secondary" className="mb-4">
            The requested biodata could not be found.
          </Text>
          <Button onClick={() => navigate("/biodatas")} icon={<ArrowLeft />}>
            Back to Biodatas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center space-x-4">
          <Button
            type="default"
            icon={<ArrowLeft />}
            onClick={() => navigate(`/biodata/${biodataId}`)}
          >
            Back
          </Button>
          <div>
            <Title level={3}>Request Contact Information</Title>
            <Text type="secondary">Pay $5 to request contact details</Text>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Biodata Summary */}
        <Card>
          <Card.Meta
            avatar={
              <img
                src={biodata.image}
                alt={biodata.name}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            }
            title={
              <div>
                <Text strong style={{ fontSize: 18 }}>
                  {biodata.name}
                </Text>
                <br />
                <Text type="secondary">
                  {biodata.age} years • {biodata.division}
                </Text>
                <br />
                <Text type="secondary">{biodata.occupation}</Text>
                <br />
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    borderRadius: 12,
                    fontSize: 12,
                    marginTop: 6,
                    color: biodata.type === "Male" ? "#1D4ED8" : "#DB2777",
                    backgroundColor:
                      biodata.type === "Male" ? "#DBEAFE" : "#FCE7F3",
                  }}
                >
                  {biodata.type}
                </span>
              </div>
            }
          />
        </Card>

        {/* Payment Info */}
        <Card title="Payment Information">
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text>Contact Information Access</Text>
              <Text>$5.00</Text>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: 18,
                marginTop: 8,
              }}
            >
              <Text>Total</Text>
              <Text>$5.00</Text>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#DBEAFE",
              padding: 12,
              borderRadius: 8,
              color: "#1E40AF",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Shield size={16} />
              <Text strong style={{ fontSize: 14 }}>
                Secure Payment
              </Text>
            </div>
            <Text style={{ fontSize: 12, marginTop: 4 }}>
              Contact information will be available after admin approval.
            </Text>
          </div>
        </Card>

        {/* Contact Request Form */}
        <Card title="Contact Information Request">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              biodataId,
              email: currentUserEmail,
              cardNumber: "",
            }}
          >
            <Form.Item label="Biodata ID" name="biodataId">
              <Input readOnly />
            </Form.Item>

            <Form.Item label="Self Email" name="email">
              <Input readOnly />
            </Form.Item>

            <Form.Item
              label="Stripe Card Number"
              name="cardNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter your card number",
                },
                {
                  len: 19,
                  message: "Card number must be 16 digits (including spaces)",
                },
              ]}
            >
              <Input
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                onChange={handleCardNumberChange}
                // NOTE: no value prop here, antd Form handles it internally
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #f43f5e, #ec4899)",
                  border: "none",
                }}
              >
                {loading ? (
                  "Processing Payment..."
                ) : (
                  <>
                    <CreditCard style={{ marginRight: 8 }} /> Submit Request
                    ($5.00)
                  </>
                )}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
