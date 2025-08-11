import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useCategoryNavigation from "../../../hooks/useCategoryNavigation";
import { removeCategoryByName } from "../../../redux/slice/issueSlice";
import { store } from "../../../redux/store";

const BodyHealthDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formValues, setFormValues] = useState({
    decreasedRangeOfMotion: "",
    instability: "",
    chronicPain: "",
    difficultyDailyTasks: "",
    limitedPhysicalActivities: "",
    difficultyWalkingStanding: "",
    giveUpHobbies: "",
    jointsPopCrack: "",
    tingling: "",
    sensation: "",
    stuckInBed: "",
    greatlyDecreased: "",
  });

  const selectedCategories = useSelector(
    (state) => state.issueSlice.selectedCategories
  ); // Accessing the selected categories from the Redux state
  const { navigateToNextCategory } = useCategoryNavigation();

  const onSubmit = (data) => {
    console.log(data);
    const currentCategoryIndex = selectedCategories.indexOf("Body Health");

    if (currentCategoryIndex !== -1) {
      if (selectedCategories[currentCategoryIndex + 1]) {
        const nextCategory = selectedCategories[currentCategoryIndex + 1];
        navigateToNextCategory(nextCategory);
      } else {
        navigateToNextCategory("");
      }
    }
  };

  const handleSelectChange = (fieldName, value) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div className="md:min-h-screen min-h-[85vh] dark:bg-white md:bg-gray-100 flex items-center justify-center pt-5 md:p-4">
      <div className="bg-white md:shadow-md rounded-lg md:p-6 p-2 w-full max-w-4xl space-y-6 my-10">
        {/* Header Section */}
        <div className="flex flex-col items-center bg-[#0A3161] p-8 rounded-md md:w-3/6 mx-auto">
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 px-1 md:px-0"
        >
          {/* Decreased Range of Motion */}
          <label className="block text-sm font-medium text-gray-700">
            Do you have decreased range of motion?
            <select
              {...register("decreasedRangeOfMotion", {
                required: "This field is required",
              })}
              value={formValues.decreasedRangeOfMotion}
              onChange={(e) =>
                handleSelectChange("decreasedRangeOfMotion", e.target.value)
              }
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${
                errors.decreasedRangeOfMotion ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.decreasedRangeOfMotion && (
              <span className="text-red-500 text-sm">
                {errors.decreasedRangeOfMotion.message}
              </span>
            )}
          </label>

          {/* Instability */}
          <label className="block text-sm font-medium text-gray-700">
            Do you have instability?
            <select
              {...register("instability", {
                required: "This field is required",
              })}
              value={formValues.instability}
              onChange={(e) =>
                handleSelectChange("instability", e.target.value)
              }
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${
                errors.instability ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.instability && (
              <span className="text-red-500 text-sm">
                {errors.instability.message}
              </span>
            )}
          </label>

          {/* Chronic Pain */}
          <label className="block text-sm font-medium text-gray-700">
            Do you have chronic pain?
            <select
              {...register("chronicPain", {
                required: "This field is required",
              })}
              value={formValues.chronicPain}
              onChange={(e) =>
                handleSelectChange("chronicPain", e.target.value)
              }
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${
                errors.chronicPain ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.chronicPain && (
              <span className="text-red-500 text-sm">
                {errors.chronicPain.message}
              </span>
            )}
          </label>

          {/* Difficulty Completing Daily Tasks */}
          <label className="block text-sm font-medium text-gray-700">
            Do you have difficulty completing daily tasks?
            <select
              {...register("difficultyDailyTasks", {
                required: "This field is required",
              })}
              value={formValues.difficultyDailyTasks}
              onChange={(e) =>
                handleSelectChange("difficultyDailyTasks", e.target.value)
              }
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${
                errors.difficultyDailyTasks ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.difficultyDailyTasks && (
              <span className="text-red-500 text-sm">
                {errors.difficultyDailyTasks.message}
              </span>
            )}
          </label>

          {/* Limited Physical Activities */}
          <label className="block text-sm font-medium text-gray-700">
            Do you feel limited in physical activities?
            <select
              {...register("limitedPhysicalActivities", {
                required: "This field is required",
              })}
              value={formValues.limitedPhysicalActivities}
              onChange={(e) =>
                handleSelectChange("limitedPhysicalActivities", e.target.value)
              }
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${
                errors.limitedPhysicalActivities ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.limitedPhysicalActivities && (
              <span className="text-red-500 text-sm">
                {errors.limitedPhysicalActivities.message}
              </span>
            )}
            {formValues.limitedPhysicalActivities === "yes" && (
              <textarea
                {...register("limitedPhysicalActivitiesDetails")}
                className="mt-2 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm h-20 resize-none"
                placeholder="Please provide details"
              />
            )}
          </label>

          {/* Difficulty Walking or Standing */}
          <label className="block text-sm font-medium text-gray-700">
            Do you have trouble walking or standing for prolonged periods of
            time due to your pain?
            <select
              {...register("difficultyWalkingStanding", {
                required: "This field is required",
              })}
              value={formValues.difficultyWalkingStanding}
              onChange={(e) =>
                handleSelectChange("difficultyWalkingStanding", e.target.value)
              }
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${
                errors.difficultyWalkingStanding ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.difficultyWalkingStanding && (
              <span className="text-red-500 text-sm">
                {errors.difficultyWalkingStanding.message}
              </span>
            )}
            {formValues.difficultyWalkingStanding === "yes" && (
              <textarea
                {...register("difficultyWalkingStandingDetails")}
                className="mt-2 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm h-20 resize-none"
                placeholder="Please provide details"
              />
            )}
          </label>

          {/* Give Up Hobbies */}
          <label className="block text-sm font-medium text-gray-700">
            Have you had to give up hobbies you used to enjoy due to your pain?
            <select
              {...register("giveUpHobbies", {
                required: "This field is required",
              })}
              value={formValues.giveUpHobbies}
              onChange={(e) =>
                handleSelectChange("giveUpHobbies", e.target.value)
              }
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${
                errors.giveUpHobbies ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.giveUpHobbies && (
              <span className="text-red-500 text-sm">
                {errors.giveUpHobbies.message}
              </span>
            )}
            {formValues.giveUpHobbies === "yes" && (
              <textarea
                {...register("hobbiesList")}
                className="mt-2 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm h-20 resize-none"
                placeholder="Please list the hobbies"
              />
            )}
          </label>

          {/* Joints Pop or Crack */}
          <label className="block text-sm font-medium text-gray-700">
            Do your joints constantly pop or ever give out?
            <select
              {...register("jointsPopCrack", {
                required: "This field is required",
              })}
              value={formValues.jointsPopCrack}
              onChange={(e) =>
                handleSelectChange("jointsPopCrack", e.target.value)
              }
              className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black border-gray-300 uppercase rounded-md  text-sm ${
                errors.jointsPopCrack ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.jointsPopCrack && (
              <span className="text-red-500 text-sm">
                {errors.jointsPopCrack.message}
              </span>
            )}
            {formValues.jointsPopCrack === "yes" && (
              <textarea
                {...register("jointsPopCrackDetails")}
                className="mt-2 block w-full p-2 border dark:bg-white dark:border-black dark:text-black border-gray-300 uppercase rounded-md  text-sm h-20 resize-none"
                placeholder="Please provide details"
              />
            )}
          </label>

          {/* Numbness or Tingling */}
          <label className="block text-sm font-medium text-gray-700">
            Do you ever have numbness or tingling?
            <select
              {...register("tingling", {
                required: "This field is required",
              })}
              value={formValues.tingling}
              onChange={(e) => handleSelectChange("tingling", e.target.value)}
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${
                errors.tingling ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.tingling && (
              <span className="text-red-500 text-sm">
                {errors.tingling.message}
              </span>
            )}
          </label>

          {/* Decreased Sensation */}
          <label className="block text-sm font-medium text-gray-700">
            Do you have decreased sensation?
            <select
              {...register("sensation", {
                required: "This field is required",
              })}
              value={formValues.sensation}
              onChange={(e) => handleSelectChange("sensation", e.target.value)}
              className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black border-gray-300 uppercase rounded-md  text-sm ${
                errors.sensation ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.sensation && (
              <span className="text-red-500 text-sm">
                {errors.sensation.message}
              </span>
            )}
          </label>

          {/* Stuck in Bed */}
          <label className="block text-sm font-medium text-gray-700">
            Are there days you are stuck in bed or have flare ups where you
            cannot move?
            <select
              {...register("stuckInBed", {
                required: "This field is required",
              })}
              value={formValues.stuckInBed}
              onChange={(e) => handleSelectChange("stuckInBed", e.target.value)}
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${
                errors.stuckInBed ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.stuckInBed && (
              <span className="text-red-500 text-sm">
                {errors.stuckInBed.message}
              </span>
            )}
          </label>

          {/* Quality of Life Decreased */}
          <label className="block text-sm font-medium text-gray-700">
            Do you feel like your quality of life has greatly decreased?
            <select
              {...register("greatlyDecreased", {
                required: "This field is required",
              })}
              value={formValues.greatlyDecreased}
              onChange={(e) =>
                handleSelectChange("greatlyDecreased", e.target.value)
              }
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${
                errors.greatlyDecreased ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.greatlyDecreased && (
              <span className="text-red-500 text-sm">
                {errors.greatlyDecreased.message}
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

export default BodyHealthDetails;
