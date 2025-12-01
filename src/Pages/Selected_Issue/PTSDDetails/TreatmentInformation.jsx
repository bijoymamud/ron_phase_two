// import React from "react";
// import { useForm, useWatch } from "react-hook-form";
// import { AlertCircle } from "lucide-react";
// import { useEffect } from "react";

// const TreatmentInformation = () => {
//   const { register, control, watch, getValues } = useForm({
//     defaultValues: {
//       // Radio button for yes/no
//       have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a:
//         "",
//       // Checkboxes for treatment sources
//       private_helathcare_provider: false,
//       va_vet_center: false,
//       community_care: false,
//       va_medical_center_and_community_based_outpatient_clinics: false,
//       department_of_defense_military_treatment_facility: false,
//     },
//   });

//   // Save to localStorage in real-time
//   useEffect(() => {
//     const saveToStorage = () => {
//       const values = getValues();

//       // Transform for final output
//       const transformed = {
//         // Convert radio to two separate boolean fields
//         have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a_1:
//           values.have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a ===
//           "yes",
//         have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a_2:
//           values.have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a ===
//           "no",

//         // Treatment sources
//         private_helathcare_provider:
//           values.private_helathcare_provider || false,
//         va_vet_center: values.va_vet_center || false,
//         community_care: values.community_care || false,
//         va_medical_center_and_community_based_outpatient_clinics:
//           values.va_medical_center_and_community_based_outpatient_clinics ||
//           false,
//         department_of_defense_military_treatment_facility:
//           values.department_of_defense_military_treatment_facility || false,
//       };

//       localStorage.setItem("ptsdScreeningData", JSON.stringify(transformed));
//     };

//     const subscription = watch(() => {
//       saveToStorage();
//     });

//     // Initial save
//     saveToStorage();

//     return () => subscription.unsubscribe();
//   }, [watch, getValues]);

//   const formValues = useWatch({ control });

//   const hasReceivedTreatment =
//     formValues.have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a ===
//     "yes";

//   const treatmentSources = [
//     {
//       key: "private_helathcare_provider",
//       label: "PRIVATE HEALTHCARE PROVIDER (including non-Federal records)",
//     },
//     { key: "va_vet_center", label: "VA VET CENTER" },
//     { key: "community_care", label: "COMMUNITY CARE (Paid for by VA)" },
//     {
//       key: "va_medical_center_and_community_based_outpatient_clinics",
//       label:
//         "VA MEDICAL CENTER(S) (VAMC) AND COMMUNITY-BASED OUTPATIENT CLINICS (CBOC)",
//     },
//     {
//       key: "department_of_defense_military_treatment_facility",
//       label:
//         "DEPARTMENT OF DEFENSE (DOD) MILITARY TREATMENT FACILITY(IES) (MTF)",
//     },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
//       <h2 className="text-2xl font-bold text-[#0B2A52] mb-8">
//         HAVE YOU RECEIVED TREATMENT RELATED TO THE IMPACT OF THE TRAUMATIC
//         EVENT(S)
//       </h2>

//       {/* Yes / No - Radio Style */}
//       <div className="space-y-5 mb-10">
//         <label className="flex items-center p-6 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all border-2 border-transparent has-[:checked]:border-[#0B2A52] has-[:checked]:bg-blue-50">
//           <input
//             type="radio"
//             value="yes"
//             {...register(
//               "have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a"
//             )}
//             className="w-6 h-6 text-[#0B2A52] focus:ring-[#0B2A52]"
//           />
//           <span className="ml-4 text-xl font-semibold text-gray-800">YES</span>
//         </label>

//         <label className="flex items-center p-6 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all border-2 border-transparent has-[:checked]:border-[#0B2A52] has-[:checked]:bg-blue-50">
//           <input
//             type="radio"
//             value="no"
//             {...register(
//               "have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a"
//             )}
//             className="w-6 h-6 text-[#0B2A52] focus:ring-[#0B2A52]"
//           />
//           <span className="ml-4 text-xl font-semibold text-gray-800">NO</span>
//         </label>
//       </div>

//       {/* Show Treatment Sources Only When YES is Selected */}
//       {hasReceivedTreatment && (
//         <div className="mt-10 p-8 bg-blue-50 rounded-2xl border-2 border-[#0B2A52]/30 animate-in fade-in slide-in-from-top duration-500">
//           <h3 className="text-xl font-bold text-[#0B2A52] mb-6">
//             Where have you received treatment? (Check all that apply)
//           </h3>

//           <div className="space-y-5">
//             {treatmentSources.map((source) => (
//               <label
//                 key={source.key}
//                 className="flex items-start p-5 bg-white rounded-xl border border-gray-300 hover:border-[#0B2A52] cursor-pointer transition"
//               >
//                 <input
//                   type="checkbox"
//                   {...register(source.key)}
//                   className="w-6 h-6 mt-0.5 text-[#0B2A52] rounded focus:ring-[#0B2A52]"
//                 />
//                 <span className="ml-4 font-medium text-gray-800 leading-relaxed">
//                   {source.label}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TreatmentInformation;

// new code
import React from "react";
import { Plus, Trash2 } from "lucide-react";

