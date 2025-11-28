// import { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// import narrationVoice from "../../../src/cris_voice/Have_You_Ever_Applied_for_VA_Benefits_chris.mp3";

// const Auto_Narative = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const [step, setStep] = useState("start");
//   const navigate = useNavigate();

//   const audioRef = useRef(new Audio(narrationVoice));
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     const audio = audioRef.current;

//     audio
//       .play()
//       .then(() => {
//         setIsPlaying(true);
//       })
//       .catch((error) => {
//         console.error("Auto-play failed:", error);
//         setIsPlaying(false);
//       });

//     return () => {
//       audio.pause();
//       audio.currentTime = 0;
//     };
//   }, []);

//   const onSubmit = (data) => {
//     const mappedData = {
//       ...data,
//       have_you_ever_field_a_claim_with_va: data.applied,
//     };

//     localStorage.setItem("va_claim_data", JSON.stringify(mappedData));
//     console.log("\u{1F4BE} Saved Form Data:", mappedData);
//     navigate("/video");
//   };

//   const applied = watch("applied");
//   const hasLetter = watch("hasLetter");
//   const hasIntent = watch("hasIntent");

//   const goBack = () => {
//     if (step === "yesFlowStart") setStep("start");
//     else if (step === "letterDetails" || step === "ratingsDetails")
//       setStep("yesFlowStart");
//     else if (step === "noFlowStart") setStep("start");
//     else if (step === "intentDetails") setStep("noFlowStart");
//     else if (step === "startNow") setStep("noFlowStart");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="min-h-screen text-white flex justify-center items-center p-2 md:p-6"
//       style={{
//         backgroundImage:
//           'url("https://i.ibb.co/Y7Z6tdQk/Frame-1597884882-1.png")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="bg-white text-black md:p-6 p-2 rounded shadow-md w-full max-w-xl space-y-4 mt-20 md:mt-0">
//         {step === "start" && (
//           <>
//             <div className="flex items-start gap-2">
//               <input
//                 type="checkbox"
//                 id="if_you_are_currently_a_va_employee_check_the_box_includes_work_studyinternship"
//                 {...register(
//                   "if_you_are_currently_a_va_employee_check_the_box_includes_work_studyinternship"
//                 )}
//                 className="mt-1 w-4 h-4"
//               />

//               <label
//                 htmlFor="if_you_are_currently_a_va_employee_check_the_box_includes_work_studyinternship"
//                 className="text-sm md:text-base font-semibold leading-snug"
//               >
//                 IF YOU ARE CURRENTLY A VA EMPLOYEE, CHECK THE BOX (INCLUDES WORK
//                 STUDY/INTERNSHIP)
//                 <br />
//                 (IF YOU ARE NOT A VA EMPLOYEE SKIP TO SECTION II, IF APPLICABLE)
//               </label>
//             </div>
//             <h2 className="text-xl font-semibold">
//               Have you ever applied for VA benefits?
//             </h2>
//             <select
//               {...register("applied")}
//               onChange={(e) => {
//                 const value = e.target.value;

//                 localStorage.setItem(
//                   "va_claim_data",
//                   JSON.stringify({
//                     have_you_ever_field_a_claim_with_va: value,
//                   })
//                 );

//                 if (value === "yes") setStep("yesFlowStart");
//                 else if (value === "no") setStep("noFlowStart");
//               }}
//               className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
//             >
//               <option value="">Select</option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>
//           </>
//         )}

//         {step === "yesFlowStart" && (
//           <>
//             <h2 className="text-xl font-semibold">
//               Do you have a decision letter within the past year?
//             </h2>
//             <select
//               {...register("hasLetter")}
//               onChange={(e) => {
//                 if (e.target.value === "yes") setStep("letterDetails");
//                 else if (e.target.value === "no") setStep("ratingsDetails");
//               }}
//               className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
//             >
//               <option value="">Select</option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>

//             <button
//               type="button"
//               onClick={goBack}
//               className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
//             >
//               Back
//             </button>
//           </>
//         )}

//         {step === "letterDetails" && (
//           <>
//             <h2 className="text-xl font-semibold">
//               What is the date of that letter?
//             </h2>
//             <input
//               type="date"
//               {...register("letterDate", {
//                 required: "This field is required",
//               })}
//               className={`w-full p-2 uppercase border rounded dark:bg-white dark:border-black dark:text-black text-sm
//               [&::-webkit-calendar-picker-indicator]:bg-transparent
//               [&::-webkit-calendar-picker-indicator]:cursor-pointer
//               [&::-webkit-calendar-picker-indicator]:opacity-100
//               dark:[&::-webkit-calendar-picker-indicator]:invert
//               ${errors.letterDate ? "border-red-500" : "border-gray-300"}`}
//               id="letterDate"
//             />

