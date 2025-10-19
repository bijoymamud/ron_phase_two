import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../redux/features/baseApi";
import { Toaster, toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [createUser, { isLoading, isError, error, isSuccess }] =
    useCreateUserMutation();
  const navigate = useNavigate();
  const baseUrl = localStorage.getItem("baseUrl");
  console.log(baseUrl);

  const password = watch("password");

  const onSubmit = async (data) => {
    const toastId = toast.loading("Signing Up...");

    const { name, email, password } = data;
    const userData = { name, email, password, role: "user" };

    localStorage.setItem("email", userData?.email);

    try {
      const response = await createUser(userData).unwrap();
      console.log("response", response);
      toast.success("Sign Up Successfull!", { id: toastId, duration: 3000 });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(`Something went worng! ${err}`, {
        id: toastId,
        duration: 2000,
      });
      console.error("Error creating user:", err);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0A3161] text-white p-4">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:p-8 rounded-lg md:shadow-lg w-full md:max-w-lg"
      >
        <h2 className="md:text-4xl text-3xl font-bold text-center mb-4">
          Create Account
        </h2>
        <p className="text-center text-gray-200 md:mb-16 mb-8 md:text-base">
          Please enter information and click the button.
        </p>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full dark:bg-white bg-white p-3 border border-gray-300 rounded-lg mt-2 text-sm text-gray-800 "
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 dark:bg-white bg-white border border-gray-300 rounded-lg mt-2 text-sm text-gray-800 "
            placeholder="Enter Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-3 dark:bg-white flex items-center bg-white border border-gray-300 rounded-lg mt-2 text-sm text-gray-800 "
              placeholder="Enter New Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[53%] -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block font-semibold">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="w-full p-3 dark:bg-white flex items-center bg-white  border border-gray-300 rounded-lg mt-2 text-sm text-gray-800 "
              placeholder="Confirm New Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-[53%] -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaEye size={18} />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-[#B31942] uppercase text-white  rounded-lg font-semibold hover:bg-[#af2a4d] transition flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-bars loading-md"></span>
          ) : (
            "Sign Up"
          )}
        </button>

        <div className="mt-4 text-center">
          <p className="text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-[#B31942] font-semibold">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
