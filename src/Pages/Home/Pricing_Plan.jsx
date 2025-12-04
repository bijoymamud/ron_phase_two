// import {
//   useGetPlansQuery,
//   usePaymentCheckoutMutation,
// } from "../../redux/features/baseApi";
// import FeaturesCard from "./Features";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { FiArrowUpRight } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { useState } from "react";
// import { IoClose } from "react-icons/io5";
// import { RiTimeLine } from "react-icons/ri";
// import { IoMdArrowForward } from "react-icons/io";
// import { useSelector } from "react-redux";

// const Pricing_Plan = () => {
//   const { data: plans, isLoading } = useGetPlansQuery();
//   const user = useSelector((state) => state.chatSlice.user);
//   const [paymentCheckout] = usePaymentCheckoutMutation();

//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   if (isLoading) return null;

//   const hasSubscription = user?.subscription_plan;

//   if (user && hasSubscription) {
//     return <FeaturesCard />;
//   }

//   const handleSubscription = async (id) => {
//     console.log("id", id);

//     if (!user) {
//       toast.error("Please login to continue", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//       return;
//     }

//     const payload = {
//       plan_id: id,
//     };

//     try {
//       const response = await paymentCheckout(payload).unwrap();
//       window.location.href = response?.checkout_url;
//     } catch (error) {
//       toast.error(response?.data?.error || "Something went wrong!");
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const mobileTextVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   const mobileButtonVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
//   };

//   return (
//     <section
//       id="pricing_plan"
//       className="md:p-5 bg-[#E0F7FF] dark:bg-[#E0F7FF] md:py-20 pt-6 md:pt-28 pb-10 md:pb-10 md:min-h-[75vh] flex items-center justify-center"
//     >
//       <ToastContainer />

//       <input
//         type="checkbox"
//         id="plan-modal"
//         className="modal-toggle"
//         checked={isModalOpen}
//         onChange={() => setIsModalOpen(!isModalOpen)}
//       />
//       <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
//         <div className="modal-box md:max-w-5xl w-full mx-auto bg-white md:p-8 p-5 rounded-none md:rounded-2xl">
//           <button
//             htmlFor="plan-modal"
//             className="btn btn-sm hover:bg-red-700 hover:text-white btn-circle absolute right-2 top-2 z-10"
//             onClick={closeModal}
//           >
//             <IoClose size={30} />
//           </button>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
//             {plans?.map((plan) => (
//               <div
//                 key={plan.id}
//                 className="bg-white rounded-tr-[30px] rounded-bl-[30px] border-l border-[#16467e] shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
//               >
//                 <div
//                   className="relative text-white p-6 bg-cover bg-center "
//                   style={{
//                     backgroundImage:
//                       "url('https://i.ibb.co/KtxkstY/american-flag.jpg')",
//                   }}
//                 >
//                   <div className="absolute inset-0 bg-black/80 rounded-tr-[30px]"></div>

//                   <div className="relative z-10 md:py-5 py-3">
//                     {/* Benefits Badge */}
//                     <div className="absolute top-4 right-4">
//                       {plan.name === "6 Months" && (
//                         <span className="bg-[#B31942] text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium">
//                           After 35% off
//                         </span>
//                       )}
//                     </div>

//                     <h2 className="md:text-2xl text-xl font-bold mb-2 ">
//                       {plan.name}
//                     </h2>
//                     <span className="text-4xl bg-gradient-to-r from-[#B31942] via-[#e54860] to-[#B31942] bg-clip-text text-transparent font-bold">
//                       ${plan.price}
//                     </span>

//                     {/* Duration with icon */}
//                     <div className="flex items-center text-sm opacity-90 mt-2">
//                       <RiTimeLine size={22} className="" />
//                       <h1 className="ps-1">
//                         valid for{" "}
//                         <span className="text-lg font-bold ps-2 md:ps-0">
//                           {plan.name}
//                         </span>
//                       </h1>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="md:p-6 p-3 flex-1 flex flex-col">
//                   {/* Benefits Header */}
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="md:text-lg text-md font-bold text-[#0B2A52]">
//                       Benefits Include:
//                     </h3>
//                     <span className="bg-gradient-to-r from-[#B31942] via-[#e54860] to-[#B31942] md:text-sm text-xs bg-clip-text text-transparent font-bold">
//                       Premium Access
//                     </span>
//                   </div>

