// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   addCategoryByIssue,
//   removeCategoryIfNoIssuesLeft,
// } from "../../redux/slice/issueSlice";
// import { clearAllIssues } from "../../redux/slice/categorySlice";

// function Issues() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     getValues,
//   } = useForm({
//     defaultValues: {
//       CURRENTDISABILITY: [],
//     },
//   });
//   const [submittedData, setSubmittedData] = React.useState(null);
//   const navigate = useNavigate();

//   const categories = {
//     "Mental Health": ["PTSD", "Depression", "Anxiety", "Insomnia"],
//     "Body Health": [
//       "Neck Condition",
//       "Hip Condition",
//       "Shoulder Condition",
//       "Elbow Condition",
//       "Head Injury",
//       "Wrist Condition",
//       "Nerve Damage",
//       "Mid Back Condition",
//       "Knee Condition",
//       "Foot Condition",
//       "Low Back Condition",
//       "Leg Condition",
//       "Flat Feet",
//       "Arm Condition",
//       "High Blood Pressure",
//       "Plantar Fasciitis",
//       "Ankle Condition",
//       "Hammer Toes",
//       "Ingrown Toenails",
//       "Radiculopathy of Upper Extremities",
//       "Sciatica",
//     ],
//     "Migraine & Headache Claim Information": ["Prostrating Migraines"],
//     "Sinusitis, Rhinitis & Asthma Claim Information": ["Rhinitis", "Sinusitis"],
//     "Gastrointestinal Issues (GERD/IBS) Claim Information": [
//       "GERD (Acid Reflux)",
//       "IBS (Irritable Bowel Syndrome)",
//     ],
//     "Tinnitus and Hearing Loss Claim Information": ["Tinnitus"],
//     "Cancer Related": ["Cancer"],
//     "Diabetes Related": ["Diabetes"],
//     "Traumatic Brain Injury Related": ["Traumatic Brain Injury"],
//   };

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(clearAllIssues());
//   }, [dispatch]);

//   const conditionsList = Object.values(categories).flat();

//   const getCategoryForCondition = (condition) => {
//     for (const [category, conditions] of Object.entries(categories)) {
//       if (conditions.includes(condition)) {
//         return category;
//       }
//     }
//     return "Other";
//   };

//   const onSubmit = (data) => {
//     if (data.CURRENTDISABILITY.length === 0) {
//       alert("Please select at least one condition.");
//       return;
//     }

//     const dissabilites = Object.assign(
//       {},
//       ...(data.CURRENTDISABILITY.map((e, i) => ({
//         [`current_disabilityiesrow${i + 1}`]: e,
//       })) ?? [])
//     );

//     // TODO: data, was in array, now in obj
//     localStorage.setItem("issues", JSON.stringify(dissabilites));

//     const categorizedConditions = {};
//     data.CURRENTDISABILITY.forEach((condition) => {
//       const category = getCategoryForCondition(condition);
//       if (!categorizedConditions[category]) {
//         categorizedConditions[category] = [];
//       }
//       categorizedConditions[category].push(condition);
//     });

//     console.log("Selected with categories:", categorizedConditions);
//     setSubmittedData(categorizedConditions);

//     navigate("/issue_details", { state: { categorizedConditions } });
//   };

//   return (
//     <div className="md:py-28 md:mt-10 mt-0  min-h-[85vh] py-10 dark:bg-white  flex justify-center items-center md:p-4 pt-32  ">
//       <div className="w-full max-w-3xl bg-white md:shadow-md rounded-lg md:p-6 p-3">
//         <h1 className="text-xl md:text-2xl font-bold text-blue-900 mb-2 text-center">
//           What condition(s) do you want to start a claim for?
//         </h1>
//         <p className="md:text-sm text-gray-600 mb-6 text-[14px] text-center ">
//           You can choose multiple conditions. We recommend starting with mental
//           health conditions first. We'll guide you step-by-step.
//         </p>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:mb-0 mb-5">
//             {conditionsList.map((condition, index) => (
//               <div key={index} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   value={condition}
//                   {...register("CURRENTDISABILITY", {
//                     onChange: (e) => {
//                       const { value, checked } = e.target;

