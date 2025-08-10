


import React from 'react';
import mentalLogo from "../../assets/mental_health_logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Watch } from 'lucide-react';

const MentalHealthDetails = () => {
    const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = (data) => {
    console.log(data); 
    localStorage.setItem("mental_health_details", JSON.stringify(data))
    navigate("/death_details")
    
  };

  const everDeployed = watch("deployed");

  return (
    <div className="md:min-h-screen min-h-[85vh] p-2 md:p-6 md:mt-32 pt-16 dark:bg-white">
      <div className="md:p-6 rounded-lg w-full max-w-4xl flex flex-col justify-between">
        {/* Header Section (Centered Image and Text) */}
        <div className="bg-[#002B5C] w-full rounded-lg p-6 mb-6 flex flex-col items-center">
          <div className="w-52 h-52 bg-purple-600 rounded-full flex items-center justify-center mb-3">
            <img src={mentalLogo} alt="Mental Health Logo" className="w-32 h-32 object-cover" />
          </div>
          <h1 className="text-white text-2xl font-medium mt-2">Mental Health</h1>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-grow px-1 md:px-0">
         

<label className="block text-lg font-medium text-gray-700">
  Were You Deployed?
  <select
    defaultValue=""
    {...register("deployed", { required: "This field is required" })}
    className={`mt-1 block w-full p-2 border border-gray-300 dark:bg-white dark:border-black dark:text-black uppercase rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px] ${errors.deployed ? 'border-red-500' : ''}`}
  >
    <option value="" disabled>
      Select an option
    </option>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>
  {errors.deployed && <span className="text-red-500 text-sm">{errors.deployed.message}</span>}
</label>

{
  everDeployed === "yes" && (
    <>
      <label className="block text-lg font-medium text-gray-700">
            Deployed Area Name
            <input
              {...register("deployedArea", { required: "This field is required" })}
              type="text"
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black uppercase border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px] ${errors.deployedArea ? 'border-red-500' : ''}`}
              placeholder="Enter area name"
            />
            {errors.deployedArea && <span className="text-red-500 text-sm">{errors.deployedArea.message}</span>}
          </label>

          {/* Duration Of Deployment */}
          <label className="block text-lg font-medium text-gray-700">
            Duration Of Deployment
            <input
              {...register("duration", 
                // { required: "This field is required" }
              )}
              type="number" 
              className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black uppercase border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px] ${errors.duration ? 'border-red-500' : ''}`}
              placeholder="Enter duration (in months)"
            />
            {errors.duration && <span className="text-red-500 text-sm">{errors.duration.message}</span>}
          </label>

          {/* Type Of Deployment */}
          <label className="block text-lg font-medium text-gray-700">
            Type Of Deployment
            <select
              defaultValue=""
              {...register("deploymentType", { required: "This field is required" })}
              className={`mt-1 block w-full p-2 border dark:bg-white dark:border-black dark:text-black border-gray-300 uppercase rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px] ${errors.deploymentType ? 'border-red-500' : ''}`}
            >
               <option value="" disabled>
              Select an option
            </option>
              <option value="combat">COMBAT ZONE</option>
              <option value="peacekeeping">PEACEKEEPING MISSON</option>
              <option value="humanitarian">HUMANITARIAN AID</option>
              <option value="training">TRAINING/ADVISORY ROLE</option>
            </select>
            {errors.deploymentType && <span className="text-red-500 text-sm">{errors.deploymentType.message}</span>}
          </label>

          {/* High-Stress Situations Textarea */}
          <label className="block text-lg font-medium text-gray-700">
            Please provide any details from your deployment including names and dates of high stress situations (things such as mortar/rocket attacks, convoy attacks, etc).
            <textarea
              {...register("stressDetails", { required: "This field is required" })}
              className={`mt-1 block text-sm w-full dark:bg-white dark:border-black dark:text-black uppercase p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none ${errors.stressDetails ? 'border-red-500' : ''}`}
              placeholder="Enter details here..."
            />
            {errors.stressDetails && <span className="text-red-500 text-sm">{errors.stressDetails.message}</span>}
          </label>
    </>
  )
}

        
        </form>
           <div className="flex justify-center gap-4 md:mt-20 mt-10  md:pb-0 items-center mb-10 md:mb-0">

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
                 onClick={handleSubmit(onSubmit)} 
                className="w-full bg-[#B31942] text-white uppercase py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-semibold"
              >
                Continue
              </button>
            </div>
           
          </div>
      </div>
    </div>
  );
};

export default MentalHealthDetails;