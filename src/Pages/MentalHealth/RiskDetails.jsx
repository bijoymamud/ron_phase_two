import mentalLogo from "../../assets/mental_health_logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const RiskDetails = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const livesAtRisk = watch("livesAtRisk");

  const onSubmit = (data) => {
    console.log("risk_details", data);
    localStorage.setItem("risk_details", JSON.stringify(data));
    navigate("/medical_position_details");
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] md:min-h-screen bg-gray-100 pt-10 md:pb-10 mt-10">
      <div className="md:p-6 p-2 rounded-lg w-full max-w-4xl flex flex-col justify-between">
        {/* Header Section */}
        <div className="bg-[#002B5C] w-full rounded-lg p-6 mb-6 flex flex-col items-center">
          <div className="w-52 h-52 bg-purple-600 rounded-full flex items-center justify-center mb-3">
            <img src={mentalLogo} alt="Mental Health Logo" className="w-32 h-32 object-cover" />
          </div>
          <h1 className="text-white text-2xl font-medium mt-2">Mental Health</h1>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-grow md:pt-10 px-1 md:px-0">
          {/* Lives At Risk */}
          <label className="block text-lg font-medium text-gray-700">
            Were Others Lives At Risk On A Day To Day Basis Due To The Nature Of Your Job?
            <select
              {...register("livesAtRisk", { required: "This field is required" })}
              className={`mt-1 block w-full p-2 border border-gray-300 dark:bg-white dark:border-black dark:text-black uppercase rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.livesAtRisk ? 'border-red-500' : ''}`}
              defaultValue=""
            >
              <option value="" disabled>Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.livesAtRisk && <span className="text-red-500 text-sm">{errors.livesAtRisk.message}</span>}
          </label>

          {/* Show these only if "Yes" is selected */}
          {livesAtRisk === "yes" && (
            <>
              {/* Job Assignment Dates */}
              <label className="block text-lg font-medium text-gray-700">
                Dates Of Job Assignment
                <input
                  {...register("jobAssignmentDates", { required: "This field is required" })}
                  type="date"
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.jobAssignmentDates ? 'border-red-500' : ''}`}
                />
                {errors.jobAssignmentDates && <span className="text-red-500 text-sm">{errors.jobAssignmentDates.message}</span>}
              </label>

              {/* Type of Risk */}
              <label className="block text-lg font-medium text-gray-700">
                Type Of Risk
                <select
                  {...register("riskType", { required: "This field is required" })}
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.riskType ? 'border-red-500' : ''}`}
                  defaultValue=""
                >
                  <option value="" disabled>Select risk type</option>
                  <option value="weapon">Weapon-Related Risk</option>
                  <option value="mechanical">Mechanical Failure [E.G., Vehicle, Machinery]</option>
                  <option value="environmental">Environmental Hazard [E.G., Working In Extreme Conditions]</option>
                  <option value="other">Other</option>
                </select>
                {errors.riskType && <span className="text-red-500 text-sm">{errors.riskType.message}</span>}
              </label>

              {/* Stressful Scenarios */}
              <label className="block text-lg font-medium text-gray-700">
                Please Provide Any Particular Stressful Scenarios That Stood Out Or Occurred Related To Your Job.
                <textarea
                  {...register("stressfulScenarios", { required: "This field is required" })}
                  className={`mt-1 block w-full p-2 dark:bg-white dark:border-black dark:text-black border border-gray-300 uppercase rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-32 resize-none ${errors.stressfulScenarios ? 'border-red-500' : ''}`}
                  placeholder="Enter details here..."
                />
                {errors.stressfulScenarios && <span className="text-red-500 text-sm">{errors.stressfulScenarios.message}</span>}
              </label>
            </>
          )}

          {/* Buttons */}
              <div className="flex justify-center gap-4 md:mt-20  pb-10 md:pb-0 items-center">
         
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

export default RiskDetails;