//             <h2 className="text-xl font-semibold mt-4">
//               What are the conditions listed in this recent letter and what were
//               they rated at?
//             </h2>
//             <textarea
//               {...register("conditionsListed")}
//               className="w-full uppercase p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
//               rows="4"
//             />

//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={goBack}
//                 className="bg-gray-300 text-black px-4 py-2 rounded"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#B31942] text-white px-6 py-2 rounded"
//               >
//                 NEXT
//               </button>
//             </div>
//           </>
//         )}

//         {step === "ratingsDetails" && (
//           <>
//             <h2 className="text-xl font-semibold">
//               What are your current ratings and when were they rated? (Exact
//               dates if possible)
//             </h2>
//             <textarea
//               {...register("currentRatings")}
//               className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black "
//               rows="4"
//             />

//             <h2 className="text-xl font-semibold mt-4">
//               What is the date of the letter?
//             </h2>
//             <input
//               type="date"
//               {...register("ratingsLetterDate")}
//               className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
//             />

//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={goBack}
//                 className="bg-gray-300 text-black px-4 py-2 rounded"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#B31942] text-white px-6 py-2 rounded"
//               >
//                 NEXT
//               </button>
//             </div>
//           </>
//         )}

//         {/* NO Flow */}
//         {step === "noFlowStart" && (
//           <>
//             <h2 className="text-xl font-semibold">
//               Do you have an active intent to file?
//             </h2>
//             <select
//               {...register("hasIntent")}
//               onChange={(e) => {
//                 if (e.target.value === "yes") setStep("intentDetails");
//                 else if (e.target.value === "no") setStep("startNow");
//               }}
//               className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
//             >
//               <option value="">Select</option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>

//             <button
//               type="button"
//               onClick={goBack}
//               className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
//             >
//               Back
//             </button>
//           </>
//         )}

//         {step === "intentDetails" && (
//           <>
//             <h2 className="text-xl font-semibold">
//               What date was your intent to file submitted?
//             </h2>
//             <input
//               type="date"
//               {...register("intentDate")}
//               className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
//             />

//             <h2 className="text-xl font-semibold mt-4">
//               Did you submit anything else with your intent?
//             </h2>
//             <select
//               {...register("submittedOthers")}
//               className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
//             >
//               <option value="">Select</option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>

//             <h2 className="text-xl font-semibold mt-4">
//               Please list any other items submitted:
//             </h2>
//             <textarea
//               {...register("otherItemsListed")}
//               className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
//               rows="4"
//             />

//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={goBack}
//                 className="bg-gray-300 text-black px-4 py-2 rounded"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#B31942] text-white px-6 py-2 rounded"
//               >
//                 NEXT
//               </button>
//             </div>
//           </>
//         )}

//         {step === "startNow" && (
//           <>
//             <h2 className="text-xl font-semibold">
//               Perfect! Let’s get started.
//             </h2>
//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={goBack}
//                 className="bg-gray-300 text-black px-4 py-2 rounded"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#B31942] text-white px-6 py-2 rounded"
//               >
//                 NEXT
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Auto_Narative;

// import { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// import narrationVoice from "../../../src/cris_voice/Have_You_Ever_Applied_for_VA_Benefits_chris.mp3";

// const Auto_Narative = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const [step, setStep] = useState("start");
//   const navigate = useNavigate();

//   const audioRef = useRef(new Audio(narrationVoice));
//   const [isPlaying, setIsPlaying] = useState(false);

//   const applied = watch("applied");
//   const hasLetter = watch("hasLetter");
//   const hasIntent = watch("hasIntent");
//   const isVaEmployee = watch(
//     "if_you_are_currently_a_va_employee_check_the_box_includes_work_studyinternship"
//   );

//   useEffect(() => {
//     const audio = audioRef.current;
//     audio
//       .play()
//       .then(() => setIsPlaying(true))
//       .catch((error) => {
//         console.error("Auto-play failed:", error);
//         setIsPlaying(false);
//       });

//     return () => {
//       audio.pause();
//       audio.currentTime = 0;
//     };
//   }, []);

//   useEffect(() => {
//     if (isVaEmployee !== undefined) {
//       const existingData = JSON.parse(
//         localStorage.getItem("va_claim_data") || "{}"
//       );
//       localStorage.setItem(
//         "va_claim_data",
//         JSON.stringify({
//           ...existingData,
//           if_you_are_currently_a_va_employee_check_the_box_includes_work_studyinternship:
//             isVaEmployee,
//         })
//       );
//     }
//   }, [isVaEmployee]);

//   useEffect(() => {
//     if (applied) {
//       const existingData = JSON.parse(
//         localStorage.getItem("va_claim_data") || "{}"
//       );
//       localStorage.setItem(
//         "va_claim_data",
//         JSON.stringify({
//           ...existingData,
//           have_you_ever_field_a_claim_with_va: applied,
//         })
//       );

