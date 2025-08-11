import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import mentalLogo from "../../assets/mental_health_logo.png";

export default function MentalHealthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("mental_health_info", JSON.stringify(data));
    navigate("/mental_health_survey");
  };

  return (
    <div className="md:min-h-screen min-h-[85vh] p-2 md:p-6 md:pt-32 pt-16 dark:bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header with Icon */}
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

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-1 md:px-0"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              What Was Your Job/Role In The Service?
            </label>
            <input
              type="text"
              placeholder="Enter role/job"
              {...register("mentail_jobRole", {
                required: "This field is required",
              })}
              className="w-full p-2 border border-gray-300 uppercase rounded-md dark:bg-white dark:border-black dark:text-black  text-sm"
            />
            {errors.mentail_jobRole && (
              <p className="text-red-600 text-sm mt-1">
                {errors.mentail_jobRole.message}
              </p>
            )}
          </div>

          {/* Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How Many Hours Did You Typically Work?
            </label>
            <input
              type="number"
              placeholder="work period (hour)"
              {...register("mentail_hours", {
                required: "This field is required",
              })}
              className="w-full p-2 border uppercase border-gray-300 rounded-md dark:bg-white dark:border-black dark:text-black  text-sm"
            />
            {errors.mentail_hours && (
              <p className="text-red-600 text-sm mt-1">
                {errors.mentail_hours.message}
              </p>
            )}
          </div>

          {/* Stress Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What Was Your Stress Level Like During Service?
            </label>
            <input
              type="text"
              placeholder="Stress Level"
              {...register("mentail_stressLevel1", {
                required: "This field is required",
              })}
              className="w-full p-2 border border-gray-300 uppercase dark:bg-white dark:border-black dark:text-black rounded-md  text-sm"
            />
            {errors.mentail_stressLevel1 && (
              <p className="text-red-600 text-sm mt-1">
                {errors.mentail_stressLevel1.message}
              </p>
            )}
          </div>

          {/* Roles and Duties */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Describe Your Roles And Duties
            </label>
            <textarea
              {...register("mentail_rolesAndDuties", {
                required: "This field is required",
              })}
              rows={4}
              placeholder="Please provide as much detail as possible..."
              className="w-full p-2 border border-gray-300 uppercase dark:bg-white dark:border-black dark:text-black rounded-md  text-sm"
            />
            {errors.mentail_rolesAndDuties && (
              <p className="text-red-600 text-sm mt-1">
                {errors.mentail_rolesAndDuties.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          {/* <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6 mb-10 ">
            <button
              type="submit"
              className="bg-[#B31942] text-white py-2 px-6 w-full uppercase md:w-52 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-semibold"
            >
              Continue
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-white text-blue-800 py-2 px-6 w-full md:w-52 uppercase mb-10 md:mb-0 border border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold"
            >
              Back
            </button>
          </div> */}

          <div className="flex justify-center gap-4 mt-6">
            <Link
              to="#"
              className="bg-white text-blue-800 px-6 py-2 border border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[150px] md:w-[200px] text-center font-semibold"
              onClick={() => window.history.back()}
            >
              Back
            </Link>

            <button
              type="submit"
              className="bg-[#B31942] text-white px-6 py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-red-500 w-[150px] md:w-[200px] font-semibold"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