//                       if (checked) {
//                         dispatch(addCategoryByIssue(value));
//                       } else {
//                         const selected = getValues("CURRENTDISABILITY").filter(
//                           (item) => item !== value
//                         );

//                         dispatch(
//                           removeCategoryIfNoIssuesLeft({
//                             uncheckedIssue: value,
//                             stillCheckedIssues: selected,
//                           })
//                         );
//                       }
//                     },
//                   })}
//                   className="checkbox checkbox-primary mr-2"
//                 />

//                 <label className="text-sm text-gray-700">{condition}</label>
//               </div>
//             ))}
//           </div>

//           {errors.CURRENTDISABILITY && (
//             <span className="text-red-500 text-sm">
//               {errors.CURRENTDISABILITY.message ||
//                 "Please select at least one condition."}
//             </span>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-[#B31942] text-white uppercase py-2 px-4 rounded-md hover:bg-[#aa2b4d] font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 basis-6/12"
//           >
//             Continue
//           </button>
//         </form>

//         {submittedData && (
//           <div className="mt-6 p-4 bg-gray-100 rounded-md">
//             <h2 className="text-lg font-bold text-blue-900 mb-4">
//               Submitted Categories:
//             </h2>
//             <pre className="whitespace-pre-wrap">
//               {JSON.stringify(submittedData, null, 2)}
//             </pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Issues;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuMoveRight } from "react-icons/lu";

import {
  addCategoryByIssue,
  removeCategoryIfNoIssuesLeft,
} from "../../redux/slice/issueSlice";
import { clearAllIssues } from "../../redux/slice/categorySlice";

