// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// import useCategoryNavigation from "../../../hooks/useCategoryNavigation";
// import { useSelector } from "react-redux";

// const GastrointestinalForm = () => {
//   // Initialize React Hook Form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm({
//     defaultValues: {
//       acidRising: "",
//       symptomsStartDate: "",
//       symptomsFrequency: "",
//       dailyMedication: "",
//       complainedWhileInService: "",
//       details: "",
//     },
//   });

//   const { navigateToNextCategory } = useCategoryNavigation();

//   const sickCallServiceComplain = watch("complainedWhileInService");

//   const selectedCategories = useSelector(
//     (state) => state.issueSlice.selectedCategories
//   );

//   // Handle form submission
//   const onSubmit = (data) => {
//     console.log(data);
//     localStorage.setItem("gastrointestinal_form", JSON.stringify(data));

//     const currentCategoryIndex = selectedCategories.indexOf(
//       "Gastrointestinal Issues (GERD/IBS) Claim Information"
//     );

//     if (currentCategoryIndex !== -1) {
//       if (selectedCategories[currentCategoryIndex + 1]) {
//         const nextCategory = selectedCategories[currentCategoryIndex + 1];
//         navigateToNextCategory(nextCategory);
//       } else {
//         navigateToNextCategory("");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4  mx-auto dark:bg-white pt-16 pb-10 md:pt-32">
//       {/* Header */}
//       <div className="flex flex-col items-center bg-[#0A3161] p-8 rounded-md md:max-w-4xl mx-auto mb-10 mt-20 md:pt-0">
//         <div className="w-28 h-28 ">
//           <img
//             src="https://i.ibb.co.com/jPjS13V8/OBJECTS.png"
//             alt="Mental Health Logo"
//             className="w-full h-full object-contain"
//           />
//         </div>
//         <h1 className="text-2xl md:text-[24px] font-semibold text-center text-white">
//           Gastrointestinal Issues <br /> (GERD/IBS) Claim <br />
//           Information{" "}
//         </h1>
//       </div>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full px-1 md:px-0 md:max-w-4xl"
//       >
//         {/* Acid Rising */}
//         <div className="mb-6">
//           <label className="block text-gray-700 font-semibold mb-2">
//             DO YOU HAVE ANY OF THE BELOW FOLLOWING?
//           </label>
//           <select
//             {...register("acidRising", { required: "This field is required" })}
//             className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border uppercase border-gray-300 rounded-md  text-sm text-gray-700 ${
//               errors.acidRising ? "border-red-500" : ""
//             }`}
//           >
//             <option value="">Select an option</option>
//             <option value="ACID_RISING" className="uppercase">
//               ACID RISING IN THROAT
//             </option>
//             <option value="CONSTANT_UPSET_STOMACH" className="uppercase">
//               constant upset stomach
//             </option>
//             <option value="URGENCY_TO_USE_RESTROOM" className="uppercase">
//               urgency to use the restroom (fear of accident if not getting there
//               fast enough)
//             </option>
//             <option value="REGURGITATION" className="uppercase">
//               regurgitation (throwing up in mouth when burping)
//             </option>
//             <option value="NAUSEA_VOMITING_WEEKLY" className="uppercase">
//               nausea/vomiting weekly
//             </option>
//             <option value="TROUBLE_SLEEPING_DUE_TO_ACID" className="uppercase">
//               trouble sleeping due to acid
//             </option>
//             <option value="LOOSE_STOOLS_DIARRHEA" className="uppercase">
//               loose stools/diarrhea
//             </option>
//           </select>
//           {errors.acidRising && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.acidRising.message}
//             </p>
//           )}
//         </div>

