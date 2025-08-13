import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useCategoryNavigation from "../../../hooks/useCategoryNavigation";
import { removeCategoryByName } from "../../../redux/slice/issueSlice";
import { store } from "../../../redux/store";

const SinusitisForm = () => {
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      runnyNose: "",
      complainedWhileInService: "",
      exposedToBurnPits: "",
      symptomsStartDate: "",
      symptomsFrequency: "",
      dailyMedication: "",
      officiallyDiagnosed: "",
      treatmentProvided: "",
      details: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCategories = useSelector(
    (state) => state.issueSlice.selectedCategories
  );
  const { navigateToNextCategory } = useCategoryNavigation();

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("sinusitis_form", JSON.stringify(data));

    const currentCategoryIndex = selectedCategories.indexOf(
      "Sinusitis, Rhinitis & Asthma Claim Information"
    );

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
    <div className="flex flex-col items-center justify-center md:min-h-screen min-h-[85vh] bg-white dark:bg-white pt-14 pb-10 p-4  mx-auto md:pt-32">
      {/* Header */}
      <div className="flex flex-col items-center bg-[#0A3161]  p-8 rounded-md md:max-w-4xl w-full mx-auto mb-10 mt-20 md:pt-10">
        <div className="md:w-28 md:h-28 mb-4">
          <img
            src="https://i.ibb.co.com/bgjW5zrC/graphic-elements.png"
            alt="Mental Health Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-xl md:text-[24px] font-semibold text-center text-white">
          Sinusitis, Rhinitis & <br />
          Asthma Claim <br /> Information
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white dark:bg-white max-w-4xl "
      >
        {/* Runny Nose */}
        <div className="mb-6">
          <label className="block text-gray-900 dark:text-gray-900 font-semibold mb-2  ">
            DO YOU HAVE ANY OF THE FOLLOWING SYMPTOMS?
          </label>
          <select
            {...register("runnyNose", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 dark:bg-white dark:border-gray-600 dark:text-gray-900 border border-gray-300 uppercase rounded-md text-sm text-gray-700 ${
              errors.runnyNose ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="YES">RUNNY NOSE</option>
            <option value="NO">Post-nasal drip</option>
            <option value="NO">Coughing</option>
            <option value="NO">Trouble breathing</option>
            <option value="NO">Sneezing</option>
          </select>
          {errors.runnyNose && (
            <p className="text-red-500 text-sm mt-1">
              {errors.runnyNose.message}
            </p>
          )}
        </div>

        {/* Complained While in Service */}
        <div className="mb-6">
          <label className="block text-gray-900 dark:text-gray-900 font-semibold mb-2 ">
            DID YOU EVER COMPLAIN OF THIS TO SICK CALL WHILE IN SERVICE?
          </label>
          <select
            {...register("complainedWhileInService", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 dark:bg-white dark:border-gray-600 dark:text-gray-900 border uppercase border-gray-300 rounded-md text-sm text-gray-700 ${
              errors.complainedWhileInService ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
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

        {/* Exposed to Burn Pits */}
        <div className="mb-6">
          <label className="block text-gray-900 dark:text-gray-900 font-semibold mb-2">
            WERE YOU EVER EXPOSED TO ANY OF THE FOLLOWING WHILE IN SERVICE? BURN
            PITS
          </label>
          <select
            {...register("exposedToBurnPits", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full dark:bg-white dark:border-gray-600 dark:text-gray-900 p-2 border uppercase border-gray-300 rounded-md text-sm text-gray-700 ${
              errors.exposedToBurnPits ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
          {errors.exposedToBurnPits && (
            <p className="text-red-500 text-sm mt-1">
              {errors.exposedToBurnPits.message}
            </p>
          )}
        </div>

        {/* Symptoms Start Date */}
        <div className="mb-6">
          <label className="block text-gray-900 dark:text-gray-900 font-semibold mb-2">
            WHEN DID YOUR SYMPTOMS START?
          </label>
          <input
            type="date"
            {...register("symptomsStartDate", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 dark:bg-white dark:border-gray-600 dark:text-black border border-gray-300 uppercase rounded-md text-sm text-gray-700 [appearance:auto] [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 dark:[&::-webkit-calendar-picker-indicator]:invert ${
              errors.symptomsStartDate ? "border-red-500" : ""
            }`}
          />
          {errors.symptomsStartDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.symptomsStartDate.message}
            </p>
          )}

          {errors.symptomsStartDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.symptomsStartDate.message}
            </p>
          )}
        </div>

        {/* Symptoms Frequency */}
        <div className="mb-6">
          <label className="block text-gray-900 dark:text-gray-900 font-semibold mb-2">
            HOW OFTEN DO YOU EXPERIENCE THESE SYMPTOMS?
          </label>
          <select
            {...register("symptomsFrequency", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2  dark:bg-white  dark:border-gray-600 dark:text-gray-900 border   uppercase border-gray-300 rounded-md text-sm text-gray-700 ${
              errors.symptomsFrequency ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="DAILY">DAILY</option>
            <option value="WEEKLY">WEEKLY</option>
            <option value="MONTHLY">SEASONALLY</option>
          </select>
          {errors.symptomsFrequency && (
            <p className="text-red-500 text-sm mt-1">
              {errors.symptomsFrequency.message}
            </p>
          )}
        </div>

        {/* Daily Medication */}
        <div className="mb-6">
          <label className="block text-gray-900 dark:text-gray-900 font-semibold mb-2">
            DO YOU TAKE ANY MEDICATION DAILY FOR THIS CONDITION?
          </label>
          <select
            {...register("dailyMedication", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 dark:bg-white  dark:border-gray-600 dark:text-gray-900 border uppercase border-gray-300 rounded-md text-sm text-gray-700 ${
              errors.dailyMedication ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
          {errors.dailyMedication && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dailyMedication.message}
            </p>
          )}
        </div>

        {/* Officially Diagnosed */}
        <div className="mb-6">
          <label className="block text-gray-900 dark:text-gray-900 font-semibold mb-2">
            HAVE YOU BEEN OFFICIALLY DIAGNOSED WITH SINUSITIS, RHINITIS, OR
            ASTHMA?
          </label>
          <select
            {...register("officiallyDiagnosed", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 dark:bg-white dark:border-gray-600 dark:text-gray-900 border uppercase border-gray-300 rounded-md text-sm text-gray-700 ${
              errors.officiallyDiagnosed ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
          {errors.officiallyDiagnosed && (
            <p className="text-red-500 text-sm mt-1">
              {errors.officiallyDiagnosed.message}
            </p>
          )}
        </div>

        {/* Treatment Provided */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-900 dark:text-gray-900">
            WHAT TREATMENT WAS PROVIDED?
          </label>
          <select
            {...register("treatmentProvided", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 border rounded-md text-sm uppercase
      bg-white text-gray-900 border-gray-300
      dark:bg-white dark:text-gray-900 dark:border-gray-600
      focus:outline-none focus:ring-2 focus:ring-blue-500
      ${errors.treatmentProvided ? "border-red-500 dark:border-red-400" : ""}`}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="MEDICATIONS">MEDICATIONS</option>
            <option value="INHALERS">INHALERS</option>
            <option value="ALLERGY_SHOTS">ALLERGY SHOTS</option>
            <option value="SURGERY">SURGERY</option>
          </select>
          {errors.treatmentProvided && (
            <p className="text-red-500 text-sm mt-1">
              {errors.treatmentProvided.message}
            </p>
          )}
        </div>

        {/* Details */}
        <div className="mb-6">
          <label className="block text-gray-900 dark:text-gray-900 font-semibold mb-2">
            PLEASE PROVIDE DETAILS
          </label>
          <textarea
            {...register("details", {
              required: "This field is required",
            })}
            className={`mt-1 block w-full p-2 border dark:bg-white  dark:text-gray-900 uppercase border-gray-300 rounded-md text-sm text-gray-700 h-32 resize-none ${
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

export default SinusitisForm;
