// import { useFormContext } from "react-hook-form";

// export default function Step7CurrentStatus({ register, errors }) {
//   const { watch } = useFormContext();
//   const vaHealthCare = watch("vaHealthCare");

//   return (
//     <div className="space-y-4 px-2 md:px-0">
//       {/* Active Duty Orders */}
//       <div className="form-control w-full">
//         <label className="label w-full">
//           <span className="label-text font-medium text-sm md:text-base pb-1 break-words whitespace-normal dark:border-black dark:text-black">
//             Are You Currently on Any Active Duty Federal Orders?
//           </span>
//         </label>
//         <select
//           {...register("activeDutyOrders", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//         {errors.activeDutyOrders && (
//           <label className="label">
//             <span className="label-text-alt text-error text-xs">
//               {errors.activeDutyOrders.message}
//             </span>
//           </label>
//         )}
//       </div>

//       {/* VA Direct Deposit */}
//       <div className="form-control w-full">
//         <label className="label">
//           <span className="label-text font-medium text-sm md:text-base pb-1 break-words whitespace-normal dark:border-black dark:text-black">
//             VA Direct Deposit Setup?
//           </span>
//         </label>
//         <select
//           {...register("vaDirectDeposit", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//         {errors.vaDirectDeposit && (
//           <label className="label">
//             <span className="label-text-alt text-error text-xs">
//               {errors.vaDirectDeposit.message}
//             </span>
//           </label>
//         )}
//       </div>

//       {/* Homelessness Question */}
//       <div className="form-control w-full">
//         <label className="label">
//           <span className="label-text font-medium text-sm md:text-base pb-1 break-words whitespace-normal dark:border-black dark:text-black">
//             Are you currently homeless or at risk of becoming homeless?{" "}
//             <span className="text-gray-500">(Optional)</span>
//           </span>
//         </label>
//         <select
//           {...register("vaHealthCare")}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//         {errors.vaHealthCare && (
//           <label className="label">
//             <span className="label-text-alt text-error text-xs">
//               {errors.vaHealthCare.message}
//             </span>
//           </label>
//         )}
//       </div>

//       {/* Living Situation (conditional) */}
//       {vaHealthCare === "Yes" && (
//         <div className="form-control w-full">
//           <div className="form-control pb-4">
//             <label className="label">
//               <span className="label-text font-medium text-[12px] md:text-base pb-1 dark:text-black">
//                 Provide Details
//               </span>
//             </label>

//             <textarea
//               rows={3}
//               {...register("are_you_currently_homeless_text", {
//                 required:
//                   "Please provide details about your current housing situation",
//               })}
//               className="textarea textarea-bordered w-full
//                text-base leading-relaxed
//                resize-none
//                py-4 px-5
//                dark:bg-white dark:border-black dark:text-black
//                rounded-md
//                placeholder:text-gray-400
//                uppercase"
//               placeholder="EX: LIVING IN SHELTER, STAYING WITH FRIENDS, SLEEPING IN CAR, ETC..."
//             />

//             {/* Error Message */}
//             {errors.are_you_currently_homeless_text && (
//               <p className="text-error text-xs font-medium mt-2 animate-fade-in">
//                 {errors.are_you_currently_homeless_text.message}
//               </p>
//             )}
//           </div>
//           <div className="pb-4">
//             <label className="label">
//               <span className="label-text font-medium text-sm md:text-base pb-1 break-words whitespace-normal dark:border-black dark:text-black">
//                 POINT OF CONTACT (Name of person VA can contact in order to get
//                 in touch with you)
//               </span>
//             </label>
//             <div className="relative">
//               <input
//                 id="middleName"
//                 type="text"
//                 {...register("point_of_contact", {
//                   required: "Point of contact required",
//                 })}
//                 className={`input input-bordered py-5 w-full  dark:bg-white dark:input-bordered dark:border-black dark:text-black focus:ring-0${
//                   errors.point_of_contact ? "input-error" : ""
//                 }`}
//                 placeholder="Point of contact"
//                 aria-invalid={errors.point_of_contact ? "true" : "false"}
//               />
//             </div>
//           </div>

