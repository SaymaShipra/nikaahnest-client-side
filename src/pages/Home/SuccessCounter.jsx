// import React from "react";
// import { Users, UserCheck, Heart } from "lucide-react";
// import { Button } from "antd";

// const SuccessCounter = () => {
//   const stats = [
//     {
//       icon: Users,
//       count: 52847,
//       label: "Total Biodatas",
//       description: "Verified profiles on our platform",
//       gradient: "from-blue-500 to-blue-600",
//     },
//     {
//       icon: UserCheck,
//       count: 28394,
//       label: "Female Biodatas",
//       description: "Women looking for life partners",
//       gradient: "from-pink-500 to-pink-600",
//     },
//     {
//       icon: UserCheck,
//       count: 24453,
//       label: "Male Biodatas",
//       description: "Men seeking their soulmates",
//       gradient: "from-indigo-500 to-indigo-600",
//     },
//     {
//       icon: Heart,
//       count: 3267,
//       label: "Successful Marriages",
//       description: "Happy couples who found love here",
//       gradient: "from-rose-500 to-rose-600",
//     },
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-white mb-4">
//             Our Success Story
//           </h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Numbers that speak for themselves - thousands of hearts united
//             through our platform
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 "
//             >
//               <div
//                 className={`inline-flex items-center justify-center w-16 h-16  bg-gradient-to-r ${stat.gradient} rounded-2xl mb-6`}
//               >
//                 <stat.icon className="h-8 w-8 text-white" />
//               </div>

//               <div className="text-4xl font-bold text-white mb-2">
//                 {stat.count.toLocaleString()}+
//               </div>

//               <h3 className="text-xl font-semibold text-white mb-2">
//                 {stat.label}
//               </h3>

//               <p className="text-gray-300 text-sm leading-relaxed">
//                 {stat.description}
//               </p>

//               <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full"></div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-16 text-center">
//           <p className="text-gray-300 mb-6">
//             Join thousands of happy couples who found their perfect match
//           </p>
//           <Button
//             type="primary"
//             className="bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full px-8 py-4 hover:from-rose-600 hover:to-pink-700"
//           >
//             Start Your Journey
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SuccessCounter;

import React from "react";
import { Users, UserCheck, Heart } from "lucide-react";
import { Button } from "antd";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0, // ⬆️ moves upward
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const iconVariant = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 20 },
  },
};

const headerVariant = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const SuccessCounter = () => {
  const stats = [
    {
      icon: Users,
      count: 52847,
      label: "Total Biodatas",
      description: "Verified profiles on our platform",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: UserCheck,
      count: 28394,
      label: "Female Biodatas",
      description: "Women looking for life partners",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      icon: UserCheck,
      count: 24453,
      label: "Male Biodatas",
      description: "Men seeking their soulmates",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      icon: Heart,
      count: 3267,
      label: "Successful Marriages",
      description: "Happy couples who found love here",
      gradient: "from-rose-500 to-rose-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={headerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Success Story
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Numbers that speak for themselves - thousands of hearts united
            through our platform
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                variants={iconVariant}
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl mb-6`}
              >
                <stat.icon className="h-8 w-8 text-white" />
              </motion.div>

              <div className="text-4xl font-bold text-white mb-2">
                {stat.count.toLocaleString()}+
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed">
                {stat.description}
              </p>

              <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-6">
            Join thousands of happy couples who found their perfect match
          </p>
          <Button
            type="primary"
            className="!px-8 !py-6 !bg-gradient-to-r !from-rose-500 !to-pink-600 !text-white !font-semibold !rounded-full hover:from-rose-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Your Journey
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessCounter;
