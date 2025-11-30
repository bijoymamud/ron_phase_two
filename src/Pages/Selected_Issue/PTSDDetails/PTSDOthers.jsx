// import { useForm, useWatch } from "react-hook-form";
// import { AlertCircle } from "lucide-react";

// const PTSDOthers = () => {
//   const {
//     register,
//     control,
//     formState: { errors },
//   } = useForm({
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

//   const watchedValues = useWatch({ control });

//   const behavioralChanges = [
//     {
//       key: "increased_decreased_visits_to_a_healthcare_professional_counselor_or_treatment_facility_checkbox",
//       title:
//         "Increased/Decreased visits to a healthcare professional, counselor, or treatment facility",
//     },
//     {
//       key: "request_for_a_change_in_occupational_series_or_duty_assignment_checkbox",
//       title: "Request for a change in occupational series or duty assignment",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_1",
//       title: "Increased/Decreased use of leave",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_2",
//       title: "Changes in performance or performance evaluations",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_3",
//       title: "Episodes of depression, panic attacks, or anxiety",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_4",
//       title: "Increased/Decreased use of prescription medications",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_5",
//       title: "Increased/Decreased use of over-the-counter medications",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_6",
//       title: "Increased/Decreased use of alcohol or drugs",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_7",
//       title: "Disciplinary or legal difficulties",
//     },
//     {
//       key: "behavioral_changes_experienced_following_the_traumatic_event_8",
//       title:
//         "Changes in eating habits, such as overeating or undereating, or significant changes in weight",
//     },
//     {
//       key: "pregnancy_tests_arround_the_time_of_the_traumatic_event",
//       title: "Pregnancy tests around the time of the traumatic event(s)",
//     },
//     {
//       key: "tests_for_sexually_transmitted_infections",
//       title: "Tests for sexually transmitted infections",
//     },
//     {
//       key: "economic_or_social_behavioral_changes",
//       title: "Economic or social behavioral changes",
//     },
//     {
//       key: "changes_in_or_breakup_of_a_significant_relationship",
//       title: "Changes in or breakup of a significant relationship",
//     },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto p-6 md:mt-10 bg-white rounded-xl shadow-sm border border-gray-200">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-[#0B2A52] mb-2">
//           Behavioral/Medical Changes Following Traumatic Event(s)
//         </h2>
//         <p className="text-gray-600">
//           Check any changes you experienced after the traumatic event(s).
//           Provide details if applicable.
//         </p>
//       </div>

//       <div className="space-y-6">
//         {behavioralChanges.map((item) => {
//           const isChecked = watchedValues[item.key];

//           return (
//             <div
//               key={item.key}
//               className={`border rounded-lg transition-all duration-300 overflow-hidden ${
//                 isChecked ? "border-[#0B2A52] bg-blue-50/30" : "border-gray-300"
//               }`}
//             >
//               <label
//                 className={`flex items-start p-5 cursor-pointer hover:bg-gray-50 transition ${
//                   isChecked ? "font-semibold" : ""
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   {...register(item.key)}
//                   className="w-5 h-5 mt-0.5 text-[#0B2A52] rounded focus:ring-[#0B2A52] border-gray-300"
//                 />
//                 <span className="ml-4 text-gray-800 leading-relaxed">
//                   {item.title}
//                 </span>
//               </label>

//               {/* Textarea appears only when checked */}
//               {isChecked && (
//                 <div className="px-5 pb-5 pt-3 animate-in fade-in slide-in-from-top-2">
//                   <label className="block text-sm font-medium text-[#0B2A52] mb-2">
//                     Please provide details{" "}
//                     <span className="text-red-600">(optional)</span>
//                   </label>
//                   <textarea
//                     {...register(`${item.key}_details`)}
//                     rows={3}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B2A52] focus:border-[#0B2A52] outline-none transition placeholder:text-gray-400"
//                     placeholder="Describe the change, frequency, dates, or any relevant details..."
//                   />
//                   {errors[`${item.key}_details`] && (
//                     <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                       <AlertCircle size={16} />
//                       {errors[`${item.key}_details`]?.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Optional: Helpful note */}
//       <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
//         <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
//         <p className="text-sm text-amber-900">
//           <strong>Note:</strong> Especially for Military Sexual Trauma (MST)
//           claims, documenting behavioral changes like increased leave,
//           performance decline, or medical visits can be strong supporting
//           evidence.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PTSDOthers;

import { useForm, useWatch } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

const PTSDOthers = () => {
  const { register, control, watch } = useForm({
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

  // Save to localStorage in real-time
  useEffect(() => {
    const subscription = watch((value) => {
      const data = {};

      Object.keys(value).forEach((key) => {
        if (key.endsWith("_details")) {
          const checkboxKey = key.replace("_details", "");
          if (value[checkboxKey]) {
            data[key] = value[key] || "";
          }
        } else {
          data[key] = value[key] || false;
        }
      });

      const existing = JSON.parse(
        localStorage.getItem("ptsdScreeningData") || "{}"
      );
      localStorage.setItem(
        "ptsdScreeningData",
        JSON.stringify({ ...existing, ...data })
      );
    });

    return () => subscription.unsubscribe();
  }, [watch]);

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
        Behavioral & Medical Changes After Trauma
      </h2>
      <p className="text-gray-600 mb-8">
        Check any changes you experienced. These are strong markers for VA
        claims.
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
                  className="w-6 h-6 mt-0.5 text-[#0B2A52] rounded "
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
                    className="w-full px-4 py-3 border dark:bg-white dark:text-gray-900 rounded-lg focus:ring-2  outline-none"
                    placeholder="When did this start? How often? Any records?"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-5 bg-amber-50 border-2 border-amber-300 rounded-xl">
        <div className="flex gap-3">
          <AlertCircle className="w-6 h-6 text-amber-700 flex-shrink-0" />
          <p className="text-amber-900">
            <strong>Important:</strong> These behavioral changes are powerful
            evidence — especially for MST and PTSD claims.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PTSDOthers;
