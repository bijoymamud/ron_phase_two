import React from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const DischargeCondition = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("discharge_condition", JSON.stringify(data));
    navigate("/health_details");
  };

  return (
    <div className="md:min-h-screen min-h-[85vh] dark:bg-white md:bg-gray-100 flex items-center justify-center pt-5 md:p-4">
      <div className="bg-white md:shadow-md rounded-lg md:p-6 p-2 w-full max-w-4xl space-y-6 my-10">
        {/* Header Section */}
        <div className="flex flex-col items-center bg-[#0A3161] p-8 rounded-md md:w-3/6 mx-auto mt-20 md:pt-0">
          <div className="w-28 h-28 mb-4">
            <img
              src="https://i.ibb.co.com/FLFMyh5F/Group-2147225241.png"
              alt="Mental Health Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl md:text-[24px] font-semibold text-center text-white">
            body health
          </h1>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Were you ever seen at sick call for these injuries? */}
          <label className="block text-sm font-medium text-gray-700">
            Have you been seen since discharge for any of these conditions?
            <select
              {...register("discharge_conditions", {
                required: "This field is required",
              })}
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${errors.discharge_conditions ? "border-red-500" : ""}`}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.discharge_conditions && (
              <span className="text-red-500 text-sm">
                {errors.discharge_conditions.message}
              </span>
            )}
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Are you on any regular medications for these conditions?
            <select
              {...register("regular_medications", {
                required: "This field is required",
              })}
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${errors.regular_medications ? "border-red-500" : ""}`}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.regular_medications && (
              <span className="text-red-500 text-sm">
                {errors.regular_medications.message}
              </span>
            )}
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Have you had any surgeries relating to these conditions?
            <select
              {...register("surgeries_conditions", {
                required: "This field is required",
              })}
              className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black border-gray-300 uppercase rounded-md  text-sm ${errors.surgeries_conditions ? "border-red-500" : ""}`}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.surgeries_conditions && (
              <span className="text-red-500 text-sm">
                {errors.surgeries_conditions.message}
              </span>
            )}
          </label>

          <div className="flex justify-center gap-4 mt-6">
            <Link
              to="#"
              className="bg-white text-blue-800 px-6 py-2 border border-blue-800 rounded-md hover:bg-gray-100  w-full text-center font-semibold"
              onClick={() => window.history.back()}
            >
              Back
            </Link>

            <button
              type="submit"
              className="bg-[#B31942] uppercase text-white px-6 py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-red-500 w-full font-semibold"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DischargeCondition;
