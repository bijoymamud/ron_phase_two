// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// const EvidenceForm = () => {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       hasEvidence: "",
//       evidenceType: "",
//       file: null,
//     },
//   });

//   const hasEvidence = watch("hasEvidence");

//   // Convert uploaded file to Base64
//   const toBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });

//   const onSubmit = async (data) => {
//     let fileBase64 = null;
//     const file = data.file?.[0];

//     if (file) {
//       fileBase64 = await toBase64(file);
//     }

//     const storedData = {
//       hasEvidence: data.hasEvidence,
//       evidenceType: data.evidenceType,
//       file: fileBase64,
//       fileName: file?.name,
//     };

//     localStorage.setItem("evidenceData", JSON.stringify(storedData));
//     console.log("Saved to localStorage:", storedData);

//     // Navigate to next page
//     navigate("/progress_message");
//   };

//   return (
//     <div className="flex flex-col items-center dark:white justify-center md:min-h-screen min-h-[85vh] p-4 max-w-4xl mx-auto">
//       <form onSubmit={handleSubmit(onSubmit)} className="w-full">
//         {/* Has Evidence Select */}
//         <div className="mb-6">
//           <label className="block text-gray-700 font-semibold mb-2">
//             DO YOU HAVE ANY SUPPORTING EVIDENCE TO UPLOAD?
//           </label>
//           <select
//             {...register("hasEvidence", {
//               required: "Please select an option",
//             })}
//             className={`mt-1 block w-full p-2 border uppercase border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 ${
//               errors.hasEvidence ? "border-red-500" : ""
//             }`}
//           >
//             <option value="" disabled>
//               Select an option
//             </option>
//             <option value="yes">YES</option>
//             <option value="no">NO</option>
//           </select>
//           {errors.hasEvidence && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.hasEvidence.message}
//             </p>
//           )}
//         </div>

//         {/* File Upload Section */}
//         {hasEvidence === "yes" && (
//           <div className="mb-6">
//             <label className="block text-gray-700 font-semibold mb-2">
//               UPLOAD FILE
//             </label>
//             <div className="border-2 border-dashed border-gray-300 rounded-md p-2 text-center bg-white">
//               <p className="text-gray-500 mb-2">
//                 {watch("file")?.[0]?.name || "CLICK TO UPLOAD OR DRAG & DROP"}
//               </p>
//               <input
//                 type="file"
//                 {...register("file", {
//                   required:
//                     hasEvidence === "YES" ? "Please upload a file" : false,
//                 })}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
//                 id="file-upload"
//               />
//               {errors.file && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.file.message}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Evidence Type Select */}
//         <div className="mb-6">
//           <label className="block text-gray-700 font-semibold mb-2">
//             WHAT TYPE OF EVIDENCE ARE YOU SUBMITTING?
//           </label>
//           <select
//             {...register("evidenceType", {
//               required: "This field is required",
//             })}
//             className={`mt-1 block w-full p-2 border uppercase border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 ${
//               errors.evidenceType ? "border-red-500" : ""
//             }`}
//           >
//             <option value="" disabled>
//               Select an option
//             </option>
//             <option value="buddy">
//               Buddy Statements (Statements from friends or family verifying
//               stressors and conditions)
//             </option>
//             <option value="police">
//               Police/Incident Reports (Including victim reports)
//             </option>
//             <option value="news">News Articles</option>
//             <option value="medical">Medical Records</option>
//           </select>
//           {errors.evidenceType && (
//             <span className="text-red-500 text-sm mt-1">
//               {errors.evidenceType.message}
//             </span>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col justify-center gap-5 mx-auto">
//           <button
//             type="submit"
//             className="btn bg-[#B31942] uppercase border-gray-400 py-2 text-white text-center font-semibold rounded-md"
//           >
//             Continue
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="btn text-[#001F3F] uppercase font-semibold border border-[#001F3F] py-2 rounded-md"
//           >
//             Back
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EvidenceForm;

// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// const EvidenceForm = () => {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       hasEvidence: "",
//       evidenceType: "",
//       file: null,
//     },
//   });

//   const hasEvidence = watch("hasEvidence");

//   // Convert uploaded file to Base64
//   const toBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });

//   const onSubmit = async (data) => {
//     let fileBase64 = null;
//     const file = data.file?.[0];

//     if (file) {
//       fileBase64 = await toBase64(file);
//     }

//     const storedData = {
//       hasEvidence: data.hasEvidence,
//       evidenceType: data.evidenceType,
//       file: fileBase64,
//       fileName: file?.name,
//     };

//     localStorage.setItem("evidenceData", JSON.stringify(storedData));
//     console.log("Saved to localStorage:", storedData);

//     // Navigate to next page
//     navigate("/progress_message");
//   };

//   return (
//     <section className=" mx-auto bg-white dark:bg-white mt-24 md:pt-0">
//       <div className="flex flex-col items-center justify-center md:min-h-screen min-h-[85vh] p-4">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="w-full bg-white dark:bg-white p-6 rounded-md shadow-md md:max-w-4xl"
//         >
//           {/* Has Evidence Select */}
//           <div className="mb-6 ">
//             <label className="block text-black dark:text-black font-semibold mb-2">
//               DO YOU HAVE ANY SUPPORTING EVIDENCE TO UPLOAD?
//             </label>
//             <select
//               {...register("hasEvidence", {
//                 required: "Please select an option",
//               })}
//               className={`mt-1 block w-full p-2 border uppercase dark:bg-white dark:text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700  ${
//                 errors.hasEvidence ? "border-red-500" : ""
//               }`}
//             >
//               <option value="" disabled>
//                 Select an option
//               </option>
//               <option value="yes">YES</option>
//               <option value="no">NO</option>
//             </select>
//             {errors.hasEvidence && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.hasEvidence.message}
//               </p>
//             )}
//           </div>

//           {/* File Upload Section */}
//           {hasEvidence === "yes" && (
//             <div className="mb-6">
//               <label className="block  font-semibold text-black dark:text-black mb-2">
//                 UPLOAD FILE
//               </label>
//               <div className="border-2 border-dashed border-gray-300 rounded-md p-2 text-center bg-white dark:bg-white">
//                 <p className="text-black dark:text-black mb-2">
//                   {watch("file")?.[0]?.name || "CLICK TO UPLOAD OR DRAG & DROP"}
//                 </p>
//                 <input
//                   type="file"
//                   {...register("file", {
//                     required:
//                       hasEvidence === "yes" ? "Please upload a file" : false,
//                   })}
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 dark:text-white file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
//                   id="file-upload"
//                 />
//                 {errors.file && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.file.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Evidence Type Select */}
//           <div className="mb-6">
//             <label className="block text-black dark:text-black font-semibold mb-2">
//               WHAT TYPE OF EVIDENCE ARE YOU SUBMITTING?
//             </label>
//             <select
//               {...register("evidenceType", {
//                 required: "This field is required",
//               })}
//               className={`mt-1 block w-full p-2 bg-white dark:bg-white border uppercase border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black dark:text-black ${
//                 errors.evidenceType ? "border-red-500" : ""
//               }`}
//             >
//               <option value="" disabled>
//                 Select an option
//               </option>
//               <option value="buddy">
//                 Buddy Statements (Statements from friends or family verifying
//                 stressors and conditions)
//               </option>
//               <option value="police">
//                 Police/Incident Reports (Including victim reports)
//               </option>
//               <option value="news">News Articles</option>
//               <option value="medical">Medical Records</option>
//             </select>
//             {errors.evidenceType && (
//               <span className="text-red-500 text-sm mt-1">
//                 {errors.evidenceType.message}
//               </span>
//             )}
//           </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex flex-col justify-center gap-5 mx-auto">
//             <button
//               type="submit"
//               className="btn bg-[#B31942] uppercase border-gray-400 py-2 text-white text-center font-semibold rounded-md"
//             >
//               Continue
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="btn dark:bg-[#0B2A52] bg-[#0B2A52] text-white dark:text-white uppercase font-semibold border border-[#001F3F] py-2 rounded-md"
//             >
//               Back
//             </button>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default EvidenceForm;

