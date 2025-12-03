// import { useFieldArray, useForm, useWatch } from "react-hook-form";
// import { Plus, Trash2, AlertCircle } from "lucide-react";
// import { useState } from "react";
// import PTSDOthers from "./PTSDOthers";
// import OfficialReportSection from "./OfficialReportSection";
// import TreatmentInformation from "./TreatmentInformation";

// const PTSDDetails = () => {
//   const {
//     register,
//     control,
//     watch,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       combat_tramatic_event: false,
//       personal_traumatic_event_mst_no: false,
//       personal_traumatic_event_mst_yes: false,
//       other_traumatic_event: false,
//       traumaticEventDetails: [],
//       was_an_official_report_field_YES: false,
//       was_an_official_report_field_NO: false,
//       was_an_official_report_field_RESTRICTED: false,
//       was_an_official_report_field_UNRESTRICTED: false,
//       was_an_official_report_field_NEITHER: false,
//       was_an_official_report_field_POLICE_REPORT: false,
//       iii_11_police_report_descrption: "",
//       was_an_official_report_field_OTHER: false,
//       iii_11_other_description: "",
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

//   const hasAnyEventSelected = watchedEvents?.some(Boolean);

//   const addEvent = () => {
//     if (fields.length < 6) {
//       append({ description: "", location: "", date: "" });
//     }
//   };

//   const handleContinue = () => {
//     const allValues = getValues();

//     // Get PTSDOthers values from localStorage temporarily
//     const ptsdOthersData = JSON.parse(
//       localStorage.getItem("ptsdOthersTemp") || "{}"
//     );

//     const eventDetails = allValues.traumaticEventDetails || [];

//     // Only save selected/filled data
//     const dataToSave = {
//       // Traumatic events
//       ...(allValues.combat_tramatic_event && {
//         combat_tramatic_event: true,
//       }),
//       ...(allValues.personal_traumatic_event_mst_no && {
//         personal_traumatic_event_mst_no: true,
//       }),
//       ...(allValues.personal_traumatic_event_mst_yes && {
//         personal_traumatic_event_mst_yes: true,
//       }),
//       ...(allValues.other_traumatic_event && {
//         other_traumatic_event: true,
//       }),

//       // Official report fields
//       ...(allValues.was_an_official_report_field_YES && {
//         was_an_official_report_field_YES: true,
//       }),
//       ...(allValues.was_an_official_report_field_NO && {
//         was_an_official_report_field_NO: true,
//       }),
//       ...(allValues.was_an_official_report_field_RESTRICTED && {
//         was_an_official_report_field_RESTRICTED: true,
//       }),
//       ...(allValues.was_an_official_report_field_UNRESTRICTED && {
//         was_an_official_report_field_UNRESTRICTED: true,
//       }),
//       ...(allValues.was_an_official_report_field_NEITHER && {
//         was_an_official_report_field_NEITHER: true,
//       }),
//       ...(allValues.was_an_official_report_field_POLICE_REPORT && {
//         was_an_official_report_field_POLICE_REPORT: true,
//       }),
//       ...(allValues.iii_11_police_report_descrption && {
//         iii_11_police_report_descrption:
//           allValues.iii_11_police_report_descrption,
//       }),
//       ...(allValues.was_an_official_report_field_OTHER && {
//         was_an_official_report_field_OTHER: true,
//       }),
//       ...(allValues.iii_11_other_description && {
//         iii_11_other_description: allValues.iii_11_other_description,
//       }),

//       // Transform dynamic event fields
//       ...eventDetails.reduce((acc, event, index) => {
//         const num = index + 1;
//         if (event.description || event.location || event.date) {
//           return {
//             ...acc,
//             ...(event.description && {
//               [`brief_description_of_the_traumatic_events_number_${num}`]:
//                 event.description,
//             }),
//             ...(event.location && {
//               [`location_of_the_traumatic_events_number_${num}`]:
//                 event.location,
//             }),
//             ...(event.date && {
//               [`dates_the_traumatic_events_occured_year_number_${num}`]:
//                 event.date,
//             }),
//           };
//         }
//         return acc;
//       }, {}),