//         {/* Symptoms Start Date */}
//         <div className="mb-6">
//           <label className="block text-gray-700 font-semibold mb-2">
//             WHEN DID YOUR SYMPTOMS START?
//           </label>
//           <input
//             type="date"
//             {...register("symptomsStartDate", {
//               required: "This field is required",
//             })}
//             className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black uppercase border-gray-300 rounded-md  text-sm text-gray-700
//     [appearance:auto]
//     [&::-webkit-calendar-picker-indicator]:bg-transparent
//     [&::-webkit-calendar-picker-indicator]:cursor-pointer
//     [&::-webkit-calendar-picker-indicator]:opacity-100
//     dark:[&::-webkit-calendar-picker-indicator]:invert
//     ${errors.symptomsStartDate ? "border-red-500" : ""}`}
//           />
//           {errors.symptomsStartDate && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.symptomsStartDate.message}
//             </p>
//           )}
//         </div>

//         {/* Symptoms Frequency */}
//         <div className="mb-6">
//           <label className="block text-gray-700 font-semibold mb-2">
//             HOW OFTEN DO YOU EXPERIENCE THESE SYMPTOMS?
//           </label>
//           <select
//             {...register("symptomsFrequency", {
//               required: "This field is required",
//             })}
//             className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border uppercase border-gray-300 rounded-md  text-sm text-gray-700 ${
//               errors.symptomsFrequency ? "border-red-500" : ""
//             }`}
//           >
//             <option value="" disabled>
//               Select an option
//             </option>
//             <option value="DAILY">DAILY</option>
//             <option value="WEEKLY">WEEKLY</option>
//             <option value="SEASONALLY">Seasonally</option>
//           </select>
//           {errors.symptomsFrequency && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.symptomsFrequency.message}
//             </p>
//           )}
//         </div>

//         {/* Daily Medication */}
//         <div className="mb-6">
//           <label className="block text-gray-700 font-semibold mb-2">
//             DO YOU TAKE ANY MEDICATION DAILY FOR THIS CONDITION?
//           </label>
//           <select
//             {...register("dailyMedication", {
//               required: "This field is required",
//             })}
//             className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black uppercase border-gray-300 rounded-md  text-sm text-gray-700 ${
//               errors.dailyMedication ? "border-red-500" : ""
//             }`}
//           >
//             <option value="" disabled>
//               Select an option
//             </option>
//             <option value="YES">YES</option>
//             <option value="NO">NO</option>
//           </select>
//           {errors.dailyMedication && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.dailyMedication.message}
//             </p>
//           )}
//         </div>

//         {/* Complained While in Service */}
//         <div className="mb-6">
//           <label className="block text-gray-700 font-semibold mb-2">
//             DID YOU EVER COMPLAIN OF THIS TO SICK CALL WHILE IN SERVICE?
//           </label>
//           <select
//             {...register("complainedWhileInService", {
//               required: "This field is required",
//             })}
//             className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border uppercase border-gray-300 rounded-md  text-sm text-gray-700 ${
//               errors.complainedWhileInService ? "border-red-500" : ""
//             }`}
//           >
//             <option value="">Select an option</option>

//             <option value="YES">YES</option>
//             <option value="NO">NO</option>
//           </select>
//           {errors.complainedWhileInService && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.complainedWhileInService.message}
//             </p>
//           )}
//         </div>

//         {sickCallServiceComplain === "YES" && (
//           <>
//             {/* Details */}
//             <div className="mb-6">
//               <label className="block text-gray-700 font-semibold mb-2">
//                 PLEASE PROVIDE DETAILS
//               </label>
//               <textarea
//                 {...register("details", { required: "This field is required" })}
//                 className={`mt-1 block w-full p-2 border uppercase border-gray-300 dark:bg-white rounded-md  text-sm text-gray-700 h-32 resize-none ${
//                   errors.details ? "border-red-500" : ""
//                 }`}
//                 placeholder="Enter details here"
//               />
//               {errors.details && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.details.message}
//                 </p>
//               )}
//             </div>
//           </>
//         )}

//         <div className="flex justify-center gap-4 mt-6">
//           <Link
//             to="#"
//             className="bg-white text-blue-800 px-6 py-2 border border-blue-800 rounded-md hover:bg-gray-100  w-full text-center font-semibold"
//             onClick={() => window.history.back()}
//           >
//             Back
//           </Link>

//           <button
//             type="submit"
//             className="bg-[#B31942] uppercase text-white px-6 py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-red-500 w-full font-semibold"
//           >
//             Continue
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default GastrointestinalForm;

