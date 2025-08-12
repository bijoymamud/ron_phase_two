import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useCategoryNavigation from "../../hooks/useCategoryNavigation";
import { useSelector } from "react-redux";

const OthersIssues = () => {
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      hypertension: "",
      symptomsStartDate: "",
      dailyMedication: "",
      complainedWhileInService: "",
      details: "",
    },
  });
  const { navigateToNextCategory } = useCategoryNavigation();

  const anyComplainedWhileInServiceTime = watch("complainedWhileInService");

  const selectedCategories = useSelector(
    (state) => state.issueSlice.selectedCategories
  );

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("others_issue", JSON.stringify(data));
    const currentCategoryIndex = selectedCategories.indexOf("Other");

    if (currentCategoryIndex !== -1) {
      if (selectedCategories[currentCategoryIndex + 1]) {
        const nextCategory = selectedCategories[currentCategoryIndex + 1];
        navigateToNextCategory(nextCategory);
      } else {
        navigateToNextCategory("");
      }
    }
  };

  return (
    <div className="flex flex-col items-center dark:bg-white justify-center md:min-h-screen min-h-[85vh] p-4 mx-auto py-10 md:pt-32">
      {/* Header */}
      <div className="flex flex-col items-center bg-[#0A3161] p-8 rounded-md max-w-4xl  mx-auto mb-10">
        <div className="w-28 h-28 mb-4">
          <img
            src="https://i.ibb.co.com/tT3ShjtP/Group-2147225242.png"
            alt="Mental Health Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl md:text-[24px] font-semibold text-center text-white">
          ANY OTHER CLAIMS{" "}
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl  px-1 md:px-0"
      >
        {/* Hypertension */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            DO YOU HAVE ANY OF THE FOLLOWING CONDITIONS?
          </label>
          <select
            {...register("hypertension", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full dark:bg-white dark:border-black dark:text-black p-2 border uppercase border-gray-300 rounded-md  text-sm text-gray-700 ${
              errors.hypertension ? "border-red-500" : ""
            }`}
          >
            <option value="">Select an option</option>
            <option value="HYPERTENSION">HYPERTENSION</option>
            <option value="CANCER">CANCER</option>
            <option value="DIABETES">DIABETES</option>
            <option value="OTHER">OTHER</option>
          </select>
          {errors.hypertension && (
            <p className="text-red-500 text-sm mt-1">
              {errors.hypertension.message}
            </p>
          )}
        </div>

        {/* Symptoms Start Date */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            WHEN DID YOUR SYMPTOMS START?
          </label>
          <input
            type="date"
            {...register("symptomsStartDate", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black uppercase border-gray-300 rounded-md text-sm text-gray-700 
    [appearance:auto] 
    [&::-webkit-calendar-picker-indicator]:bg-transparent 
    [&::-webkit-calendar-picker-indicator]:cursor-pointer 
    [&::-webkit-calendar-picker-indicator]:opacity-100 
    dark:[&::-webkit-calendar-picker-indicator]:invert ${
      errors.symptomsStartDate ? "border-red-500" : ""
    }`}
          />
          {errors.symptomsStartDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.symptomsStartDate.message}
            </p>
          )}
        </div>

        {/* Daily Medication */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            DID YOU RECEIVE ANY TREATMENT FOR THIS CONDITION WHILE IN SERVICE?
          </label>
          <select
            {...register("dailyMedication", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full dark:bg-white dark:border-black dark:text-black p-2 uppercase border border-gray-300 rounded-md  text-sm text-gray-700 ${
              errors.dailyMedication ? "border-red-500" : ""
            }`}
          >
            <option value="">Select an option</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
          {errors.dailyMedication && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dailyMedication.message}
            </p>
          )}
        </div>

        {/* Complained While in Service */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            DID YOU EVER COMPLAIN OF THIS TO SICK CALL WHILE IN SERVICE?
          </label>
          <select
            {...register("complainedWhileInService", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full dark:bg-white dark:border-black dark:text-black p-2 border uppercase border-gray-300 rounded-md  text-sm text-gray-700 ${
              errors.complainedWhileInService ? "border-red-500" : ""
            }`}
          >
            <option value="">Select an option</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
          {errors.complainedWhileInService && (
            <p className="text-red-500 text-sm mt-1">
              {errors.complainedWhileInService.message}
            </p>
          )}
        </div>

        {anyComplainedWhileInServiceTime === "YES" && (
          <>
            {/* Details */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                PLEASE PROVIDE DETAILS
              </label>
              <textarea
                {...register("details", { required: "This field is required" })}
                className={`mt-1 block w-full dark:bg-white dark:border-black dark:text-black uppercase p-2 border border-gray-300 rounded-md  text-sm text-gray-700 h-32 resize-none ${
                  errors.details ? "border-red-500" : ""
                }`}
                placeholder="Enter details here"
              />
              {errors.details && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.details.message}
                </p>
              )}
            </div>
          </>
        )}

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
  );
};

export default OthersIssues;
