import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../redux/features/baseApi";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const ResetPassword = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [changePassword] = useChangePasswordMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for New Password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for Confirm Password

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const otp = localStorage.getItem("otp");
      const email = localStorage.getItem("email");
      
      const payload = {
        new_password: data.password,
        otp,
        email
      };
      const response = await changePassword(payload).unwrap();
      console.log("Reset Password Response:", response);
      navigate("/success"); 
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrorMessage(error?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B2A52] text-white">
      <div className="w-full max-w-md p-4">
        <h2 className="md:text-3xl text-2xl font-bold">Create New Password</h2>
        <p className="text-sm text-gray-300 mb-6">
          Your new password must be unique from those previously used.
        </p>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block font-medium">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              className={`w-full px-4 py-3 dark:bg-white dark:text-black rounded-md text-sm text-black mt-1 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } pr-10`} // Added padding-right
              placeholder="Enter New Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <label className="block font-medium mt-4">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className={`w-full px-4 py-3 rounded-md dark:bg-white dark:text-black text-black mt-1 border text-sm ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } pr-10`} // Added padding-right
              placeholder="Confirm New Password"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#B31942] py-2 uppercase mt-4 rounded-md text-white font-semibold hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? <span className="loading loading-bars loading-md"></span> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;