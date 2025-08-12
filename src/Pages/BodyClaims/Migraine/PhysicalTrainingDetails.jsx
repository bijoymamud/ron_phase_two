import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const PhysicalTrainingDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  const physicalTraining = watch("physicalTrainingRequired");

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("physical_training", JSON.stringify(data));
    navigate("/injuries_details");
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] md:min-h-screen dark:bg-white md:bg-gray-100">
      <div className="bg-white md:shadow-md rounded-lg md:p-6 p-2 w-full max-w-4xl space-y-6 ">
        {/* Header Section */}
        <div className="flex flex-col items-center bg-[#0A3161] p-8 rounded-md md:w-3/6 mx-auto mt-28 md:pt-0">
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
          {/* Were you required to do physical training (PT) daily/weekly? */}
          <label className="block text-sm font-medium text-gray-700">
            Were you required to do physical training (PT) daily/weekly?
            <select
              {...register("physicalTrainingRequired", {
                required: "This field is required",
              })}
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${errors.physicalTrainingRequired ? "border-red-500" : ""}`}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.physicalTrainingRequired && (
              <span className="text-red-500 text-sm">
                {errors.physicalTrainingRequired.message}
              </span>
            )}
          </label>

          {physicalTraining === "yes" && (
            <>
              {/* How many times per week were you required to do physical training? */}
              <label className="block text-sm font-medium text-gray-700">
                How many times per week were you required to do physical
                training?
                <select
                  {...register("physicalTrainingFrequency", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${errors.physicalTrainingFrequency ? "border-red-500" : ""}`}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="1-2 Times">1-2 Times</option>
                  <option value="3-4 Times">3-4 Times</option>
                  <option value="5-6 Times">5-6 Times</option>
                </select>
                {errors.physicalTrainingFrequency && (
                  <span className="text-red-500 text-sm">
                    {errors.physicalTrainingFrequency.message}
                  </span>
                )}
              </label>
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
              className="bg-[#B31942] text-white px-6 py-2 uppercase rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-red-500 w-full font-semibold"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhysicalTrainingDetails;