//                   {/* Features List with Checkmarks */}
//                   <div className="space-y-3 mb-6 flex-1">
//                     {plan.descriptions && plan.descriptions.length > 0 ? (
//                       plan.descriptions.map((feature) => (
//                         <div key={feature.id} className="flex items-center">
//                           <IoMdArrowForward
//                             size={16}
//                             className="me-2 text-gray-500"
//                           />

//                           <span className="text-gray-700 text-sm leading-relaxed">
//                             {feature.text}
//                           </span>
//                         </div>
//                       ))
//                     ) : (
//                       <></>
//                     )}
//                   </div>

//                   <button
//                     className="w-full mb-3 md:mb-0 bg-[#10355f] uppercase hover:bg-[#123053] text-white md:py-3 py-2 px-6 rounded-lg transition duration-300 font-medium text-lg"
//                     onClick={() => handleSubscription(plan?.id)}
//                   >
//                     Get Start
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Large Device View */}
//       <div className="hidden md:block bg-[#E0F7FF] dark:bg-[#E0F7FF] container p-2 mx-auto md:pb-10">
//         <div className="container  mx-auto text-start flex items-start justify-between mb-10 text-4xl font-bold">
//           <div className="md:px-6 flex items-center justify-between basis-10/12">
//             <div className="">
//               <h1 className="text-[#16437E]">
//                 You can complete the Veterans <br /> Benefits form with a
//               </h1>
//               <h1 className="bg-[#B31942] text-white w-[550px] flex items-center justify-center rounded-full p-4 px-5 text-3xl py-4 shadow-md shadow-gray-700 font-bold mt-7">
//                 <span className="text-white font-bold text-3xl">
//                   Payment of $195 or $49.99
//                 </span>
//               </h1>
//             </div>

//             <div
//               onClick={() => setIsModalOpen(true)}
//               className="bg-[#0A3161] cursor-pointer shadow-lg shadow-black/80 h-44 w-44 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
//             >
//               <span className="text-xl text-white mt-4">
//                 Claim now <FiArrowUpRight className="flex mx-auto" size={36} />
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="w-full mx-auto pb-5">
//           <iframe
//             className="md:w-[1150px] md:rounded-r-[50px] mx-auto md:rounded-bl-[50px] rounded-r-[20px] rounded-bl-[20px] rounded-tl-none md:h-[630px] w-full h-[250px] rounded relative z-10 border-4 border-[#9AEFFF] shadow-lg"
//             src="https://www.youtube.com/embed/tkoxvKiBtwc?si=aspqN1u1M7Gm_TfP"
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             referrerPolicy="strict-origin-when-cross-origin"
//             allowFullScreen
//           ></iframe>
//         </div>
//       </div>

//       {/* Mobile Device View */}
//       <div className="md:hidden bg-[#E0F7FF] dark:bg-[#E0F7FF] container p-2 mx-auto">
//         <motion.div
//           variants={mobileTextVariants}
//           initial="hidden"
//           animate="visible"
//           className="text-center mb-8"
//         >
//           <h1 className="text-2xl font-bold text-[#16437E]">
//             Complete the Veterans Benefits form with a
//           </h1>
//           <h1 className="bg-[#B31942] text-white w-full max-w-[350px] mx-auto flex items-center justify-center rounded-full p-2 text-2xl shadow-md shadow-gray-700 font-bold mt-5">
//             <span className="text-white font-bold text-2xl">
//               Payment of $195 or $49.99
//             </span>
//           </h1>
//         </motion.div>
//         <motion.div
//           variants={mobileButtonVariants}
//           initial="hidden"
//           animate="visible"
//           className="flex justify-center mb-8"
//         >
//           <div
//             onClick={() => setIsModalOpen(true)}
//             className="bg-[#0A3161] cursor-pointer h-40 w-40 shadow-lg shadow-black rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
//           >
//             <span className="text-xl text-white mt-2 font-bold">
//               Claim now{" "}
//               <FiArrowUpRight
//                 className="flex mx-auto font-bold space-y-2"
//                 size={32}
//               />
//             </span>
//           </div>
//         </motion.div>
//         <div className="w-full mx-auto p-1 md:p-0">
//           <iframe
//             className="rounded-r-[20px] rounded-bl-[20px] rounded-tl-none w-full h-[250px] rounded relative z-10"
//             src="https://www.youtube.com/embed/tkoxvKiBtwc?si=aspqN1u1M7Gm_TfP"
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             referrerPolicy="strict-origin-when-cross-origin"
//             allowFullScreen
//           ></iframe>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Pricing_Plan;

