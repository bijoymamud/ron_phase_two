
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function ToxinExposureForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ASBESTOS: false,
      SHAD_Shipboard_Hazard_And_Defense: false,
      Mustard_Gas: false,
      Military_Occupational_Specialty_MOS_Related_Toxin: false,
      Radiation: false,
      Contaminated_Water_At_Camp_Lejeune: false,
      Jet_Fuel: false,
      Other_Toxins: '',
      Additional_Details: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("toxinExposure", JSON.stringify(data) )
    navigate('/confirmation');
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center md:p-4 p-2 pt-14 md:mt-14">
      <div className="w-full max-w-2xl md:bg-white md:shadow-md rounded-lg md:p-6">
        <h1 className="md:text-2xl text-xl font-bold text-blue-800 mb-6 text-center">
          Have you been exposed to any of the following?
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ms-1 md:ms-0">
          {/* Checkboxes for exposures */}
          <div className="grid grid-cols-1 gap-4 ">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('ASBESTOS[0]')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-blue-800">Asbestos</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('SHAD_Shipboard_Hazard_And_Defense[0]')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-blue-800">Shipboard Hazard And Defense (SHAD)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('Mustard_Gas[0]')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-blue-800">Mustard Gas</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('Military_Occupational_Specialty_MOS_Related_Toxin[0]')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-blue-800">Military Occupational Specialties (MOS) Related Toxin</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('Radiation')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-blue-800">Radiation</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('Contaminated_Water_At_Camp_Lejeune[0]')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-blue-800">Contaminated Water At Camp Lejeune</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('Jet_Fuel')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-blue-800">Jet Fuel</span>
            </label>
          </div>

          {/* Other Toxins Input */}
          <div>
            <label className="block text-sm font-medium text-blue-800 mt-10 ">
              Please Specify Any Other Toxins You Were Exposed To?
            </label>
            <input
              type="text"
              {...register('OTHER_Specify[2]')}
              className="mt-1 block w-full border-gray-300 rounded-md dark:bg-white dark:border-black dark:text-black uppercase shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 px-3 border"
            />
          </div>

          {/* Additional Details Textarea */}
          <div>
            <label className="block text-sm font-medium text-blue-800">
              Please provide additional details in the space below
            </label>
            <textarea
              {...register('Provide_Additional_Dates_And_Locations_Of_Potential_Exposure[0]')}
              className="mt-1 block w-full border-gray-300 rounded-md dark:bg-white dark:border-black dark:text-black uppercase shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 px-3 border"
              rows="4"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-5 md:mt-6 md:pt-10 mt-10 pt-10 pb-10 md:pb-0">
         
            <button
              type="button"
              className="bg-white text-blue-800 py-2 px-6 md:px-20 uppercase md:w-[200px] w-[150px] border border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold"
              onClick={() => window.history.back()}
            >
              Back
            </button>

              <button
              type="submit"
              className="bg-[#B31942] text-white uppercase py-2 px-6 md:px-20 md:w-[200px] w-[150px] rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-semibold text-center flex items-center justify-center"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ToxinExposureForm;