const TreatmentInformation = ({ register, control, watch, setValue }) => {
  const hasReceivedTreatment =
    watch(
      "have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a"
    ) === "yes";

  const treatmentEvents = watch("treatmentEvents") || [];

  const addTreatmentEvent = () => {
    if (treatmentEvents.length < 3) {
      setValue("treatmentEvents", [
        ...treatmentEvents,
        { facility: "", month: "", year: "", dontHaveDate: false },
      ]);
    }
  };

  const removeTreatmentEvent = (index) => {
    setValue(
      "treatmentEvents",
      treatmentEvents.filter((_, i) => i !== index)
    );
  };

  const treatmentSources = [
    {
      key: "private_helathcare_provider",
      label: "PRIVATE HEALTHCARE PROVIDER (including non-Federal records)",
    },
    { key: "va_vet_center", label: "VA VET CENTER" },
    { key: "community_care", label: "COMMUNITY CARE (Paid for by VA)" },
    {
      key: "va_medical_center_and_community_based_outpatient_clinics",
      label:
        "VA MEDICAL CENTER(S) (VAMC) AND COMMUNITY-BASED OUTPATIENT CLINICS (CBOC)",
    },
    {
      key: "department_of_defense_military_treatment_facility",
      label:
        "DEPARTMENT OF DEFENSE (DOD) MILITARY TREATMENT FACILITY(IES) (MTF)",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-[#0B2A52] mb-8">
        HAVE YOU RECEIVED TREATMENT RELATED TO THE IMPACT OF THE TRAUMATIC
        EVENT(S)?
      </h2>

      {/* Yes / No */}
      <div className="space-y-5 mb-10">
        {["yes", "no"].map((value) => (
          <label
            key={value}
            className="flex items-center p-6 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all border-2 border-transparent has-[:checked]:border-[#0B2A52] has-[:checked]:bg-blue-50"
          >
            <input
              type="radio"
              value={value}
              {...register(
                "have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a"
              )}
              className="w-6 h-6 text-[#0B2A52] focus:ring-[#0B2A52]"
            />
            <span className="ml-4 text-xl font-semibold text-gray-800 uppercase">
              {value}
            </span>
          </label>
        ))}
      </div>

      {hasReceivedTreatment && (
        <div className="mt-12 space-y-10">
          {/* Where have you received treatment? */}
          <div className="p-8 bg-blue-50 rounded-2xl border-2 border-[#0B2A52]/30">
            <h3 className="text-xl font-bold text-[#0B2A52] mb-6">
              Where have you received treatment? (Check all that apply)
            </h3>
            <div className="space-y-4">
              {treatmentSources.map((source) => (
                <label
                  key={source.key}
                  className="flex items-start p-5 bg-white rounded-xl border border-gray-300 hover:border-[#0B2A52] cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    {...register(source.key)}
                    className="w-6 h-6 mt-0.5 text-[#0B2A52] rounded focus:ring-[#0B2A52]"
                  />
                  <span className="ml-4 font-medium text-gray-800 leading-relaxed">
                    {source.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Treatment Events */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#0B2A52]">
                Treatment Details
              </h3>
              {treatmentEvents.length < 3 && (
                <button
                  type="button"
                  onClick={addTreatmentEvent}
                  className="flex items-center gap-2 px-5 py-3 bg-[#0B2A52] text-white rounded-lg hover:bg-[#0b2a52]/90 transition font-medium"
                >
                  <Plus size={20} /> Add Treatment Event
                </button>
              )}
            </div>

            {treatmentEvents.length === 0 && (
              <p className="text-gray-600 italic">
                Click "Add Treatment Event" to provide details.
              </p>
            )}

            {treatmentEvents.map((event, index) => {
              const rowNum = index + 1;
              return (
                <div
                  key={index}
                  className="p-6 bg-gray-50 rounded-xl border-2 border-[#0B2A52]/20"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-[#0B2A52]">
                      Treatment Event #{rowNum}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeTreatmentEvent(index)}
                      className="text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      NAME AND LOCATION OF THE TREATMENT FACILITY
                    </label>
                    <input
                      type="text"
                      {...register(`treatmentEvents.${index}.facility`)}
                      placeholder="e.g., Walter Reed, Bethesda, MD"
                      className="w-full px-4 py-3 dark:bg-white dark:text-gray-900 border-2 border-gray-300 rounded-lg focus:border-[#0B2A52]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        DATE(S) OF TREATMENT (MM-YYYY)
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="MM"
                          maxLength={2}
                          {...register(`treatmentEvents.${index}.month`)}
                          className="w-24 px-4 py-3 border-2 border-gray-300 dark:bg-white dark:text-gray-900 rounded-lg text-center focus:border-[#0B2A52]"
                        />
                        <span className="self-center text-2xl text-gray-500">
                          -
                        </span>
                        <input
                          type="text"
                          placeholder="YYYY"
                          maxLength={4}
                          {...register(`treatmentEvents.${index}.year`)}
                          className="w-32 px-4 py-3 border-2 border-gray-300 dark:bg-white dark:text-gray-900 rounded-lg text-center focus:border-[#0B2A52]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register(`treatmentEvents.${index}.dontHaveDate`)}
                          className="w-6 h-6 text-[#0B2A52] rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          I don't have date(s)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentInformation;
