// import React from "react";
// import { useForm, useFieldArray, useWatch } from "react-hook-form";
// import { Plus, Trash2 } from "lucide-react";

// import PTSDOthers from "./PTSDOthers";
// import OfficialReportSection from "./OfficialReportSection";
// import TreatmentInformation from "./TreatmentInformation";
// import PTSDEvidence from "./PTSDEvidence";
// import { useNavigate } from "react-router";

// const PTSDDetails = () => {
//   const {
//     register,
//     control,
//     watch,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       // Event Type Checkboxes
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

//       // Treatment Information
//       have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a:
//         "",
//       private_helathcare_provider: false,
//       va_vet_center: false,
//       community_care: false,
//       va_medical_center_and_community_based_outpatient_clinics: false,
//       department_of_defense_military_treatment_facility: false,
//       treatmentEvents: [],

//       // Evidence Sources
//       a_rape_crisis_center_or_center_for_domestic_abuse: false,
//       a_counseling_facility_or_health_clinic: false,
//       family_members_or_roommates: false,
//       a_faculty_member: false,
//       civilian_police_reports: false,
//       medical_reports_from_civilian_physicians: false,
//       a_chaplain_or_clergy: false,
//       fellow_service_member: false,
//       personal_diaries_or_journals: false,
//       none: false,
//       other_specify_below: false,
//       iii_12_other_description: "",
//     },
//   });

//   const navigate = useNavigate();
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

//   const onSubmit = (data) => {
//     const finalData = {
//       savedAt: new Date().toISOString(),

//       // === Event Types ===
//       combat_tramatic_event: data.combat_tramatic_event || false,
//       personal_traumatic_event_mst_no:
//         data.personal_traumatic_event_mst_no || false,
//       personal_traumatic_event_mst_yes:
//         data.personal_traumatic_event_mst_yes || false,
//       other_traumatic_event: data.other_traumatic_event || false,

//       // === Dynamic Events ===
//       ...(data.traumaticEventDetails || []).reduce((acc, event, i) => {
//         const n = i + 1;
//         if (event.description)
//           acc[`brief_description_of_the_traumatic_events_number_${n}`] =
//             event.description;
//         if (event.location)
//           acc[`location_of_the_traumatic_events_number_${n}`] = event.location;
//         if (event.date)
//           acc[`dates_the_traumatic_events_occured_year_number_${n}`] =
//             event.date;
//         return acc;
//       }, {}),

//       // === Official Report ===
//       was_an_official_report_field_YES:
//         data.was_an_official_report_field_YES || false,
//       was_an_official_report_field_NO:
//         data.was_an_official_report_field_NO || false,
//       was_an_official_report_field_RESTRICTED:
//         data.was_an_official_report_field_RESTRICTED || false,
//       was_an_official_report_field_UNRESTRICTED:
//         data.was_an_official_report_field_UNRESTRICTED || false,
//       was_an_official_report_field_NEITHER:
//         data.was_an_official_report_field_NEITHER || false,
//       was_an_official_report_field_POLICE_REPORT:
//         data.was_an_official_report_field_POLICE_REPORT || false,
//       iii_11_police_report_descrption:
//         data.iii_11_police_report_descrption || "",
//       was_an_official_report_field_OTHER:
//         data.was_an_official_report_field_OTHER || false,
//       iii_11_other_description: data.iii_11_other_description || "",

