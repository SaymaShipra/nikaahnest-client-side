import React from "react";
import { motion } from "framer-motion";
import { Input, Button, message } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const Contact = () => {
  const handleSubmit = () => {
    message.success("Your message has been sent. Thank you!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-20 px-4">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Get in <span className="text-rose-500">Touch</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            We’re here to help you start your journey. Have questions?
            Suggestions? Let us know.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Send us a message
            </h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Full Name</label>
                <Input size="large" placeholder="Enter your full name" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  size="large"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Your Message</label>
                <TextArea rows={5} placeholder="Write your message..." />
              </div>
              <Button
                type="primary"
                className="!bg-rose-500 hover:!bg-rose-600 mt-2"
                onClick={handleSubmit}
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <motion.div
            className="bg-rose-100 rounded-xl p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Contact Information
            </h3>
            <div className="space-y-6 text-gray-700">
              <div className="flex items-start gap-4">
                <MailOutlined className="text-2xl text-rose-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p>support@nikaahnest.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <PhoneOutlined className="text-2xl text-rose-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p>+880 1234 567 890</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <EnvironmentOutlined className="text-2xl text-rose-600" />
                <div>
                  <p className="font-medium">Location</p>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
