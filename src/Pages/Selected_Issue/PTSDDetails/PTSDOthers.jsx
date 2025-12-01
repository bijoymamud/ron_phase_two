// import { useForm, useWatch } from "react-hook-form";
// import { AlertCircle } from "lucide-react";
// import { useEffect } from "react";

// const PTSDOthers = () => {
//   const { register, control, watch } = useForm({
//     defaultValues: {
//       increased_decreased_visits_to_a_healthcare_professional_counselor_or_treatment_facility_checkbox: false,
//       request_for_a_change_in_occupational_series_or_duty_assignment_checkbox: false,
//       behavioral_changes_experienced_following_the_traumatic_event_1: false,
//       behavioral_changes_experienced_following_the_traumatic_event_2: false,
//       behavioral_changes_experienced_following_the_traumatic_event_3: false,
//       behavioral_changes_experienced_following_the_traumatic_event_4: false,
//       behavioral_changes_experienced_following_the_traumatic_event_5: false,
//       behavioral_changes_experienced_following_the_traumatic_event_6: false,
//       behavioral_changes_experienced_following_the_traumatic_event_7: false,
//       behavioral_changes_experienced_following_the_traumatic_event_8: false,
//       pregnancy_tests_arround_the_time_of_the_traumatic_event: false,
//       tests_for_sexually_transmitted_infections: false,
//       economic_or_social_behavioral_changes: false,
//       changes_in_or_breakup_of_a_significant_relationship: false,
//     },
//   });

//   // Save to temporary localStorage in real-time (will be moved to ptsdDetailsInfo on Continue)
//   useEffect(() => {
//     const subscription = watch((value) => {
//       const data = {};

//       Object.keys(value).forEach((key) => {
//         if (key.endsWith("_details")) {
//           // Only save details if the corresponding checkbox is checked
//           const checkboxKey = key.replace("_details", "");
//           if (value[checkboxKey] && value[key]) {
//             data[key] = value[key];
//           }
//         } else {
//           // Only save checked checkboxes
//           if (value[key]) {
//             data[key] = value[key];
//           }
//         }
//       });

//       // Save to temporary storage (will be merged on Continue button click)
//       localStorage.setItem("ptsdOthersTemp", JSON.stringify(data));
//     });

//     return () => subscription.unsubscribe();
//   }, [watch]);

//   const formValues = useWatch({ control });

//   const items = [
//     {
//       key: "increased_decreased_visits_to_a_healthcare_professional_counselor_or_treatment_facility_checkbox",
//       label:
//         "Increased/Decreased visits to a healthcare professional, counselor, or treatment facility",
//     },
//     {
//       key: "request_for_a_change_in_occupational_series_or_duty_assignment_checkbox",
//       label: "Request for a change in occupational series or duty assignment",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_1",
//       label: "Increased/Decreased use of leave",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_2",
//       label: "Changes in performance or performance evaluations",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_3",
//       label: "Episodes of depression, panic attacks, or anxiety",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_4",
//       label: "Increased/Decreased use of prescription medications",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_5",
//       label: "Increased/Decreased use of over-the-counter medications",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_6",
//       label: "Increased/Decreased use of alcohol or drugs",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_7",
//       label: "Disciplinary or legal difficulties",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_8",
//       label: "Changes in eating habits or significant weight changes",
//     },
//     {
//       key: "pregnancy_tests_arround_the_time_of_the_traumatic_event",
//       label: "Pregnancy tests around the time of the traumatic event(s)",
//     },
//     {
//       key: "tests_for_sexually_transmitted_infections",
//       label: "Tests for sexually transmitted infections",
//     },
//     {
//       key: "economic_or_social_behavioral_changes",
//       label: "Economic or social behavioral changes",
//     },
//     {
//       key: "changes_in_or_breakup_of_a_significant_relationship",
//       label: "Changes in or breakup of a significant relationship",
//     },
//   ];

//   return (
//     <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
//       <h2 className="text-2xl font-bold text-[#0B2A52] mb-3">
//         BRIEF DESCRIPTION OF THE TRAUMATIC EVENT(S), INCLUDING LOCATION AND
//         DATE(S) OCCURRED
//       </h2>
//       <p className="text-gray-600 mb-8">
//         Include what happened, where it happened (unit assignment, duty station,
//         city/state/country, residence, off-base, etc.), and approximate date(s)
//         – month/year or range of dates acceptable
//       </p>

//       <div className="space-y-5">
//         {items.map((item) => {
//           const checked = formValues[item.key];

//           return (
//             <div
//               key={item.key}
//               className={`border-2 rounded-xl transition-all ${
//                 checked
//                   ? "border-[#0B2A52] dark:bg-white bg-blue-50"
//                   : "border-gray-300"
//               }`}
//             >
//               <label className="flex items-start p-5 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   {...register(item.key)}
//                   className="w-6 h-6 mt-0.5 text-[#0B2A52] rounded "
//                 />
//                 <span className="ml-4 text-gray-800 leading-relaxed">
//                   {item.label}
//                 </span>
//               </label>

//               {checked && (
//                 <div className="px-5 pb-5">
//                   <textarea
//                     {...register(`${item.key}_details`)}
//                     rows={3}
//                     className="w-full px-4 py-3 border dark:bg-white dark:text-gray-900 rounded-lg focus:ring-2 focus:ring-[#0B2A52] outline-none"
//                     placeholder="When did this start? How often? Any records?"
//                   />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       <div className="mt-8 p-5 bg-amber-50 border-2 border-amber-300 rounded-xl">
//         <div className="flex gap-3">
//           <AlertCircle className="w-6 h-6 text-amber-700 flex-shrink-0" />
//           <p className="text-amber-900">
//             <strong>Important:</strong> These behavioral changes are powerful
//             evidence — especially for MST and PTSD claims.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PTSDOthers;