//       // === Behavioral Changes (PTSDOthers) ===
//       increased_decreased_visits_to_a_healthcare_professional_counselor_or_treatment_facility_checkbox:
//         data.increased_decreased_visits_to_a_healthcare_professional_counselor_or_treatment_facility_checkbox ||
//         false,
//       request_for_a_change_in_occupational_series_or_duty_assignment_checkbox:
//         data.request_for_a_change_in_occupational_series_or_duty_assignment_checkbox ||
//         false,
//       behavioral_changes_experienced_following_the_traumatic_event_1:
//         data.behavioral_changes_experienced_following_the_traumatic_event_1 ||
//         false,
//       behavioral_changes_experienced_following_the_traumatic_event_2:
//         data.behavioral_changes_experienced_following_the_traumatic_event_2 ||
//         false,
//       behavioral_changes_experienced_following_the_traumatic_event_3:
//         data.behavioral_changes_experienced_following_the_traumatic_event_3 ||
//         false,
//       behavioral_changes_experienced_following_the_traumatic_event_4:
//         data.behavioral_changes_experienced_following_the_traumatic_event_4 ||
//         false,
//       behavioral_changes_experienced_following_the_traumatic_event_5:
//         data.behavioral_changes_experienced_following_the_traumatic_event_5 ||
//         false,
//       behavioral_changes_experienced_following_the_traumatic_event_6:
//         data.behavioral_changes_experienced_following_the_traumatic_event_6 ||
//         false,
//       behavioral_changes_experienced_following_the_traumatic_event_7:
//         data.behavioral_changes_experienced_following_the_traumatic_event_7 ||
//         false,
//       behavioral_changes_experienced_following_the_traumatic_event_8:
//         data.behavioral_changes_experienced_following_the_traumatic_event_8 ||
//         false,
//       pregnancy_tests_arround_the_time_of_the_traumatic_event:
//         data.pregnancy_tests_arround_the_time_of_the_traumatic_event || false,
//       tests_for_sexually_transmitted_infections:
//         data.tests_for_sexually_transmitted_infections || false,
//       economic_or_social_behavioral_changes:
//         data.economic_or_social_behavioral_changes || false,
//       changes_in_or_breakup_of_a_significant_relationship:
//         data.changes_in_or_breakup_of_a_significant_relationship || false,

//       // === Treatment Yes/No ===
//       have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a_1:
//         data.have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a ===
//         "yes",
//       have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a_2:
//         data.have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a ===
//         "no",

//       // Treatment Sources
//       private_helathcare_provider: data.private_helathcare_provider || false,
//       va_vet_center: data.va_vet_center || false,
//       community_care: data.community_care || false,
//       va_medical_center_and_community_based_outpatient_clinics:
//         data.va_medical_center_and_community_based_outpatient_clinics || false,
//       department_of_defense_military_treatment_facility:
//         data.department_of_defense_military_treatment_facility || false,

//       // Treatment Events (Dynamic)
//       ...(data.treatmentEvents || []).reduce((acc, e, i) => {
//         const n = i + 1;
//         acc[`13c_name_and_location_of_the_treatment_facility_row${n}`] =
//           e.facility || "";
//         acc[`date_of_treatment_month${n}`] = e.month || "";
//         acc[`date_of_treatment_year${n}`] = e.year || "";
//         acc[`dont_have_date${n}`] = e.dontHaveDate || false;
//         return acc;
//       }, {}),

//       a_rape_crisis_center_or_center_for_domestic_abuse:
//         data.a_rape_crisis_center_or_center_for_domestic_abuse || false,
//       a_counseling_facility_or_health_clinic:
//         data.a_counseling_facility_or_health_clinic || false,
//       family_members_or_roommates: data.family_members_or_roommates || false,
//       a_faculty_member: data.a_faculty_member || false,
//       civilian_police_reports: data.civilian_police_reports || false,
//       medical_reports_from_civilian_physicians:
//         data.medical_reports_from_civilian_physicians || false,
//       a_chaplain_or_clergy: data.a_chaplain_or_clergy || false,
//       fellow_service_member: data.fellow_service_member || false,
//       personal_diaries_or_journals: data.personal_diaries_or_journals || false,
//       none: data.none || false,
//       other_specify_below: data.other_specify_below || false,
//       iii_12_other_description: data.iii_12_other_description || "",
//     };

//     localStorage.setItem("ptsdDetailsInfo", JSON.stringify(finalData));
//     navigate("/gulf_war_location");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="min-h-screen bg-gray-50 md:pt-40 py-10 px-4"
//     >
//       <div className="max-w-4xl mx-auto space-y-12">
//         <div>
//           <div className="text-start">
//             <h1 className="text-4xl font-bold text-[#0B2A52]">
//               PTSD Claim Information
//             </h1>
//             <p className="text-gray-600 mt-2">
//               All data saved only when you click Continue
//             </p>
//           </div>
//           <div>voice</div>
//         </div>