//           <label className="label">
//             <span className="label-text font-medium text-sm md:text-base pb-1 break-words whitespace-normal dark:border-black dark:text-black">
//               Check The Answer That Most Closely Aligns To Your Living
//               Situation:
//             </span>
//           </label>
//           <select
//             {...register("livingSituation", {
//               required: "Living Situation is required",
//             })}
//             className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//           >
//             <option value="">Select an option</option>
//             <option value="Living In A Homeless Shelter">
//               Living In A Homeless Shelter
//             </option>
//             <option value="Not Currently In A Sheltered Environment">
//               Not Currently In A Sheltered Environment (e.g., living in a car or
//               tent)
//             </option>
//             <option value="Staying With Another Person">
//               Staying With Another Person
//             </option>
//             <option value="Fleeing Current Residence">
//               Fleeing Current Residence
//             </option>
//             <option value="Housing Will Be Lost In 30 Days">
//               Housing Will Be Lost In 30 Days
//             </option>
//             <option value="Leaving Publicly Funded System Of Care">
//               Leaving Publicly Funded System Of Care
//             </option>
//             <option value="Leaving Publicly Funded System Of Care">
//               Others
//             </option>
//           </select>
//           {errors.livingSituation && (
//             <label className="label">
//               <span className="label-text-alt text-error text-xs">
//                 {errors.livingSituation.message}
//               </span>
//             </label>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// import { useFormContext } from "react-hook-form";

// export default function Step7CurrentStatus() {
//   const {
//     register,
//     watch,
//     formState: { errors },
//   } = useFormContext();

//   const vaHealthCare = watch("vaHealthCare");
//   const livingSituation = watch("livingSituation");

//   const showOtherSpecify = livingSituation === "Others";

//   return (
//     <div className="space-y-4 px-2 md:px-0">
//       <div className="form-control w-full">
//         <label className="label w-full">
//           <span className="label-text font-medium text-sm md:text-base pb-1 break-words whitespace-normal dark:border-black dark:text-black">
//             Are You Currently on Any Active Duty Federal Orders?
//           </span>
//         </label>
//         <select
//           {...register("activeDutyOrders", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//         {errors.activeDutyOrders && (
//           <label className="label">
//             <span className="label-text-alt text-error text-xs">
//               {errors.activeDutyOrders.message}
//             </span>
//           </label>
//         )}
//       </div>

//       <div className="form-control w-full">
//         <label className="label">
//           <span className="label-text font-medium text-sm md:text-base pb-1 break-words whitespace-normal dark:border-black dark:text-black">
//             VA Direct Deposit Setup?
//           </span>
//         </label>
//         <select
//           {...register("vaDirectDeposit", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//         {errors.vaDirectDeposit && (
//           <label className="label">
//             <span className="label-text-alt text-error text-xs">
//               {errors.vaDirectDeposit.message}
//             </span>
//           </label>
//         )}
//       </div>

//       <div className="form-control w-full">
//         <label className="label">
//           <span className="label-text font-medium text-sm md:text-base pb-1 break-words whitespace-normal dark:border-black dark:text-black">
//             Are you currently homeless or at risk of becoming homeless?{" "}
//           </span>
//         </label>
//         <select
//           {...register("vaHealthCare")}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="currently_homeless_yes">Yes</option>
//           <option value="currently_homeless_no">No</option>
//         </select>
//       </div>

