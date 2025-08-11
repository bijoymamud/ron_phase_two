import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import mentalLogo from "../../assets/mental_health_logo.png";

const DisasterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const experiencedDisaster = watch("experiencedDisaster");

  const onSubmit = (data) => {
    console.log("disaster_form", data);
    localStorage.setItem("disaster_form", JSON.stringify(data));
    navigate("/abuse_assault_form");
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh]  md:min-h-screen bg-gray-100  md:pt-0">
      <div className="md:p-6 p-2 rounded-lg w-full max-w-4xl flex flex-col justify-between">
        {/* Header Section */}
        <div className="bg-[#002B5C] w-full rounded-lg  p-6  flex flex-col items-center md:mt-32 ">
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex-grow  px-1 md:px-0 md:pt-5 pt-0"
        >
          <label className="block text-lg font-medium text-gray-700">
            Did You Ever Experience A Natural Disaster While Serving?
            <select
              {...register("experiencedDisaster", {
                required: "This field is required",
              })}
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md text-sm  ${
                errors.experiencedDisaster ? "border-red-500" : ""
              }`}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.experiencedDisaster && (
              <span className="text-red-500 text-sm">
                {errors.experiencedDisaster.message}
              </span>
            )}
          </label>

          {experiencedDisaster === "yes" && (
            <>
              <label className="block text-lg font-medium text-gray-700">
                Dates Of Incident
                <input
                  type="date"
                  {...register("incidentDate", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full dark:bg-white dark:border-black dark:text-black p-2 border border-gray-300 uppercase rounded-md text-sm [appearance:auto] [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 dark:[&::-webkit-calendar-picker-indicator]:invert ${
                    errors.incidentDate ? "border-red-500" : ""
                  }`}
                />
                {errors.incidentDate && (
                  <span className="text-red-500 text-sm">
                    {errors.incidentDate.message}
                  </span>
                )}
              </label>

              <label className="block text-lg font-medium text-gray-700">
                Type Of Incident
                <select
                  {...register("incidentType", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md text-sm  ${
                    errors.incidentType ? "border-red-500" : ""
                  }`}
                >
                  <option value="">SELECT AN OPTION</option>
                  <option value="flood">FLOOD</option>
                  <option value="combatZone">COMBAT ZONE</option>
                  <option value="earthquake">EARTHQUAKE</option>
                  <option value="volcanicEruption">VOLCANIC ERUPTION</option>
                  <option value="hurricane">HURRICANE</option>
                  <option value="wildfire">WILDFIRE</option>
                </select>
                {errors.incidentType && (
                  <span className="text-red-500 text-sm">
                    {errors.incidentType.message}
                  </span>
                )}
              </label>

              {/* Names of People Involved */}
              <label className="block text-lg font-medium text-gray-700">
                Names Of Anyone Involved In Incident
                <input
                  type="text"
                  {...register("peopleInvolved")}
                  className="mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black uppercase border border-gray-300 rounded-md text-sm "
                  placeholder="Enter names..."
                />
              </label>

              {/* Additional Details */}
              <label className="block text-lg font-medium text-gray-700">
                Please Provide As Much Detail As Possible As It Will Help To
                Strengthen Your Claim.
                <textarea
                  {...register("incidentDetails", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black uppercase border border-gray-300 rounded-md text-sm  h-32 resize-none ${
                    errors.incidentDetails ? "border-red-500" : ""
                  }`}
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

          <div className="flex justify-center gap-4 md:mt-20 mt-10 pb-10 md:pb-0 items-center">
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

export default DisasterForm;