//         {/* Traumatic Event Types */}
//         <div className="bg-white rounded-2xl shadow-lg border p-8">
//           <div>
//             <h1 className="text-2xl font-bold text-[#0B2A52]">
//               Type of Traumatic Event(s)
//             </h1>{" "}
//             <p className="text-base font dark:text-gray-900 py-5">
//               SELECT THE TYPE OF IN-SERVICE TRAUMATIC EVENT(S) YOU EXPERIENCED{" "}
//               <br />
//               (Check more than one, if applicable)
//             </p>
//           </div>

//           <div className="space-y-4">
//             {[
//               {
//                 name: "combat_tramatic_event",
//                 label: "Combat Traumatic Event(s)",
//               },
//               {
//                 name: "personal_traumatic_event_mst_no",
//                 label: "Personal Trauma (Non-MST)",
//               },
//               {
//                 name: "personal_traumatic_event_mst_yes",
//                 label: "Military Sexual Trauma (MST)",
//               },
//               {
//                 name: "other_traumatic_event",
//                 label: "Other Traumatic Event(s)",
//               },
//             ].map((item) => (
//               <label
//                 key={item.name}
//                 className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
//               >
//                 <input
//                   type="checkbox"
//                   {...register(item.name)}
//                   className="w-6 h-6 text-[#0B2A52] rounded focus:ring-[#0B2A52]"
//                 />
//                 <span className="ml-4 font-medium text-gray-800">
//                   {item.label}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Dynamic Event Details */}
//         {hasAnyEventSelected && (
//           <div className="space-y-6">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-bold text-[#0B2A52]">
//                 Event Details (Up to 6)
//               </h2>
//               {fields.length < 6 && (
//                 <button
//                   type="button"
//                   onClick={addEvent}
//                   className="flex items-center gap-2 px-6 py-3 bg-[#0B2A52] text-white rounded-lg hover:bg-[#091f3d] transition font-medium"
//                 >
//                   <Plus size={20} /> Add Event ({fields.length}/6)
//                 </button>
//               )}
//             </div>

