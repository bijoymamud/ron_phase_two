import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/features/baseApi";

const PasswordRecovery = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    console.log(data);

    const otp = localStorage.getItem("otp");
    const email = localStorage.getItem("email");
    const payload = {
      new_password: data.password,
      otp,
      email,
    };

    try {
      await resetPassword(payload).unwrap();
      setSuccessMessage("Password reset successfully!");
      setTimeout(() => {
        setIsSubmitting(false);
        navigate("/admin_login");
      }, 1000);
    } catch (error) {
      console.log("error", error);
      setIsSubmitting(false);
      setErrorMessage("Failed to reset password. Please try again.");
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

        <div className="basis-8/12 bg-white dark:bg-white h-screen flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-[#0A3161] md:p-8 rounded-lg w-full md:max-w-lg"
          >
            <h2 className="md:text-4xl text-3xl font-bold mb-10 text-start">
              Set New Password
            </h2>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border bg-white dark:bg-white border-gray-300 rounded-lg mt-2"
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirm_password"
                className="block text-sm font-semibold"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                className="w-full p-3 border bg-white dark:bg-white border-gray-300 rounded-lg mt-2"
                placeholder="Re-type Password"
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-xs">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-[#B31942] text-white rounded-lg font-semibold hover:bg-[#af2a4d] transition flex items-center justify-center"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? (
                <span className="loading loading-bars loading-md"></span>
              ) : (
                "Reset"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PasswordRecovery;
