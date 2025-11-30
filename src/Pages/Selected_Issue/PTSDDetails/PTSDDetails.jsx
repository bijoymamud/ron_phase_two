// import { useFieldArray, useForm, useWatch } from "react-hook-form";
// import { Plus, Trash2, AlertCircle } from "lucide-react";
// import { useEffect } from "react";
// import PTSDOthers from "./PTSDOthers";

// const PTSDDetails = () => {
//   const {
//     register,
//     control,
//     formState: { errors },
//     watch,
//     getValues,
//   } = useForm({
//     defaultValues: {
//       combat_tramatic_event: false,
//       personal_traumatic_event_mst_no: false,
//       personal_traumatic_event_mst_yes: false,
//       other_traumatic_event: false,
//       traumaticEventDetails: [],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "traumaticEventDetails",
//   });

//   const watchedEvents = useWatch({
//     control,
//     name: [
//       "combat_tramatic_event",
//       "personal_traumatic_event_mst_no",
//       "personal_traumatic_event_mst_yes",
//       "other_traumatic_event",
//     ],
//   });

//   const watchedDetails = useWatch({
//     control,
//     name: "traumaticEventDetails",
//   });

//   useEffect(() => {
//     const formData = getValues();

//     const descriptionData = Object.assign(
//       {},
//       ...(formData.traumaticEventDetails.map((event, index) => ({
//         [`brief_description_of_the_traumatic_events_number_${index + 1}`]:
//           event.description,
//       })) ?? [])
//     );

//     const locationData = Object.assign(
//       {},
//       ...(formData.traumaticEventDetails.map((event, index) => ({
//         [`location_of_the_traumatic_events_number_${index + 1}`]:
//           event.location,
//       })) ?? [])
//     );

//     const dateData = Object.assign(
//       {},
//       ...(formData.traumaticEventDetails.map((event, index) => ({
//         [`dates_the_traumatic_events_occured_year_number_${index + 1}`]:
//           event.date,
//       })) ?? [])
//     );

//     // Combine all data
//     const allData = {
//       ...descriptionData,
//       ...locationData,
//       ...dateData,
//       combat_tramatic_event: formData.combat_tramatic_event,
//       personal_traumatic_event_mst_no: formData.personal_traumatic_event_mst_no,
//       personal_traumatic_event_mst_yes:
//         formData.personal_traumatic_event_mst_yes,
//       other_traumatic_event: formData.other_traumatic_event,
//     };

//     localStorage.setItem("ptsdScreeningData", JSON.stringify(allData));
//   }, [watchedEvents, watchedDetails, getValues]);

//   const hasAnyEventSelected =
//     watchedEvents &&
//     (watchedEvents[0] ||
//       watchedEvents[1] ||
//       watchedEvents[2] ||
//       watchedEvents[3]);

//   const addEvent = () => {
//     if (fields.length < 6) {
//       append({
//         description: "",
//         location: "",
//         date: "",
//       });
//     }
//   };

//   const removeEvent = (index) => {
//     remove(index);
//   };

