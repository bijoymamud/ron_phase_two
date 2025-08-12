import mentalLogo from "../../assets/mental_health_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CrashAccidentDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const cleanedCrashSite = watch("cleanedCrashSite");

  const onSubmit = (data) => {
    console.log("crashAccident", data);
    localStorage.setItem("crash_details", JSON.stringify(data));
    navigate("/medical_trauma_details");
  };

  return (
    <div
      className="flex justify-center items-center min-h-[85vh] md:min-h-screen bg-gray-100 
       mt-10 md:pt-20"
    >
      <div className="md:p-6 p-2 rounded-lg w-full max-w-4xl flex flex-col justify-between">
        {/* Header Section */}
        <div className="bg-[#002B5C] w-full rounded-lg p-6 mb-6 flex flex-col items-center mt-24 md:pt-0">
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
          className="space-y-4 flex-grow  md:mt-5 px-1 md:px-0"
        >
          {/* Question */}
          <label className="block text-sm font-medium text-gray-700">
            Did You Ever Clean Up A Crash Or Accident Site?
            <select
              {...register("cleanedCrashSite", {
                required: "This field is required",
              })}
              className={`mt-1 block w-full uppercase p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.cleanedCrashSite ? "border-red-500" : ""}`}
            >
              <option value="">Select one</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.cleanedCrashSite && (
              <span className="text-red-500 text-sm">
                {errors.cleanedCrashSite.message}
              </span>
            )}
          </label>

          {/* Conditional Fields */}
          {cleanedCrashSite === "yes" && (
            <>
              {/* Dates Of Incident */}
              <label className="block text-sm font-medium text-gray-700">
                Dates Of Incident
                <input
                  {...register("incidentDates", {
                    required: "This field is required",
                  })}
                  type="date"
                  className={`mt-1 block w-full uppercase dark:bg-white dark:border-black dark:text-black p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm [appearance:auto] [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 dark:[&::-webkit-calendar-picker-indicator]:invert ${errors.incidentDates ? "border-red-500" : ""}`}
                />
                {errors.incidentDates && (
                  <span className="text-red-500 text-sm">
                    {errors.incidentDates.message}
                  </span>
                )}
              </label>

              {/* Location Of Incident */}
              <label className="block text-sm font-medium text-gray-700">
                Location Of Incident
                <input
                  {...register("incidentLocation", {
                    required: "This field is required",
                  })}
                  type="text"
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black uppercase border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.incidentLocation ? "border-red-500" : ""}`}
                  placeholder="Enter location"
                />
                {errors.incidentLocation && (
                  <span className="text-red-500 text-sm">
                    {errors.incidentLocation.message}
                  </span>
                )}
              </label>

              {/* Type Of Incident */}
              <label className="block text-sm font-medium text-gray-700">
                Type Of Incident
                <select
                  {...register("incidentType", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full uppercase p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.incidentType ? "border-red-500" : ""}`}
                >
                  <option value="">Select type</option>
                  <option value="airplaneCrash">Airplane Crash</option>
                  <option value="industrialWorkplace">
                    Industrial/Workplace Accident
                  </option>
                  <option value="fireExplosion">Fire Or Explosion</option>
                  <option value="naturalDisaster">Natural Disaster</option>
                  <option value="other">Other</option>
                </select>
                {errors.incidentType && (
                  <span className="text-red-500 text-sm">
                    {errors.incidentType.message}
                  </span>
                )}
              </label>

              {/* Names Of Anyone Involved */}
              <label className="block text-sm font-medium text-gray-700">
                Names Of Anyone Involved In Incident (If Applicable)
                <input
                  {...register("involvedNames")}
                  type="text"
                  className="mt-1 block w-full uppercase p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Enter names"
                />
              </label>

              {/* Specific Details */}
              <label className="block text-sm font-medium text-gray-700 ">
                Specific Details Of Incident
                <textarea
                  {...register("incidentDetails", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black uppercase border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 text-sm resize-none ${errors.incidentDetails ? "border-red-500" : ""}`}
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

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 md:mt-20 pb-10 md:pb-0 items-center">
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

export default CrashAccidentDetails;
