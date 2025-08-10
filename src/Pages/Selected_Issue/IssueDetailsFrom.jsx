 import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

function IssueDetailsForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { categorizedConditions = {} } = location.state || {};

  const selectedConditions = Object.values(categorizedConditions).flat();

  const { register, control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      conditions: selectedConditions.map((condition) => ({
        condition: condition,
        details: '',
        StartDate: '',
        Location: { left: false, right: false, both: false },
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'conditions',
  });

  const onSubmit = (data) => {
 
    const transformedData = {
      Specify_Type_Of_Exposure_Event_Or_Injury: data.conditions.map((item) => item.condition),
      ExplainHowDisabilityRelatesToEvent_Exposure_Injury: data.conditions.map((item) => item.details),
      StartDate: data.conditions.map((item) => item.StartDate),
      Location: data.conditions.map((item) => item.Location),
    };
    console.log('Submitted Data:', transformedData);
    localStorage.setItem('conditionDetails', JSON.stringify(transformedData));
    navigate('/gulf_war_location', { state: { conditionDetails: transformedData } });
  };

  const renderLocationCheckboxes = (index) => {
    const locationField = `conditions[${index}].Location`;
    const locationValues = watch(locationField) || {};

    React.useEffect(() => {
      const values = Object.values(locationValues);
      const checkedCount = values.filter(Boolean).length;

      if (checkedCount > 1) {
        const firstCheckedKey = Object.keys(locationValues).find((key) => locationValues[key]);
        Object.keys(locationValues).forEach((key) => {
          if (key !== firstCheckedKey) {
            locationValues[key] = false;
          }
        });
      }
    }, [locationValues]);

    return (
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register(`${locationField}.left`)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-blue-800">Left</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register(`${locationField}.right`)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-blue-800">Right</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register(`${locationField}.both`)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-blue-800">Both</span>
        </label>
      </div>
    );
  };

  return (
    <section className="md:mt-44 md:mb-10 mb-0 px-2 dark:bg-white md:min-h-screen min-h-[85vh] flex flex-col items-center justify-center">
      <div className=" md:py-20  bg-white flex justify-center items-center md:p-4 p-2">
        <div className="w-full max-w-4xl bg-white md:shadow-md rounded-lg md:p-6">
          <h1 className="md:text-2xl text-xl font-bold text-blue-800 mb-6 text-center">
            Provide detailed information regarding your selected issue(s)
          </h1>

          {selectedConditions.length === 0 ? (
            <p className="text-red-500 text-center">No conditions selected. Please go back and select at least one condition.</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4">
                  <h2 className="md:text-xl font-semibold text-blue-800">
                    {index + 1}. {field.condition}
                  </h2>

                  <input
                    type="hidden"
                    {...register(`conditions[${index}].condition`)}
                  />

                  {/* When Did The Problem Start */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      When Did The Problem Start?
                    </label>
                    <input
                      type="date"
                      {...register(`conditions[${index}].StartDate`, {
                        required: 'This field is required',
                      })}
                      className="mt-1 block w-full uppercase border-gray-300 rounded-md shadow-sm dark:bg-white dark:border-black dark:text-black focus:ring-blue-500 focus:border-blue-500 p-2 px-3 border"
                    />
                    {errors.conditions?.[index]?.StartDate && (
                      <span className="text-red-500 text-sm">
                        {errors.conditions[index].StartDate.message}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Details</label>
                    <textarea
                    placeholder='Enter details'
                      {...register(`conditions[${index}].details`)}
                      className="mt-1 block w-full border-gray-300 uppercase dark:bg-white dark:border-black dark:text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 px-3 border"
                      rows="4"
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-center gap-4 mt-6 pb-5 md:pb-0">
               
                <button
                  type="button"
                  className="bg-white text-blue-800 py-2 px-6 uppercase md:px-20 md:w-[200px] w-[150px] border border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>

            <button
                  type="submit"
                  className="bg-[#B31942] text-white py-2 md:flex items-center justify-center uppercase px-6 md:px-20 md:w-[200px] w-[150px] rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-semibold"
                >
                  Continue
                </button>

              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default IssueDetailsForm;
