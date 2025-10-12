import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  useOtpVerificationMutation,
  useResetPasswordMutation,
} from "../../redux/features/baseApi";
import { Toaster, toast } from "sonner";

const OTPVerification = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: "",
    },
  });

  const [otpVerify, setOTPVerify] = useState(false);
  const [email, setEmail] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [otpVerification] = useOtpVerificationMutation();
  const [resetPassword] = useResetPasswordMutation();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      console.warn("No email found in localStorage");
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    setValue(`otp${index + 1}`, value.slice(-1), { shouldValidate: true });

    if (index < 5 && value) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!e.target.value && index > 0) {
        inputRefs.current[index - 1].focus();
      }
      setValue(`otp${index + 1}`, "", { shouldValidate: true });
    }
  };

  const onSubmit = async (data) => {
    const otp = Object.values(data).join("");
    localStorage.setItem("otp", otp);

    if (otp.length === 6) {
      const email = localStorage.getItem("email");

      try {
        setOTPVerify(true);
        const response = await otpVerification({ email, otp }).unwrap();
        console.log("OTP verified:", response);
        toast.success("OTP verified successfully!");
        reset();
        setTimeout(() => navigate("/reset_password"), 1000);
      } catch (error) {
        console.error("OTP verification failed", error);
        toast.error("Invalid OTP. Please try again.");
        setOTPVerify(false);
        reset();
      }
    }
  };

  const handleResend = async () => {
    const email = localStorage.getItem("email");

    try {
      const response = await resetPassword({ email }).unwrap();
      console.log("Resend response:", response);
      toast.success("Verification code resent successfully.");
    } catch (error) {
      console.error("Resend error:", error);
      toast.error("Failed to resend code. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B2A52] text-white">
      <div className="max-w-md w-full p-4 md:px-0">
        <h2 className="md:text-3xl text-2xl font-bold mb-2 text-start">
          Account Verification
        </h2>
        <p className="text-sm text-gray-300 mb-10 text-start">
          Enter the code sent to{" "}
          <span className="font-semibold text-white">
            {email || "user@example.com"}
          </span>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex md:gap-4 gap-2 justify-between mb-6"
        >
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              {...register(`otp${index + 1}`, {
                required: "Digit required",
                pattern: {
                  value: /^[0-9]$/,
                  message: "Must be a number",
                },
              })}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`md:w-14 md:h-14 w-12 h-12 text-2xl text-center bg-white text-black rounded-md border ${
                errors[`otp${index + 1}`] ? "border-red-500" : "border-gray-300"
              } focus:border-[#B31942] outline-none`}
            />
          ))}
        </form>

        {/* Display errors if any */}
        {Object.keys(errors).length > 0 && (
          <p className="text-red-500 text-sm mb-4">
            {errors.otp1?.message || "Please enter a valid 6-digit OTP"}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-[#B31942] py-2 rounded-md text-white uppercase font-semibold hover:opacity-90"
          disabled={otpVerify}
          onClick={handleSubmit(onSubmit)}
        >
          {otpVerify ? (
            <span className="loading loading-bars loading-sm"></span>
          ) : (
            "Verify OTP"
          )}
        </button>

        <p className="mt-4 text-gray-300 text-end">
          Didn’t receive code?{" "}
          <button
            onClick={() => handleResend()}
            className="text-[#B31942] font-semibold hover:underline cursor-pointer"
          >
            Resend
          </button>
        </p>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default OTPVerification;
