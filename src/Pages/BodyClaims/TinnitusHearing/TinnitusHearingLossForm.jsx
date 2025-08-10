import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useCategoryNavigation from "../../../hooks/useCategoryNavigation";

const TinnitusHearingLossForm = () => {
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },watch
  } = useForm({
    defaultValues: {
      exposureWhileServing: "",
      hearingProtection: "",
      symptomsStartDate: "",
      symptomsFrequency: "",
      complainedWhileInService: "",
      details: "",
    },
  });
  const selectedCategories = useSelector(
    (state) => state.issueSlice.selectedCategories
  ); // Accessing the selected categories from the Redux state
  const { navigateToNextCategory } = useCategoryNavigation();

const hearingProtectionIssue = watch("hearingProtection");

const complainedWhileInServiceTime = watch("complainedWhileInService");

  const onSubmit = (data) => {
   
    console.log(data);
    localStorage.setItem("tinnitus_hearing_loss", JSON.stringify(data))
    const currentCategoryIndex = selectedCategories.indexOf("Tinnitus and Hearing Loss Claim Information");

    if (currentCategoryIndex !== -1) { 
      if(selectedCategories[currentCategoryIndex + 1]){
        const nextCategory = selectedCategories[currentCategoryIndex + 1];
        navigateToNextCategory(nextCategory)
      }else{
        navigateToNextCategory("");
      }
    }
  };
  return (
    <div className="flex  flex-col items-center dark:bg-white justify-center md:min-h-screen min-h-[85vh] pt-14   py-20  p-4 max-w-4xl mx-auto ">
      {/* Header */}
      <div className="flex flex-col items-center bg-[#0A3161] p-8 rounded-md md:w-3/6 mx-auto mb-10">
          <div className="w-28 h-28 mb-4">
            <img
              src="https://i.ibb.co.com/wNVRsJvd/Group-1597882599.png"
              alt="Mental Health Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl md:text-[24px] font-semibold text-center text-white">
          Tinnitus and Hearing <br /> Loss Claim Information          </h1>
        </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-1 md:px-0">
        {/* Exposure While Serving */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            WERE YOU EXPOSED TO ANY OF THE FOLLOWING WHILE SERVING?
          </label>
          <select
            {...register("exposureWhileServing", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border uppercase border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 ${
              errors.exposureWhileServing ? "border-red-500" : ""
            }`}
          >
            <option value="">
              Select an option
            </option>
            <option value="AIRCRAFTS">AIRCRAFTS</option>
            <option value="EXPLOSIONS">EXPLOSIONS</option>
            <option value="HEAVY_MACHINERY">HEAVY MACHINERY</option>
            <option value="GUNFIRE">GUNFIRE</option>
            <option value="NONE">NONE</option>
          </select>
          {errors.exposureWhileServing && (
            <p className="text-red-500 text-sm mt-1">
              {errors.exposureWhileServing.message}
            </p>
          )}
        </div>

        {/* Hearing Protection */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            DID YOU HAVE HEARING PROTECTION ALL THE TIME?
          </label>
          <select
            {...register("hearingProtection", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black uppercase border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 ${
              errors.hearingProtection ? "border-red-500" : ""
            }`}
          >
            <option value="">
              Select an option
            </option>
            <option value="yes">YES</option>
            <option value="no">NO</option>
          </select>
          {errors.hearingProtection && (
            <p className="text-red-500 text-sm mt-1">
              {errors.hearingProtection.message}
            </p>
          )}
        </div>

        {hearingProtectionIssue === "yes" && (
          <>
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
            className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black uppercase border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 ${
              errors.symptomsStartDate ? "border-red-500" : ""
            }`}
          />
          {errors.symptomsStartDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.symptomsStartDate.message}
            </p>
          )}
        </div>

        {/* Symptoms Frequency */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            HOW OFTEN DO YOU EXPERIENCE THESE SYMPTOMS?
          </label>
          <select
            {...register("symptomsFrequency", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black uppercase border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 ${
              errors.symptomsFrequency ? "border-red-500" : ""
            }`}
          >
            <option value="" >
              Select an option
            </option>
            <option value="DAILY">DAILY</option>
            <option value="WEEKLY">WEEKLY</option>
            <option value="MONTHLY">MONTHLY</option>
            <option value="OCCASIONALLY">OCCASIONALLY</option>
          </select>
          {errors.symptomsFrequency && (
            <p className="text-red-500 text-sm mt-1">
              {errors.symptomsFrequency.message}
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
            className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black uppercase border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 ${
              errors.complainedWhileInService ? "border-red-500" : ""
            }`}
          >
            <option value="">
              Select an option
            </option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
          {errors.complainedWhileInService && (
            <p className="text-red-500 text-sm mt-1">
              {errors.complainedWhileInService.message}
            </p>
          )}
        </div>

        { complainedWhileInServiceTime === "YES" && (
          <>
             {/* Details */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            PLEASE PROVIDE DETAILS
          </label>
          <textarea
            {...register("details", { required: "This field is required" })}
            className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black uppercase border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 h-32 resize-none ${
              errors.details ? "border-red-500" : ""
            }`}
            placeholder="Enter details here..."
          />
          {errors.details && (
            <p className="text-red-500 text-sm mt-1">
              {errors.details.message}
            </p>
          )}
        </div>
          </>
        )}
          </>
        )}


         <div className="flex justify-center gap-4 mt-6">
  <Link
    to="#"
    className="bg-white text-blue-800 px-6 py-2 border border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-center font-semibold"
    onClick={() => window.history.back()}
  >
    Back
  </Link>

  <button
    type="submit"
    className="bg-[#B31942] text-white px-6 py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-red-500 w-full font-semibold"
  >
    Continue
  </button>
</div>
      </form>
    </div>
  );
};

export default TinnitusHearingLossForm;