//       {vaHealthCare === "currently_homeless_yes" && (
//         <div className="form-control w-full space-y-6 pt-4 border-t border-gray-300">
//           <div>
//             <label className="label">
//               <span className="label-text font-medium text-[12px] md:text-base pb-1 dark:text-black">
//                 Provide Details
//               </span>
//             </label>
//             <textarea
//               rows={3}
//               {...register("are_you_currently_homeless_text", {
//                 required:
//                   "Please provide details about your current housing situation",
//               })}
//               className="textarea textarea-bordered w-full text-base leading-relaxed resize-none py-4 px-5 dark:bg-white dark:border-black dark:text-black rounded-md placeholder:text-gray-400 uppercase"
//               placeholder="EX: LIVING IN SHELTER, STAYING WITH FRIENDS, SLEEPING IN CAR, ETC..."
//             />
//             {errors.are_you_currently_homeless_text && (
//               <p className="text-error text-xs font-medium mt-2">
//                 {errors.are_you_currently_homeless_text.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="label">
//               <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
//                 POINT OF CONTACT (Name of person VA can contact)
//               </span>
//             </label>
//             <input
//               type="text"
//               {...register("point_of_contact", {
//                 required: "Point of contact is required",
//               })}
//               className={`input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black ${
//                 errors.point_of_contact ? "input-error" : ""
//               }`}
//               placeholder="Enter name"
//             />
//             {errors.point_of_contact && (
//               <p className="text-error text-xs mt-1">
//                 {errors.point_of_contact.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="label">
//               <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
//                 Check The Answer That Most Closely Aligns To Your Living
//                 Situation:
//               </span>
//             </label>
//             <select
//               {...register("livingSituation", {
//                 required: "Living Situation is required",
//               })}
//               className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//             >
//               <option value="">Select an option</option>
//               <option value="Living In A Homeless Shelter">
//                 Living In A Homeless Shelter
//               </option>
//               <option value="your_living-situation_not_currently">
//                 Not Currently In A Sheltered Environment (e.g., car, tent)
//               </option>
//               <option value="your_living-situation_staying">
//                 Staying With Another Person
//               </option>
//               <option value="your_living-situation_fleeing">
//                 Fleeing Current Residence
//               </option>
//               <option value="your_living-situation_2_housing">
//                 Housing Will Be Lost In 30 Days
//               </option>
//               <option value="your_living-situation_2_homeless">
//                 Leaving Publicly Funded System Of Care
//               </option>
//               <option value="Othyour_living-situation_otherers">Others</option>
//             </select>
//             {errors.livingSituation && (
//               <p className="text-error text-xs mt-1">
//                 {errors.livingSituation.message}
//               </p>
//             )}
//           </div>

//           {showOtherSpecify && (
//             <div className="animate-fade-in">
//               <label className="label">
//                 <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
//                   Provide your Living Situation
//                 </span>
//               </label>
//               <input
//                 type="text"
//                 {...register("other_specify", {
//                   required: "Please specify your living situation",
//                 })}
//                 className={`input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black ${
//                   errors.other_specify ? "input-error" : ""
//                 }`}
//                 placeholder="Describe your current living situation..."
//               />
//               {errors.other_specify && (
//                 <p className="text-error text-xs mt-1">
//                   {errors.other_specify.message}
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// import { useFormContext } from "react-hook-form";

// export default function Step7CurrentStatus() {
//   const {
//     register,
//     watch,
//     formState: { errors },
//   } = useFormContext();

//   const homelessStatus = watch("homelessOrAtRisk");
//   const livingSituation = watch("livingSituation");
//   const riskSituation = watch("riskSituation");

//   const isHomelessOrAtRisk = homelessStatus === "yes";

//   const showLivingSituationOther = livingSituation === "Others";
//   const showRiskSituationOther = riskSituation === "Others";

//   return (
//     <div className="space-y-6 px-2 md:px-0">
//       {/* Previous fields (unchanged) */}
//       <div className="form-control w-full">
//         <label className="label">
//           <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
//             Are You Currently on Any Active Duty Federal Orders?
//           </span>
//         </label>
//         <select
//           {...register("activeDutyOrders", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//         {errors.activeDutyOrders && (
//           <p className="text-error text-xs mt-1">
//             {errors.activeDutyOrders.message}
//           </p>
//         )}
//       </div>

