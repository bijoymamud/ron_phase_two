import mentalLogo from "../../assets/mental_health_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const AbuseAssaultDetails = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const abusedAssaulted = watch("abusedAssaulted");

  const onSubmit = (data) => {
    console.log("abuse_assault_form", data);
    localStorage.setItem("abuse_assault_form", JSON.stringify(data));
    navigate("/risk_details");
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] md:min-h-screen bg-gray-100 pt-10 md:pb-20 md:pt-32">
      <div className="md:p-6 p-2 rounded-lg w-full max-w-4xl flex flex-col justify-between">
        {/* Header Section */}
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
          className="space-y-4 flex-grow md:mt-10 mt-5"
        >
          {/* Abuse Question */}
          <label className="block text-lg font-medium text-gray-700">
            Were You Ever Abused/Assaulted During Your Time In Service?
            <select
              {...register("abusedAssaulted", {
                required: "This field is required",
              })}
              className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md  text-sm ${
                errors.abusedAssaulted ? "border-red-500" : ""
              }`}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.abusedAssaulted && (
              <span className="text-red-500 text-sm">
                {errors.abusedAssaulted.message}
              </span>
            )}
          </label>

          {/* Conditional Fields */}
          {abusedAssaulted === "yes" && (
            <>
              {/* Date of Incident */}
              <label className="block text-lg font-medium text-gray-700">
                Date Of Incident
                <input
                  {...register("incidentDate", {
                    required: "This field is required",
                  })}
                  type="date"
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md text-sm [appearance:auto] [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 dark:[&::-webkit-calendar-picker-indicator]:invert ${
                    errors.incidentDate ? "border-red-500" : ""
                  }`}
                />
                {errors.incidentDate && (
                  <span className="text-red-500 text-sm">
                    {errors.incidentDate.message}
                  </span>
                )}
              </label>

              {/* Type Of Abuse */}
              <label className="block text-lg font-medium text-gray-700">
                Type Of Abuse/Assault
                <select
                  {...register("abuseType", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 rounded-md  text-sm ${
                    errors.abuseType ? "border-red-500" : ""
                  }`}
                >
                  <option value="">SELECT TYPE</option>
                  <option value="physical">PHYSICAL ABUSE</option>
                  <option value="assaultEmotional">ASSAULT EMOTIONAL</option>
                  <option value="psychological">PSYCHOLOGICAL ABUSE</option>
                  <option value="sexual">SEXUAL ABUSE</option>
                  <option value="other">OTHER</option>
                </select>
                {errors.abuseType && (
                  <span className="text-red-500 text-sm">
                    {errors.abuseType.message}
                  </span>
                )}
              </label>

              {/* Names Involved */}
              <label className="block text-lg font-medium text-gray-700">
                Names Of Anyone Involved In Incident
                <input
                  {...register("involvedNames", {
                    required: "This field is required",
                  })}
                  type="text"
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border uppercase border-gray-300 rounded-md  text-sm ${
                    errors.involvedNames ? "border-red-500" : ""
                  }`}
                  placeholder="Enter names"
                />
                {errors.involvedNames && (
                  <span className="text-red-500 text-sm">
                    {errors.involvedNames.message}
                  </span>
                )}
              </label>

              {/* Details */}
              <label className="block text-lg font-medium text-gray-700">
                Specific Details Of Incident
                <textarea
                  {...register("incidentDetails", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black uppercase border border-gray-300 rounded-md  text-sm h-32 resize-none ${
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

          {/* Buttons */}
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

export default AbuseAssaultDetails;
