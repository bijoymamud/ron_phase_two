// import { useFormContext } from "react-hook-form";

// export default function Step7CurrentStatus() {
//   const {
//     register,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useFormContext();

//   const currentlyHomeless = watch("currently_homeless_yes");
//   const atRiskOfHomelessness = watch("risk_of_becoming_homeless_yes");
//   const livingSituation = watch("livingSituation");
//   const riskSituation = watch("riskSituation");

//   const isCurrentlyHomeless = currentlyHomeless === "Yes";
//   const showLivingSection = isCurrentlyHomeless;
//   const showRiskQuestion = isCurrentlyHomeless;
//   const isAtRiskOfHomelessness = atRiskOfHomelessness === "Yes";
//   const showRiskSection = showRiskQuestion && isAtRiskOfHomelessness;

//   const showLivingOther = livingSituation === "your_living-situation_other";
//   const showRiskOther = riskSituation === "your_living-situation_2_other";

//   const activatedFederalOrders = watch("22a_reserves_2_yes");
//   const isActivatedFederal = activatedFederalOrders === "Yes";

//   const prisonerOfWarValue = watch("prisoner_of_war_yes");
//   const isPrisonerOfWar = prisonerOfWarValue === "Yes";

//   const handlePrisonerOfWarChange = (value) => {
//     if (prisonerOfWarValue === value) {
//       setValue("prisoner_of_war_yes", null);
//     } else {
//       setValue("prisoner_of_war_yes", value);
//     }
//   };

//   return (
//     <div className="space-y-8 px-2 md:px-0">
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black font-bold">
//             ARE YOU CURRENTLY ACTIVATED ON FEDERAL ORDERS WITHIN THE NATIONAL
//             GUARD OR RESERVES?
//           </span>
//         </label>
//         <select
//           {...register("22a_reserves_2_yes", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-gray-900"
//         >
//           <option value="">Select</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//         {errors["22a_reserves_2_yes"] && (
//           <p className="text-error text-xs mt-1">
//             {errors["22a_reserves_2_yes"].message}
//           </p>
//         )}
//       </div>

//       {isActivatedFederal && (
//         <div className="space-y-8 pt-6 border-t border-gray-300 animate-fade-in">
//           <h3 className="text-lg font-semibold text-primary dark:text-black">
//             Federal Orders Activation Details
//           </h3>

//           <div className="space-y-4">
//             <label className="label">
//               <span className="label-text font-medium text-sm md:text-base dark:text-black">
//                 DATE OF ACTIVATION (MM - DD - YYYY)
//               </span>
//             </label>
//             <div className="grid grid-cols-3 gap-3">
//               <input
//                 type="number"
//                 placeholder="MM"
//                 min="1"
//                 max="12"
//                 {...register("activation_month_6", {
//                   required: isActivatedFederal ? "Month required" : false,
//                   min: { value: 1, message: "Invalid month" },
//                   max: { value: 12, message: "Invalid month" },
//                 })}
//                 className="input input-bordered w-full dark:bg-white dark:border-black dark:text-gray-900"
//               />
//               <input
//                 type="number"
//                 placeholder="DD"
//                 min="1"
//                 max="31"
//                 {...register("activation_day_6", {
//                   required: isActivatedFederal ? "Day required" : false,
//                   min: { value: 1, message: "Invalid day" },
//                   max: { value: 31, message: "Invalid day" },
//                 })}
//                 className="input input-bordered w-full dark:bg-white dark:border-black dark:text-gray-900"
//               />
//               <input
//                 type="number"
//                 placeholder="YYYY"
//                 min="1900"
//                 {...register("activation_year_6", {
//                   required: isActivatedFederal ? "Year required" : false,
//                   pattern: { value: /^(19|20)\d{2}$/, message: "Invalid year" },
//                 })}
//                 className="input input-bordered w-full dark:bg-white dark:border-black dark:text-gray-900"
//               />
//             </div>
//             {(errors.activation_month_6 ||
//               errors.activation_day_6 ||
//               errors.activation_year_6) && (
//               <p className="text-error text-xs mt-1">
//                 Please complete activation date
//               </p>
//             )}
//           </div>

