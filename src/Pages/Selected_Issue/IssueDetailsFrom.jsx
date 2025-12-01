import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

function IssueDetailsForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { categorizedConditions = {} } = location.state || {};

  const selectedConditions = Object.values(categorizedConditions).flat();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      conditions: selectedConditions.map((condition) => ({
        condition: condition,
        StartDate: "",
        details: "",
        exposureDetails: "",
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "conditions",
  });

  const onSubmit = (data) => {
    const result = Object.assign(
      {},
      ...data.conditions.map((item, i) => {
        const row = i + 1;
        return {
          [`current_disabilityiesrow${row}`]: item.condition,
          [`approximate_date_disabilityies_began_or_worsenedrow${row}`]:
            item.StartDate || "",
          [`explain_how_the_disabilityies_relates_to_the_inservice_eventexposureinjuryrow${row}`]:
            item.details || "",
          [`if_due_to_exposure_event_or_injury_please_specify_eg_agent_orange_radiation_burn_pitsrow${row}`]:
            item.exposureDetails || "",
        };
      })
    );

    console.log("Final VA Data:", result);

    localStorage.setItem("issues", JSON.stringify(result));

    const hasPTSD = Object.values(result).includes("PTSD");

    if (hasPTSD) {
      navigate("/ptsd_details", {
        state: { conditionDetails: result },
      });
    } else {
      navigate("/gulf_war_location", {
        state: { conditionDetails: result },
      });
    }
  };

  return (
    <section className="md:mb-10 mb-0 px-2 dark:bg-white md:py-28 md:mt-10 mt-0 min-h-[85vh] flex flex-col items-center justify-center">
      <div className="md:py-20 bg-white flex justify-center items-center md:p-4 p-2">
        <div className="w-full max-w-4xl bg-white md:shadow-md rounded-lg md:p-6">
          <h1 className="md:text-2xl text-xl font-bold text-blue-800 mb-6 text-center pt-28 md:pt-0">
            Provide detailed information regarding your selected issue(s)
          </h1>

          {selectedConditions.length === 0 ? (
            <p className="text-red-500 text-center">
              No conditions selected. Please go back and select at least one
              condition.
            </p>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      When Did The Problem Start or Worsen?
                    </label>

                    <input
                      type="text"
                      placeholder="1999-2010"
                      {...register(`conditions[${index}].StartDate`, {
                        required: "This field is required",
                        pattern: {
                          value: /^\d{4}-\d{4}$/,
                          message: "Use format YYYY-YYYY (example: 1999-2010)",
                        },
                      })}
                      className="mt-1 block w-full uppercase border-gray-300 rounded-md shadow-sm 
                    dark:bg-white dark:border-black dark:text-black 
                    focus:ring-blue-500 focus:border-blue-500 p-2 px-3 border"
                    />

                    {errors.conditions?.[index]?.StartDate && (
                      <span className="text-red-500 text-sm">
                        {errors.conditions[index].StartDate.message}
                      </span>
                    )}
                  </div>

                  {/* How it relates to service */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Explain How This Disability Relates to
                      Service/Event/Injury
                    </label>
                    <textarea
                      placeholder="Describe onset, symptoms, treatment, and connection to service..."
                      {...register(`conditions[${index}].details`)}
                      className="mt-1 block w-full border-gray-300 uppercase dark:bg-white dark:border-black dark:text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 px-3 border"
                      rows="4"
                    />
                  </div>

                  {/* Exposure Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 pb-1">
                      IF DUE TO EXPOSURE, EVENT, OR INJURY, PLEASE SPECIFY
                      (e.g., Agent Orange, radiation, burn pits)
                    </label>
                    <textarea
                      placeholder="Example: Burn pits in Iraq, Agent Orange in Vietnam, Gulf War..."
                      {...register(`conditions[${index}].exposureDetails`)}
                      className="mt-1 block w-full border-gray-300 uppercase dark:bg-white dark:border-black dark:text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 px-3 border"
                      rows="4"
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-center gap-4 mt-6 pb-5 md:pb-0">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="bg-white text-blue-800 py-2 px-6 uppercase md:px-20 md:w-[200px] w-[150px] border border-blue-800 rounded-md hover:bg-gray-100 font-semibold"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="bg-[#B31942] text-white py-2 md:flex items-center justify-center uppercase px-6 md:px-20 md:w-[200px] w-[150px] rounded-md hover:bg-[#aa2b4d] font-semibold"
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
