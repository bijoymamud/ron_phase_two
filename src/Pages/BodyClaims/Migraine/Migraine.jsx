import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useCategoryNavigation from "../../../hooks/useCategoryNavigation";
import { useSelector } from "react-redux";
import { Watch } from "lucide-react";

const Migraine = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { navigateToNextCategory } = useCategoryNavigation();
  const selectedCategories = useSelector(
    (state) => state.issueSlice.selectedCategories
  );

  const hasReceivedMedicalTreatment = watch("migraineImpactTreatment");

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("migraine", JSON.stringify(data));

    const currentCategoryIndex = selectedCategories.indexOf(
      "Migraine & Headache Claim Information"
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
    <div className="flex justify-center items-center  dark:bg-white  md:min-h-screen md:bg-gray-100 md:pt-32 md:py-10">
      <div className="bg-white md:shadow-md rounded-2xl md:p-8 p-2 w-full max-w-4xl space-y-8 my-14">
        {/* Centered Image and Title */}
        <div className="flex flex-col items-center bg-[#0A3161] p-8 rounded-md md:w-3/6 mx-auto mt-16 md:pt-0">
          <div className="md:w-28 md:h-28 mb-4">
            <img
              src="https://i.ibb.co.com/VpQtPVqF/Group-1597882744.png"
              alt="Mental Health Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl md:text-[24px] font-semibold text-center text-white">
            Migraine & Headache <br /> Claim Information
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 px-1 md:px-0"
        >
          {/* Frequency */}
          <label className="block text-sm font-medium text-gray-700">
            How often do your migraines occur?
            <select
              {...register("migraineFrequency", {
                required: "This field is required",
              })}
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 rounded-md  uppercase text-sm ${errors.migraineFrequency ? "border-red-500" : ""}`}
              defaultValue=""
            >
              <option value="" disabled>
                Select frequency
              </option>
              <option value="1-2 times per month ">1-2 times per month</option>
              <option value="3-4 times per month">3-4 times per month</option>
              <option value="5-6 times per month">5-6 times per month</option>
              <option value="6+ times per month">6+ times per month</option>
            </select>
            {errors.migraineFrequency && (
              <span className="text-red-500 text-sm">
                {errors.migraineFrequency.message}
              </span>
            )}
          </label>

          {/* Duration */}
          <label className="block text-sm font-medium text-gray-700">
            How long do your migraines typically last?
            <select
              {...register("migraineDuration", {
                required: "This field is required",
              })}
              className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black border-gray-300 rounded-md  uppercase text-sm ${errors.migraineDuration ? "border-red-500" : ""}`}
              defaultValue=""
            >
              <option value="" disabled>
                Select duration
              </option>
              <option value="Less than 1 hour">Less than 1 hour</option>
              <option value="1-4 hours">1-4 hours</option>
              <option value="4-24 hours">4-24 hours</option>
              <option value="More than 24 hours">More than 24 hours</option>
            </select>
            {errors.migraineDuration && (
              <span className="text-red-500 text-sm">
                {errors.migraineDuration.message}
              </span>
            )}
          </label>

          {/* Symptoms */}
          <label className="block text-sm font-medium text-gray-700">
            Do your migraines cause any of the following symptoms?
            <select
              {...register("migraineSymptoms", {
                required: "This field is required",
              })}
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 rounded-md  uppercase text-sm ${errors.migraineSymptoms ? "border-red-500" : ""}`}
              defaultValue=""
            >
              <option value="" disabled>
                Select symptoms
              </option>
              <option value="Sensitivity to light or sound">
                Sensitivity to light or sound
              </option>
              <option value="Nausea or vomiting">Nausea or vomiting</option>
              <option value="Vision changes">Vision changes</option>
              <option value="Other">Other</option>
            </select>
            {errors.migraineSymptoms && (
              <span className="text-red-500 text-sm">
                {errors.migraineSymptoms.message}
              </span>
            )}
          </label>

          {/* Impact */}
          <label className="block text-sm font-medium text-gray-700">
            How do migraines impact your daily activities?
            <select
              {...register("migraineImpact", {
                required: "This field is required",
              })}
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 rounded-md  uppercase text-sm ${errors.migraineImpact ? "border-red-500" : ""}`}
              defaultValue=""
            >
              <option value="">Select impact</option>
              <option value="Unable to work or perform normal tasks">
                Unable to work or perform normal tasks
              </option>
              <option value="Reduced productivity">Reduced productivity</option>
              <option value="Minimal impact">Minimal impact</option>
            </select>
            {errors.migraineImpact && (
              <span className="text-red-500 text-sm">
                {errors.migraineImpact.message}
              </span>
            )}
          </label>

          {/* Treatment */}
          <label className="block text-sm font-medium text-gray-700">
            Have you received medical treatment for migraines?
            <select
              {...register("migraineImpactTreatment", {
                required: "This field is required",
              })}
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 rounded-md  uppercase text-sm ${errors.migraineImpact ? "border-red-500" : ""}`}
              defaultValue=""
            >
              <option value="">Select impact</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.medicalTreatment && (
              <span className="text-red-500 text-sm">
                {errors.medicalTreatment.message}
              </span>
            )}
          </label>

          {hasReceivedMedicalTreatment === "yes" && (
            <>
              {/* Visit Dates */}
              <label className="block text-sm font-medium text-gray-700">
                Dates of medical visits
                <input
                  type="date"
                  placeholder="MM/DD/YYYY"
                  {...register("medicalVisitDates", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black uppercase border-gray-300 rounded-md text-sm  
    [appearance:auto] 
    [&::-webkit-calendar-picker-indicator]:bg-transparent 
    [&::-webkit-calendar-picker-indicator]:cursor-pointer 
    [&::-webkit-calendar-picker-indicator]:opacity-100 
    dark:[&::-webkit-calendar-picker-indicator]:invert ${
      errors.medicalVisitDates ? "border-red-500" : ""
    }`}
                />
                {errors.medicalVisitDates && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.medicalVisitDates.message}
                  </p>
                )}
                {errors.medicalVisitDates && (
                  <span className="text-red-500 text-sm">
                    {errors.medicalVisitDates.message}
                  </span>
                )}
              </label>

              {/* Details */}
              <label className="block text-sm font-medium text-gray-700">
                Please provide details
                <textarea
                  {...register("details", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black uppercase border border-gray-300 rounded-md  text-sm h-32 resize-none ${errors.details ? "border-red-500" : ""}`}
                  placeholder="Include any relevant information or context."
                />
                {errors.details && (
                  <span className="text-red-500 text-sm">
                    {errors.details.message}
                  </span>
                )}
              </label>
            </>
          )}

          <div className="flex justify-center gap-4 mt-6">
            <Link
              to="#"
              className="bg-white text-blue-800 px-6 py-2 border border-blue-800 rounded-md hover:bg-gray-100  w-[150px] md:w-[200px] text-center font-semibold"
              onClick={() => window.history.back()}
            >
              Back
            </Link>

            <button
              type="submit"
              className="bg-[#B31942] uppercase text-white px-6 py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-red-500 w-[150px] md:w-[200px] font-semibold"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Migraine;