//           {/* Anticipated Separation Date */}
//           <div className="space-y-4">
//             <label className="label">
//               <span className="label-text font-medium text-sm md:text-base dark:text-black">
//                 ANTICIPATED SEPARATION DATE (MM - DD - YYYY)
//               </span>
//             </label>
//             <div className="grid grid-cols-3 gap-3">
//               <input
//                 type="number"
//                 placeholder="MM"
//                 min="1"
//                 max="12"
//                 {...register("anticipated_month_7", {
//                   required: isActivatedFederal ? "Month required" : false,
//                 })}
//                 className="input input-bordered w-full dark:bg-white dark:border-black dark:text-gray-900"
//               />
//               <input
//                 type="number"
//                 placeholder="DD"
//                 min="1"
//                 max="31"
//                 {...register("anticipated_day_7", {
//                   required: isActivatedFederal ? "Day required" : false,
//                 })}
//                 className="input input-bordered w-full dark:bg-white dark:border-black dark:text-gray-900"
//               />
//               <input
//                 type="number"
//                 placeholder="YYYY"
//                 min="1900"
//                 {...register("anticipated_year_7", {
//                   required: isActivatedFederal ? "Year required" : false,
//                   pattern: { value: /^(19|20)\d{2}$/, message: "Invalid year" },
//                 })}
//                 className="input input-bordered w-full dark:bg-white dark:border-black dark:text-gray-900"
//               />
//             </div>
//             {(errors.anticipated_month_7 ||
//               errors.anticipated_day_7 ||
//               errors.anticipated_year_7) && (
//               <p className="text-error text-xs mt-1">
//                 Please complete separation date
//               </p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* === PRISONER OF WAR STATUS – CHECKBOXES (Only One Allowed) === */}
//       <div className="space-y-6 pt-6 border-t border-gray-300 animate-fade-in">
//         <h3 className="text-lg font-semibold text-primary dark:text-black">
//           Prisoner of War Status
//         </h3>

//         <div className="form-control w-full">
//           <label className="label">
//             <span className="label-text font-medium text-sm md:text-base dark:text-black">
//               HAVE YOU EVER BEEN A PRISONER OF WAR?
//             </span>
//           </label>

//           <div className="flex gap-16 mt-6">
//             <label className="label cursor-pointer justify-start gap-4 items-center">
//               <input
//                 type="checkbox"
//                 checked={prisonerOfWarValue === "Yes"}
//                 onChange={() => handlePrisonerOfWarChange("Yes")}
//                 className="checkbox checkbox-primary checkbox-sm"
//               />
//               <span className="label-text text-base font-medium dark:text-black">
//                 Yes
//               </span>
//             </label>

//             <label className="label cursor-pointer justify-start gap-4 items-center">
//               <input
//                 type="checkbox"
//                 checked={prisonerOfWarValue === "No"}
//                 onChange={() => handlePrisonerOfWarChange("No")}
//                 className="checkbox checkbox-primary checkbox-sm"
//               />
//               <span className="label-text text-base font-medium dark:text-black">
//                 No
//               </span>
//             </label>
//           </div>

//           <input
//             type="hidden"
//             value={prisonerOfWarValue || ""}
//             {...register("prisoner_of_war_yes", {
//               required: "Please select either Yes or No",
//             })}
//           />

//           {errors.prisoner_of_war_yes && (
//             <p className="text-error text-xs mt-2">
//               {errors.prisoner_of_war_yes.message}
//             </p>
//           )}
//         </div>

//         {/* === DATES OF CONFINEMENT – Side-by-side From / To === */}
//         {isPrisonerOfWar && (
//           <div className="space-y-8 animate-fade-in">
//             <label className="label">
//               <span className="label-text font-medium text-sm md:text-base dark:text-black">
//                 DATES OF CONFINEMENT
//               </span>
//             </label>

//             <div className="grid md:grid-cols-2 gap-8">
//               <div>
//                 <span className="text-sm font-semibold dark:text-black">
//                   From:
//                 </span>
//                 <div className="grid grid-cols-3 gap-3 mt-2">
//                   <input
//                     type="text"
//                     placeholder="MM"
//                     maxLength={2}
//                     {...register("confinement_month_8", {
//                       required: isPrisonerOfWar,
//                       validate: {
//                         validMonth: (value) =>
//                           /^(0?[1-9]|1[0-2])$/.test(value) ||
//                           "Enter a valid month (01-12)",
//                       },
//                     })}
//                     className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
//                   />

