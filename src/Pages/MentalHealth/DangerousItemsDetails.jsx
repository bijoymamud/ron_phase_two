import React from "react";
import mentalLogo from "../../assets/mental_health_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const DangerousItemsDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  const handleDengerousItems = watch("handledDangerousItems");

  const onSubmit = (data) => {
    console.log("dengeriousItems", data);
    localStorage.setItem("dangerous_items_details", JSON.stringify(data));
    navigate("/familiar_issues");
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh]  md:min-h-screen bg-gray-100 pt-14 pb-10 md:pt-32">
      <div className="md:p-6 p-2 rounded-lg w-full max-w-4xl flex flex-col justify-between">
        {/* Header Section (Centered Image and Text) */}
        <div className="bg-[#002B5C] w-full rounded-lg p-6 mb-6 flex flex-col items-center">
          <div className="w-52 h-52 bg-purple-600 rounded-full flex items-center justify-center mb-3">
            <img
              src={mentalLogo}
              alt="Mental Health Logo"
              className="w-32 h-32 object-cover"
            />
          </div>
          <h1 className="text-white text-2xl font-medium mt-2">
            Mental Health
          </h1>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex-grow pt-5 px-1 md:px-0"
        >
          {/* Did You Handle Dangerous Items? */}
          <label className="block text-lg font-medium text-gray-700">
            Did You Handle Dangerous Items?
            <select
              {...register("handledDangerousItems", {
                required: "This field is required",
              })}
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.handledDangerousItems ? "border-red-500" : ""}`}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.handledDangerousItems && (
              <span className="text-red-500 text-sm">
                {errors.handledDangerousItems.message}
              </span>
            )}
          </label>

          {handleDengerousItems === "yes" && (
            <>
              {/* Dates Of Incident */}
              <label className="block text-lg font-medium text-gray-700">
                Dates Of Incident
                <input
                  {...register("incidentDates", {
                    required: "This field is required",
                  })}
                  type="date"
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border uppercase border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm [appearance:auto] [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 dark:[&::-webkit-calendar-picker-indicator]:invert ${errors.incidentDates ? "border-red-500" : ""}`}
                />
                {errors.incidentDates && (
                  <span className="text-red-500 text-sm">
                    {errors.incidentDates.message}
                  </span>
                )}
              </label>

              {/* Location Of Incident */}
              <label className="block text-lg font-medium text-gray-700">
                Location Of Incident
                <input
                  {...register("incidentLocation", {
                    required: "This field is required",
                  })}
                  type="text"
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border uppercase border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.incidentLocation ? "border-red-500" : ""}`}
                  placeholder="Enter location"
                />
                {errors.incidentLocation && (
                  <span className="text-red-500 text-sm">
                    {errors.incidentLocation.message}
                  </span>
                )}
              </label>

              {/* Type Of Dangerous Items Handled */}
              <label className="block text-lg font-medium text-gray-700">
                Type Of Dangerous Items Handled
                <select
                  {...register("itemType", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.itemType ? "border-red-500" : ""}`}
                >
                  <option value="explosives">Explosives</option>
                  <option value="chemicals" selected>
                    Chemicals
                  </option>
                  <option value="hazardousMaterials">
                    Hazardous Materials
                  </option>
                  <option value="other">Other</option>
                </select>
                {errors.itemType && (
                  <span className="text-red-500 text-sm">
                    {errors.itemType.message}
                  </span>
                )}
              </label>
              {/* Names Of Anyone Involved In Incident (If Applicable) */}
              <label className="block text-lg font-medium text-gray-700">
                Names Of Anyone Involved In Incident (If Applicable)
                <input
                  {...register("involvedNames")}
                  type="text"
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border uppercase border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.involvedNames ? "border-red-500" : ""}`}
                  placeholder="Enter names"
                />
                {errors.involvedNames && (
                  <span className="text-red-500 text-sm">
                    {errors.involvedNames.message}
                  </span>
                )}
              </label>

              {/* Specific Details Of Incident */}
              <label className="block text-lg font-medium text-gray-700">
                Specific Details Of Incident
                <textarea
                  {...register("incidentDetails", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black uppercase border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-32 resize-none ${errors.incidentDetails ? "border-red-500" : ""}`}
                  placeholder="Enter details here..."
                />
                {errors.incidentDetails && (
                  <span className="text-red-500 text-sm">
                    {errors.incidentDetails.message}
                  </span>
                )}
              </label>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-4 md:mt-20 mt-10 md:pb-0 items-center">
            <div className="w-[165px] md:w-[200px]">
              <Link
                to="#"
                onClick={() => window.history.back()}
                className="w-full block text-center bg-white text-blue-800 py-2 border border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold"
              >
                Back
              </Link>
            </div>

            <div className="w-[150px] md:w-[200px]">
              <button
                type="submit"
                className="w-full bg-[#B31942] text-white uppercase py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-semibold"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DangerousItemsDetails;