// EvidenceForm.jsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EvidenceForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hasEvidence: "",
      evidenceType: "",
      file: null,
    },
  });

  const hasEvidence = watch("hasEvidence");

  // Re-validate file field when "hasEvidence" changes
  useEffect(() => {
    if (hasEvidence === "yes") {
      trigger("file");
    }
  }, [hasEvidence, trigger]);

  // Convert file to Base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data) => {
    let fileBase64 = null;
    const file = data.file?.[0];

    if (file) {
      try {
        fileBase64 = await toBase64(file);
      } catch (error) {
        console.error("Error converting file to Base64:", error);
        return;
      }
    }

    const storedData = {
      hasEvidence: data.hasEvidence,
      evidenceType: data.evidenceType,
      file: fileBase64,
      fileName: file?.name,
    };

    localStorage.setItem("evidenceData", JSON.stringify(storedData));
    console.log("Saved to localStorage:", storedData);

    navigate("/progress_message");
  };

  return (
    <section className="mx-auto bg-white dark:bg-white mt-24 md:pt-0">
      <div className="flex flex-col items-center justify-center md:min-h-screen min-h-[85vh] p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-4xl bg-white dark:bg-white p-6 rounded-md shadow-md"
        >
          {/* Has Evidence */}
          <div className="mb-6">
            <label className="block text-black  font-semibold mb-2">
              DO YOU HAVE ANY SUPPORTING EVIDENCE TO UPLOAD?
            </label>

            <select
              {...register("hasEvidence", {
                required: "Please select an option",
              })}
              className={`mt-1 block w-full p-2 border uppercase border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700  bg-white dark:text-gray-900 ${
                errors.hasEvidence ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">YES</option>
              <option value="no">NO</option>
            </select>

            {errors.hasEvidence && (
              <p className="text-red-500 text-sm mt-1">
                {errors.hasEvidence.message}
              </p>
            )}
          </div>

          {/* File Upload + Evidence Type (Only if YES) */}
          {hasEvidence === "yes" && (
            <>
              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-black  font-semibold mb-2">
                  UPLOAD FILE
                </label>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-4 text-center bg-white ">
                  <p className="text-gray-600 ">
                    {watch("file")?.[0]?.name ||
                      "CLICK TO UPLOAD OR DRAG & DROP"}
                  </p>

                  <input
                    type="file"
                    {...register("file", {
                      required:
                        hasEvidence === "yes" ? "Please upload a file" : false,
                    })}
                    className="block w-full text-sm text-gray-700  file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 dark:file:bg-gray-600 file:text-gray-800 dark:file:text-gray-200 hover:file:bg-gray-200 dark:hover:file:bg-gray-500"
                  />
                  {errors.file && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.file.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Evidence Type */}
              <div className="mb-6">
                <label className="block text-black dark:text-white font-semibold mb-2">
                  WHAT TYPE OF EVIDENCE ARE YOU SUBMITTING?
                </label>

                <select
                  {...register("evidenceType", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full p-2 border uppercase border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700  bg-white  ${
                    errors.evidenceType ? "border-red-500" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="buddy">
                    Buddy Statements (Statements from friends or family
                    verifying stressors and conditions)
                  </option>
                  <option value="police">
                    Police/Incident Reports (Including victim reports)
                  </option>
                  <option value="news">News Articles</option>
                  <option value="medical">Medical Records</option>
                </select>

                {errors.evidenceType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.evidenceType.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-8">
            <button
              type="submit"
              className="w-full py-2.5 text-white font-semibold uppercase rounded-md bg-[#B31942] hover:bg-[#9d1438] transition"
            >
              Continue
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full py-2.5 text-white font-semibold uppercase rounded-md bg-[#0B2A52] hover:bg-[#071d38] transition"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EvidenceForm;