//       if (applied === "yes") setStep("yesFlowStart");
//       else if (applied === "no") setStep("noFlowStart");
//     }
//   }, [applied]);

//   const onSubmit = (data) => {
//     const mappedData = {
//       ...JSON.parse(localStorage.getItem("va_claim_data") || "{}"),
//       ...data,
//       have_you_ever_field_a_claim_with_va: data.applied || applied,
//     };

//     localStorage.setItem("va_claim_data", JSON.stringify(mappedData));
//     console.log("Saved Form Data:", mappedData);
//     navigate("/video");
//   };

//   const goBack = () => {
//     if (step === "yesFlowStart") setStep("start");
//     else if (step === "letterDetails" || step === "ratingsDetails")
//       setStep("yesFlowStart");
//     else if (step === "noFlowStart") setStep("start");
//     else if (step === "intentDetails") setStep("noFlowStart");
//     else if (step === "startNow") setStep("noFlowStart");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="min-h-screen text-white flex justify-center items-center p-2 md:p-6"
//       style={{
//         backgroundImage:
//           'url("https://i.ibb.co/Y7Z6tdQk/Frame-1597884882-1.png")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="bg-white text-black md:p-6 p-2 rounded shadow-md w-full max-w-xl space-y-4 mt-20 md:mt-0">
//         {/* START STEP */}
//         {step === "start" && (
//           <>
//             <div className="flex items-start gap-2">
//               <input
//                 type="checkbox"
//                 id="if_you_are_currently_a_va_employee_check_the_box_includes_work_studyinternship"
//                 {...register(
//                   "if_you_are_currently_a_va_employee_check_the_box_includes_work_studyinternship"
//                 )}
//                 className="mt-1 w-4 h-4"
//               />
//               <label
//                 htmlFor="if_you_are_currently_a_va_employee_check_the_box_includes_work_studyinternship"
//                 className="text-sm md:text-base font-semibold leading-snug"
//               >
//                 IF YOU ARE CURRENTLY A VA EMPLOYEE, CHECK THE BOX (INCLUDES WORK
//                 STUDY/INTERNSHIP)
//                 <br />
//                 (IF YOU ARE NOT A VA EMPLOYEE SKIP TO SECTION II, IF APPLICABLE)
//               </label>
//             </div>

//             <h2 className="text-xl font-semibold">
//               Have you ever applied for VA benefits?
//             </h2>
//             <select
//               {...register("applied")}
//               className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
//             >
//               <option value="">Select</option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>
//           </>
//         )}

//         {/* YES FLOW */}
//         {/* {step === "yesFlowStart" && (
//           <>
//             <div>
//               <p className="text-xl font-semibold">
//                 HAVE YOU EVER FILED A CLAIM WITH VA?
//               </p>
//             </div>
//             <h2 className="text-xl font-semibold">
//               Do you have a decision letter within the past year?
//             </h2>
//             <select
//               {...register("hasLetter")}
//               onChange={(e) => {
//                 if (e.target.value === "yes") setStep("letterDetails");
//                 else if (e.target.value === "no") setStep("ratingsDetails");
//               }}
//               className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
//             >
//               <option value="">Select</option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>

//             <button
//               type="button"
//               onClick={goBack}
//               className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
//             >
//               Back
//             </button>
//           </>
//         )} */}

//         {step === "yesFlowStart" && (
//           <>
//             <div className="mt-6">
//               <h2 className="text-lg font-semibold mb-2">
//                 Have you ever filed a claim with VA?
//               </h2>
//               <select
//                 {...register("has_filed_va_claim", {
//                   required: "Please select Yes or No",
//                 })}
//                 className={`w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black ${
//                   errors.has_filed_va_claim ? "border-red-500" : ""
//                 }`}
//               >
//                 <option value="">Select</option>
//                 <option value="yes">YES</option>
//                 <option value="no">NO</option>
//               </select>
//               {errors.has_filed_va_claim && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.has_filed_va_claim.message}
//                 </p>
//               )}
//             </div>

//             {/* VA FILE NUMBER – Shows ONLY when "YES" is selected */}
//             {watch("has_filed_va_claim") === "yes" && (
//               <div className="mt-6 animate-in fade-in duration-300">
//                 <h2 className="text-lg font-semibold mb-2">
//                   Please enter your VA File Number
//                 </h2>
//                 <input
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={10}
//                   placeholder="e.g. 123456789"
//                   {...register("va_file_number", {
//                     required: "VA File Number is required",
//                     pattern: {
//                       value: /^\d{8,10}$/,
//                       message: "Must be 8–10 digits only",
//                     },
//                   })}
//                   className={`w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black ${
//                     errors.va_file_number ? "border-red-500" : ""
//                   }`}
//                   onChange={(e) => {
//                     // Auto-remove any non-digit
//                     e.target.value = e.target.value
//                       .replace(/\D/g, "")
//                       .slice(0, 10);
//                   }}
//                 />
//                 {errors.va_file_number && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.va_file_number.message}
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* Existing Question */}
//             <h2 className="text-xl font-semibold mt-8">
//               Do you have a decision letter within the past year?
//             </h2>
//             <select
//               {...register("hasLetter")}
//               onChange={(e) => {
//                 if (e.target.value === "yes") setStep("letterDetails");
//                 else if (e.target.value === "no") setStep("ratingsDetails");
//               }}
//               className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
//             >
//               <option value="">Select</option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>

