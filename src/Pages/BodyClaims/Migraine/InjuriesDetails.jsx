import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const InjuriesDetails = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const navigate = useNavigate()

const hadInjuries = watch("hadInjuries");
  
  const onSubmit = (data) => {
    console.log(data); 
    localStorage.setItem("injuries_details", JSON.stringify(data));
    navigate("/sickcall_details")
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] dark:bg-white md:min-h-screen pt-14 pb-10 md:bg-gray-100">
      <div className="bg-white md:shadow-md rounded-lg md:p-6 p-2 w-full max-w-4xl space-y-6 ">
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-1 md:px-0">
          {/* Did you have any specific injuries during your service? */}
          <label className="block text-sm font-medium text-gray-700">
            Did you have any specific injuries during your service?
            <select
              {...register("hadInjuries", { required: "This field is required" })}
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border uppercase border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.hadInjuries ? 'border-red-500' : ''}`}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.hadInjuries && <span className="text-red-500 text-sm">{errors.hadInjuries.message}</span>}
          </label>

          {hadInjuries === "yes" && (
          <>
              {/* Please list the injuries, how they occurred, and where they occurred (what base/location) */}
          <label className="block text-sm font-medium text-gray-700">
            Please list the injuries, how they occurred, and where they occurred (what base/location)
            <textarea
              {...register("injuryDetails", { required: "This field is required" })}
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-32 resize-none ${errors.injuryDetails ? 'border-red-500' : ''}`}
              placeholder="Enter details"
            />
            {errors.injuryDetails && <span className="text-red-500 text-sm">{errors.injuryDetails.message}</span>}
          </label>
          </>)}

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
    </div>
  );
};

export default InjuriesDetails;