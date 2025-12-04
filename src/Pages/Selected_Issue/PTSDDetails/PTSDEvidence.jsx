// import React, { useState, useEffect } from "react";

// const PTSDEvidence = () => {
//   const [evidence, setEvidence] = useState(() => {
//     const saved = localStorage.getItem("ptsdEvidence");
//     return saved
//       ? JSON.parse(saved)
//       : {
//           a_rape_crisis_center_or_center_for_domestic_abuse: false,
//           a_counseling_facility_or_health_clinic: false,
//           family_members_or_roommates: false,
//           a_faculty_member: false,
//           civilian_police_reports: false,
//           medical_reports_from_civilian_physicians: false,
//           a_chaplain_or_clergy: false,
//           fellow_service_member: false,
//           personal_diaries_or_journals: false,
//           none: false,
//           other_specify_below: false,
//           iii_12_other_description: "",
//         };
//   });

//   useEffect(() => {
//     localStorage.setItem("ptsdEvidence", JSON.stringify(evidence));
//   }, [evidence]);

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;

//     if (name === "none" && checked) {
//       setEvidence({
//         a_rape_crisis_center_or_center_for_domestic_abuse: false,
//         a_counseling_facility_or_health_clinic: false,
//         family_members_or_roommates: false,
//         a_faculty_member: false,
//         civilian_police_reports: false,
//         medical_reports_from_civilian_physicians: false,
//         a_chaplain_or_clergy: false,
//         fellow_service_member: false,
//         personal_diaries_or_journals: false,
//         none: true,
//         other_specify_below: false,
//         iii_12_other_description: "",
//       });
//     } else if (name !== "none" && evidence.none && checked) {
//       setEvidence((prev) => ({
//         ...prev,
//         none: false,
//         [name]: checked,
//       }));
//     } else {
//       setEvidence((prev) => ({
//         ...prev,
//         [name]: checked,
//         ...(name === "other_specify_below" && !checked
//           ? { iii_12_other_description: "" }
//           : {}),
//       }));
//     }
//   };

//   const handleTextareaChange = (e) => {
//     setEvidence((prev) => ({
//       ...prev,
//       iii_12_other_description: e.target.value,
//     }));
//   };

//   const checkboxes = [
//     {
//       key: "a_rape_crisis_center_or_center_for_domestic_abuse",
//       label: "A RAPE CRISIS CENTER OR CENTER FOR DOMESTIC ABUSE",
//     },
//     {
//       key: "a_counseling_facility_or_health_clinic",
//       label: "A COUNSELING FACILITY OR HEALTH CLINIC",
//     },
//     {
//       key: "family_members_or_roommates",
//       label: "FAMILY MEMBERS OR ROOMMATES",
//     },
//     { key: "a_faculty_member", label: "A FACULTY MEMBER" },
//     { key: "civilian_police_reports", label: "CIVILIAN POLICE REPORTS" },
//     {
//       key: "medical_reports_from_civilian_physicians",
//       label:
//         "MEDICAL REPORTS FROM CIVILIAN PHYSICIANS OR CAREGIVERS WHO TREATED YOU IMMEDIATELY FOLLOWING THE INCIDENT OR SOMETIME LATER",
//     },
//     { key: "a_chaplain_or_clergy", label: "A CHAPLAIN OR CLERGY" },
//     { key: "fellow_service_member", label: "FELLOW SERVICE MEMBER(S)" },
//     {
//       key: "personal_diaries_or_journals",
//       label: "PERSONAL DIARIES OR JOURNALS",
//     },
//     { key: "none", label: "NONE" },
//     { key: "other_specify_below", label: "OTHER (Specify below)" },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white  mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-[#0B2A52] leading-tight">
//             POSSIBLE SOURCES OF EVIDENCE FOLLOWING THE TRAUMATIC EVENT(S)
//           </h1>
//           <p className="mt-3 text-lg text-gray-700 font-medium">
//             (Check all that apply)
//           </p>
//         </div>

//         <div className="space-y-5">
//           {checkboxes.map((item) => (
//             <div
//               key={item.key}
//               className={`bg-white rounded-xl border-2 transition-all duration-200 p-6 shadow-sm hover:shadow-md
//       ${evidence[item.key] ? "border-[#0B2A52] bg-blue-50" : "border-gray-300"}`}
//             >
//               <label className="flex items-start cursor-pointer select-none">
//                 <div className="flex-shrink-0 mt-1">
//                   <input
//                     type="checkbox"
//                     name={item.key}
//                     checked={evidence[item.key] || false}
//                     onChange={handleCheckboxChange}
//                     className="w-5 h-5 text-[#0B2A52] rounded veterans_email_optional border-2 border-gray-400 cursor-pointer"
//                   />
//                 </div>

