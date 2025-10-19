import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  useGetLoggedUserQuery,
  useUpdateUserProfileMutation,
} from "../../redux/features/baseApi";
import { toast, Toaster } from "sonner";

const Profile = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("changePassword");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const baseURL = "http://10.10.13.73:2000";
  const {
    data: loggedUser,
    isLoading: isUserLoading,
    error,
    refetch,
  } = useGetLoggedUserQuery();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const newPassword = watch("new_password");

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading user data: {error.message}
      </div>
    );
  }

  const onPasswordSubmit = async (data) => {
    try {
      setIsLoading(true);
      const payload = {
        current_password: data.current_password,
        new_password: data.new_password,
      };

      const response = await fetch(`${baseURL}/api/auth/password-change/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change password");
      }

      toast.success("Password changed successfully!");
    } catch (error) {
      console.error("Failed to change password:", error);
      toast.error(
        `Failed to change password: ${error.message || "An error occurred"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onProfileSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      const id = loggedUser?.id;

      await updateProfile({ data: formData, id }).unwrap();
      await refetch();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(
        `Failed to update profile: ${error.message || "An error occurred"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center  min-h-[70vh] dark:text-gray-100 p-4">
      <Toaster />
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl shadow-lg">
        {/* Profile Section */}
        <div className="flex items-start justify-start mb-6">
          <div className="relative">
            <img
              src={
                loggedUser?.image
                  ? `${baseURL}${loggedUser.image}`
                  : "https://via.placeholder.com/128"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-gray-900 object-cover"
            />
            <label className="absolute bottom-1 right-2 border border-[#0A3161] bg-gray-900 hover:bg-gray-800 text-white rounded-full p-1 cursor-pointer">
              <CiEdit size={22} />
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="hidden"
              />
            </label>
          </div>
          <h2 className="ml-4 text-xl font-semibold text-gray-800">
            {loggedUser?.name || "N/A"}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-10">
          <button
            className={`font-medium px-4 py-2 ${
              activeTab === "editProfile"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("editProfile")}
          >
            Edit Profile
          </button>
          <button
            className={`font-medium px-4 py-2 ${
              activeTab === "changePassword"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("changePassword")}
          >
            Change Password
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "editProfile" && (
          <form
            onSubmit={handleSubmit(onProfileSubmit)}
            encType="multipart/form-data"
          >
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Name</label>
              <input
                type="text"
                defaultValue={loggedUser?.name || ""}
                {...register("name", {
                  required: "Name is required",
                })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-200 dark:text-gray-800"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                defaultValue={loggedUser?.email || ""}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-200 dark:text-gray-800"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-gray-600 mb-2">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-200 dark:text-gray-800"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              disabled={isLoading || isUpdating}
            >
              {isLoading || isUpdating ? "Saving..." : "Save Profile"}
            </button>
          </form>
        )}

        {activeTab === "changePassword" && (
          <form onSubmit={handleSubmit(onPasswordSubmit)}>
            {/* Current Password */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  {...register("current_password", {
                    required: "Current password is required",
                  })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-200 dark:text-gray-800"
                  placeholder="Enter your email"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <AiOutlineEyeInvisible className="w-5 h-5" />
                  ) : (
                    <AiOutlineEye className="w-5 h-5" />
                  )}
                </span>
              </div>
              {errors.current_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.current_password.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  {...register("new_password", {
                    required: "New password is required",
                  })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-200 dark:text-gray-800"
                  placeholder="••••••••"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible className="w-5 h-5" />
                  ) : (
                    <AiOutlineEye className="w-5 h-5" />
                  )}
                </span>
              </div>
              {errors.new_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.new_password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save & Change"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
