import React from "react";
import {
  HeartOutlined,
  TeamOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Card } from "antd";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-rose-50 to-white py-16 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            About <span className="text-rose-500">NikaahNest</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A sacred space where meaningful connections blossom into lifelong
            commitments — rooted in faith, trust, and tradition.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Card className="rounded-xl shadow hover:shadow-lg transition">
            <div className="text-center">
              <HeartOutlined className="text-rose-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Soulful Matche</h3>
              <p className="text-gray-600">
                We prioritize values, compatibility, and deen to help you find
                your perfect match.
              </p>
            </div>
          </Card>

          <Card className="rounded-xl shadow hover:shadow-lg transition">
            <div className="text-center">
              <TeamOutlined className="text-blue-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Family Inclusive</h3>
              <p className="text-gray-600">
                Families play a key role in ensuring the union is built on
                mutual respect and understanding.
              </p>
            </div>
          </Card>

          <Card className="rounded-xl shadow hover:shadow-lg transition">
            <div className="text-center">
              <CheckCircleOutlined className="text-green-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Verified</h3>
              <p className="text-gray-600">
                All profiles are manually and digitally verified for a safe
                matrimonial experience.
              </p>
            </div>
          </Card>
        </div>

        {/* Mission Section */}
        <motion.div
          className="mt-16 bg-white rounded-2xl shadow p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At <span className="text-rose-600 font-semibold">NikaahNest</span>,
            our mission is to build a trusted matrimonial community where faith
            meets compatibility. We believe in simplifying the journey of
            marriage by offering a secure, respectful, and halal platform for
            individuals and families to connect and collaborate in finding the
            right life partner.
          </p>
        </motion.div>

        {/* Why Choose NikaahNest */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Why Choose NikaahNest?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Focus on Islamic values and family involvement</li>
            <li>Genuine, verified biodatas only</li>
            <li>Private & respectful communication channels</li>
            <li>Simple, user-friendly interface with elegant design</li>
            <li>Real success stories from real users</li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Ready to find your forever?
          </p>
          <button className="px-6 py-3 bg-rose-500 hover:bg-rose-600 !text-white rounded-xl shadow transition">
            Join NikaahNest Now
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
