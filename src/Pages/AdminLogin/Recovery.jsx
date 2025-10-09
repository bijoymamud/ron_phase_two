import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useForgetPasswordMutation } from "../../redux/features/baseApi";
import { useNavigate } from "react-router-dom";

const Recovery = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    console.log(data);
    localStorage.setItem("email", data.email);

    try {
      await forgetPassword({ email: data.email }).unwrap();
      setSuccessMessage(
        "Password recovery email sent! Please check your inbox."
      );
      setTimeout(() => {
        setIsSubmitting(false);
        navigate("/verify_otp");
      }, 1000);
    } catch (error) {
      console.log("error", error);
      setIsSubmitting(false);
      setErrorMessage("Failed to send recovery email. Please try again.");
    }
  };

  return (
    <section className="min-h-screen">
      <div className="flex items-center">
        <div className="basis-6/12 bg-[#0A3161] h-screen flex flex-col items-center justify-center">
          <img
            src="https://i.ibb.co.com/RZzJHnG/Group-2147225243.png"
            alt="logo"
          />
        </div>

        <div className="basis-8/12 h-screen dark:bg-white flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-[#0A3161] md:p-8 rounded-lg w-full md:max-w-lg"
          >
            <h2 className="md:text-4xl text-3xl font-bold mb-10 text-start">
              Recover Password
            </h2>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 bg-white dark:bg-white rounded-lg mt-2"
                placeholder="Enter Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-[#B31942] text-white rounded-lg uppercase font-semibold hover:bg-[#af2a4d] transition flex items-center justify-center"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? (
                <span className="loading loading-bars loading-md"></span>
              ) : (
                "Send"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Recovery;
