import mentalLogo from "../../assets/mental_health_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const DeathDetails = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passedAway = watch("passedAway");

  const onSubmit = (data) => {
    console.log("Death details Form Data:", data);
    localStorage.setItem("death_details", JSON.stringify(data));
    navigate("/disaster_form");
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] md:min-h-screen bg-gray-100 md:mt-10 md:py-20">
      <div className="md:p-6 p-2 rounded-lg w-full max-w-4xl justify-between">
        {/* Header Section */}
        <div className="bg-[#002B5C] w-full rounded-lg p-6 mb-6 flex flex-col items-center mt-28 md:pt-0">
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
          className="space-y-4 flex-grow md:mt-10 px-1 md:px-0"
        >
          {/* Did Anyone Close To You Pass Away? */}
          <label className="block text-sm font-medium text-gray-700">
            Did Anyone Close To You (Service Member Or Civilian) Pass Away?
            <select
              {...register("passedAway", {
                required: "This field is required",
              })}
              className={`mt-1 block text-sm w-full dark:bg-white dark:border-black dark:text-black p-2 border border-gray-300 uppercase rounded-md focus:outline-none ${errors.passedAway ? "border-red-500" : ""}`}
              defaultValue=""
            >
              <option value="" disabled>
                SELECT AN OPTION
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.passedAway && (
              <span className="text-red-500 text-sm">
                {errors.passedAway.message}
              </span>
            )}
          </label>

          {/* Show these fields only if "Yes" is selected */}
          {passedAway === "yes" && (
            <>
              {/* Type Of Death */}
              <label className="block text-sm font-medium text-gray-700">
                Type Of Death:
                <select
                  {...register("deathType", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border text-sm border-gray-300 rounded-md focus:outline-none ${errors.deathType ? "border-red-500" : ""}`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    SELECT AN OPTION
                  </option>
                  <option value="accidental">ACCIDENTAL DEATH</option>
                  <option value="suicide">SUICIDE</option>
                  <option value="other">OTHER</option>
                </select>
                {errors.deathType && (
                  <span className="text-red-500 text-sm">
                    {errors.deathType.message}
                  </span>
                )}
              </label>

              {/* Relationship To The Deceased */}
              <label className="block text-sm font-medium text-gray-700">
                Relationship To The Deceased
                <select
                  {...register("relationship", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full dark:bg-white dark:border-black dark:text-black p-2 border border-gray-300 uppercase rounded-md text-sm focus:outline-none ${errors.relationship ? "border-red-500" : ""}`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    SELECT AN OPTION
                  </option>
                  <option value="serviceMember">SERVICE MEMBER</option>
                  <option value="civilian">CIVILIAN</option>
                  <option value="familyMember">FAMILY MEMBER</option>
                  <option value="friend">FRIEND</option>
                  <option value="other">OTHER</option>
                </select>
                {errors.relationship && (
                  <span className="text-red-500 text-sm">
                    {errors.relationship.message}
                  </span>
                )}
              </label>

              {/* Details Of The Incident */}
              <label className="block text-sm font-medium text-gray-700 pb-5">
                Please Provide Any Details Of The Incident Including Names And
                Dates Of The Deceased.
                <textarea
                  {...register("incidentDetails", {
                    required: "This field is required",
                  })}
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border uppercase border-gray-300 rounded-md text-sm focus:outline-none h-32 resize-none ${errors.incidentDetails ? "border-red-500" : ""}`}
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

          {/* Buttons Section */}
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

export default DeathDetails;