//             <button
//               type="button"
//               onClick={goBack}
//               className="mt-6 bg-gray-300 text-black px-4 py-2 rounded"
//             >
//               Back
//             </button>
//           </>
//         )}
//         {step === "letterDetails" && (
//           <>
//             <h2 className="text-xl font-semibold">
//               What is the date of that letter?
//             </h2>
//             <input
//               type="date"
//               {...register("letterDate", {
//                 required: "This field is required",
//               })}
//               className={`w-full p-2 uppercase border rounded dark:bg-white dark:border-black dark:text-black text-sm
//                 [&::-webkit-calendar-picker-indicator]:bg-transparent
//                 [&::-webkit-calendar-picker-indicator]:cursor-pointer
//                 [&::-webkit-calendar-picker-indicator]:opacity-100
//                 dark:[&::-webkit-calendar-picker-indicator]:invert
//                 ${errors.letterDate ? "border-red-500" : "border-gray-300"}`}
//             />

//             <h2 className="text-xl font-semibold mt-4">
//               What are the conditions listed in this recent letter and what were
//               they rated at?
//             </h2>
//             <textarea
//               {...register("conditionsListed")}
//               className="w-full uppercase p-2 border rounded dark:bg-white dark:border-black dark:text-black"
//               rows="4"
//             />

//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={goBack}
//                 className="bg-gray-300 text-black px-4 py-2 rounded"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#B31942] text-white px-6 py-2 rounded"
//               >
//                 NEXT
//               </button>
//             </div>
//           </>
//         )}

//         {step === "ratingsDetails" && (
//           <>
//             <h2 className="text-xl font-semibold">
//               What are your current ratings and when were they rated? (Exact
//               dates if possible)
//             </h2>
//             <textarea
//               {...register("currentRatings")}
//               className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
//               rows="4"
//             />

//             <h2 className="text-xl font-semibold mt-4">
//               What is the date of the letter?
//             </h2>
//             <input
//               type="date"
//               {...register("ratingsLetterDate")}
//               className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
//             />

//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={goBack}
//                 className="bg-gray-300 text-black px-4 py-2 rounded"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#B31942] text-white px-6 py-2 rounded"
//               >
//                 NEXT
//               </button>
//             </div>
//           </>
//         )}

//         {/* NO FLOW */}
//         {step === "noFlowStart" && (
//           <>
//             <h2 className="text-xl font-semibold">
//               Do you have an active intent to file?
//             </h2>
//             <select
//               {...register("hasIntent")}
//               onChange={(e) => {
//                 if (e.target.value === "yes") setStep("intentDetails");
//                 else if (e.target.value === "no") setStep("startNow");
//               }}
//               className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
//             >
//               <option value="">Select</option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>

//             <button
//               type="button"
//               onClick={goBack}
//               className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
//             >
//               Back
//             </button>
//           </>
//         )}

//         {step === "intentDetails" && (
//           <>
//             <h2 className="text-xl font-semibold">
//               What date was your intent to file submitted?
//             </h2>
//             <input
//               type="date"
//               {...register("intentDate")}
//               className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
//             />

//             <h2 className="text-xl font-semibold mt-4">
//               Did you submit anything else with your intent?
//             </h2>
//             <select
//               {...register("submittedOthers")}
//               className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
//             >
//               <option value="">Select</option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>

//             <h2 className="text-xl font-semibold mt-4">
//               Please list any other items submitted:
//             </h2>
//             <textarea
//               {...register("otherItemsListed")}
//               className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
//               rows="4"
//             />

//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={goBack}
//                 className="bg-gray-300 text-black px-4 py-2 rounded"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#B31942] text-white px-6 py-2 rounded"
//               >
//                 NEXT
//               </button>
//             </div>
//           </>
//         )}

//         {step === "startNow" && (
//           <>
//             <h2 className="text-xl font-semibold">
//               Perfect! Let’s get started.
//             </h2>
//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={goBack}
//                 className="bg-gray-300 text-black px-4 py-2 rounded"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#B31942] text-white px-6 py-2 rounded"
//               >
//                 NEXT
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Auto_Narative;

// import { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// import narrationVoice from "../../../src/cris_voice/Have_You_Ever_Applied_for_VA_Benefits_chris.mp3";

