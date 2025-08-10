

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../redux/features/baseApi";
import { toast } from "react-toastify";

const Forgot_Password = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [emailSent, setEmailSent] = useState(false);
  const [forgetPassword] = useForgetPasswordMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Sending Reset Email to:", data.email);
    localStorage.setItem("email", data.email); // Store email in localStorage

    setEmailSent(true); // Set loading state
    try {
      const response = await forgetPassword({ email: data.email }).unwrap(); // Send email to API
      console.log("forgetpass", response);
      toast.success("Verification code sent to your email!"); 
      setTimeout(() => navigate("/verify"), 1500); 
    } catch (error) {
      console.error("error", error);
      toast.error("Failed to send verification code. Please try again."); 
      setEmailSent(false); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B2A52] text-white p-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-start">Forget Password?</h2>
        <p className="text-sm mb-6 text-gray-300">
          Kindly enter your email, and we’ll send a verification code.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block font-medium">Your Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-3 dark:text-black dark:bg-white rounded-md text-black mt-1 border text-sm"
            placeholder="user@email.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <button
            type="submit"
            disabled={emailSent}
            className={`w-full bg-[#B31942] py-2 mt-4 uppercase rounded-md text-white font-semibold hover:opacity-90 ${
              emailSent ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {emailSent ? <span className="loading loading-bars loading-sm"></span> : "Send"}
          </button>
        </form>
        <p className="mt-4 text-base text-end text-gray-300">
          Remember Password?{" "}
          <Link to="/login" className="text-[#B31942] font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Forgot_Password;