//       ...ptsdOthersData,
//     };

//     localStorage.setItem("ptsdDetailsInfo", JSON.stringify(dataToSave));

//     localStorage.removeItem("ptsdOthersTemp");

//     console.log("Data saved successfully:", dataToSave);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 md:py-16 md:px-8 lg:px-20 md:pt-40">
//       <div className="max-w-4xl mx-auto space-y-12">
//         {/* Header */}
//         <div className="text-center md:text-left">
//           <h1 className="text-4xl md:text-3xl font-bold text-[#0B2A52] mb-1">
//             Information about PTSD
//           </h1>
//           <p className="text-base text-gray-600">
//             Your responses help build a strong VA disability claim. All data is
//             saved automatically.
//           </p>
//         </div>

//         {/* Traumatic Events Checkboxes */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-1 h-6 bg-[#0B2A52] rounded-full"></div>
//             <h2 className="text-2xl font-bold text-[#0B2A52]">
//               Traumatic Event(s)
//             </h2>
//           </div>
//           <p className="text-gray-600 mb-8 ml-4">
//             SELECT THE TYPE OF IN-SERVICE TRAUMATIC EVENT(S) YOU EXPERIENCED
//             <br />
//             (Check more than one, if applicable)
//           </p>

//           <div className="space-y-5">
//             {[
//               {
//                 name: "combat_tramatic_event",
//                 label: "Combat Traumatic Event(s)",
//                 desc: "Combat-related injuries or experiences",
//               },
//               {
//                 name: "personal_traumatic_event_mst_no",
//                 label: "Personal Traumatic Event(s)",
//                 desc: "Not involving military sexual trauma (MST)",
//               },
//               {
//                 name: "personal_traumatic_event_mst_yes",
//                 label:
//                   "Personal Traumatic Event(s) - Military Sexual Trauma (MST)",
//                 desc: "If selected, review Section VI for resources",
//                 mst: true,
//               },
//               {
//                 name: "other_traumatic_event",
//                 label: "Other Traumatic Event(s)",
//                 desc: "Any other traumatic experiences",
//               },
//             ].map((item) => (
//               <label
//                 key={item.name}
//                 className={`flex items-start p-5 rounded-xl transition-all cursor-pointer group ${
//                   item.mst
//                     ? "bg-amber-50 border border-amber-200"
//                     : "bg-gray-50 hover:bg-gray-100"
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   {...register(item.name)}
//                   className="w-6 h-6 mt-0.5 text-[#0B2A52] rounded focus:ring-[#0B2A52]"
//                 />
//                 <div className="ml-4 flex-1">
//                   <span className="block font-semibold text-[#0B2A52]">
//                     {item.label}
//                   </span>
//                   <span className="text-sm text-gray-600">{item.desc}</span>
//                   {item.mst && (
//                     <div className="mt-3 p-3 bg-white rounded-lg border border-amber-300 flex gap-2">
//                       <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
//                       <span className="text-sm text-amber-800">
//                         Important MST resources available in Section VI
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Dynamic Event Details */}
//         {hasAnyEventSelected && (
//           <div className="space-y-8">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-bold text-[#0B2A52]">
//                 Details of Traumatic Event(s)
//               </h2>
//               {fields.length < 6 && (
//                 <button
//                   type="button"
//                   onClick={addEvent}
//                   className="flex items-center gap-2 px-5 py-3 bg-[#0B2A52] hover:bg-[#091f3d] text-white rounded-lg font-medium transition"
//                 >
//                   <Plus size={20} /> Add Event ({fields.length}/6)
//                 </button>
//               )}
//             </div>