function Issues() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: { CURRENTDISABILITY: [] },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPTSDVideo, setShowPTSDVideo] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [hasSeenVideo, setHasSeenVideo] = useState(false);

  const categories = {
    "Mental Health": ["PTSD", "Depression", "Anxiety", "Insomnia"],
    "Body Health": [
      "Neck Condition",
      "Hip Condition",
      "Shoulder Condition",
      "Elbow Condition",
      "Head Injury",
      "Wrist Condition",
      "Nerve Damage",
      "Mid Back Condition",
      "Knee Condition",
      "Foot Condition",
      "Low Back Condition",
      "Leg Condition",
      "Flat Feet",
      "Arm Condition",
      "High Blood Pressure",
      "Plantar Fasciitis",
      "Ankle Condition",
      "Hammer Toes",
      "Ingrown Toenails",
      "Radiculopathy of Upper Extremities",
      "Sciatica",
    ],
    "Migraine & Headache Claim Information": ["Prostrating Migraines"],
    "Sinusitis, Rhinitis & Asthma Claim Information": ["Rhinitis", "Sinusitis"],
    "Gastrointestinal Issues (GERD/IBS) Claim Information": [
      "GERD (Acid Reflux)",
      "IBS (Irritable Bowel Syndrome)",
    ],
    "Tinnitus and Hearing Loss Claim Information": ["Tinnitus"],
    "Cancer Related": ["Cancer"],
    "Diabetes Related": ["Diabetes"],
    "Traumatic Brain Injury Related": ["Traumatic Brain Injury"],
  };

  const conditionsList = Object.values(categories).flat();

  const getCategoryForCondition = (condition) => {
    for (const [cat, items] of Object.entries(categories)) {
      if (items.includes(condition)) return cat;
    }
    return "Other";
  };

  useEffect(() => {
    dispatch(clearAllIssues());
  }, [dispatch]);

  const onSubmit = (data) => {
    if (data.CURRENTDISABILITY.length === 0) {
      alert("Please select at least one condition.");
      return;
    }

    const disabilities = Object.assign(
      {},
      data.CURRENTDISABILITY.map((e, i) => ({
        [`current_disabilityiesrow${i + 1}`]: e,
      }))
    );

    localStorage.setItem("issues", JSON.stringify(disabilities));

    const categorizedConditions = {};
    data.CURRENTDISABILITY.forEach((condition) => {
      const cat = getCategoryForCondition(condition);
      if (!categorizedConditions[cat]) categorizedConditions[cat] = [];
      categorizedConditions[cat].push(condition);
    });

    navigate("/issue_details", { state: { categorizedConditions } });
  };

  const openPTSDVideo = () => {
    if (!hasSeenVideo) {
      setShowPTSDVideo(true);
      setHasSeenVideo(true);
    }
  };

  const startVideo = () => setVideoStarted(true);
  const closeVideo = () => {
    setShowPTSDVideo(false);
    setVideoStarted(false);
  };

  return (
    <>
      {/* PTSD Video Modal - Shows only first time */}
      {showPTSDVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeVideo}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-black rounded-full w-12 h-12 flex items-center justify-center text-3xl font-light shadow-lg"
            >
              ×
            </button>

            <div className="relative aspect-video bg-black">
              {videoStarted ? (
                <div className="w-full h-full">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/QDLXrZIWKYY?si=bNEdoE2-DrH_Y9ry"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer"
                  onClick={startVideo}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className=" bg-red-500 rounded-full  ">
                      <svg
                        className="w-20 h-20 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7L8 5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 bg-gradient-to-r from-blue-900 to-[#0B2A52] text-center">
              <p className="text-white text-lg w-3/4 mb-5 text-center mx-auto font-medium">
                Please use this link to get in touch with the Independent
                Medical Service Provider.
              </p>
              <div className="flex items-center gap-5  justify-center">
                <a
                  href="https://scan.page/p/1CqNX6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:text-white  text-gray-900 underline"
                >
                  Click here for Contact
                </a>
                <LuMoveRight size={20} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      <div className="md:py-28 md:mt-10 mt-0 min-h-[85vh] py-10 dark:bg-white flex justify-center items-center md:p-4 pt-32">
        <div className="w-full max-w-3xl bg-white md:shadow-md rounded-lg md:p-6 p-3">
          <h1 className="text-xl md:text-2xl font-bold text-blue-900 mb-2 text-center">
            What condition(s) do you want to start a claim for?
          </h1>
          <p className="md:text-sm text-gray-600 mb-6 text-[14px] text-center">
            You can choose multiple conditions. We recommend starting with
            mental health conditions first.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {conditionsList.map((condition) => (
                <div key={condition} className="flex items-center">
                  <input
                    type="checkbox"
                    value={condition}
                    {...register("CURRENTDISABILITY", {
                      onChange: (e) => {
                        const { value, checked } = e.target;

                        if (checked) {
                          dispatch(addCategoryByIssue(value));
                        } else {
                          const selected = getValues(
                            "CURRENTDISABILITY"
                          ).filter((item) => item !== value);
                          dispatch(
                            removeCategoryIfNoIssuesLeft({
                              uncheckedIssue: value,
                              stillCheckedIssues: selected,
                            })
                          );
                        }

                        // Show video only first time PTSD is clicked
                        if (value === "PTSD" && !hasSeenVideo) {
                          openPTSDVideo();
                        }
                      },
                    })}
                    className="checkbox checkbox-primary mr-3 h-5 w-5"
                    id={`condition-${condition}`}
                  />
                  <label
                    htmlFor={`condition-${condition}`}
                    className="text-sm text-gray-700 cursor-pointer flex items-center gap-2"
                  >
                    {condition}
                    {condition === "PTSD" && !hasSeenVideo && (
                      <span className="text-xs bg-orange-100 text-orange-800 px-3 py-1.5 rounded-full font-bold">
                        Watch Video Guide
                      </span>
                    )}
                    {condition === "PTSD" && hasSeenVideo && (
                      <span className="text-xs text-gray-500 italic">
                        (video shown)
                      </span>
                    )}
                  </label>
                </div>
              ))}
            </div>

            {errors.CURRENTDISABILITY && (
              <p className="text-red-500 text-sm text-center">
                Please select at least one condition.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#B31942] hover:bg-[#9d1538] text-white uppercase py-2 px-6 rounded-lg font-bold text-lg transition shadow-lg"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Issues;