//                   <input
//                     type="number"
//                     placeholder="DD"
//                     min="1"
//                     max="31"
//                     {...register("confinement_day_8", {
//                       required: isPrisonerOfWar,
//                     })}
//                     className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
//                   />
//                   <input
//                     type="number"
//                     placeholder="YYYY"
//                     min="1900"
//                     {...register("confinement_year_8", {
//                       required: isPrisonerOfWar,
//                       pattern: {
//                         value: /^(19|20)\d{2}$/,
//                         message: "Invalid year",
//                       },
//                     })}
//                     className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <span className="text-sm font-semibold dark:text-black">
//                   To:
//                 </span>
//                 <div className="grid grid-cols-3 gap-3 mt-2">
//                   <input
//                     type="number"
//                     placeholder="MM"
//                     min="1"
//                     max="12"
//                     {...register("confinement_month_9", {
//                       required: isPrisonerOfWar,
//                     })}
//                     className="input input-bordered w-full dark:text-gray-900 dark:bg-white dark:border-black"
//                   />
//                   <input
//                     type="number"
//                     placeholder="DD"
//                     min="1"
//                     max="31"
//                     {...register("confinement_day_9", {
//                       required: isPrisonerOfWar,
//                     })}
//                     className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
//                   />
//                   <input
//                     type="number"
//                     placeholder="YYYY"
//                     min="1900"
//                     {...register("confinement_year_9", {
//                       required: isPrisonerOfWar,
//                       pattern: {
//                         value: /^(19|20)\d{2}$/,
//                         message: "Invalid year",
//                       },
//                     })}
//                     className="input input-bordered w-full dark:text-gray-900 dark:bg-white dark:border-black"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-8">
//               <div>
//                 <span className="text-sm font-semibold dark:text-black">
//                   From:
//                 </span>
//                 <div className="grid grid-cols-3 gap-3 mt-2">
//                   <input
//                     type="number"
//                     placeholder="MM"
//                     min="1"
//                     max="2"
//                     {...register("confinement_month_10")}
//                     className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
//                   />
//                   <input
//                     type="number"
//                     placeholder="DD"
//                     min="1"
//                     max="31"
//                     {...register("confinement_day_10")}
//                     className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
//                   />
//                   <input
//                     type="number"
//                     placeholder="YYYY"
//                     min="1900"
//                     {...register("confinement_year_10")}
//                     className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <span className="text-sm font-semibold dark:text-black">
//                   To:
//                 </span>
//                 <div className="grid grid-cols-3 gap-3 mt-2">
//                   <input
//                     type="number"
//                     placeholder="MM"
//                     min="1"
//                     max="12"
//                     {...register("confinement_month_11")}
//                     className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
//                   />
//                   <input
//                     type="number"
//                     placeholder="DD"
//                     min="1"
//                     max="31"
//                     {...register("confinement_day_11")}
//                     className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
//                   />
//                   <input
//                     type="number"
//                     placeholder="YYYY"
//                     min="1900"
//                     {...register("confinement_year_11")}
//                     className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* === VA DIRECT DEPOSIT === */}
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

//       {/* === ARE YOU CURRENTLY HOMELESS? === */}
//       <div className="form-control w-full">
//         <label className="label">
//           <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
//             Are you currently homeless?
//           </span>
//         </label>
//         <select
//           {...register("currently_homeless_yes", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//         {errors.currently_homeless_yes && (
//           <p className="text-error text-xs mt-1">
//             {errors.currently_homeless_yes.message}
//           </p>
//         )}
//       </div>

//       {showLivingSection && (
//         <div className="space-y-6 pt-6 border-t border-gray-300 animate-fade-in">
//           <h3 className="text-lg font-semibold text-primary dark:text-black">
//             Current Living Situation
//           </h3>
//           <div className="form-control w-full">
//             <label className="label">
//               <span className="label-text font-medium pb-1 text-sm md:text-base dark:text-black">
//                 Check the answer that most closely aligns to your living
//                 situation:
//               </span>
//             </label>
//             <select
//               {...register("livingSituation", {
//                 required: showLivingSection
//                   ? "Please select your current living situation"
//                   : false,
//               })}
//               className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//             >
//               <option value="">Select an option</option>
//               <option value="your_living-situation_shelter">
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
//               <option value="your_living-situation_other">Others</option>
//             </select>
//             {errors.livingSituation && (
//               <p className="text-error text-xs mt-1">
//                 {errors.livingSituation.message}
//               </p>
//             )}
//           </div>

