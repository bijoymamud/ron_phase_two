import mentalLogo from "../../assets/mental_health_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const MentalHealthSurvey = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    localStorage.setItem("mental_health_survey", JSON.stringify(data));
    navigate("/mental_health_details");
  };

  return (
    <div className="flex justify-center items-center md:min-h-screen min-h-[85vh] bg-gray-100 mt-10">
      <div className="p-2 md:p-6 rounded-lg w-full max-w-4xl flex flex-col justify-between">
        <div className="bg-[#002B5C] w-full rounded-lg p-6 mb-6 flex flex-col items-center mt-20 md:pt-0">
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
          className="space-y-4 flex-grow md:mt-10 px-1 md:px-0"
        >
          <label className="block text-sm font-medium text-gray-700">
            How Stressful Was Your Job On A Scale Of 1-10?
            <select
              {...register("mentail_stressLevel", {
                required: "Please select a stress level",
              })}
              className="mt-1 block w-full text-[14px] p-2 border dark:bg-white dark:border-black dark:text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="uppercase">
                SELECT AN OPTION
              </option>
              <option value="1-3" className="uppercase">
                1-3: LOW STRESS
              </option>
              <option value="4-6" className="uppercase">
                4-6: MODERATE STRESS
              </option>
              <option value="7-9" className="uppercase">
                7-9: HIGH STRESS
              </option>
              <option value="10" className="uppercase">
                10: EXTREMELY HIGH STRESS
              </option>
            </select>
            {errors.mentail_stressLevel && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mentail_stressLevel.message}
              </p>
            )}
          </label>

          <div className="flex justify-center gap-4 mt-20 md:pb-0 items-center">
            <div className="w-[165px] md:w-[200px]">
              <Link
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

export default MentalHealthSurvey;
