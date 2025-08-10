
import { HiOutlineUsers } from "react-icons/hi";
import { IoSettings } from "react-icons/io5";
import { RiBarChart2Fill } from "react-icons/ri";
import { motion } from "framer-motion";

export default function Services() {
  const mobileCardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-[#E0F7FF] dark:bg-[#E0F7FF]">
      {/* Large Device View (Unchanged) */}
      <div className="hidden md:block">
        <div className="text-center container mx-auto px-2 md:pt-10  p-10 md:px-20 md:pb-8">
          <h1 className="md:text-4xl text-start font-bold text-[#16437E] pb-6 md:pb-3 md:text-center">Services</h1>
          <p className="text-gray-500 font-medium text-start w-1/2 md:pb-3 md:w-2/6 mx-auto md:text-center">
            We provide a comprehensive approach to help you navigate the VA benefits process with confidence.
          </p>
        </div>
        <div className="min-h-[80vh] md:min-h-[70vh] bg-[#E0F7FF] dark:bg-[#E0F7FF]  flex items-center justify-center">
          <div className="max-w-7xl w-full flex items-center justify-between">
            <div className="relative">
              <div className="p-10  bg-gray-100 shadow-md rounded-full">
                <div className="w-80 h-80 rounded-full shadow-gray-400 bg-gradient-to-br from-[#0B2A52] via-blue-800 to-blue-900 shadow-4xl flex items-center justify-center relative">
                  <img
                    src="https://i.ibb.co/99r83sPw/Untitled-design-6.png"
                    className="w-80 h-80 rounded-full object-cover"
                    alt=""
                  />
                </div>
              </div>
              {/* Connecting Lines */}
              <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2">
                <div className="absolute  w-[350px] h-px bg-gray-400 transform -rotate-45 origin-left"></div>
                <div className="absolute w-[350px] h-px bg-gray-400"></div>
                <div className="absolute w-[350px] h-px bg-gray-400 transform rotate-45 origin-left"></div>
              </div>
            </div>
            {/* Services - Right Side */}
            <div className="flex flex-col space-y-16 md:space-y-14 ml-20">
              {/* Benefits Eligibility Assessment */}
              <div className="flex items-center relative">
                <div className="w-28 h-28 rounded-full absolute -left-14 bg-gradient-to-br border border-white from-[#0B2A52] to-blue-800 shadow-xl flex items-center justify-center mr-6">
                  <div className="text-red-200">
                    <HiOutlineUsers size={44} className="text-white" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[#0B2A52] to-blue-800 text-white px-8 py-6 rounded-xl shadow-xl max-w-xl">
                  <h3 className="font-bold text-xl mb-3 ms-10">Benefits Eligibility Assessment</h3>
                  <p className="text-sm leading-relaxed opacity-90 ms-10">
                    Discover your eligibility for VA benefits with our detailed assessments. We analyze your service history and unique circumstances to determine the benefits you’ve earned and guide you through the next steps.
                  </p>
                </div>
              </div>
              {/* Application Assistance */}
              <div className="flex items-center relative">
                <div className="w-28 h-28 rounded-full absolute -left-14 bg-gradient-to-br from-[#0B2A52] border border-white to-blue-800 shadow-xl flex items-center justify-center mr-6">
                  <div className="text-red-200">
                    <RiBarChart2Fill size={44} className="text-white" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[#0B2A52] to-blue-800 text-white px-8 py-6 rounded-xl shadow-xl max-w-xl">
                  <h3 className="font-bold text-xl mb-3 ms-10">Application Assistance</h3>
                  <p className="text-sm leading-relaxed opacity-90 ms-10">
                    Discover your eligibility for VA benefits with our detailed assessments. We analyze your service history and unique circumstances to determine the benefits you’ve earned and guide you through the next steps.
                  </p>
                </div>
              </div>
              {/* Appeal Support */}
              <div className="flex items-center relative">
                <div className="w-28 h-28 rounded-full absolute -left-14 bg-gradient-to-br from-[#0B2A52] to-blue-800 border border-white shadow-xl flex items-center justify-center mr-6">
                  <div className="text-red-200">
                    <IoSettings size={44} className="text-white" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[#0B2A52] to-blue-800 text-white px-8 py-6 rounded-xl shadow-xl max-w-xl">
                  <h3 className="font-bold text-xl mb-3 ms-10">Appeal Support</h3>
                  <p className="text-sm leading-relaxed opacity-90 ms-10">
                    Discover your eligibility for VA benefits with our detailed assessments. We analyze your service history and unique circumstances to determine the benefits you’ve earned and guide you through the next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Device View */}
      <div className="md:hidden">
        <div className="text-center container mx-auto px-4 pt-8">
          <h1 className="text-3xl font-bold text-[#0B2A52] pb-4">Services</h1>
          <p className="text-gray-500 font-medium text-sm">
            We provide a comprehensive approach to help you navigate the VA benefits process with confidence.
          </p>
        </div>
        <div className="py-8 px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="p-6 bg-gray-100 shadow-md rounded-full">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#0B2A52] via-blue-800 to-blue-900 shadow-xl flex items-center justify-center relative">
                <img
                  src="https://i.ibb.co/99r83sPw/Untitled-design-6.png"
                  className="w-48 h-48 rounded-full object-cover"
                  alt=""
                />
              </div>
            </div>
          </motion.div>
          <div className="space-y-8 w-full max-w-md mt-5">
            {/* Benefits Eligibility Assessment */}
            <motion.div
              variants={mobileCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center relative"
            >
              <div className="w-16 h-16 -top-5 rounded-full absolute -left-2 bg-gradient-to-br border border-white from-[#0B2A52] to-blue-800 shadow-xl flex items-center justify-center">
                <HiOutlineUsers size={32} className="text-white" />
              </div>
              <div className="bg-gradient-to-r from-[#0B2A52] to-blue-800 text-white px-6 py-4 rounded-xl shadow-xl w-full">
                <h3 className="font-bold text-lg mb-2 ms-14">Benefits Eligibility Assessment</h3>
                <p className="text-xs leading-relaxed opacity-90 ms-14">
                  Discover your eligibility for VA benefits with our detailed assessments. We analyze your service history and unique circumstances to determine the benefits you’ve earned and guide you through the next steps.
                </p>
              </div>
            </motion.div>
            {/* Application Assistance */}
            <motion.div
              variants={mobileCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center relative"
            >
              <div className="w-16 h-16 -top-5 rounded-full absolute -left-2 bg-gradient-to-br border border-white from-[#0B2A52] to-blue-800 shadow-xl flex items-center justify-center">
                <RiBarChart2Fill size={32} className="text-white" />
              </div>
              <div className="bg-gradient-to-r from-[#0B2A52] to-blue-800 text-white px-6 py-4 rounded-xl shadow-xl w-full">
                <h3 className="font-bold text-lg mb-2 ms-14">Application Assistance</h3>
                <p className="text-xs leading-relaxed opacity-90 ms-14">
                  Discover your eligibility for VA benefits with our detailed assessments. We analyze your service history and unique circumstances to determine the benefits you’ve earned and guide you through the next steps.
                </p>
              </div>
            </motion.div>
            {/* Appeal Support */}
            <motion.div
              variants={mobileCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center relative"
            >
              <div className="w-16 h-16 -top-5 rounded-full absolute -left-2 bg-gradient-to-br border border-white from-[#0B2A52] to-blue-800 shadow-xl flex items-center justify-center">
                <IoSettings size={32} className="text-white" />
              </div>
              <div className="bg-gradient-to-r from-[#0B2A52] to-blue-800 text-white px-6 py-4 rounded-xl shadow-xl w-full">
                <h3 className="font-bold text-lg mb-2 ms-14">Appeal Support</h3>
                <p className="text-xs leading-relaxed opacity-90 ms-14">
                  Discover your eligibility for VA benefits with our detailed assessments. We analyze your service history and unique circumstances to determine the benefits you’ve earned and guide you through the next steps.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}