// const Auto_Narative = () => {
//   const navigate = useNavigate();
//   const audioRef = useRef(new Audio(narrationVoice));
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Load saved data once on mount
//   const loadSavedData = () => {
//     try {
//       const saved = localStorage.getItem("va_claim_data");
//       return saved ? JSON.parse(saved) : {};
//     } catch (error) {
//       console.error("Failed to load saved data:", error);
//       return {};
//     }
//   };

//   const initialData = loadSavedData();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: initialData,
//   });

//   const [step, setStep] = useState("start");

//   // Watch all form values
//   const formValues = watch();

//   // Auto-save every change to localStorage
//   useEffect(() => {
//     if (Object.keys(formValues).length === 0) return;

//     const dataToSave = {
//       ...initialData,
//       ...formValues,
//       have_you_ever_field_a_claim_with_va:
//         formValues.applied || initialData.applied,
//     };

//     localStorage.setItem("va_claim_data", JSON.stringify(dataToSave));
//   }, [formValues, initialData]);

//   // Restore correct step on page load/refresh
//   useEffect(() => {
//     if (!initialData || Object.keys(initialData).length === 0) return;

//     const { applied, hasLetter, hasIntent } = initialData;

//     if (applied === "yes") {
//       if (hasLetter === "yes") setStep("letterDetails");
//       else if (hasLetter === "no") setStep("ratingsDetails");
//       else setStep("yesFlowStart");
//     } else if (applied === "no") {
//       if (hasIntent === "yes") setStep("intentDetails");
//       else if (hasIntent === "no") setStep("startNow");
//       else setStep("noFlowStart");
//     }
//   }, []);

//   // Play narration audio
//   useEffect(() => {
//     const audio = audioRef.current;
//     audio
//       .play()
//       .then(() => setIsPlaying(true))
//       .catch((err) => {
//         console.log("Audio autoplay prevented:", err);
//         setIsPlaying(false);
//       });

//     return () => {
//       audio.pause();
//       audio.currentTime = 0;
//     };
//   }, []);

//   const goBack = () => {
//     if (step === "yesFlowStart" || step === "noFlowStart") setStep("start");
//     else if (step === "letterDetails" || step === "ratingsDetails")
//       setStep("yesFlowStart");
//     else if (step === "intentDetails" || step === "startNow")
//       setStep("noFlowStart");
//   };

//   const onSubmit = (data) => {
//     const finalData = {
//       ...initialData,
//       ...data,
//       have_you_ever_field_a_claim_with_va: data.applied || initialData.applied,
//     };

//     localStorage.setItem("va_claim_data", JSON.stringify(finalData));
//     console.log("Final saved data:", finalData);

//     navigate("/video");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="min-h-screen text-white flex justify-center items-center p-4 md:p-6"
//       style={{
//         backgroundImage:
//           'url("https://i.ibb.co/Y7Z6tdQk/Frame-1597884882-1.png")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="bg-white text-black rounded-2xl shadow-2xl p-6 md:p-10 w-full max-w-2xl space-y-8">
//         {/* ==================== START ==================== */}
//         {step === "start" && (
//           <>
//             <div className="flex items-start gap-4">
//               <input
//                 type="checkbox"
//                 id="va-employee"
//                 {...register(
//                   "if_you_are_currently_a_va_employee_check_the_box_includes_work_studyinternship"
//                 )}
//                 className="w-6 h-6 mt-1 text-[#B31942] rounded focus:ring-[#B31942]"
//               />
//               <label
//                 htmlFor="va-employee"
//                 className="text-sm md:text-base font-semibold leading-tight"
//               >
//                 IF YOU ARE CURRENTLY A VA EMPLOYEE, CHECK THE BOX (INCLUDES WORK
//                 STUDY/INTERNSHIP)
//                 <br />
//                 <span className="font-normal text-gray-600">
//                   (If not, skip to Section II)
//                 </span>
//               </label>
//             </div>

//             <h2 className="text-2xl md:text-3xl font-bold text-[#B31942] mt-10">
//               Have you ever applied for VA benefits?
//             </h2>

//             <select
//               {...register("applied", { required: "Please select an answer" })}
//               onChange={(e) => {
//                 if (e.target.value === "yes") setStep("yesFlowStart");
//                 if (e.target.value === "no") setStep("noFlowStart");
//               }}
//               className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-[#B31942] focus:outline-none"
//             >
//               <option value="">Select an answer</option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>
//           </>
//         )}

//         {/* ==================== YES FLOW START ==================== */}
//         {step === "yesFlowStart" && (
//           <>
//             <h2 className="text-xl font-bold">
//               Have you ever filed a claim with VA?
//             </h2>
//             <select
//               {...register("has_filed_va_claim", { required: "Required" })}
//               className={`w-full p-4 border-2 rounded-xl text-lg ${
//                 errors.has_filed_va_claim ? "border-red-500" : "border-gray-300"
//               }`}
//             >
//               <option value="">Select</option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>