import { useForm, useWatch } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

const PTSDOthers = () => {
  const { register, control, watch, getValues } = useForm({
    defaultValues: {
      increased_decreased_visits_to_a_healthcare_professional_counselor_or_treatment_facility_checkbox: false,
      request_for_a_change_in_occupational_series_or_duty_assignment_checkbox: false,
      behavioral_changes_experienced_following_the_traumatic_event_1: false,
      behavioral_changes_experienced_following_the_traumatic_event_2: false,
      behavioral_changes_experienced_following_the_traumatic_event_3: false,
      behavioral_changes_experienced_following_the_traumatic_event_4: false,
      behavioral_changes_experienced_following_the_traumatic_event_5: false,
      behavioral_changes_experienced_following_the_traumatic_event_6: false,
      behavioral_changes_experienced_following_the_traumatic_event_7: false,
      behavioral_changes_experienced_following_the_traumatic_event_8: false,
      pregnancy_tests_arround_the_time_of_the_traumatic_event: false,
      tests_for_sexually_transmitted_infections: false,
      economic_or_social_behavioral_changes: false,
      changes_in_or_breakup_of_a_significant_relationship: false,
    },
  });

  // Save to temporary localStorage in real-time
  useEffect(() => {
    const saveToStorage = () => {
      const values = getValues();
      const data = {};

      Object.keys(values).forEach((key) => {
        if (key.endsWith("_details")) {
          // Save details field with proper name
          data[key] = values[key] || "";
        } else {
          // Save checkbox value
          data[key] = values[key];
        }
      });

      localStorage.setItem("ptsdOthersTemp", JSON.stringify(data));
    };

    const subscription = watch(() => {
      saveToStorage();
    });

    // Initial save
    saveToStorage();

    return () => subscription.unsubscribe();
  }, [watch, getValues]);

  const formValues = useWatch({ control });

  const items = [
    {
      key: "increased_decreased_visits_to_a_healthcare_professional_counselor_or_treatment_facility_checkbox",
      label:
        "Increased/Decreased visits to a healthcare professional, counselor, or treatment facility",
    },
    {
      key: "request_for_a_change_in_occupational_series_or_duty_assignment_checkbox",
      label: "Request for a change in occupational series or duty assignment",
    },
    {
      key: "behavioral_changes_experienced_following_the_traumatic_event_1",
      label: "Increased/Decreased use of leave",
    },
    {
      key: "behavioral_changes_experienced_following_the_traumatic_event_2",
      label: "Changes in performance or performance evaluations",
    },
    {
      key: "behavioral_changes_experienced_following_the_traumatic_event_3",
      label: "Episodes of depression, panic attacks, or anxiety",
    },
    {
      key: "behavioral_changes_experienced_following_the_traumatic_event_4",
      label: "Increased/Decreased use of prescription medications",
    },
    {
      key: "behavioral_changes_experienced_following_the_traumatic_event_5",
      label: "Increased/Decreased use of over-the-counter medications",
    },
    {
      key: "behavioral_changes_experienced_following_the_traumatic_event_6",
      label: "Increased/Decreased use of alcohol or drugs",
    },
    {
      key: "behavioral_changes_experienced_following_the_traumatic_event_7",
      label: "Disciplinary or legal difficulties",
    },
    {
      key: "behavioral_changes_experienced_following_the_traumatic_event_8",
      label: "Changes in eating habits or significant weight changes",
    },
    {
      key: "pregnancy_tests_arround_the_time_of_the_traumatic_event",
      label: "Pregnancy tests around the time of the traumatic event(s)",
    },
    {
      key: "tests_for_sexually_transmitted_infections",
      label: "Tests for sexually transmitted infections",
    },
    {
      key: "economic_or_social_behavioral_changes",
      label: "Economic or social behavioral changes",
    },
    {
      key: "changes_in_or_breakup_of_a_significant_relationship",
      label: "Changes in or breakup of a significant relationship",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-[#0B2A52] mb-3">
        BRIEF DESCRIPTION OF THE TRAUMATIC EVENT(S), INCLUDING LOCATION AND
        DATE(S) OCCURRED
      </h2>
      <p className="text-gray-600 mb-8">
        Include what happened, where it happened (unit assignment, duty station,
        city/state/country, residence, off-base, etc.), and approximate date(s)
        – month/year or range of dates acceptable
      </p>

      <div className="space-y-5">
        {items.map((item) => {
          const checked = formValues[item.key];

          return (
            <div
              key={item.key}
              className={`border-2 rounded-xl transition-all ${
                checked
                  ? "border-[#0B2A52] dark:bg-white bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <label className="flex items-start p-5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register(item.key)}
                  className="w-6 h-6 mt-0.5 text-[#0B2A52] rounded"
                />
                <span className="ml-4 text-gray-800 leading-relaxed">
                  {item.label}
                </span>
              </label>

              {checked && (
                <div className="px-5 pb-5">
                  <textarea
                    {...register(`${item.key}_details`)}
                    rows={3}
                    className="w-full px-4 py-3 border dark:bg-white dark:text-gray-900 rounded-lg focus:ring-2 focus:ring-[#0B2A52] outline-none"
                    placeholder="When did this start? How often? Any records?"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PTSDOthers;