//                 <span className="ml-5 text-lg text-gray-800 leading-relaxed font-medium block">
//                   {item.label}
//                 </span>
//               </label>

//               {item.key === "other_specify_below" &&
//                 evidence.other_specify_below && (
//                   <div className="mt-6">
//                     <textarea
//                       name="iii_12_other_description"
//                       value={evidence.iii_12_other_description}
//                       onChange={handleTextareaChange}
//                       rows={5}
//                       placeholder="Please describe the other source(s) of evidence in detail..."
//                       className="w-full px-4 dark:bg-white py-3 dark:text-gray-900 border-2 dark:border-[#0B2A52] rounded-lg focus:outline-none veterans_email_optional transition-all resize-none"
//                     />
//                   </div>
//                 )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PTSDEvidence;

//updated code

import React from "react";

const PTSDEvidence = ({ register, watch, setValue }) => {
  const values = watch();

  const handleCheckboxChange = (fieldName) => {
    const newValue = !values[fieldName];

    if (fieldName === "none" && newValue) {
      setValue("a_rape_crisis_center_or_center_for_domestic_abuse", false);
      setValue("a_counseling_facility_or_health_clinic", false);
      setValue("family_members_or_roommates", false);
      setValue("a_faculty_member", false);
      setValue("civilian_police_reports", false);
      setValue("medical_reports_from_civilian_physicians", false);
      setValue("a_chaplain_or_clergy", false);
      setValue("fellow_service_member", false);
      setValue("personal_diaries_or_journals", false);
      setValue("other_specify_below", false);
      setValue("iii_12_other_description", "");
      setValue("none", true);
    } else if (fieldName !== "none" && values.none && newValue) {
      setValue("none", false);
      setValue(fieldName, true);
    } else {
      setValue(fieldName, newValue);

      if (fieldName === "other_specify_below" && !newValue) {
        setValue("iii_12_other_description", "");
      }
    }
  };

  const checkboxes = [
    {
      key: "a_rape_crisis_center_or_center_for_domestic_abuse",
      label: "A RAPE CRISIS CENTER OR CENTER FOR DOMESTIC ABUSE",
    },
    {
      key: "a_counseling_facility_or_health_clinic",
      label: "A COUNSELING FACILITY OR HEALTH CLINIC",
    },
    {
      key: "family_members_or_roommates",
      label: "FAMILY MEMBERS OR ROOMMATES",
    },
    { key: "a_faculty_member", label: "A FACULTY MEMBER" },
    { key: "civilian_police_reports", label: "CIVILIAN POLICE REPORTS" },
    {
      key: "medical_reports_from_civilian_physicians",
      label: "MEDICAL REPORTS FROM CIVILIAN PHYSICIANS OR CAREGIVERS...",
    },
    { key: "a_chaplain_or_clergy", label: "A CHAPLAIN OR CLERGY" },
    { key: "fellow_service_member", label: "FELLOW SERVICE MEMBER(S)" },
    {
      key: "personal_diaries_or_journals",
      label: "PERSONAL DIARIES OR JOURNALS",
    },
    { key: "none", label: "NONE" },
    { key: "other_specify_below", label: "OTHER (Specify below)" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0B2A52] mb-6">
        POSSIBLE SOURCES OF EVIDENCE FOLLOWING THE TRAUMATIC EVENT(S)
      </h1>
      <p className="text-lg text-gray-700 font-medium mb-8">
        (Check all that apply)
      </p>

      <div className="space-y-5">
        {checkboxes.map((item) => (
          <div
            key={item.key}
            className={`bg-white rounded-xl border-2 transition-all p-6 shadow-sm hover:shadow-md ${
              values[item.key]
                ? "border-[#0B2A52] bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <label className="flex items-start cursor-pointer select-none">
              <input
                type="checkbox"
                checked={!!values[item.key]}
                onChange={() => handleCheckboxChange(item.key)}
                className="w-4 h-4 text-[#0B2A52] rounded border-2 border-gray-400 focus:ring-[#0B2A52] mt-1"
              />
              <span className="ml-5 text-lg text-gray-800 leading-relaxed font-medium">
                {item.label}
              </span>
            </label>

            {item.key === "other_specify_below" &&
              values.other_specify_below && (
                <div className="mt-6">
                  <textarea
                    {...register("iii_12_other_description")}
                    rows={5}
                    placeholder="Please describe the other source(s) of evidence..."
                    className="w-full px-4 py-3 border-2 dark:bg-white dark:text-gray-900 border-[#0B2A52] rounded-lg focus:ring-4 focus:ring-[#0B2A52]/20 resize-none"
                  />
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PTSDEvidence;