//           {showLivingOther && (
//             <div className="animate-fade-in">
//               <label className="label">
//                 <span className="label-text font-medium text-sm md:text-base dark:text-black">
//                   Provide Details About Your Living Situation
//                 </span>
//               </label>
//               <textarea
//                 rows={4}
//                 {...register("livingSituationDetails", {
//                   required: showLivingOther
//                     ? "Please describe your current living situation"
//                     : false,
//                 })}
//                 className="textarea textarea-bordered w-full resize-none py-4 px-5 dark:bg-white dark:border-black dark:text-black placeholder:text-gray-400"
//                 placeholder="Ex: Sleeping in car, staying with friends, etc..."
//               />
//               {errors.livingSituationDetails && (
//                 <p className="text-error text-xs mt-1">
//                   {errors.livingSituationDetails.message}
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       )}

//       {/* === AT RISK OF HOMELESSNESS === */}
//       {showRiskQuestion && (
//         <div className="space-y-6 pt-6 border-t border-gray-300 animate-fade-in">
//           <div className="form-control w-full">
//             <label className="label">
//               <span className="label-text font-medium text-lg pb-1 text-primary dark:text-black">
//                 Are You At Risk of Becoming Homeless?
//               </span>
//             </label>
//             <select
//               {...register("risk_of_becoming_homeless_yes", {
//                 required: showRiskQuestion ? "This field is required" : false,
//               })}
//               className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//             >
//               <option value="">Select</option>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </select>
//             {errors.risk_of_becoming_homeless_yes && (
//               <p className="text-error text-xs mt-1">
//                 {errors.risk_of_becoming_homeless_yes.message}
//               </p>
//             )}
//           </div>

//           {showRiskSection && (
//             <div className="animate-fade-in">
//               <label className="label">
//                 <span className="label-text pb-1 font-medium text-sm md:text-base dark:text-black">
//                   Select the situation that applies to you:
//                 </span>
//               </label>
//               <select
//                 {...register("riskSituation", {
//                   required: showRiskSection
//                     ? "Please select your risk situation"
//                     : false,
//                 })}
//                 className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//               >
//                 <option value="">Select an option</option>
//                 <option value="your_living-situation_2_housing">
//                   Housing Will Be Lost In 30 Days
//                 </option>
//                 <option value="your_living-situation_2_homeless">
//                   Leaving Publicly Funded System Of Care
//                 </option>
//                 <option value="your_living-situation_2_other">Others</option>
//               </select>
//               {errors.riskSituation && (
//                 <p className="text-error text-xs mt-1">
//                   {errors.riskSituation.message}
//                 </p>
//               )}

