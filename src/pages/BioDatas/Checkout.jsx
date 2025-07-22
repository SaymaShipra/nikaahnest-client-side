// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router";
// import { ArrowLeft, CreditCard, Shield } from "lucide-react";
// import { Card, Button, Input, Form, Typography, message, Spin } from "antd";

// const { Title, Text } = Typography;

// const Checkout = () => {
//   const { biodataId } = useParams();
//   const navigate = useNavigate();
//   const [biodata, setBiodata] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [loadingBiodata, setLoadingBiodata] = useState(true);
//   const [form] = Form.useForm();

//   const currentUserEmail = "user@example.com"; // Replace with real user context

//   useEffect(() => {
//     async function fetchBiodata() {
//       try {
//         const res = await fetch(`http://localhost:3000/biodatas/${biodataId}`);
//         if (!res.ok) throw new Error("Failed to fetch biodata");
//         const data = await res.json();
//         setBiodata(data);
//       } catch (error) {
//         console.error("Error loading biodata:", error);
//         message.error("Failed to load biodata.");
//       } finally {
//         setLoadingBiodata(false);
//       }
//     }

//     if (biodataId) fetchBiodata();
//   }, [biodataId]);

//   const handleCardNumberChange = (e) => {
//     let value = e.target.value
//       .replace(/\s/g, "")
//       .replace(/(.{4})/g, "$1 ")
//       .trim();
//     if (value.length <= 19) {
//       form.setFieldsValue({ cardNumber: value });
//     }
//   };

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       const contactRequest = {
//         id: Date.now(),
//         biodataId,
//         requesterEmail: currentUserEmail,
//         biodataName: biodata?.name,
//         amount: 5.0,
//         status: "Pending",
//         createdAt: new Date().toISOString(),
//         paymentId: `pay_${Math.random().toString(36).substr(2, 9)}`,
//       };
//       console.log("Contact request created:", contactRequest);
//       message.success("Payment successful! Your request has been submitted.");
//       setTimeout(() => navigate("/dashboard/contact-requests"), 1500);
//     } catch (error) {
//       message.error("Payment failed. Please try again.", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loadingBiodata) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (!biodata) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Title level={2}>Biodata Not Found</Title>
//           <Text type="secondary">
//             The requested biodata could not be found.
//           </Text>
//           <br />
//           <Button onClick={() => navigate("/biodatas")} icon={<ArrowLeft />}>
//             Back to Biodatas
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-4xl mx-auto px-4 py-6 flex items-center space-x-4">
//           <Button
//             icon={<ArrowLeft />}
//             onClick={() => navigate(`/biodatas/${biodataId}`)}
//           >
//             Back
//           </Button>
//           <div>
//             <Title level={3}>Request Contact Information</Title>
//             <Text type="secondary">Pay $5 to access contact details</Text>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Biodata Summary */}
//         <Card>
//           <Card.Meta
//             avatar={
//               <img
//                 src={biodata.image}
//                 alt={biodata.name}
//                 style={{
//                   width: 80,
//                   height: 80,
//                   borderRadius: 8,
//                   objectFit: "cover",
//                 }}
//               />
//             }
//             title={
//               <div>
//                 <Text strong style={{ fontSize: 18 }}>
//                   {biodata.name}
//                 </Text>
//                 <br />
//                 <Text type="secondary">
//                   {biodata.age} years • {biodata.location}
//                 </Text>
//                 <br />
//                 <Text type="secondary">{biodata.occupation}</Text>
//                 <br />
//                 <span
//                   style={{
//                     display: "inline-block",
//                     padding: "2px 8px",
//                     borderRadius: 12,
//                     fontSize: 12,
//                     marginTop: 6,
//                     color: biodata.type === "Male" ? "#1D4ED8" : "#DB2777",
//                     backgroundColor:
//                       biodata.type === "Male" ? "#DBEAFE" : "#FCE7F3",
//                   }}
//                 >
//                   {biodata.type}
//                 </span>
//               </div>
//             }
//           />
//         </Card>

//         {/* Payment Form */}
//         <Card title="Payment Information">
//           <div style={{ marginBottom: 16 }}>
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <Text>Access Contact Info</Text>
//               <Text>$5.00</Text>
//             </div>
//             <hr />
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 fontWeight: "bold",
//                 fontSize: 18,
//                 marginTop: 8,
//               }}
//             >
//               <Text>Total</Text>
//               <Text>$5.00</Text>
//             </div>
//           </div>

//           <div
//             style={{ backgroundColor: "#DBEAFE", padding: 12, borderRadius: 8 }}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <Shield size={16} />
//               <Text strong style={{ fontSize: 14 }}>
//                 Secure Payment
//               </Text>
//             </div>
//             <Text style={{ fontSize: 12, marginTop: 4 }}>
//               Admin will review your request after payment.
//             </Text>
//           </div>
//         </Card>

//         <Card title="Enter Card Details">
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={onFinish}
//             initialValues={{
//               biodataId,
//               email: currentUserEmail,
//               cardNumber: "",
//             }}
//           >
//             <Form.Item label="Biodata ID" name="biodataId">
//               <Input readOnly />
//             </Form.Item>

//             <Form.Item label="Your Email" name="email">
//               <Input readOnly />
//             </Form.Item>

//             <Form.Item
//               label="Card Number"
//               name="cardNumber"
//               rules={[
//                 { required: true, message: "Please enter your card number" },
//                 {
//                   len: 19,
//                   message: "Card number must be 16 digits (including spaces)",
//                 },
//               ]}
//             >
//               <Input
//                 placeholder="1234 5678 9012 3456"
//                 maxLength={19}
//                 onChange={handleCardNumberChange}
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 block
//                 loading={loading}
//                 style={{
//                   backgroundImage:
//                     "linear-gradient(to right, #f43f5e, #ec4899)",
//                   border: "none",
//                 }}
//               >
//                 {loading ? (
//                   "Processing..."
//                 ) : (
//                   <span
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       gap: 8,
//                     }}
//                   >
//                     <CreditCard /> Submit Request ($5)
//                   </span>
//                 )}
//               </Button>
//             </Form.Item>
//           </Form>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, CreditCard, Shield } from "lucide-react";
import { Card, Button, Input, Form, Typography, message, Spin } from "antd";

const { Title, Text } = Typography;

const Checkout = () => {
  const { biodataId } = useParams();
  const navigate = useNavigate();
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingBiodata, setLoadingBiodata] = useState(true);
  const [form] = Form.useForm();

  // Replace this with real auth user email in your app
  const currentUserEmail = "user@example.com";

  useEffect(() => {
    async function fetchBiodata() {
      try {
        const res = await fetch(`http://localhost:3000/biodatas/${biodataId}`);
        if (!res.ok) throw new Error("Failed to fetch biodata");
        const data = await res.json();
        setBiodata(data);
      } catch (error) {
        message.error("Failed to load biodata.", error);
      } finally {
        setLoadingBiodata(false);
      }
    }
    if (biodataId) fetchBiodata();
  }, [biodataId]);

  const handleCardNumberChange = (e) => {
    let value = e.target.value
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
      const res = await fetch("http://localhost:3000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUserEmail,
          biodataId,
          amount: 5.0,
          paymentMethod: "card",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Payment failed");

      message.success("Payment successful! Your request has been submitted.");
      setTimeout(() => navigate("/dashboard/contact-requests"), 1500);
    } catch (error) {
      message.error(error.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingBiodata) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!biodata) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Title level={2}>Biodata Not Found</Title>
          <Text type="secondary">
            The requested biodata could not be found.
          </Text>
          <br />
          <Button onClick={() => navigate("/biodatas")} icon={<ArrowLeft />}>
            Back to Biodatas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center space-x-4">
          <Button
            icon={<ArrowLeft />}
            onClick={() => navigate(`/biodatas/${biodataId}`)}
          >
            Back
          </Button>
          <div>
            <Title level={3}>Request Contact Information</Title>
            <Text type="secondary">Pay $5 to access contact details</Text>
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
                  {biodata.age} years • {biodata.location}
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Access Contact Info</Text>
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
            style={{ backgroundColor: "#DBEAFE", padding: 12, borderRadius: 8 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Shield size={16} />
              <Text strong style={{ fontSize: 14 }}>
                Secure Payment
              </Text>
            </div>
            <Text style={{ fontSize: 12, marginTop: 4 }}>
              Admin will review your request after payment.
            </Text>
          </div>
        </Card>

        {/* Payment Form */}
        <Card title="Enter Card Details">
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

            <Form.Item label="Your Email" name="email">
              <Input readOnly />
            </Form.Item>

            <Form.Item
              label="Card Number"
              name="cardNumber"
              rules={[
                { required: true, message: "Please enter your card number" },
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
                  "Processing..."
                ) : (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <CreditCard /> Submit Request ($5)
                  </span>
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