//       <div className="form-control w-full">
//         <label className="label">
//           <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
//             VA Direct Deposit Setup?
//           </span>
//         </label>
//         <select
//           {...register("vaDirectDeposit", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//         {errors.vaDirectDeposit && (
//           <p className="text-error text-xs mt-1">
//             {errors.vaDirectDeposit.message}
//           </p>
//         )}
//       </div>

//       {/* Main Homeless / At Risk Question */}
//       <div className="form-control w-full">
//         <label className="label">
//           <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
//             Are you currently homeless?
//           </span>
//         </label>
//         <select
//           {...register("homelessOrAtRisk", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="yes">Yes</option>
//           <option value="no">No</option>
//         </select>
//         {errors.homelessOrAtRisk && (
//           <p className="text-error text-xs mt-1">
//             {errors.homelessOrAtRisk.message}
//           </p>
//         )}
//       </div>

//       {/* Conditional Sections when "Yes" is selected */}
//       {isHomelessOrAtRisk && (
//         <div className="space-y-8 pt-6 border-t border-gray-300 animate-fade-in">
//           {/* 1. Living Situation (Currently Homeless) */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-primary dark:text-black">
//               Current Living Situation
//             </h3>

//             <div className="form-control w-full">
//               <label className="label">
//                 <span className="label-text font-medium pb-1 text-sm md:text-base dark:text-black">
//                   Check the answer that most closely aligns to your living
//                   situation:
//                 </span>
//               </label>
//               <select
//                 {...register("livingSituation", {
//                   required: "Please select your current living situation",
//                 })}
//                 className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//               >
//                 <option value="">Select an option</option>
//                 <option value="Living In A Homeless Shelter">
//                   Living In A Homeless Shelter
//                 </option>
//                 <option value="Not Currently In A Sheltered Environment">
//                   Not Currently In A Sheltered Environment (e.g., car, tent,
//                   street)
//                 </option>
//                 <option value="Staying With Another Person">
//                   Staying With Another Person (Couch Surfing)
//                 </option>
//                 <option value="Fleeing Domestic Violence">
//                   Fleeing Current Residence (e.g., Domestic Violence)
//                 </option>
//                 <option value="Housing Will Be Lost In 14 Days">
//                   Housing Will Be Lost Within 14 Days
//                 </option>
//                 <option value="Leaving Institution">
//                   Leaving a Publicly Funded Institution or System of Care
//                 </option>
//                 <option value="Others">Others</option>
//               </select>
//               {errors.livingSituation && (
//                 <p className="text-error text-xs mt-1">
//                   {errors.livingSituation.message}
//                 </p>
//               )}
//             </div>

//             {/* Others → Provide Details */}
//             {showLivingSituationOther && (
//               <div className="animate-fade-in">
//                 <label className="label">
//                   <span className="label-text font-medium pb-1 text-sm md:text-base dark:text-black">
//                     Provide Details About Your Living Situation
//                   </span>
//                 </label>
//                 <textarea
//                   rows={4}
//                   {...register("livingSituationDetails", {
//                     required: "Please describe your current living situation",
//                   })}
//                   className="textarea textarea-bordered w-full resize-none py-4 px-5 dark:bg-white dark:border-black dark:text-black placeholder:text-gray-400"
//                   placeholder="Ex: Sleeping in car, staying with friends temporarily, etc..."
//                 />
//                 {errors.livingSituationDetails && (
//                   <p className="text-error text-xs mt-1">
//                     {errors.livingSituationDetails.message}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* 2. Risk Situation (At Risk of Homelessness) */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-primary dark:text-black">
//               Are You At Risk of Becoming Homeless?
//             </h3>