//             {fields.map((field, index) => (
//               <div
//                 key={field.id}
//                 className="bg-white rounded-2xl border border-gray-300 shadow-md overflow-hidden"
//               >
//                 <div className="flex justify-between items-center p-6 bg-blue-50 border-b">
//                   <h3 className="text-xl font-bold text-[#0B2A52]">
//                     Traumatic Event #{index + 1}
//                   </h3>
//                   <button
//                     type="button"
//                     onClick={() => remove(index)}
//                     className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg border border-red-200 flex items-center gap-2"
//                   >
//                     <Trash2 size={18} /> Remove
//                   </button>
//                 </div>

//                 <div className="p-6 space-y-6">
//                   <div>
//                     <label className="block font-semibold text-[#0B2A52] mb-2">
//                       What happened? *
//                     </label>
//                     <textarea
//                       {...register(
//                         `traumaticEventDetails.${index}.description`,
//                         { required: "Required" }
//                       )}
//                       rows={4}
//                       className="w-full px-4 py-3 border dark:bg-white dark:text-gray-900 rounded-lg focus:ring-2 focus:ring-[#0B2A52] outline-none"
//                       placeholder="Brief description..."
//                     />
//                     {errors.traumaticEventDetails?.[index]?.description && (
//                       <p className="mt-1 text-red-600 text-sm">
//                         Description is required
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block font-semibold text-[#0B2A52] mb-2">
//                       Location *
//                     </label>
//                     <input
//                       type="text"
//                       {...register(`traumaticEventDetails.${index}.location`, {
//                         required: "Required",
//                       })}
//                       className="w-full px-4 py-3 border dark:bg-white dark:text-gray-900 rounded-lg focus:ring-2 focus:ring-[#0B2A52] outline-none"
//                       placeholder="e.g., Iraq, Fort Bragg"
//                     />
//                   </div>

//                   <div>
//                     <label className="block font-semibold text-[#0B2A52] mb-2">
//                       Date(s) *
//                     </label>
//                     <input
//                       type="date"
//                       {...register(`traumaticEventDetails.${index}.date`, {
//                         required: "Required",
//                       })}
//                       className="w-full px-4 py-3 border rounded-lg dark:bg-white dark:text-gray-900 focus:ring-2 focus:ring-[#0B2A52] outline-none"
//                       placeholder="e.g., June 2009, 2011–2013"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {fields.length === 6 && (
//               <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg text-amber-900">
//                 Maximum 6 events. Contact support to add more.
//               </div>
//             )}
//           </div>
//         )}

//         <OfficialReportSection
//           register={register}
//           control={control}
//           setValue={setValue}
//         />

//         <PTSDOthers />

//         <TreatmentInformation />

//         {/* Continue Button */}
//         <div>
//           <div className="flex justify-between">
//             <button
//               type="button"
//               onClick={() => window.history.back()}
//               className="border border-[#091f3d] dark:text-[#091f3d] hover:border-[#091f3d] text-white text-lg font-semibold rounded-lg shadow-lg md:px-10 md:py-2"
//             >
//               Back
//             </button>
//             <button
//               type="button"
//               onClick={handleContinue}
//               className=" bg-[#B31942] hover:bg-[#be1643] text-white text-lg font-semibold rounded-lg shadow-lg md:px-10 md:py-2"
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PTSDDetails;

// new code
import React from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import PTSDOthers from "./PTSDOthers";
import OfficialReportSection from "./OfficialReportSection";
import TreatmentInformation from "./TreatmentInformation";
import PTSDEvidence from "./PTSDEvidence";
import { useNavigate } from "react-router";

const PTSDDetails = () => {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Event Type Checkboxes
      combat_tramatic_event: false,
      personal_traumatic_event_mst_no: false,
      personal_traumatic_event_mst_yes: false,
      other_traumatic_event: false,

      traumaticEventDetails: [],

      was_an_official_report_field_YES: false,
      was_an_official_report_field_NO: false,
      was_an_official_report_field_RESTRICTED: false,
      was_an_official_report_field_UNRESTRICTED: false,
      was_an_official_report_field_NEITHER: false,
      was_an_official_report_field_POLICE_REPORT: false,
      iii_11_police_report_descrption: "",
      was_an_official_report_field_OTHER: false,
      iii_11_other_description: "",

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

      // Treatment Information
      have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a:
        "",
      private_helathcare_provider: false,
      va_vet_center: false,
      community_care: false,
      va_medical_center_and_community_based_outpatient_clinics: false,
      department_of_defense_military_treatment_facility: false,
      treatmentEvents: [],

      // Evidence Sources
      a_rape_crisis_center_or_center_for_domestic_abuse: false,
      a_counseling_facility_or_health_clinic: false,
      family_members_or_roommates: false,
      a_faculty_member: false,
      civilian_police_reports: false,
      medical_reports_from_civilian_physicians: false,
      a_chaplain_or_clergy: false,
      fellow_service_member: false,
      personal_diaries_or_journals: false,
      none: false,
      other_specify_below: false,
      iii_12_other_description: "",
    },
  });

  const navigate = useNavigate();
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

  const onSubmit = (data) => {
    const finalData = {
      savedAt: new Date().toISOString(),

      // === Event Types ===
      combat_tramatic_event: data.combat_tramatic_event || false,
      personal_traumatic_event_mst_no:
        data.personal_traumatic_event_mst_no || false,
      personal_traumatic_event_mst_yes:
        data.personal_traumatic_event_mst_yes || false,
      other_traumatic_event: data.other_traumatic_event || false,

      // === Dynamic Events ===
      ...(data.traumaticEventDetails || []).reduce((acc, event, i) => {
        const n = i + 1;
        if (event.description)
          acc[`brief_description_of_the_traumatic_events_number_${n}`] =
            event.description;
        if (event.location)
          acc[`location_of_the_traumatic_events_number_${n}`] = event.location;
        if (event.date)
          acc[`dates_the_traumatic_events_occured_year_number_${n}`] =
            event.date;
        return acc;
      }, {}),

      // === Official Report ===
      was_an_official_report_field_YES:
        data.was_an_official_report_field_YES || false,
      was_an_official_report_field_NO:
        data.was_an_official_report_field_NO || false,
      was_an_official_report_field_RESTRICTED:
        data.was_an_official_report_field_RESTRICTED || false,
      was_an_official_report_field_UNRESTRICTED:
        data.was_an_official_report_field_UNRESTRICTED || false,
      was_an_official_report_field_NEITHER:
        data.was_an_official_report_field_NEITHER || false,
      was_an_official_report_field_POLICE_REPORT:
        data.was_an_official_report_field_POLICE_REPORT || false,
      iii_11_police_report_descrption:
        data.iii_11_police_report_descrption || "",
      was_an_official_report_field_OTHER:
        data.was_an_official_report_field_OTHER || false,
      iii_11_other_description: data.iii_11_other_description || "",

      // === Behavioral Changes (PTSDOthers) ===
      increased_decreased_visits_to_a_healthcare_professional_counselor_or_treatment_facility_checkbox:
        data.increased_decreased_visits_to_a_healthcare_professional_counselor_or_treatment_facility_checkbox ||
        false,
      request_for_a_change_in_occupational_series_or_duty_assignment_checkbox:
        data.request_for_a_change_in_occupational_series_or_duty_assignment_checkbox ||
        false,
      behavioral_changes_experienced_following_the_traumatic_event_1:
        data.behavioral_changes_experienced_following_the_traumatic_event_1 ||
        false,
      behavioral_changes_experienced_following_the_traumatic_event_2:
        data.behavioral_changes_experienced_following_the_traumatic_event_2 ||
        false,
      behavioral_changes_experienced_following_the_traumatic_event_3:
        data.behavioral_changes_experienced_following_the_traumatic_event_3 ||
        false,
      behavioral_changes_experienced_following_the_traumatic_event_4:
        data.behavioral_changes_experienced_following_the_traumatic_event_4 ||
        false,
      behavioral_changes_experienced_following_the_traumatic_event_5:
        data.behavioral_changes_experienced_following_the_traumatic_event_5 ||
        false,
      behavioral_changes_experienced_following_the_traumatic_event_6:
        data.behavioral_changes_experienced_following_the_traumatic_event_6 ||
        false,
      behavioral_changes_experienced_following_the_traumatic_event_7:
        data.behavioral_changes_experienced_following_the_traumatic_event_7 ||
        false,
      behavioral_changes_experienced_following_the_traumatic_event_8:
        data.behavioral_changes_experienced_following_the_traumatic_event_8 ||
        false,
      pregnancy_tests_arround_the_time_of_the_traumatic_event:
        data.pregnancy_tests_arround_the_time_of_the_traumatic_event || false,
      tests_for_sexually_transmitted_infections:
        data.tests_for_sexually_transmitted_infections || false,
      economic_or_social_behavioral_changes:
        data.economic_or_social_behavioral_changes || false,
      changes_in_or_breakup_of_a_significant_relationship:
        data.changes_in_or_breakup_of_a_significant_relationship || false,

      // === Treatment Yes/No ===
      have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a_1:
        data.have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a ===
        "yes",
      have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a_2:
        data.have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a ===
        "no",

      // Treatment Sources
      private_helathcare_provider: data.private_helathcare_provider || false,
      va_vet_center: data.va_vet_center || false,
      community_care: data.community_care || false,
      va_medical_center_and_community_based_outpatient_clinics:
        data.va_medical_center_and_community_based_outpatient_clinics || false,
      department_of_defense_military_treatment_facility:
        data.department_of_defense_military_treatment_facility || false,

      // Treatment Events (Dynamic)
      ...(data.treatmentEvents || []).reduce((acc, e, i) => {
        const n = i + 1;
        acc[`13c_name_and_location_of_the_treatment_facility_row${n}`] =
          e.facility || "";
        acc[`date_of_treatment_month${n}`] = e.month || "";
        acc[`date_of_treatment_year${n}`] = e.year || "";
        acc[`dont_have_date${n}`] = e.dontHaveDate || false;
        return acc;
      }, {}),

      a_rape_crisis_center_or_center_for_domestic_abuse:
        data.a_rape_crisis_center_or_center_for_domestic_abuse || false,
      a_counseling_facility_or_health_clinic:
        data.a_counseling_facility_or_health_clinic || false,
      family_members_or_roommates: data.family_members_or_roommates || false,
      a_faculty_member: data.a_faculty_member || false,
      civilian_police_reports: data.civilian_police_reports || false,
      medical_reports_from_civilian_physicians:
        data.medical_reports_from_civilian_physicians || false,
      a_chaplain_or_clergy: data.a_chaplain_or_clergy || false,
      fellow_service_member: data.fellow_service_member || false,
      personal_diaries_or_journals: data.personal_diaries_or_journals || false,
      none: data.none || false,
      other_specify_below: data.other_specify_below || false,
      iii_12_other_description: data.iii_12_other_description || "",
    };

    localStorage.setItem("ptsdDetailsInfo", JSON.stringify(finalData));
    navigate("/gulf_war_location");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-gray-50 md:pt-40 py-10 px-4"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-start">
          <h1 className="text-4xl font-bold text-[#0B2A52]">
            PTSD Claim Information
          </h1>
          <p className="text-gray-600 mt-2">
            All data saved only when you click Continue
          </p>
        </div>

        {/* Traumatic Event Types */}
        <div className="bg-white rounded-2xl shadow-lg border p-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0B2A52]">
              Type of Traumatic Event(s)
            </h1>{" "}
            <p className="text-base font dark:text-gray-900 py-5">
              SELECT THE TYPE OF IN-SERVICE TRAUMATIC EVENT(S) YOU EXPERIENCED{" "}
              <br />
              (Check more than one, if applicable)
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "combat_tramatic_event",
                label: "Combat Traumatic Event(s)",
              },
              {
                name: "personal_traumatic_event_mst_no",
                label: "Personal Trauma (Non-MST)",
              },
              {
                name: "personal_traumatic_event_mst_yes",
                label: "Military Sexual Trauma (MST)",
              },
              {
                name: "other_traumatic_event",
                label: "Other Traumatic Event(s)",
              },
            ].map((item) => (
              <label
                key={item.name}
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  {...register(item.name)}
                  className="w-6 h-6 text-[#0B2A52] rounded focus:ring-[#0B2A52]"
                />
                <span className="ml-4 font-medium text-gray-800">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Dynamic Event Details */}
        {hasAnyEventSelected && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#0B2A52]">
                Event Details (Up to 6)
              </h2>
              {fields.length < 6 && (
                <button
                  type="button"
                  onClick={addEvent}
                  className="flex items-center gap-2 px-6 py-3 bg-[#0B2A52] text-white rounded-lg hover:bg-[#091f3d] transition font-medium"
                >
                  <Plus size={20} /> Add Event ({fields.length}/6)
                </button>
              )}
            </div>

            {fields.map((field, i) => (
              <div
                key={field.id}
                className="bg-white rounded-2xl shadow-md border p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#0B2A52]">
                    Traumatic Event #{i + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
                <div className="space-y-4">
                  <textarea
                    {...register(`traumaticEventDetails.${i}.description`)}
                    placeholder="What happened? (Brief description)"
                    rows={4}
                    className="w-full p-4 border rounded-lg dark:bg-white dark:text-gray-900 focus:ring-[#0B2A52] outline-none focus:ring-2"
                  />
                  <input
                    {...register(`traumaticEventDetails.${i}.location`)}
                    placeholder="Location (e.g., Iraq, Fort Bragg, ship name)"
                    className="w-full p-4 border rounded-lg focus:ring-2 dark:bg-white dark:text-gray-900 focus:ring-[#0B2A52] outline-none"
                  />
                  <input
                    type="date"
                    {...register(`traumaticEventDetails.${i}.date`)}
                    placeholder="Date(s) – MM/YYYY or range (e.g., 06/2009)"
                    className="w-full p-4 border rounded-lg focus:ring-2 dark:bg-white dark:text-gray-900 focus:ring-[#0B2A52] outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <OfficialReportSection
          register={register}
          control={control}
          setValue={setValue}
          watch={watch}
        />
        <PTSDOthers register={register} watch={watch} />
        <TreatmentInformation
          register={register}
          control={control}
          watch={watch}
          setValue={setValue}
        />
        <PTSDEvidence register={register} watch={watch} setValue={setValue} />

        {/* Final Buttons */}
        {/* <div className="flex justify-between items-center pt-10 pb-20">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-10 py-4 border-2 uppercase border-[#0B2A52] text-[#0B2A52] font-bold rounded-xl hover:bg-[#0B2A52] hover:text-white transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-10 uppercase py-4 bg-[#B31942] text-white font-bold rounded-xl hover:bg-[#a0153a] transition shadow-lg"
          >
            Continue
          </button>
        </div> */}

        <div className="flex justify-center gap-4 md:gap-10 mt-10 pt-10 md:mt-6 md:pt-10 md:pb-10">
          <button
            type="button"
            className="w-[150px] md:w-[200px] bg-white text-blue-800 py-2 border uppercase border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold"
            onClick={() => window.history.back()}
          >
            Back
          </button>

          <button
            type="submit"
            className="w-[150px] md:w-[200px] bg-[#B31942] text-white py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-semibold uppercase"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default PTSDDetails;
