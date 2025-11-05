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