import {
  useGetPlansQuery,
  usePaymentCheckoutMutation,
} from "../../redux/features/baseApi";
import FeaturesCard from "./Features";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiTimeLine } from "react-icons/ri";
import { IoMdArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const Pricing_Plan = () => {
  const { data: plans, isLoading } = useGetPlansQuery();
  const user = useSelector((state) => state.chatSlice.user);
  const [paymentCheckout] = usePaymentCheckoutMutation();

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return null;

  const hasSubscription = user?.subscription_plan;

  if (user && hasSubscription) {
    return <FeaturesCard />;
  }

  const handleSubscription = async (id) => {
    console.log("id", id);

    if (!user) {
      toast.error("Please login to continue", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    const payload = {
      plan_id: id,
    };

    try {
      const response = await paymentCheckout(payload).unwrap();
      toast.success("Opening secure checkout...", { autoClose: 3000 });
      window.open(response?.checkout_url, "_blank", "noopener,noreferrer");
    } catch (error) {
      toast.error(response?.data?.error || "Something went wrong!");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const mobileTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const mobileButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="pricing_plan"
      className="md:p-5 bg-[#E0F7FF] dark:bg-[#E0F7FF] md:py-20 pt-6 md:pt-28 pb-10 md:pb-10 md:min-h-[75vh] flex items-center justify-center"
    >
      <ToastContainer />

      <input
        type="checkbox"
        id="plan-modal"
        className="modal-toggle"
        checked={isModalOpen}
        onChange={() => setIsModalOpen(!isModalOpen)}
      />
      <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box md:max-w-5xl w-full mx-auto bg-white md:p-8 p-5 rounded-none md:rounded-2xl">
          <button
            htmlFor="plan-modal"
            className="btn btn-sm hover:bg-red-700 hover:text-white btn-circle absolute right-2 top-2 z-10"
            onClick={closeModal}
          >
            <IoClose size={30} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {plans?.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-tr-[30px] rounded-bl-[30px] border-l border-[#16467e] shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div
                  className="relative text-white p-6 bg-cover bg-center "
                  style={{
                    backgroundImage:
                      "url('https://i.ibb.co/KtxkstY/american-flag.jpg')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/80 rounded-tr-[30px]"></div>

                  <div className="relative z-10 md:py-5 py-3">
                    {/* Benefits Badge */}
                    <div className="absolute top-4 right-4">
                      {plan.name === "6 Months" && (
                        <span className="bg-[#B31942] text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                          After 35% off
                        </span>
                      )}
                    </div>

                    <h2 className="md:text-2xl text-xl font-bold mb-2 ">
                      {plan.name}
                    </h2>
                    <span className="text-4xl bg-gradient-to-r from-[#B31942] via-[#e54860] to-[#B31942] bg-clip-text text-transparent font-bold">
                      ${plan.price}
                    </span>

                    {/* Duration with icon */}
                    <div className="flex items-center text-sm opacity-90 mt-2">
                      <RiTimeLine size={22} className="" />
                      <h1 className="ps-1">
                        valid for{" "}
                        <span className="text-lg font-bold ps-2 md:ps-0">
                          {plan.name}
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:p-6 p-3 flex-1 flex flex-col">
                  {/* Benefits Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="md:text-lg text-md font-bold text-[#0B2A52]">
                      Benefits Include:
                    </h3>
                    <span className="bg-gradient-to-r from-[#B31942] via-[#e54860] to-[#B31942] md:text-sm text-xs bg-clip-text text-transparent font-bold">
                      Premium Access
                    </span>
                  </div>

                  {/* Features List with Checkmarks */}
                  <div className="space-y-3 mb-6 flex-1">
                    {plan.descriptions && plan.descriptions.length > 0 ? (
                      plan.descriptions.map((feature) => (
                        <div key={feature.id} className="flex items-center">
                          <IoMdArrowForward
                            size={16}
                            className="me-2 text-gray-500"
                          />

                          <span className="text-gray-700 text-sm leading-relaxed">
                            {feature.text}
                          </span>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>

                  <button
                    className="w-full mb-3 md:mb-0 bg-[#10355f] uppercase hover:bg-[#123053] text-white md:py-3 py-2 px-6 rounded-lg transition duration-300 font-medium text-lg"
                    onClick={() => handleSubscription(plan?.id)}
                  >
                    Get Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Large Device View */}
      <div className="hidden md:block bg-[#E0F7FF] dark:bg-[#E0F7FF] container p-2 mx-auto md:pb-10">
        <div className="container  mx-auto text-start flex items-start justify-between mb-10 text-4xl font-bold">
          <div className="md:px-6 flex items-center justify-between basis-10/12">
            <div className="">
              <h1 className="text-[#16437E]">
                You can complete the Veterans <br /> Benefits form with a
              </h1>
              <h1 className="bg-[#B31942] text-white w-[550px] flex items-center justify-center rounded-full p-4 px-5 text-3xl py-4 shadow-md shadow-gray-700 font-bold mt-7">
                <span className="text-white font-bold text-3xl">
                  Payment of $195 or $49.99
                </span>
              </h1>
            </div>

            <div
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0A3161] cursor-pointer shadow-lg shadow-black/80 h-44 w-44 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <span className="text-xl text-white mt-4">
                Claim now <FiArrowUpRight className="flex mx-auto" size={36} />
              </span>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto pb-5">
          <iframe
            className="md:w-[1150px] md:rounded-r-[50px] mx-auto md:rounded-bl-[50px] rounded-r-[20px] rounded-bl-[20px] rounded-tl-none md:h-[630px] w-full h-[250px] rounded relative z-10 border-4 border-[#9AEFFF] shadow-lg"
            src="https://www.youtube.com/embed/tkoxvKiBtwc?si=aspqN1u1M7Gm_TfP"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Mobile Device View */}
      <div className="md:hidden bg-[#E0F7FF] dark:bg-[#E0F7FF] container p-2 mx-auto">
        <motion.div
          variants={mobileTextVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-[#16437E]">
            Complete the Veterans Benefits form with a
          </h1>
          <h1 className="bg-[#B31942] text-white w-full max-w-[350px] mx-auto flex items-center justify-center rounded-full p-2 text-2xl shadow-md shadow-gray-700 font-bold mt-5">
            <span className="text-white font-bold text-2xl">
              Payment of $195 or $49.99
            </span>
          </h1>
        </motion.div>
        <motion.div
          variants={mobileButtonVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-8"
        >
          <div
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0A3161] cursor-pointer h-40 w-40 shadow-lg shadow-black rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
          >
            <span className="text-xl text-white mt-2 font-bold">
              Claim now{" "}
              <FiArrowUpRight
                className="flex mx-auto font-bold space-y-2"
                size={32}
              />
            </span>
          </div>
        </motion.div>
        <div className="w-full mx-auto p-1 md:p-0">
          <iframe
            className="rounded-r-[20px] rounded-bl-[20px] rounded-tl-none w-full h-[250px] rounded relative z-10"
            src="https://www.youtube.com/embed/tkoxvKiBtwc?si=aspqN1u1M7Gm_TfP"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Pricing_Plan;