//             {watch("has_filed_va_claim") === "yes" && (
//               <div className="mt-8 animate-fadeIn">
//                 <label className="text-lg font-bold block mb-2">
//                   VA File Number
//                 </label>
//                 <input
//                   type="text"
//                   maxLength={10}
//                   placeholder="e.g. 123456789"
//                   {...register("va_file_number", {
//                     pattern: {
//                       value: /^\d{8,10}$/,
//                       message: "Must be 8–10 digits only",
//                     },
//                   })}
//                   className={`w-full p-4 border-2 rounded-xl ${
//                     errors.va_file_number ? "border-red-500" : "border-gray-300"
//                   }`}
//                   onChange={(e) => {
//                     e.target.value = e.target.value
//                       .replace(/\D/g, "")
//                       .slice(0, 10);
//                   }}
//                 />
//                 {errors.va_file_number && (
//                   <p className="text-red-600 text-sm mt-2">
//                     {errors.va_file_number.message}
//                   </p>
//                 )}
//               </div>
//             )}

//             <h2 className="text-2xl font-bold text-[#B31942] mt-10">
//               Do you have a decision letter within the past year?
//             </h2>

//             <select
//               {...register("hasLetter", { required: true })}
//               onChange={(e) => {
//                 if (e.target.value === "yes") setStep("letterDetails");
//                 if (e.target.value === "no") setStep("ratingsDetails");
//               }}
//               className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg"
//             >
//               <option value="">Select</option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>

//             <button
//               type="button"
//               onClick={goBack}
//               className="mt-8 bg-gray-400 hover:bg-gray-500 text-black font-bold py-3 px-8 rounded-xl transition"
//             >
//               Back
//             </button>
//           </>
//         )}

//         {/* ==================== LETTER DETAILS ==================== */}
//         {step === "letterDetails" && (
//           <>
//             <h2 className="text-2xl font-bold text-[#B31942]">
//               What is the date of that decision letter?
//             </h2>
//             <input
//               type="date"
//               {...register("letterDate", { required: "Date is required" })}
//               className={`w-full p-4 border-2 rounded-xl ${
//                 errors.letterDate ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.letterDate && (
//               <p className="text-red-600 text-sm">
//                 {errors.letterDate.message}
//               </p>
//             )}

//             <h2 className="text-xl font-bold mt-8">
//               What conditions were listed and what percentage were they rated?
//             </h2>
//             <textarea
//               {...register("conditionsListed")}
//               rows={6}
//               placeholder="Example: PTSD - 70%, Back Injury - 20%, Tinnitus - 10%"
//               className="w-full p-4 border-2 border-gray-300 rounded-xl text-base"
//             />

//             <div className="flex justify-between mt-10">
//               <button
//                 type="button"
//                 onClick={goBack}
//                 className="bg-gray-400 hover:bg-gray-500 px-8 py-3 rounded-xl font-bold"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#B31942] hover:bg-red-700 text-white font-bold px-10 py-3 rounded-xl text-xl transition"
//               >
//                 NEXT
//               </button>
//             </div>
//           </>
//         )}

//         {/* ==================== CURRENT RATINGS ==================== */}
//         {step === "ratingsDetails" && (
//           <>
//             <h2 className="text-2xl font-bold text-[#B31942]">
//               What are your current service-connected ratings?
//             </h2>
//             <textarea
//               {...register("currentRatings")}
//               rows={6}
//               placeholder="List each condition and percentage + effective date if known..."
//               className="w-full p-4 border-2 border-gray-300 rounded-xl"
//             />

//             <h2 className="text-xl font-bold mt-8">
//               Date of most recent rating decision?
//             </h2>
//             <input
//               type="date"
//               {...register("ratingsLetterDate")}
//               className="w-full p-4 border-2 border-gray-300 rounded-xl"
//             />

//             <div className="flex justify-between mt-10">
//               <button
//                 type="button"
//                 onClick={goBack}
//                 className="bg-gray-400 hover:bg-gray-500 px-8 py-3 rounded-xl font-bold"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#B31942] hover:bg-red-700 text-white font-bold px-10 py-3 rounded-xl text-xl"
//               >
//                 NEXT
//               </button>
//             </div>
//           </>
//         )}

//         {/* ==================== NO FLOW START ==================== */}
//         {step === "noFlowStart" && (
//           <>
//             <h2 className="text-2xl md:text-3xl font-bold text-[#B31942]">
//               Do you have an active Intent to File?
//             </h2>

//             <select
//               {...register("hasIntent", { required: true })}
//               onChange={(e) => {
//                 if (e.target.value === "yes") setStep("intentDetails");
//                 if (e.target.value === "no") setStep("startNow");
//               }}
//               className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg"
//             >
//               <option value="">Select</option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>

