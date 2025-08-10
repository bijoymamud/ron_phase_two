

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

  // Initialize SignaturePad and load from localStorage
  useEffect(() => {
    const canvas = canvasRef.current;
    signaturePadRef.current = new SignaturePad(canvas, {
      backgroundColor: "rgb(255, 255, 255)",
    });

    // Resize canvas for better resolution
    const resizeCanvas = () => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
      signaturePadRef.current.clear(); // Clear to avoid artifacts
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Load stored signature
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
    <div className="flex flex-col items-center justify-center md:min-h-screen min-h-[85vh] py-10 md:py-0 p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-[#0A3161] mb-6 text-center">
        SECURE & LEGALLY BINDING E-SIGNATURES <br /> SIGN YOUR VA FORMS WITH EASE
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        {/* Signature Canvas */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            DRAW YOUR SIGNATURE
          </label>
          <div className="border-2 border-gray-300 rounded-md p-2 bg-white">
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
        <div className="w-full bg-gray-200 rounded-lg p-6 mb-6 flex items-center justify-center">
          {signatureImage ? (
            <img
              src={signatureImage}
              alt="Signature"
              className="max-w-full max-h-32 object-contain"
            />
          ) : (
            <p className="text-gray-500 text-lg italic">No signature provided</p>
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