//             <div className="form-control w-full">
//               <label className="label">
//                 <span className="label-text font-medium pb-1 text-sm md:text-base dark:text-black">
//                   Select the situation that applies to you:
//                 </span>
//               </label>
//               <select
//                 {...register("riskSituation", {
//                   required: "Please select your risk situation",
//                 })}
//                 className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//               >
//                 <option value="">Select an option</option>
//                 <option value="Eviction Notice Received">
//                   Received Eviction Notice or Foreclosure
//                 </option>
//                 <option value="Doubling Up Temporarily">
//                   Doubled Up / Living with Others Temporarily Due to Economic
//                   Hardship
//                 </option>
//                 <option value="Paying More Than 50% Income on Housing">
//                   Paying More Than 50% of Income on Housing
//                 </option>
//                 <option value="Others">Others</option>
//               </select>
//               {errors.riskSituation && (
//                 <p className="text-error text-xs mt-1">
//                   {errors.riskSituation.message}
//                 </p>
//               )}
//             </div>

//             {/* Others → Specify Risk */}
//             {showRiskSituationOther && (
//               <div className="animate-fade-in">
//                 <label className="label">
//                   <span className="label-text font-medium text-sm md:text-base dark:text-black">
//                     Please Specify Your Risk Situation
//                   </span>
//                 </label>
//                 <input
//                   type="text"
//                   {...register("riskSituationDetails", {
//                     required: "Please specify your risk situation",
//                   })}
//                   className={`input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black ${
//                     errors.riskSituationDetails ? "input-error" : ""
//                   }`}
//                   placeholder="Describe your situation..."
//                 />
//                 {errors.riskSituationDetails && (
//                   <p className="text-error text-xs mt-1">
//                     {errors.riskSituationDetails.message}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useFormContext } from "react-hook-form";