//             <button
//               type="button"
//               onClick={goBack}
//               className="mt-8 bg-gray-400 hover:bg-gray-500 text-black font-bold py-3 px-8 rounded-xl"
//             >
//               Back
//             </button>
//           </>
//         )}

//         {/* ==================== INTENT DETAILS ==================== */}
//         {step === "intentDetails" && (
//           <>
//             <h2 className="text-xl font-bold">
//               Date you submitted Intent to File
//             </h2>
//             <input
//               type="date"
//               {...register("intentDate")}
//               className="w-full p-4 border-2 border-gray-300 rounded-xl"
//             />

//             <h2 className="text-xl font-bold mt-8">
//               Did you submit anything else with it?
//             </h2>
//             <select
//               {...register("submittedOthers")}
//               className="w-full p-4 border-2 border-gray-300 rounded-xl"
//             >
//               <option value="">Select</option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>

//             <h2 className="text-xl font-bold mt-8">
//               List anything else submitted:
//             </h2>
//             <textarea
//               {...register("otherItemsListed")}
//               rows={5}
//               className="w-full p-4 border-2 border-gray-300 rounded-xl"
//             />

//             <div className="flex justify-between mt-10">
//               <button
//                 type="button"
//                 onClick={goBack}
//                 className="bg-gray-400 hover:bg-gray-500 px-8 py-3 rounded-xl font-bold"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#B31942] hover:bg-red-700 text-white font-bold px-10 py-3 rounded-xl text-xl"
//               >
//                 NEXT
//               </button>
//             </div>
//           </>
//         )}

//         {/* ==================== START NOW ==================== */}
//         {step === "startNow" && (
//           <>
//             <div className="text-center py-12">
//               <h2 className="text-3xl md:text-4xl font-bold text-[#B31942] mb-6">
//                 Perfect! Let’s get your claim started today.
//               </h2>
//               <p className="text-lg text-gray-700 leading-relaxed">
//                 No prior claims or intent to file = maximum back pay potential.
//                 <br />
//                 This is the best time to file!
//               </p>
//             </div>

//             <div className="flex justify-between mt-12">
//               <button
//                 type="button"
//                 onClick={goBack}
//                 className="bg-gray-400 hover:bg-gray-500 px-8 py-3 rounded-xl font-bold"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#B31942] hover:bg-red-700 text-white font-bold px-12 py-4 rounded-xl text-2xl shadow-lg transform hover:scale-105 transition"
//               >
//                 START MY CLAIM NOW
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Auto_Narative;

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import narrationVoice from "../../../src/cris_voice/Have_You_Ever_Applied_for_VA_Benefits_chris.mp3";

