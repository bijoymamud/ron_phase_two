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

import { useFormContext } from "react-hook-form";

export default function Step7CurrentStatus() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const vaHealthCare = watch("vaHealthCare");
  const livingSituation = watch("livingSituation");

  const showOtherSpecify = livingSituation === "Others";

  return (
    <div className="space-y-4 px-2 md:px-0">
      <div className="form-control w-full">
        <label className="label w-full">
          <span className="label-text font-medium text-sm md:text-base pb-1 break-words whitespace-normal dark:border-black dark:text-black">
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
          <label className="label">
            <span className="label-text-alt text-error text-xs">
              {errors.activeDutyOrders.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium text-sm md:text-base pb-1 break-words whitespace-normal dark:border-black dark:text-black">
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
          <label className="label">
            <span className="label-text-alt text-error text-xs">
              {errors.vaDirectDeposit.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium text-sm md:text-base pb-1 break-words whitespace-normal dark:border-black dark:text-black">
            Are you currently homeless or at risk of becoming homeless?{" "}
            <span className="text-gray-500">(Optional)</span>
          </span>
        </label>
        <select
          {...register("vaHealthCare")}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {vaHealthCare === "Yes" && (
        <div className="form-control w-full space-y-6 pt-4 border-t border-gray-300">
          <div>
            <label className="label">
              <span className="label-text font-medium text-[12px] md:text-base pb-1 dark:text-black">
                Provide Details
              </span>
            </label>
            <textarea
              rows={3}
              {...register("are_you_currently_homeless_text", {
                required:
                  "Please provide details about your current housing situation",
              })}
              className="textarea textarea-bordered w-full text-base leading-relaxed resize-none py-4 px-5 dark:bg-white dark:border-black dark:text-black rounded-md placeholder:text-gray-400 uppercase"
              placeholder="EX: LIVING IN SHELTER, STAYING WITH FRIENDS, SLEEPING IN CAR, ETC..."
            />
            {errors.are_you_currently_homeless_text && (
              <p className="text-error text-xs font-medium mt-2">
                {errors.are_you_currently_homeless_text.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
                POINT OF CONTACT (Name of person VA can contact)
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

          <div>
            <label className="label">
              <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
                Check The Answer That Most Closely Aligns To Your Living
                Situation:
              </span>
            </label>
            <select
              {...register("livingSituation", {
                required: "Living Situation is required",
              })}
              className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select an option</option>
              <option value="Living In A Homeless Shelter">
                Living In A Homeless Shelter
              </option>
              <option value="Not Currently In A Sheltered Environment">
                Not Currently In A Sheltered Environment (e.g., car, tent)
              </option>
              <option value="Staying With Another Person">
                Staying With Another Person
              </option>
              <option value="Fleeing Current Residence">
                Fleeing Current Residence
              </option>
              <option value="Housing Will Be Lost In 30 Days">
                Housing Will Be Lost In 30 Days
              </option>
              <option value="Leaving Publicly Funded System Of Care">
                Leaving Publicly Funded System Of Care
              </option>
              <option value="Others">Others</option>
            </select>
            {errors.livingSituation && (
              <p className="text-error text-xs mt-1">
                {errors.livingSituation.message}
              </p>
            )}
          </div>

          {showOtherSpecify && (
            <div className="animate-fade-in">
              <label className="label">
                <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
                  Provide your Living Situation
                </span>
              </label>
              <input
                type="text"
                {...register("other_specify", {
                  required: "Please specify your living situation",
                })}
                className={`input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black ${
                  errors.other_specify ? "input-error" : ""
                }`}
                placeholder="Describe your current living situation..."
              />
              {errors.other_specify && (
                <p className="text-error text-xs mt-1">
                  {errors.other_specify.message}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