import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { Play, Pause } from "lucide-react";
import useCategoryNavigation from "../../../hooks/useCategoryNavigation";
import { useSelector } from "react-redux";
import backgroundMusic from "../../../henas_voice/hannah_gerd_ibs_section_short.mp3";
import audioWave from "../../../../public/Voice.json";

const GastrointestinalForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      acidRising: "",
      symptomsStartDate: "",
      symptomsFrequency: "",
      dailyMedication: "",
      complainedWhileInService: "",
      details: "",
    },
  });

  const { navigateToNextCategory } = useCategoryNavigation();
  const audioRef = useRef(null); // Reference to the audio element
  const [isPlaying, setIsPlaying] = useState(false); // Initialize as false
  const [audioError, setAudioError] = useState(null); // Track audio errors

  const sickCallServiceComplain = watch("complainedWhileInService");

  const selectedCategories = useSelector(
    (state) => state.issueSlice.selectedCategories
  );

  // Start audio when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
          setAudioError(
            "Audio playback was blocked. Click the play button to start."
          );
        });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setAudioError(null);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setAudioError(null);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
            setAudioError("Failed to play audio. Please try again.");
          });
      }
    }
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("gastrointestinal_form", JSON.stringify(data));
    if (audioRef.current) {
      audioRef.current.pause(); // Pause audio on form submission
    }

    const currentCategoryIndex = selectedCategories.indexOf(
      "Gastrointestinal Issues (GERD/IBS) Claim Information"
    );

    if (currentCategoryIndex !== -1) {
      if (selectedCategories[currentCategoryIndex + 1]) {
        const nextCategory = selectedCategories[currentCategoryIndex + 1];
        navigateToNextCategory(nextCategory);
      } else {
        navigateToNextCategory("");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 mx-auto dark:bg-white pt-16 pb-10 md:pt-32">
      {/* Audio Element */}
      <audio ref={audioRef} src={backgroundMusic} loop />

      {/* Header */}
      <div className="flex flex-col items-center bg-[#0A3161] p-8 rounded-md md:max-w-4xl mx-auto mb-10 mt-20 md:pt-0">
        <div className="w-28 h-28">
          <img
            src="https://i.ibb.co.com/jPjS13V8/OBJECTS.png"
            alt="Mental Health Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl md:text-[24px] font-semibold text-center text-white">
          Gastrointestinal Issues <br /> (GERD/IBS) Claim <br />
          Information
        </h1>
      </div>

      {/* Play/Pause Button */}
      <div className="flex justify-end items-center w-full md:max-w-4xl mb-6">
        <button
          type="button"
          onClick={toggleAudio}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          className="flex items-center gap-2 py-2 text-white rounded-lg transition-colors"
        >
          {isPlaying ? (
            <>
              <Lottie
                animationData={audioWave}
                loop
                autoplay
                className="w-20 h-14"
              />
              <div className="bg-gray-200 p-2 shadow-md border border-gray-400 rounded-full">
                <Pause size={16} className="text-gray-900" />
              </div>
            </>
          ) : (
            <div className="bg-gray-200 p-2 shadow-md border border-gray-400 rounded-full">
              <Play size={14} className="text-gray-900" />
            </div>
          )}
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-1 md:px-0 max-w-4xl"
      >
        {/* Acid Rising */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            DO YOU HAVE ANY OF THE BELOW FOLLOWING?
          </label>
          <select
            {...register("acidRising", { required: "This field is required" })}
            className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border uppercase border-gray-300 rounded-md text-sm text-gray-700 ${
              errors.acidRising ? "border-red-500" : ""
            }`}
          >
            <option value="">Select an option</option>
            <option value="ACID_RISING" className="uppercase">
              ACID RISING IN THROAT
            </option>
            <option value="CONSTANT_UPSET_STOMACH" className="uppercase">
              CONSTANT UPSET STOMACH
            </option>
            <option value="URGENCY_TO_USE_RESTROOM" className="uppercase">
              URGENCY TO USE THE RESTROOM (FEAR OF ACCIDENT IF NOT GETTING THERE
              FAST ENOUGH)
            </option>
            <option value="REGURGITATION" className="uppercase">
              REGURGITATION (THROWING UP IN MOUTH WHEN BURPING)
            </option>
            <option value="NAUSEA_VOMITING_WEEKLY" className="uppercase">
              NAUSEA/VOMITING WEEKLY
            </option>
            <option value="TROUBLE_SLEEPING_DUE_TO_ACID" className="uppercase">
              TROUBLE SLEEPING DUE TO ACID
            </option>
            <option value="LOOSE_STOOLS_DIARRHEA" className="uppercase">
              LOOSE STOOLS/DIARRHEA
            </option>
          </select>
          {errors.acidRising && (
            <p className="text-red-500 text-sm mt-1">
              {errors.acidRising.message}
            </p>
          )}
        </div>

        {/* Symptoms Start Date */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            WHEN DID YOUR SYMPTOMS START?
          </label>
          <input
            type="date"
            {...register("symptomsStartDate", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black uppercase border-gray-300 rounded-md text-sm text-gray-700 
              [appearance:auto] 
              [&::-webkit-calendar-picker-indicator]:bg-transparent 
              [&::-webkit-calendar-picker-indicator]:cursor-pointer 
              [&::-webkit-calendar-picker-indicator]:opacity-100 
              dark:[&::-webkit-calendar-picker-indicator]:invert
              ${errors.symptomsStartDate ? "border-red-500" : ""}`}
          />
          {errors.symptomsStartDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.symptomsStartDate.message}
            </p>
          )}
        </div>

        {/* Symptoms Frequency */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            HOW OFTEN DO YOU EXPERIENCE THESE SYMPTOMS?
          </label>
          <select
            {...register("symptomsFrequency", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border uppercase border-gray-300 rounded-md text-sm text-gray-700 ${
              errors.symptomsFrequency ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="DAILY">DAILY</option>
            <option value="WEEKLY">WEEKLY</option>
            <option value="SEASONALLY">SEASONALLY</option>
          </select>
          {errors.symptomsFrequency && (
            <p className="text-red-500 text-sm mt-1">
              {errors.symptomsFrequency.message}
            </p>
          )}
        </div>

        {/* Daily Medication */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            DO YOU TAKE ANY MEDICATION DAILY FOR THIS CONDITION?
          </label>
          <select
            {...register("dailyMedication", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black uppercase border-gray-300 rounded-md text-sm text-gray-700 ${
              errors.dailyMedication ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
          {errors.dailyMedication && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dailyMedication.message}
            </p>
          )}
        </div>

        {/* Complained While in Service */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            DID YOU EVER COMPLAIN OF THIS TO SICK CALL WHILE IN SERVICE?
          </label>
          <select
            {...register("complainedWhileInService", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border uppercase border-gray-300 rounded-md text-sm text-gray-700 ${
              errors.complainedWhileInService ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
          {errors.complainedWhileInService && (
            <p className="text-red-500 text-sm mt-1">
              {errors.complainedWhileInService.message}
            </p>
          )}
        </div>

        {sickCallServiceComplain === "YES" && (
          <>
            {/* Details */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                PLEASE PROVIDE DETAILS
              </label>
              <textarea
                {...register("details", { required: "This field is required" })}
                className={`mt-1 block w-full p-2 border uppercase border-gray-300 dark:bg-white rounded-md text-sm text-gray-700 h-32 resize-none ${
                  errors.details ? "border-red-500" : ""
                }`}
                placeholder="Enter details here"
              />
              {errors.details && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.details.message}
                </p>
              )}
            </div>
          </>
        )}

        <div className="flex justify-center gap-4 mt-6">
          <Link
            to="#"
            className="bg-white text-blue-800 px-6 py-2 border border-blue-800 rounded-md hover:bg-gray-100 w-full text-center font-semibold"
            onClick={() => window.history.back()}
          >
            Back
          </Link>

          <button
            type="submit"
            className="bg-[#B31942] uppercase text-white px-6 py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-red-500 w-full font-semibold"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default GastrointestinalForm;