//   return (
//     <div className="min-h-screen bg-white py-8 px-4 md:py-16 md:px-8 lg:px-20 md:pt-40">
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-12">
//           <h1 className="text-3xl md:text-3xl font-bold text-[#0B2A52] mb-3">
//             PTSD Screening
//           </h1>
//           <p className="text-base text-gray-600">
//             Please provide information about your traumatic experiences. Your
//             responses are confidential and will help us understand your needs.
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-1 h-5 bg-[#0B2A52] rounded-full"></div>
//             <h2 className="text-xl font-bold text-[#0B2A52]">
//               Traumatic Event(s)
//             </h2>
//           </div>
//           <p className="text-gray-600 mb-8 ml-4">
//             Select all that apply to your experience
//           </p>

//           <div className="space-y-4">
//             <label className="flex items-start p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer group">
//               <input
//                 type="checkbox"
//                 {...register("combat_tramatic_event")}
//                 className="w-5 h-5 mt-1 accent-[#0B2A52] border-gray-300 rounded focus:ring-2 focus:ring-[#0B2A52]/50 transition"
//               />
//               <div className="ml-4 flex-1">
//                 <span className="text-base font-semibold text-[#0B2A52] block">
//                   Combat Traumatic Event(s)
//                 </span>
//                 <span className="text-sm text-gray-600">
//                   Combat-related injuries or experiences
//                 </span>
//               </div>
//             </label>

//             <label className="flex items-start p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer group">
//               <input
//                 type="checkbox"
//                 {...register("personal_traumatic_event_mst_no")}
//                 className="w-5 h-5 mt-1 accent-[#0B2A52] border-gray-300 rounded focus:ring-2 focus:ring-[#0B2A52]/50 transition"
//               />
//               <div className="ml-4 flex-1">
//                 <span className="text-base font-semibold text-[#0B2A52] block">
//                   Personal Traumatic Event(s)
//                 </span>
//                 <span className="text-sm text-gray-600">
//                   Not involving military sexual trauma (MST)
//                 </span>
//               </div>
//             </label>

//             <label className="flex items-start p-4 bg-amber-50 hover:bg-amber-100/50 rounded-lg transition-colors cursor-pointer border border-amber-200">
//               <input
//                 type="checkbox"
//                 {...register("personal_traumatic_event_mst_yes")}
//                 className="w-5 h-5 mt-1 accent-[#0B2A52] border-gray-300 rounded focus:ring-2 focus:ring-[#0B2A52]/50 transition"
//               />
//               <div className="ml-4 flex-1">
//                 <span className="text-base font-semibold text-[#0B2A52] block">
//                   Personal Traumatic Event(s) - Military Sexual Trauma (MST)
//                 </span>
//                 <div className="flex items-start gap-2 mt-2 p-2 bg-white rounded border border-amber-200">
//                   <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
//                   <span className="text-sm text-amber-800">
//                     If selected, please review Section VI for additional
//                     resources
//                   </span>
//                 </div>
//               </div>
//             </label>

//             <label className="flex items-start p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer group">
//               <input
//                 type="checkbox"
//                 {...register("other_traumatic_event")}
//                 className="w-5 h-5 mt-1 accent-[#0B2A52] border-gray-300 rounded focus:ring-2 focus:ring-[#0B2A52]/50 transition"
//               />
//               <div className="ml-4 flex-1">
//                 <span className="text-base font-semibold text-[#0B2A52] block">
//                   Other Traumatic Event(s)
//                 </span>
//                 <span className="text-sm text-gray-600">
//                   Any other traumatic experiences
//                 </span>
//               </div>
//             </label>
//           </div>
//         </div>

//         {hasAnyEventSelected && (
//           <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold text-[#0B2A52]">
//                   Details of Traumatic Event(s)
//                 </h2>
//                 <p className="text-gray-600 text-sm mt-1">
//                   Provide information about each event you selected
//                 </p>
//               </div>
//               {fields.length < 6 && (
//                 <button
//                   type="button"
//                   onClick={addEvent}
//                   className="flex items-center gap-2 px-4 py-2 bg-[#0B2A52] hover:bg-[#091f3d] text-white rounded-lg font-semibold transition-all shadow-sm hover:shadow-md"
//                 >
//                   <Plus size={20} />
//                   <span className="hidden sm:inline">Add Event</span>
//                   <span className="text-sm opacity-75">
//                     ({fields.length}/6)
//                   </span>
//                 </button>
//               )}
//             </div>

//             {/* Event Cards */}
//             {fields.map((field, index) => (
//               <div
//                 key={field.id}
//                 className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
//               >
//                 <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-blue-50">
//                   <div>
//                     <h3 className="font-bold text-xl text-[#0B2A52]">
//                       Traumatic Event #{index + 1}
//                     </h3>
//                     <p className="text-sm text-gray-600 mt-1">
//                       Complete the details below
//                     </p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeEvent(index)}
//                     className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
//                   >
//                     <Trash2 size={18} />
//                     <span className="text-sm font-medium">Remove</span>
//                   </button>
//                 </div>

//                 <div className="p-6 space-y-6">
//                   {/* Description */}
//                   <div>
//                     <label className="block text-sm font-semibold text-[#0B2A52] mb-2">
//                       What happened?<span className="text-red-600">*</span>
//                     </label>
//                     <p className="text-xs text-gray-600 mb-3">
//                       Brief description of the event
//                     </p>
//                     <textarea
//                       {...register(
//                         `traumaticEventDetails.${index}.description`,
//                         {
//                           required: "Description is required",
//                         }
//                       )}
//                       className="w-full h-24 px-4 py-3 border  border-gray-300 dark:bg-white dark:text-gray-900 rounded-lg focus:ring-2 focus:ring-[#0B2A52]/50 focus:border-[#0B2A52] outline-none resize-none transition-all"
//                       placeholder="Describe the event briefly..."
//                     />
//                     {errors.traumaticEventDetails?.[index]?.description && (
//                       <p className="flex items-center gap-2 mt-2 text-red-600 text-sm">
//                         <AlertCircle size={16} />
//                         {
//                           errors.traumaticEventDetails[index].description
//                             .message
//                         }
//                       </p>
//                     )}
//                   </div>

//                   {/* Location */}
//                   <div>
//                     <label className="block text-sm font-semibold text-[#0B2A52] mb-2">
//                       Where did this happen?
//                       <span className="text-red-600">*</span>
//                     </label>
//                     <p className="text-xs text-gray-600 mb-3">
//                       Location where the event occurred (e.g., Iraq, Fort Bragg)
//                     </p>
//                     <input
//                       type="text"
//                       {...register(`traumaticEventDetails.${index}.location`, {
//                         required: "Location is required",
//                       })}
//                       className="w-full px-4 py-3 border border-gray-300 dark:bg-white dark:text-gray-900 rounded-lg focus:ring-2 focus:ring-[#0B2A52]/50 focus:border-[#0B2A52] outline-none transition-all placeholder:text-gray-400"
//                       placeholder="Enter location..."
//                     />
//                     {errors.traumaticEventDetails?.[index]?.location && (
//                       <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
//                         <AlertCircle size={16} />
//                         {errors.traumaticEventDetails[index].location.message}
//                       </div>
//                     )}
//                   </div>

//                   {/* Date */}
//                   <div>
//                     <label className="block text-sm font-semibold text-[#0B2A52] mb-2">
//                       When did this happen?
//                       <span className="text-red-600">*</span>
//                     </label>
//                     <p className="text-xs text-gray-600 mb-3">
//                       Date or approximate timeframe (e.g., June 2009, 2011–2013)
//                     </p>
//                     <input
//                       type="date"
//                       {...register(`traumaticEventDetails.${index}.date`, {
//                         required: "Date is required",
//                       })}
//                       className="w-full px-4 py-3 border border-gray-300 dark:bg-white dark:text-gray-900 rounded-lg focus:ring-2 focus:ring-[#0B2A52]/50 focus:border-[#0B2A52] outline-none transition-all placeholder:text-gray-400"
//                       placeholder="Enter date or timeframe..."
//                     />
//                     {errors.traumaticEventDetails?.[index]?.date && (
//                       <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
//                         <AlertCircle size={16} />
//                         {errors.traumaticEventDetails[index].date.message}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* Max Limit Alert */}
//             {fields.length === 6 && (
//               <div className="flex items-center gap-3 p-4 bg-blue-50 border border-[#0B2A52]/30 rounded-lg">
//                 <AlertCircle className="w-5 h-5 text-[#0B2A52] flex-shrink-0" />
//                 <span className="text-sm font-medium text-[#0B2A52]">
//                   Maximum of 6 events reached.
//                 </span>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Optional: Show a subtle hint when nothing is selected */}
//         {!hasAnyEventSelected && fields.length === 0 && (
//           <div className="text-center py-12 text-gray-500">
//             <p>Select at least one traumatic event above to provide details.</p>
//           </div>
//         )}
//       </div>

//       <div>
//         <PTSDOthers />
//       </div>
//     </div>
//   );
// };

// export default PTSDDetails;

import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Plus, Trash2, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import PTSDOthers from "./PTSDOthers";

const PTSDDetails = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      combat_tramatic_event: false,
      personal_traumatic_event_mst_no: false,
      personal_traumatic_event_mst_yes: false,
      other_traumatic_event: false,
      traumaticEventDetails: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "traumaticEventDetails",
  });

  const watchedEvents = useWatch({
    control,
    name: [
      "combat_tramatic_event",
      "personal_traumatic_event_mst_no",
      "personal_traumatic_event_mst_yes",
      "other_traumatic_event",
    ],
  });

  const hasAnyEventSelected = watchedEvents?.some(Boolean);

  const addEvent = () => {
    if (fields.length < 6) {
      append({ description: "", location: "", date: "" });
    }
  };

  useEffect(() => {
    const subscription = watch((value) => {
      const eventDetails = value.traumaticEventDetails || [];

      const transformed = {
        combat_tramatic_event: value.combat_tramatic_event || false,
        personal_traumatic_event_mst_no:
          value.personal_traumatic_event_mst_no || false,
        personal_traumatic_event_mst_yes:
          value.personal_traumatic_event_mst_yes || false,
        other_traumatic_event: value.other_traumatic_event || false,

        // Transform dynamic event fields
        ...eventDetails.reduce((acc, event, index) => {
          const num = index + 1;
          return {
            ...acc,
            [`brief_description_of_the_traumatic_events_number_${num}`]:
              event.description || "",
            [`location_of_the_traumatic_events_number_${num}`]:
              event.location || "",
            [`dates_the_traumatic_events_occured_year_number_${num}`]:
              event.date || "",
          };
        }, {}),
      };

      const existing = JSON.parse(
        localStorage.getItem("ptsdScreeningData") || "{}"
      );
      localStorage.setItem(
        "ptsdScreeningData",
        JSON.stringify({ ...existing, ...transformed })
      );
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:py-16 md:px-8 lg:px-20 md:pt-40">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-3xl font-bold text-[#0B2A52] mb-4">
            PTSD Screening Form
          </h1>
          <p className="text-base text-gray-600">
            Your responses help build a strong VA disability claim. All data is
            saved automatically.
          </p>
        </div>

        {/* Traumatic Events Checkboxes */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-[#0B2A52] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#0B2A52]">
              Traumatic Event(s)
            </h2>
          </div>
          <p className="text-gray-600 mb-8 ml-4">
            Select all that apply to your experience
          </p>

          <div className="space-y-5">
            {[
              {
                name: "combat_tramatic_event",
                label: "Combat Traumatic Event(s)",
                desc: "Combat-related injuries or experiences",
              },
              {
                name: "personal_traumatic_event_mst_no",
                label: "Personal Traumatic Event(s)",
                desc: "Not involving military sexual trauma (MST)",
              },
              {
                name: "personal_traumatic_event_mst_yes",
                label:
                  "Personal Traumatic Event(s) - Military Sexual Trauma (MST)",
                desc: "If selected, review Section VI for resources",
                mst: true,
              },
              {
                name: "other_traumatic_event",
                label: "Other Traumatic Event(s)",
                desc: "Any other traumatic experiences",
              },
            ].map((item) => (
              <label
                key={item.name}
                className={`flex items-start p-5 rounded-xl transition-all cursor-pointer group ${
                  item.mst
                    ? "bg-amber-50 border border-amber-200"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  {...register(item.name)}
                  className="w-6 h-6 mt-0.5 text-[#0B2A52] rounded focus:ring-[#0B2A52]"
                />
                <div className="ml-4 flex-1">
                  <span className="block font-semibold text-[#0B2A52]">
                    {item.label}
                  </span>
                  <span className="text-sm text-gray-600">{item.desc}</span>
                  {item.mst && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-amber-300 flex gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <span className="text-sm text-amber-800">
                        Important MST resources available in Section VI
                      </span>
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Dynamic Event Details */}
        {hasAnyEventSelected && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#0B2A52]">
                Details of Traumatic Event(s)
              </h2>
              {fields.length < 6 && (
                <button
                  onClick={addEvent}
                  className="flex items-center gap-2 px-5 py-3 bg-[#0B2A52] hover:bg-[#091f3d] text-white rounded-lg font-medium transition"
                >
                  <Plus size={20} /> Add Event ({fields.length}/6)
                </button>
              )}
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="bg-white rounded-2xl border border-gray-300 shadow-md overflow-hidden"
              >
                <div className="flex justify-between items-center p-6 bg-blue-50 border-b">
                  <h3 className="text-xl font-bold text-[#0B2A52]">
                    Event #{index + 1}
                  </h3>
                  <button
                    onClick={() => remove(index)}
                    className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg border border-red-200 flex items-center gap-2"
                  >
                    <Trash2 size={18} /> Remove
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <label className="block font-semibold text-[#0B2A52] mb-2">
                      What happened? *
                    </label>
                    <textarea
                      {...register(
                        `traumaticEventDetails.${index}.description`,
                        { required: "Required" }
                      )}
                      rows={4}
                      className="w-full px-4 py-3 border dark:bg-white dark:text-gray-900 rounded-lg focus:ring-2 focus:ring-[#0B2A52] outline-none"
                      placeholder="Brief description..."
                    />
                    {errors.traumaticEventDetails?.[index]?.description && (
                      <p className="mt-1 text-red-600 text-sm">
                        Description is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-[#0B2A52] mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      {...register(`traumaticEventDetails.${index}.location`, {
                        required: "Required",
                      })}
                      className="w-full px-4 py-3 border dark:bg-white dark:text-gray-900 rounded-lg focus:ring-2 focus:ring-[#0B2A52] outline-none"
                      placeholder="e.g., Iraq, Fort Bragg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#0B2A52] mb-2">
                      Date(s) *
                    </label>
                    <input
                      type="text"
                      {...register(`traumaticEventDetails.${index}.date`, {
                        required: "Required",
                      })}
                      className="w-full px-4 py-3 border rounded-lg dark:bg-white dark:text-gray-900 focus:ring-2 focus:ring-[#0B2A52] outline-none"
                      placeholder="e.g., June 2009, 2011–2013"
                    />
                  </div>
                </div>
              </div>
            ))}

            {fields.length === 6 && (
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg text-amber-900">
                Maximum 6 events. Contact support to add more.
              </div>
            )}
          </div>
        )}

        {/* Behavioral Changes Section */}
        <PTSDOthers />
      </div>
    </div>
  );
};

export default PTSDDetails;