const Auto_Narative = () => {
  const navigate = useNavigate();
  const audioRef = useRef(new Audio(narrationVoice));

  const getSavedData = () => {
    try {
      const data = localStorage.getItem("va_claim_data");
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  };

  const savedData = getSavedData();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: savedData,
  });

  const [step, setStep] = useState("start");

  const watchedValues = watch();

  useEffect(() => {
    const dataToSave = {
      ...savedData,
      ...watchedValues,
      have_you_ever_field_a_claim_with_va: watchedValues.applied,
    };
    localStorage.setItem("va_claim_data", JSON.stringify(dataToSave));
  }, [watchedValues, savedData]);

  useEffect(() => {
    if (savedData.applied === "yes") {
      if (savedData.hasLetter === "yes") setStep("letterDetails");
      else if (savedData.hasLetter === "no") setStep("ratingsDetails");
      else setStep("yesFlowStart");
    } else if (savedData.applied === "no") {
      if (savedData.hasIntent === "yes") setStep("intentDetails");
      else if (savedData.hasIntent === "no") setStep("startNow");
      else setStep("noFlowStart");
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const goBack = () => {
    if (step === "yesFlowStart" || step === "noFlowStart") setStep("start");
    else if (["letterDetails", "ratingsDetails"].includes(step))
      setStep("yesFlowStart");
    else if (step === "intentDetails" || step === "startNow")
      setStep("noFlowStart");
  };

  const onSubmit = () => {
    navigate("/video");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen text-white flex justify-center items-center p-2 md:p-6"
      style={{
        backgroundImage:
          'url("https://i.ibb.co/Y7Z6tdQk/Frame-1597884882-1.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white text-black md:p-6 p-2 rounded shadow-md w-full max-w-xl space-y-4 mt-20 md:mt-0">
        {/* START */}
        {step === "start" && (
          <>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="va_employee"
                {...register(
                  "if_you_are_currently_a_va_employee_check_the_box_includes_work_studyinternship"
                )}
                className="mt-1 w-4 h-4"
              />
              <label
                htmlFor="va_employee"
                className="text-sm md:text-base font-semibold leading-snug"
              >
                IF YOU ARE CURRENTLY A VA EMPLOYEE, CHECK THE BOX (INCLUDES WORK
                STUDY/INTERNSHIP)
                <br />
                (IF YOU ARE NOT A VA EMPLOYEE SKIP TO SECTION II, IF APPLICABLE)
              </label>
            </div>

            <h2 className="text-xl font-semibold">
              Have you ever applied for VA benefits?
            </h2>
            <select
              {...register("applied", { required: true })}
              onChange={(e) => {
                setStep(
                  e.target.value === "yes" ? "yesFlowStart" : "noFlowStart"
                );
              }}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select</option>
              <option value="yes">YES</option>
              <option value="no">NO</option>
            </select>
          </>
        )}

        {/* YES FLOW */}
        {step === "yesFlowStart" && (
          <>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">
                Have you ever filed a claim with VA?
              </h2>
              <select
                {...register("has_filed_va_claim", { required: "Required" })}
                className={`w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black ${
                  errors.has_filed_va_claim ? "border-red-500" : ""
                }`}
              >
                <option value="">Select</option>
                <option value="yes">YES</option>
                <option value="no">NO</option>
              </select>
            </div>

            {watch("has_filed_va_claim") === "yes" && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">
                  Please enter your VA File Number
                </h2>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="e.g. 123456789"
                  {...register("va_file_number", {
                    pattern: {
                      value: /^\d{8,10}$/,
                      message: "Must be 8–10 digits",
                    },
                  })}
                  className={`w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black ${
                    errors.va_file_number ? "border-red-500" : ""
                  }`}
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                  }}
                />
                {errors.va_file_number && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.va_file_number.message}
                  </p>
                )}
              </div>
            )}

            <h2 className="text-xl font-semibold mt-8">
              Do you have a decision letter within the past year?
            </h2>
            <select
              {...register("hasLetter")}
              onChange={(e) => {
                setStep(
                  e.target.value === "yes" ? "letterDetails" : "ratingsDetails"
                );
              }}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select</option>
              <option value="yes">YES</option>
              <option value="no">NO</option>
            </select>

            <button
              type="button"
              onClick={goBack}
              className="mt-6 bg-gray-300 text-black px-4 py-2 rounded"
            >
              Back
            </button>
          </>
        )}

        {step === "letterDetails" && (
          <>
            <h2 className="text-xl font-semibold">
              What is the date of that letter?
            </h2>
            <input
              type="date"
              {...register("letterDate", { required: "Required" })}
              className={`w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black ${
                errors.letterDate ? "border-red-500" : ""
              }`}
            />

            <h2 className="text-xl font-semibold mt-4">
              What are the conditions listed in this recent letter and what were
              they rated at?
            </h2>
            <textarea
              {...register("conditionsListed")}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
              rows="4"
            />

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={goBack}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-[#B31942] text-white px-6 py-2 rounded"
              >
                NEXT
              </button>
            </div>
          </>
        )}

        {step === "ratingsDetails" && (
          <>
            <h2 className="text-xl font-semibold">
              What are your current ratings and when were they rated?
            </h2>
            <textarea
              {...register("currentRatings")}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
              rows="4"
            />

            <h2 className="text-xl font-semibold mt-4">
              What is the date of the letter?
            </h2>
            <input
              type="date"
              {...register("ratingsLetterDate")}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
            />

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={goBack}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-[#B31942] text-white px-6 py-2 rounded"
              >
                NEXT
              </button>
            </div>
          </>
        )}

        {/* NO FLOW */}
        {step === "noFlowStart" && (
          <>
            <h2 className="text-xl font-semibold">
              Do you have an active intent to file?
            </h2>
            <select
              {...register("hasIntent")}
              onChange={(e) => {
                setStep(
                  e.target.value === "yes" ? "intentDetails" : "startNow"
                );
              }}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select</option>
              <option value="yes">YES</option>
              <option value="no">NO</option>
            </select>

            <button
              type="button"
              onClick={goBack}
              className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
            >
              Back
            </button>
          </>
        )}

        {step === "intentDetails" && (
          <>
            <h2 className="text-xl font-semibold">
              What date was your intent to file submitted?
            </h2>
            <input
              type="date"
              {...register("intentDate")}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
            />

            <h2 className="text-xl font-semibold mt-4">
              Did you submit anything else with your intent?
            </h2>
            <select
              {...register("submittedOthers")}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select</option>
              <option value="yes">YES</option>
              <option value="no">NO</option>
            </select>

            <h2 className="text-xl font-semibold mt-4">
              Please list any other items submitted:
            </h2>
            <textarea
              {...register("otherItemsListed")}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
              rows="4"
            />

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={goBack}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-[#B31942] text-white px-6 py-2 rounded"
              >
                NEXT
              </button>
            </div>
          </>
        )}

        {step === "startNow" && (
          <>
            <h2 className="text-xl font-semibold">
              Perfect! Let’s get started.
            </h2>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={goBack}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-[#B31942] text-white px-6 py-2 rounded"
              >
                NEXT
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default Auto_Narative;