export default function Step7CurrentStatus() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const currentlyHomeless = watch("currentlyHomeless");
  const atRiskOfHomelessness = watch("atRiskOfHomelessness");
  const livingSituation = watch("livingSituation");
  const riskSituation = watch("riskSituation");

  const isCurrentlyHomeless = currentlyHomeless === "currently_homeless_yes";
  const showLivingSection = isCurrentlyHomeless;
  const showRiskQuestion = isCurrentlyHomeless;
  const showRiskSection =
    showRiskQuestion &&
    atRiskOfHomelessness === "risk_of_becoming_homeless_yes";

  const showLivingOther = livingSituation === "your_living-situation_other";
  const showRiskOther = riskSituation === "your_living-situation_2_other";

  return (
    <div className="space-y-8 px-2 md:px-0">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
            Are You Currently on Any Active Duty Federal Orders?
          </span>
        </label>
        <select
          {...register("activeDutyOrders", {
            required: "This field is required",
          })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.activeDutyOrders && (
          <p className="text-error text-xs mt-1">
            {errors.activeDutyOrders.message}
          </p>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
            VA Direct Deposit Setup?
          </span>
        </label>
        <select
          {...register("vaDirectDeposit", {
            required: "This field is required",
          })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.vaDirectDeposit && (
          <p className="text-error text-xs mt-1">
            {errors.vaDirectDeposit.message}
          </p>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
            Are you currently homeless?
          </span>
        </label>
        <select
          {...register("currentlyHomeless", {
            required: "This field is required",
          })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select</option>
          <option value="currently_homeless_yes">Yes</option>
          <option value="currently_homeless_no">No</option>
        </select>
        {errors.currentlyHomeless && (
          <p className="text-error text-xs mt-1">
            {errors.currentlyHomeless.message}
          </p>
        )}
      </div>

      {showLivingSection && (
        <div className="space-y-6 pt-6 border-t border-gray-300 animate-fade-in">
          <h3 className="text-lg font-semibold text-primary dark:text-black">
            Current Living Situation
          </h3>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-sm md:text-base dark:text-black">
                Check the answer that most closely aligns to your living
                situation:
              </span>
            </label>
            <select
              {...register("livingSituation", {
                required: "Please select your current living situation",
              })}
              className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select an option</option>
              <option value="your_living-situation_homeless_shelter">
                Living In A Homeless Shelter
              </option>
              <option value="your_living-situation_not_currently">
                Not Currently In A Sheltered Environment (e.g., car, tent)
              </option>
              <option value="your_living-situation_staying">
                Staying With Another Person
              </option>
              <option value="your_living-situation_fleeing">
                Fleeing Current Residence
              </option>

              <option value="your_living-situation_other">Others</option>
            </select>
            {errors.livingSituation && (
              <p className="text-error text-xs mt-1">
                {errors.livingSituation.message}
              </p>
            )}
          </div>

          {/* Others → Provide Details */}
          {showLivingOther && (
            <div className="animate-fade-in">
              <label className="label">
                <span className="label-text font-medium text-sm md:text-base dark:text-black">
                  Provide Details About Your Living Situation
                </span>
              </label>
              <textarea
                rows={4}
                {...register("livingSituationDetails", {
                  required: "Please describe your current living situation",
                })}
                className="textarea textarea-bordered w-full resize-none py-4 px-5 dark:bg-white dark:border-black dark:text-black placeholder:text-gray-400"
                placeholder="Ex: Sleeping in car, staying with friends, etc..."
              />
              {errors.livingSituationDetails && (
                <p className="text-error text-xs mt-1">
                  {errors.livingSituationDetails.message}
                </p>
              )}
            </div>
          )}

          {/* Point of Contact - Required when homeless */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-sm md:text-base dark:text-black">
                Point of Contact (Name of person VA can contact)
              </span>
            </label>
            <input
              type="text"
              {...register("point_of_contact", {
                required: "Point of contact is required",
              })}
              className={`input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black ${
                errors.point_of_contact ? "input-error" : ""
              }`}
              placeholder="Enter name"
            />
            {errors.point_of_contact && (
              <p className="text-error text-xs mt-1">
                {errors.point_of_contact.message}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Are You At Risk of Becoming Homeless? - Only if Currently Homeless = Yes */}
      {showRiskQuestion && (
        <div className="space-y-6 pt-6 border-t border-gray-300 animate-fade-in">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-lg text-primary dark:text-black">
                Are You At Risk of Becoming Homeless?
              </span>
            </label>
            <select
              {...register("atRiskOfHomelessness", {
                required: "This field is required",
              })}
              className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select</option>
              <option value="risk_of_becoming_homeless_yes">Yes</option>
              <option value="risk_of_becoming_homeless_no">No</option>
            </select>
            {errors.atRiskOfHomelessness && (
              <p className="text-error text-xs mt-1">
                {errors.atRiskOfHomelessness.message}
              </p>
            )}
          </div>

          {/* Risk Situation Details - Only if Yes */}
          {showRiskSection && (
            <div className="space-y-4 animate-fade-in">
              <label className="label">
                <span className="label-text font-medium text-sm md:text-base dark:text-black">
                  Select the situation that applies to you:
                </span>
              </label>
              <select
                {...register("riskSituation", {
                  required: "Please select your risk situation",
                })}
                className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
              >
                <option value="">Select an option</option>
                <option value="your_living-situation_2_housing">
                  Housing Will Be Lost In 30 Days
                </option>
                <option value="your_living-situation_2_homeless">
                  Leaving Publicly Funded System Of Care
                </option>
                <option value="your_living-situation_2_other">Others</option>
              </select>
              {errors.riskSituation && (
                <p className="text-error text-xs mt-1">
                  {errors.riskSituation.message}
                </p>
              )}

              {/* Others → Specify Risk */}
              {showRiskOther && (
                <div className="mt-4 animate-fade-in">
                  <label className="label">
                    <span className="label-text font-medium text-sm md:text-base dark:text-black">
                      Please Specify Your Risk Situation
                    </span>
                  </label>
                  <textarea
                    rows={5}
                    {...register("other_specify_2", {
                      required: "Please specify your risk situation",
                    })}
                    className="textarea textarea-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black placeholder:text-gray-400"
                    placeholder="Describe your situation..."
                  />
                  {errors.other_specify_2 && (
                    <p className="text-error text-xs mt-1">
                      {errors.other_specify_2.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
