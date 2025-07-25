import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Card,
  Alert,
  Typography,
  message,
} from "antd";
import { UploadOutlined, HeartFilled } from "@ant-design/icons";
import axios from "axios";

const { Title, Paragraph } = Typography;

const GotMarried = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setSubmitError(null);
    setSubmitSuccess(false);
    setLoading(true);

    const payload = {
      ...values,
      coupleImageLink: imageUrl || "",
    };

    try {
      await axios.post(
        "https://nikaahnest-server-side.vercel.app/success-stories",
        payload
      );
      message.success("Success story submitted!");
      form.resetFields();
      setImageUrl(null);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError(
        error?.response?.data?.error || "Failed to submit success story"
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Only image files are allowed!");
        return Upload.LIST_IGNORE;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
        message.success("Image uploaded successfully");
      };
      reader.readAsDataURL(file);

      return false; // Prevent default upload
    },
    showUploadList: false,
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card bordered>
        <Card.Meta
          title={
            <Title level={3} className="text-center mb-4">
              <HeartFilled style={{ color: "red" }} /> Got Married?
            </Title>
          }
          description={
            <Paragraph className="text-center">
              Share your success story with the community!
            </Paragraph>
          }
        />
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          className="mt-6"
        >
          <Form.Item
            label="Your Biodata ID *"
            name="selfBiodataId"
            rules={[
              { required: true, message: "Please enter your biodata ID" },
              {
                pattern: /^[a-f\d]{24}$/i,
                message: "Must be a valid 24-character ID",
              },
            ]}
          >
            <Input placeholder="Enter your biodata ID" />
          </Form.Item>

          <Form.Item
            label="Partner's Biodata ID *"
            name="partnerBiodataId"
            rules={[
              { required: true, message: "Please enter partner's biodata ID" },
              {
                pattern: /^[a-f\d]{24}$/i,
                message: "Must be a valid 24-character ID",
              },
            ]}
          >
            <Input placeholder="Enter partner's biodata ID" />
          </Form.Item>

          <Form.Item label="Upload Couple Photo">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {imageUrl && (
              <div className="mt-3">
                <img
                  src={imageUrl}
                  alt="Couple"
                  style={{
                    width: "100%",
                    maxHeight: "250px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
          </Form.Item>

          <Form.Item
            label="Write your success story *"
            name="successStoryReview"
            rules={[
              { required: true, message: "Please share your story" },
              { min: 10, message: "Must be at least 10 characters" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Tell us your journey..." />
          </Form.Item>

          {submitError && (
            <Alert message={submitError} type="error" className="mb-3" />
          )}

          {submitSuccess && (
            <Alert
              message="Your success story has been submitted!"
              type="success"
              showIcon
              className="mb-3"
            />
          )}

          <Form.Item>
            <Paragraph className="!text-gray-500 !mt-2">
              Share your feelings and experience to inspire other users
            </Paragraph>
            <Button
              type="primary"
              htmlType="submit"
              className="!bg-rose-400 !mt-3"
              block
              loading={loading}
              icon={<HeartFilled />}
            >
              Submit Success Story
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default GotMarried;