//               {showRiskOther && (
//                 <div className="mt-4 animate-fade-in">
//                   <label className="label">
//                     <span className="label-text pb-1 font-medium text-sm md:text-base dark:text-black">
//                       Please Specify Your Risk Situation
//                     </span>
//                   </label>
//                   <textarea
//                     rows={5}
//                     {...register("other_specify_2", {
//                       required: showRiskOther
//                         ? "Please specify your risk situation"
//                         : false,
//                     })}
//                     className="textarea textarea-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black placeholder:text-gray-400"
//                     placeholder="Describe your situation..."
//                   />
//                   {errors.other_specify_2 && (
//                     <p className="text-error text-xs mt-1">
//                       {errors.other_specify_2.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
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
    setValue,
    formState: { errors },
  } = useFormContext();

  const currentlyHomeless = watch("currently_homeless_yes");
  const atRiskOfHomelessness = watch("risk_of_becoming_homeless_yes");
  const livingSituation = watch("livingSituation");
  const riskSituation = watch("riskSituation");

  const isCurrentlyHomeless = currentlyHomeless === "Yes";
  const showLivingSection = isCurrentlyHomeless;
  const showRiskQuestion = isCurrentlyHomeless;
  const isAtRiskOfHomelessness = atRiskOfHomelessness === "Yes";
  const showRiskSection = showRiskQuestion && isAtRiskOfHomelessness;

  const showLivingOther = livingSituation === "your_living-situation_other";
  const showRiskOther = riskSituation === "your_living-situation_2_other";

  const activatedFederalOrders = watch("22a_reserves_2_yes");
  const isActivatedFederal = activatedFederalOrders === "Yes";

  const prisonerOfWarValue = watch("prisoner_of_war_yes");
  const isPrisonerOfWar = prisonerOfWarValue === "Yes";

  const handlePrisonerOfWarChange = (value) => {
    if (prisonerOfWarValue === value) {
      setValue("prisoner_of_war_yes", null);
    } else {
      setValue("prisoner_of_war_yes", value);
    }
  };

  return (
    <div className="space-y-8 px-2 md:px-0">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black font-bold">
            ARE YOU CURRENTLY ACTIVATED ON FEDERAL ORDERS WITHIN THE NATIONAL
            GUARD OR RESERVES?
          </span>
        </label>
        <select
          {...register("22a_reserves_2_yes", {
            required: "This field is required",
          })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-gray-900"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors["22a_reserves_2_yes"] && (
          <p className="text-error text-xs mt-1">
            {errors["22a_reserves_2_yes"].message}
          </p>
        )}
      </div>

      {isActivatedFederal && (
        <div className="space-y-8 pt-6 border-t border-gray-300 animate-fade-in">
          <h3 className="text-lg font-semibold text-primary dark:text-black">
            Federal Orders Activation Details
          </h3>

          {/* Date of Activation */}
          <div className="space-y-4">
            <label className="label">
              <span className="label-text font-medium text-sm md:text-base dark:text-black">
                DATE OF ACTIVATION (MM - DD - YYYY)
              </span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <input
                  type="number"
                  placeholder="MM"
                  min="1"
                  max="12"
                  {...register("activation_month_6", {
                    required: isActivatedFederal ? "Month required" : false,
                    min: { value: 1, message: "Must be 1-12" },
                    max: { value: 12, message: "Must be 1-12" },
                    validate: (value) => {
                      if (!value) return true;
                      const num = parseInt(value);
                      return (num >= 1 && num <= 12) || "Invalid month";
                    },
                  })}
                  className="input input-bordered w-full dark:bg-white dark:border-black dark:text-gray-900"
                />
                {errors.activation_month_6 && (
                  <p className="text-error text-xs">
                    {errors.activation_month_6.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <input
                  type="number"
                  placeholder="DD"
                  min="1"
                  max="31"
                  {...register("activation_day_6", {
                    required: isActivatedFederal ? "Day required" : false,
                    min: { value: 1, message: "Must be 1-31" },
                    max: { value: 31, message: "Must be 1-31" },
                    validate: (value) => {
                      if (!value) return true;
                      const num = parseInt(value);
                      return (num >= 1 && num <= 31) || "Invalid day";
                    },
                  })}
                  className="input input-bordered w-full dark:bg-white dark:border-black dark:text-gray-900"
                />
                {errors.activation_day_6 && (
                  <p className="text-error text-xs">
                    {errors.activation_day_6.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <input
                  type="number"
                  placeholder="YYYY"
                  min="1900"
                  {...register("activation_year_6", {
                    required: isActivatedFederal ? "Year required" : false,
                    validate: (value) => {
                      if (!value) return true;
                      const year = parseInt(value);
                      const currentYear = new Date().getFullYear();
                      return (
                        (year >= 1900 && year <= currentYear + 5) ||
                        "Invalid year"
                      );
                    },
                  })}
                  className="input input-bordered w-full dark:bg-white dark:border-black dark:text-gray-900"
                />
                {errors.activation_year_6 && (
                  <p className="text-error text-xs">
                    {errors.activation_year_6.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Anticipated Separation Date */}
          <div className="space-y-4">
            <label className="label">
              <span className="label-text font-medium text-sm md:text-base dark:text-black">
                ANTICIPATED SEPARATION DATE (MM - DD - YYYY)
              </span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <input
                  type="number"
                  placeholder="MM"
                  min="1"
                  max="12"
                  {...register("anticipated_month_7", {
                    required: isActivatedFederal ? "Month required" : false,
                    min: { value: 1, message: "Must be 1-12" },
                    max: { value: 12, message: "Must be 1-12" },
                    validate: (value) => {
                      if (!value) return true;
                      const num = parseInt(value);
                      return (num >= 1 && num <= 12) || "Invalid month";
                    },
                  })}
                  className="input input-bordered w-full dark:bg-white dark:border-black dark:text-gray-900"
                />
                {errors.anticipated_month_7 && (
                  <p className="text-error text-xs">
                    {errors.anticipated_month_7.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <input
                  type="number"
                  placeholder="DD"
                  min="1"
                  max="31"
                  {...register("anticipated_day_7", {
                    required: isActivatedFederal ? "Day required" : false,
                    min: { value: 1, message: "Must be 1-31" },
                    max: { value: 31, message: "Must be 1-31" },
                    validate: (value) => {
                      if (!value) return true;
                      const num = parseInt(value);
                      return (num >= 1 && num <= 31) || "Invalid day";
                    },
                  })}
                  className="input input-bordered w-full dark:bg-white dark:border-black dark:text-gray-900"
                />
                {errors.anticipated_day_7 && (
                  <p className="text-error text-xs">
                    {errors.anticipated_day_7.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <input
                  type="number"
                  placeholder="YYYY"
                  min="1900"
                  {...register("anticipated_year_7", {
                    required: isActivatedFederal ? "Year required" : false,
                    validate: (value) => {
                      if (!value) return true;
                      const year = parseInt(value);
                      const currentYear = new Date().getFullYear();
                      return (
                        (year >= 1900 && year <= currentYear + 20) ||
                        "Invalid year"
                      );
                    },
                  })}
                  className="input input-bordered w-full dark:bg-white dark:border-black dark:text-gray-900"
                />
                {errors.anticipated_year_7 && (
                  <p className="text-error text-xs">
                    {errors.anticipated_year_7.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === PRISONER OF WAR STATUS – CHECKBOXES (Only One Allowed) === */}
      <div className="space-y-6 pt-6 border-t border-gray-300 animate-fade-in">
        <h3 className="text-lg font-semibold text-primary dark:text-black">
          Prisoner of War Status
        </h3>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium text-sm md:text-base dark:text-black">
              HAVE YOU EVER BEEN A PRISONER OF WAR?
            </span>
          </label>

          <div className="flex gap-16 mt-6">
            <label className="label cursor-pointer justify-start gap-4 items-center">
              <input
                type="checkbox"
                checked={prisonerOfWarValue === "Yes"}
                onChange={() => handlePrisonerOfWarChange("Yes")}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="label-text text-base font-medium dark:text-black">
                Yes
              </span>
            </label>

            <label className="label cursor-pointer justify-start gap-4 items-center">
              <input
                type="checkbox"
                checked={prisonerOfWarValue === "No"}
                onChange={() => handlePrisonerOfWarChange("No")}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="label-text text-base font-medium dark:text-black">
                No
              </span>
            </label>
          </div>

          <input
            type="hidden"
            value={prisonerOfWarValue || ""}
            {...register("prisoner_of_war_yes", {
              required: "Please select either Yes or No",
            })}
          />

          {errors.prisoner_of_war_yes && (
            <p className="text-error text-xs mt-2">
              {errors.prisoner_of_war_yes.message}
            </p>
          )}
        </div>

        {/* === DATES OF CONFINEMENT – Side-by-side From / To === */}
        {isPrisonerOfWar && (
          <div className="space-y-8 animate-fade-in">
            <label className="label">
              <span className="label-text font-medium text-sm md:text-base dark:text-black">
                DATES OF CONFINEMENT
              </span>
            </label>

            {/* First Confinement Period */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <span className="text-sm font-semibold dark:text-black">
                  From:
                </span>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="MM"
                      maxLength={2}
                      {...register("confinement_month_8", {
                        required: isPrisonerOfWar ? "Month required" : false,
                        validate: (value) => {
                          if (!value) return true;
                          const num = parseInt(value);
                          return (
                            (num >= 1 && num <= 12) || "Invalid month (1-12)"
                          );
                        },
                      })}
                      className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    />
                    {errors.confinement_month_8 && (
                      <p className="text-error text-xs">
                        {errors.confinement_month_8.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <input
                      type="number"
                      placeholder="DD"
                      min="1"
                      max="31"
                      {...register("confinement_day_8", {
                        required: isPrisonerOfWar ? "Day required" : false,
                        validate: (value) => {
                          if (!value) return true;
                          const num = parseInt(value);
                          return (
                            (num >= 1 && num <= 31) || "Invalid day (1-31)"
                          );
                        },
                      })}
                      className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    />
                    {errors.confinement_day_8 && (
                      <p className="text-error text-xs">
                        {errors.confinement_day_8.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <input
                      type="number"
                      placeholder="YYYY"
                      min="1900"
                      {...register("confinement_year_8", {
                        required: isPrisonerOfWar ? "Year required" : false,
                        validate: (value) => {
                          if (!value) return true;
                          const year = parseInt(value);
                          const currentYear = new Date().getFullYear();
                          return (
                            (year >= 1900 && year <= currentYear) ||
                            "Invalid year"
                          );
                        },
                      })}
                      className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    />
                    {errors.confinement_year_8 && (
                      <p className="text-error text-xs">
                        {errors.confinement_year_8.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-sm font-semibold dark:text-black">
                  To:
                </span>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <div className="space-y-1">
                    <input
                      type="number"
                      placeholder="MM"
                      min="1"
                      max="12"
                      {...register("confinement_month_9", {
                        required: isPrisonerOfWar ? "Month required" : false,
                        validate: (value) => {
                          if (!value) return true;
                          const num = parseInt(value);
                          return (
                            (num >= 1 && num <= 12) || "Invalid month (1-12)"
                          );
                        },
                      })}
                      className="input input-bordered w-full dark:text-gray-900 dark:bg-white dark:border-black"
                    />
                    {errors.confinement_month_9 && (
                      <p className="text-error text-xs">
                        {errors.confinement_month_9.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <input
                      type="number"
                      placeholder="DD"
                      min="1"
                      max="31"
                      {...register("confinement_day_9", {
                        required: isPrisonerOfWar ? "Day required" : false,
                        validate: (value) => {
                          if (!value) return true;
                          const num = parseInt(value);
                          return (
                            (num >= 1 && num <= 31) || "Invalid day (1-31)"
                          );
                        },
                      })}
                      className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    />
                    {errors.confinement_day_9 && (
                      <p className="text-error text-xs">
                        {errors.confinement_day_9.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <input
                      type="number"
                      placeholder="YYYY"
                      min="1900"
                      {...register("confinement_year_9", {
                        required: isPrisonerOfWar ? "Year required" : false,
                        validate: (value) => {
                          if (!value) return true;
                          const year = parseInt(value);
                          const currentYear = new Date().getFullYear();
                          return (
                            (year >= 1900 && year <= currentYear) ||
                            "Invalid year"
                          );
                        },
                      })}
                      className="input input-bordered w-full dark:text-gray-900 dark:bg-white dark:border-black"
                    />
                    {errors.confinement_year_9 && (
                      <p className="text-error text-xs">
                        {errors.confinement_year_9.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Second Confinement Period (Optional) */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <span className="text-sm font-semibold dark:text-black">
                  From:
                </span>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <div className="space-y-1">
                    <input
                      type="number"
                      placeholder="MM"
                      min="1"
                      max="12"
                      {...register("confinement_month_10", {
                        validate: (value) => {
                          if (!value) return true;
                          const num = parseInt(value);
                          return (
                            (num >= 1 && num <= 12) || "Invalid month (1-12)"
                          );
                        },
                      })}
                      className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    />
                    {errors.confinement_month_10 && (
                      <p className="text-error text-xs">
                        {errors.confinement_month_10.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <input
                      type="number"
                      placeholder="DD"
                      min="1"
                      max="31"
                      {...register("confinement_day_10", {
                        validate: (value) => {
                          if (!value) return true;
                          const num = parseInt(value);
                          return (
                            (num >= 1 && num <= 31) || "Invalid day (1-31)"
                          );
                        },
                      })}
                      className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    />
                    {errors.confinement_day_10 && (
                      <p className="text-error text-xs">
                        {errors.confinement_day_10.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <input
                      type="number"
                      placeholder="YYYY"
                      min="1900"
                      {...register("confinement_year_10", {
                        validate: (value) => {
                          if (!value) return true;
                          const year = parseInt(value);
                          const currentYear = new Date().getFullYear();
                          return (
                            (year >= 1900 && year <= currentYear) ||
                            "Invalid year"
                          );
                        },
                      })}
                      className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    />
                    {errors.confinement_year_10 && (
                      <p className="text-error text-xs">
                        {errors.confinement_year_10.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-sm font-semibold dark:text-black">
                  To:
                </span>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <div className="space-y-1">
                    <input
                      type="number"
                      placeholder="MM"
                      min="1"
                      max="12"
                      {...register("confinement_month_11", {
                        validate: (value) => {
                          if (!value) return true;
                          const num = parseInt(value);
                          return (
                            (num >= 1 && num <= 12) || "Invalid month (1-12)"
                          );
                        },
                      })}
                      className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    />
                    {errors.confinement_month_11 && (
                      <p className="text-error text-xs">
                        {errors.confinement_month_11.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <input
                      type="number"
                      placeholder="DD"
                      min="1"
                      max="31"
                      {...register("confinement_day_11", {
                        validate: (value) => {
                          if (!value) return true;
                          const num = parseInt(value);
                          return (
                            (num >= 1 && num <= 31) || "Invalid day (1-31)"
                          );
                        },
                      })}
                      className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    />
                    {errors.confinement_day_11 && (
                      <p className="text-error text-xs">
                        {errors.confinement_day_11.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <input
                      type="number"
                      placeholder="YYYY"
                      min="1900"
                      {...register("confinement_year_11", {
                        validate: (value) => {
                          if (!value) return true;
                          const year = parseInt(value);
                          const currentYear = new Date().getFullYear();
                          return (
                            (year >= 1900 && year <= currentYear) ||
                            "Invalid year"
                          );
                        },
                      })}
                      className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    />
                    {errors.confinement_year_11 && (
                      <p className="text-error text-xs">
                        {errors.confinement_year_11.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* === VA DIRECT DEPOSIT === */}
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

      {/* === ARE YOU CURRENTLY HOMELESS? === */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
            Are you currently homeless?
          </span>
        </label>
        <select
          {...register("currently_homeless_yes", {
            required: "This field is required",
          })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.currently_homeless_yes && (
          <p className="text-error text-xs mt-1">
            {errors.currently_homeless_yes.message}
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
              <span className="label-text font-medium pb-1 text-sm md:text-base dark:text-black">
                Check the answer that most closely aligns to your living
                situation:
              </span>
            </label>
            <select
              {...register("livingSituation", {
                required: showLivingSection
                  ? "Please select your current living situation"
                  : false,
              })}
              className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select an option</option>
              <option value="your_living-situation_shelter">
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
                  required: showLivingOther
                    ? "Please describe your current living situation"
                    : false,
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
        </div>
      )}

      {/* === AT RISK OF HOMELESSNESS === */}
      {showRiskQuestion && (
        <div className="space-y-6 pt-6 border-t border-gray-300 animate-fade-in">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-lg pb-1 text-primary dark:text-black">
                Are You At Risk of Becoming Homeless?
              </span>
            </label>
            <select
              {...register("risk_of_becoming_homeless_yes", {
                required: showRiskQuestion ? "This field is required" : false,
              })}
              className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.risk_of_becoming_homeless_yes && (
              <p className="text-error text-xs mt-1">
                {errors.risk_of_becoming_homeless_yes.message}
              </p>
            )}
          </div>

          {showRiskSection && (
            <div className="animate-fade-in">
              <label className="label">
                <span className="label-text pb-1 font-medium text-sm md:text-base dark:text-black">
                  Select the situation that applies to you:
                </span>
              </label>
              <select
                {...register("riskSituation", {
                  required: showRiskSection
                    ? "Please select your risk situation"
                    : false,
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

              {showRiskOther && (
                <div className="mt-4 animate-fade-in">
                  <label className="label">
                    <span className="label-text pb-1 font-medium text-sm md:text-base dark:text-black">
                      Please Specify Your Risk Situation
                    </span>
                  </label>
                  <textarea
                    rows={5}
                    {...register("other_specify_2", {
                      required: showRiskOther
                        ? "Please specify your risk situation"
                        : false,
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
