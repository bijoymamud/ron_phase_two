import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignaturePad from "signature_pad";

const ESignature = () => {
  const [signatureImage, setSignatureImage] = useState(null);
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      signature: null,
    },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    signaturePadRef.current = new SignaturePad(canvas, {
      backgroundColor: "rgb(255, 255, 255)",
    });

    const resizeCanvas = () => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
      signaturePadRef.current.clear();
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const storedSignature = localStorage.getItem("signatureImage");
    if (storedSignature) {
      setSignatureImage(storedSignature);
      signaturePadRef.current.fromDataURL(storedSignature);
      setValue("signature", storedSignature, { shouldValidate: true });
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [setValue]);

  // Clear the canvas
  const clearCanvas = () => {
    signaturePadRef.current.clear();
    setSignatureImage(null);
    setValue("signature", null, { shouldValidate: true });
    localStorage.removeItem("signatureImage");
  };

  // Save the signature
  const saveSignature = () => {
    if (signaturePadRef.current.isEmpty()) {
      setValue("signature", null, { shouldValidate: true });
      return;
    }
    const signature = signaturePadRef.current.toDataURL("image/png");
    setSignatureImage(signature);
    localStorage.setItem("signatureImage", signature);
    setValue("signature", signature, { shouldValidate: true });
  };

  // Form submission
  const onSubmit = (data) => {
    console.log("Form submitted with e-signature:", data);
    navigate("/submission");
  };

  return (
    <div className="flex flex-col bg-white dark:bg-white items-center justify-center min-h-screen py-10 px-4">
      <h2 className="md:text-3xl text-2xl pt-5 font-bold text-[#0A3161] mb-8 text-center mt-28 md:pt-0">
        SECURE & LEGALLY BINDING E-SIGNATURES <br /> SIGN YOUR VA FORMS WITH
        EASE
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white dark:bg-white shadow-lg rounded-lg p-6"
      >
        {/* Signature Canvas */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            DRAW YOUR SIGNATURE
          </label>
          <div className="border border-gray-300 rounded-md bg-white dark:bg-white">
            <canvas
              ref={canvasRef}
              className="w-full h-32 border border-gray-200 rounded-md"
            />
            {errors.signature && (
              <p className="text-red-500 text-sm mt-1">
                {errors.signature.message}
              </p>
            )}
            <input
              type="hidden"
              {...register("signature", {
                required: "Please provide a signature",
              })}
            />
          </div>
          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={clearCanvas}
              className="bg-gray-300 uppercase text-gray-700 font-semibold py-1 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={saveSignature}
              className="bg-[#0A3161] uppercase text-white font-semibold py-1 px-4 rounded-md hover:bg-[#142d4d] transition-colors"
            >
              Save
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="w-full border rounded-lg mb-6 flex items-center justify-center">
          {signatureImage ? (
            <img
              src={signatureImage}
              alt="Signature"
              className="max-w-full max-h-32 object-contain"
            />
          ) : (
            <p className="text-gray-500 text-lg italic">
              No signature provided
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#B31942] text-white w-full uppercase font-semibold py-2 px-6 rounded-md hover:bg-[#a01638] transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ESignature;

// import React, { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import SignaturePad from "signature_pad";

// const ESignature = () => {
//   const navigate = useNavigate();

//   const [applicantSignature, setApplicantSignature] = useState(null);
//   const [witnessSignature, setWitnessSignature] = useState(null);

//   const applicantCanvasRef = useRef(null);
//   const witnessCanvasRef = useRef(null);
//   const applicantPadRef = useRef(null);
//   const witnessPadRef = useRef(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const watchedApplicantSig = watch("applicantSignature");

//   // Safe canvas initializer
//   const initializeSignaturePad = (canvasRef, padRef) => {
//     if (!canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Set proper dimensions
//     const resizeCanvas = () => {
//       const ratio = Math.max(window.devicePixelRatio || 1, 1);
//       canvas.width = canvas.offsetWidth * ratio;
//       canvas.height = canvas.offsetHeight * ratio;
//       ctx.scale(ratio, ratio);
//       padRef.current?.clear(); // clear previous drawing
//     };

//     padRef.current = new SignaturePad(canvas, {
//       backgroundColor: "rgb(255, 255, 255)",
//       penColor: "black",
//     });

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       padRef.current?.off?.();
//     };
//   };

//   useEffect(() => {
//     // Only run in browser
//     if (typeof window === "undefined") return;

//     // Initialize applicant pad
//     const cleanupApplicant = initializeSignaturePad(
//       applicantCanvasRef,
//       applicantPadRef
//     );

//     // Initialize witness pad only if applicant has signed
//     let cleanupWitness = null;
//     if (watchedApplicantSig) {
//       setTimeout(() => {
//         cleanupWitness = initializeSignaturePad(
//           witnessCanvasRef,
//           witnessPadRef
//         );
//       }, 100); // tiny delay ensures DOM is ready
//     }

//     // Load from localStorage
//     const savedApplicant = localStorage.getItem("applicantSignature");
//     const savedWitness = localStorage.getItem("witnessSignature");

//     if (savedApplicant) {
//       setApplicantSignature(savedApplicant);
//       setValue("applicantSignature", savedApplicant, { shouldValidate: true });
//       setTimeout(() => {
//         if (applicantPadRef.current) {
//           applicantPadRef.current.fromDataURL(savedApplicant);
//         }
//       }, 100);
//     }

//     if (savedWitness) {
//       setWitnessSignature(savedWitness);
//       setValue("witnessSignature", savedWitness, { shouldValidate: true });
//       setTimeout(() => {
//         if (witnessPadRef.current) {
//           witnessPadRef.current.fromDataURL(savedWitness);
//         }
//       }, 100);
//     }

//     return () => {
//       cleanupApplicant?.();
//       cleanupWitness?.();
//     };
//   }, [setValue, watchedApplicantSig]);

//   const saveApplicant = () => {
//     if (!applicantPadRef.current || applicantPadRef.current.isEmpty()) return;
//     const dataUrl = applicantPadRef.current.toDataURL();
//     setApplicantSignature(dataUrl);
//     localStorage.setItem("applicantSignature", dataUrl);
//     setValue("applicantSignature", dataUrl, { shouldValidate: true });
//   };

//   const saveWitness = () => {
//     if (!witnessPadRef.current || witnessPadRef.current.isEmpty()) return;
//     const dataUrl = witnessPadRef.current.toDataURL();
//     setWitnessSignature(dataUrl);
//     localStorage.setItem("witnessSignature", dataUrl);
//     setValue("witnessSignature", dataUrl, { shouldValidate: true });
//   };

//   const clearApplicant = () => {
//     applicantPadRef.current?.clear();
//     setApplicantSignature(null);
//     setValue("applicantSignature", null, { shouldValidate: true });
//     localStorage.removeItem("applicantSignature");
//   };

//   const clearWitness = () => {
//     witnessPadRef.current?.clear();
//     setWitnessSignature(null);
//     setValue("witnessSignature", null, { shouldValidate: true });
//     localStorage.removeItem("witnessSignature");
//   };

//   const onSubmit = (data) => {
//     console.log("Submitted:", {
//       applicant: data.applicantSignature,
//       witness: data.witnessSignature,
//     });
//     navigate("/submission");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
//       <h2 className="text-2xl md:text-4xl font-bold text-[#0A3161] text-center mb-8">
//         E-SIGNATURE WITH WITNESS
//       </h2>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8"
//       >
//         {/* APPLICANT SIGNATURE */}
//         <div className="mb-10">
//           <h3 className="text-xl font-bold text-[#0A3161] mb-4">
//             1. Applicant's Signature
//           </h3>
//           <label className="block font-semibold mb-2">
//             Draw your signature:
//           </label>
//           <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
//             <canvas ref={applicantCanvasRef} className="w-full h-48 bg-white" />
//           </div>
//           {errors.applicantSignature && (
//             <p className="text-red-600 text-sm mt-2">
//               {errors.applicantSignature.message}
//             </p>
//           )}
//           <div className="flex gap-4 mt-4">
//             <button
//               type="button"
//               onClick={clearApplicant}
//               className="px-6 py-2 bg-gray-300 rounded-lg"
//             >
//               Clear
//             </button>
//             <button
//               type="button"
//               onClick={saveApplicant}
//               className="px-6 py-2 bg-[#0A3161] text-white rounded-lg"
//             >
//               Save Signature
//             </button>
//           </div>
//           <input
//             type="hidden"
//             {...register("applicantSignature", {
//               required: "Signature required",
//             })}
//           />
//         </div>

//         {/* WITNESS SIGNATURE - Only shows after applicant signs */}
//         {watchedApplicantSig && (
//           <div className="mb-10 pt-8 border-t-2 border-red-200 rounded-lg p-6 bg-red-50">
//             <h3 className="text-xl font-bold text-[#B31942] mb-4">
//               2. Witness Signature
//             </h3>
//             <label className="block font-semibold mb-2 text-red-800">
//               Witness: Please sign below
//             </label>
//             <div className="border-2 border-red-300 rounded-lg overflow-hidden">
//               <canvas ref={witnessCanvasRef} className="w-full h-48 bg-white" />
//             </div>
//             {errors.witnessSignature && (
//               <p className="text-red-600 text-sm mt-2">
//                 {errors.witnessSignature.message}
//               </p>
//             )}
//             <div className="flex gap-4 mt-4">
//               <button
//                 type="button"
//                 onClick={clearWitness}
//                 className="px-6 py-2 bg-gray-300 rounded-lg"
//               >
//                 Clear
//               </button>
//               <button
//                 type="button"
//                 onClick={saveWitness}
//                 className="px-6 py-2 bg-[#B31942] text-white rounded-lg"
//               >
//                 Save Witness Signature
//               </button>
//             </div>
//             <input
//               type="hidden"
//               {...register("witnessSignature", {
//                 required: "Witness signature required",
//               })}
//             />
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={!applicantSignature || !witnessSignature}
//           className={`w-full py-4 text-white font-bold rounded-lg mt-8 transition ${
//             applicantSignature && witnessSignature
//               ? "bg-green-600 hover:bg-green-700"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           SUBMIT FINAL APPLICATION
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ESignature;

// import React, { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import SignaturePad from "signature_pad";

// const ESignature = () => {
//   const navigate = useNavigate();

//   const [applicantSignature, setApplicantSignature] = useState(null);
//   const [witnessSignature, setWitnessSignature] = useState(null);

//   const applicantCanvasRef = useRef(null);
//   const witnessCanvasRef = useRef(null);
//   const applicantPadRef = useRef(null);
//   const witnessPadRef = useRef(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const watchedApplicantSig = watch("applicantSignature");

//   // Safe canvas initializer
//   const initializeSignaturePad = (canvasRef, padRef) => {
//     if (!canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Set proper dimensions
//     const resizeCanvas = () => {
//       const ratio = Math.max(window.devicePixelRatio || 1, 1);
//       canvas.width = canvas.offsetWidth * ratio;
//       canvas.height = canvas.offsetHeight * ratio;
//       ctx.scale(ratio, ratio);
//       padRef.current?.clear(); // clear previous drawing
//     };

//     padRef.current = new SignaturePad(canvas, {
//       backgroundColor: "rgb(255, 255, 255)",
//       penColor: "black",
//     });

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       padRef.current?.off?.();
//     };
//   };

//   useEffect(() => {
//     // Only run in browser
//     if (typeof window === "undefined") return;

//     // Initialize applicant pad
//     const cleanupApplicant = initializeSignaturePad(
//       applicantCanvasRef,
//       applicantPadRef
//     );

//     // Initialize witness pad only if applicant has signed
//     let cleanupWitness = null;
//     if (watchedApplicantSig) {
//       setTimeout(() => {
//         cleanupWitness = initializeSignaturePad(
//           witnessCanvasRef,
//           witnessPadRef
//         );
//       }, 100); // tiny delay ensures DOM is ready
//     }

//     // Load from localStorage
//     const savedApplicant = localStorage.getItem("applicantSignature");
//     const savedWitness = localStorage.getItem("witnessSignature");

//     if (savedApplicant) {
//       setApplicantSignature(savedApplicant);
//       setValue("applicantSignature", savedApplicant, { shouldValidate: true });
//       setTimeout(() => {
//         if (applicantPadRef.current) {
//           applicantPadRef.current.fromDataURL(savedApplicant);
//         }
//       }, 100);
//     }

//     if (savedWitness) {
//       setWitnessSignature(savedWitness);
//       setValue("witnessSignature", savedWitness, { shouldValidate: true });
//       setTimeout(() => {
//         if (witnessPadRef.current) {
//           witnessPadRef.current.fromDataURL(savedWitness);
//         }
//       }, 100);
//     }

//     return () => {
//       cleanupApplicant?.();
//       cleanupWitness?.();
//     };
//   }, [setValue, watchedApplicantSig]);

//   const saveApplicant = () => {
//     if (!applicantPadRef.current || applicantPadRef.current.isEmpty()) return;
//     const dataUrl = applicantPadRef.current.toDataURL();
//     setApplicantSignature(dataUrl);
//     localStorage.setItem("applicantSignature", dataUrl);
//     setValue("applicantSignature", dataUrl, { shouldValidate: true });
//   };

//   const saveWitness = () => {
//     if (!witnessPadRef.current || witnessPadRef.current.isEmpty()) return;
//     const dataUrl = witnessPadRef.current.toDataURL();
//     setWitnessSignature(dataUrl);
//     localStorage.setItem("witnessSignature", dataUrl);
//     setValue("witnessSignature", dataUrl, { shouldValidate: true });
//   };

//   const clearApplicant = () => {
//     applicantPadRef.current?.clear();
//     setApplicantSignature(null);
//     setValue("applicantSignature", null, { shouldValidate: true });
//     localStorage.removeItem("applicantSignature");
//   };

//   const clearWitness = () => {
//     witnessPadRef.current?.clear();
//     setWitnessSignature(null);
//     setValue("witnessSignature", null, { shouldValidate: true });
//     localStorage.removeItem("witnessSignature");
//   };

//   const onSubmit = (data) => {
//     console.log("Submitted:", {
//       applicant: data.applicantSignature,
//       witness: data.witnessSignature,
//     });
//     navigate("/submission");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
//       <h2 className="text-2xl md:text-4xl font-bold text-[#0A3161] text-center mb-8">
//         E-SIGNATURE WITH WITNESS
//       </h2>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8"
//       >
//         {/* APPLICANT SIGNATURE */}
//         <div className="mb-10">
//           <h3 className="text-xl font-bold text-[#0A3161] mb-4">
//             Applicant's Signature
//           </h3>
//           <label className="block font-semibold mb-2 dark:text-gray-900">
//             Draw your signature:
//           </label>
//           <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
//             <canvas ref={applicantCanvasRef} className="w-full h-48 bg-white" />
//           </div>
//           {errors.applicantSignature && (
//             <p className="text-red-600 text-sm mt-2">
//               {errors.applicantSignature.message}
//             </p>
//           )}
//           <div className="flex gap-4 mt-4">
//             <button
//               type="button"
//               onClick={clearApplicant}
//               className="px-6 py-2 bg-gray-300 rounded-lg"
//             >
//               Clear
//             </button>
//             <button
//               type="button"
//               onClick={saveApplicant}
//               className="px-6 py-2 bg-[#0A3161] text-white rounded-lg"
//             >
//               Save Signature
//             </button>
//           </div>
//           <input
//             type="hidden"
//             {...register("applicantSignature", {
//               required: "Signature required",
//             })}
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={!applicantSignature}
//           className={`w-full py-4 text-white font-bold rounded-lg mt-8 transition ${
//             applicantSignature
//               ? "bg-[#0A3161] hover:bg-green-700"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           SUBMIT
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ESignature;