//             {fields.map((field, i) => (
//               <div
//                 key={field.id}
//                 className="bg-white rounded-2xl shadow-md border p-6"
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-xl font-bold text-[#0B2A52]">
//                     Traumatic Event #{i + 1}
//                   </h3>
//                   <button
//                     type="button"
//                     onClick={() => remove(i)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <Trash2 size={22} />
//                   </button>
//                 </div>
//                 <div className="space-y-4">
//                   <textarea
//                     {...register(`traumaticEventDetails.${i}.description`)}
//                     placeholder="What happened? (Brief description)"
//                     rows={4}
//                     className="w-full p-4 border rounded-lg dark:bg-white dark:text-gray-900 focus:ring-[#0B2A52] outline-none focus:ring-2"
//                   />
//                   <input
//                     {...register(`traumaticEventDetails.${i}.location`)}
//                     placeholder="Location (e.g., Iraq, Fort Bragg, ship name)"
//                     className="w-full p-4 border rounded-lg focus:ring-2 dark:bg-white dark:text-gray-900 focus:ring-[#0B2A52] outline-none"
//                   />
//                   <input
//                     type="date"
//                     {...register(`traumaticEventDetails.${i}.date`)}
//                     placeholder="Date(s) – MM/YYYY or range (e.g., 06/2009)"
//                     className="w-full p-4 border rounded-lg focus:ring-2 dark:bg-white dark:text-gray-900 focus:ring-[#0B2A52] outline-none"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         <OfficialReportSection
//           register={register}
//           control={control}
//           setValue={setValue}
//           watch={watch}
//         />
//         <PTSDOthers register={register} watch={watch} />
//         <TreatmentInformation
//           register={register}
//           control={control}
//           watch={watch}
//           setValue={setValue}
//         />
//         <PTSDEvidence register={register} watch={watch} setValue={setValue} />

//         <div className="flex justify-center gap-4 md:gap-10 mt-10 pt-10 md:mt-6 md:pt-10 md:pb-10">
//           <button
//             type="button"
//             className="w-[150px] md:w-[200px] bg-white text-blue-800 py-2 border uppercase border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold"
//             onClick={() => window.history.back()}
//           >
//             Back
//           </button>

//           <button
//             type="submit"
//             className="w-[150px] md:w-[200px] bg-[#B31942] text-white py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-semibold uppercase"
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PTSDDetails;

import React, { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { Plus, Trash2, Play, Pause } from "lucide-react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router";

import ptsdVoice from "../../../cris_voice/hannah_ptsd_claim_information_sensitive.mp3";
import audioWave from "../../../../public/Voice.json";

import PTSDOthers from "./PTSDOthers";
import OfficialReportSection from "./OfficialReportSection";
import TreatmentInformation from "./TreatmentInformation";
import PTSDEvidence from "./PTSDEvidence";

const PTSDDetails = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setAudioError(null);
        })
        .catch((err) => {
          console.warn("Autoplay blocked:", err);
          setIsPlaying(false);
          setAudioError("Tap to play");
        });
    };

    tryPlay();

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        setAudioError("Failed to play audio.");
      });
    }
    setIsPlaying(!isPlaying);
    setAudioError(null);
  };
  // ──────────────────────────────────────────────────────────────

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
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

      have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a:
        "",
      private_helathcare_provider: false,
      va_vet_center: false,
      community_care: false,
      va_medical_center_and_community_based_outpatient_clinics: false,
      department_of_defense_military_treatment_facility: false,
      treatmentEvents: [],

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
    // Pause audio before navigating
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const finalData = {
      savedAt: new Date().toISOString(),

      combat_tramatic_event: data.combat_tramatic_event || false,
      personal_traumatic_event_mst_no:
        data.personal_traumatic_event_mst_no || false,
      personal_traumatic_event_mst_yes:
        data.personal_traumatic_event_mst_yes || false,
      other_traumatic_event: data.other_traumatic_event || false,

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

      have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a_1:
        data.have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a ===
        "yes",
      have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a_2:
        data.have_you_received_treatment_related_to_the_impact_of_the_traumatic_event_listed_in_item_9a ===
        "no",

      private_helathcare_provider: data.private_helathcare_provider || false,
      va_vet_center: data.va_vet_center || false,
      community_care: data.community_care || false,
      va_medical_center_and_community_based_outpatient_clinics:
        data.va_medical_center_and_community_based_outpatient_clinics || false,
      department_of_defense_military_treatment_facility:
        data.department_of_defense_military_treatment_facility || false,

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
    // console.log(finalData)

    localStorage.setItem("ptsdDetailsInfo", JSON.stringify(finalData));
    navigate("/gulf_war_location");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-gray-50 md:pt-40 py-10 px-4"
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} src={ptsdVoice} loop />

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
          <div className="text-start">
            <h1 className="text-4xl font-bold text-[#0B2A52]">
              PTSD Claim Information
            </h1>
            <p className="text-gray-600 mt-2">
              All data saved only when you click Continue
            </p>
          </div>

          {/* AUDIO PLAYER BUTTON (Same as Sinusitis) */}
          <div className="flex justify-end mt-6 mb-8">
            <button
              type="button"
              onClick={toggleAudio}
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
              className="flex items-center gap-2 py-2 text-white rounded-lg transition-colors"
            >
              {isPlaying ? (
                <>
                  <Lottie
                    animationData={audioWave}
                    loop
                    autoplay
                    className="w-20 h-14"
                  />
                  <div className="bg-gray-200 p-2 shadow-md border border-gray-400 rounded-full">
                    <Pause size={16} className="text-gray-900" />
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-gray-200 p-2 shadow-md border border-gray-400 rounded-full">
                    <Play size={14} className="text-gray-900" />
                  </div>
                  {audioError && (
                    <span className="ml-2 text-sm text-gray-600">
                      {audioError}
                    </span>
                  )}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Traumatic Event Types */}
        <div className="bg-white rounded-2xl shadow-lg border p-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0B2A52]">
              Type of Traumatic Event(s)
            </h1>
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
                  className="w-4 h-4 text-[#0B2A52] rounded focus:ring-[#0B2A52]"
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

        {/* Back & Continue Buttons */}
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
