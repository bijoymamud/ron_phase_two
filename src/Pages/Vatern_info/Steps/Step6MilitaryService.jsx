// import { useFormContext } from "react-hook-form";

// export default function Step6MilitaryService() {
//   const {
//     register,
//     watch,
//     formState: { errors },
//   } = useFormContext();

//   const serviceUnder = watch("serviceUnder");

//   const showOtherNames = serviceUnder === "serve_under_another_name_yes";

//   return (
//     <div className="space-y-6">
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
//             Components
//           </span>
//         </label>
//         <select
//           {...register("branchOfService", {
//             required: "Branch of Service is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select Branch</option>
//           <option value="19b_component_active"> COMPONENT (Active)</option>
//           <option value="19b_component_reserve"> COMPONENT (Reservers)</option>
//           <option value="19b_component_national_guard">
//             {" "}
//             COMPONENT (National Guard)
//           </option>
//         </select>
//         {errors.branchOfService && (
//           <p className="text-error text-xs mt-1">
//             {errors.branchOfService.message}
//           </p>
//         )}
//       </div>

//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
//             Branch of Service
//           </span>
//         </label>
//         <select
//           {...register("branchOfService", {
//             required: "Branch of Service is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select Branch</option>
//           <option value="branch_of_service_army">Army</option>
//           <option value="branch_of_service_navy">Navy</option>
//           <option value="branch_of_service_marinecorp">Marine Corps</option>
//           <option value="branch_of_service_airforce">Air Force</option>
//           <option value="branch_of_service_costguard">Coast Guard</option>
//           <option value="branch_of_service_spaceforce">Space Force</option>
//           <option value="branch_of_service_noaa">
//             National Oceanic and Atmospheric Administration (NOAA)
//           </option>
//           <option value="branch_of_service_usphs">
//             U.S. Public Health Service (USPHS)
//           </option>
//         </select>
//         {errors.branchOfService && (
//           <p className="text-error text-xs mt-1">
//             {errors.branchOfService.message}
//           </p>
//         )}
//       </div>

//       {/* Did you serve under another name? */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
//             Did you ever serve under another name?
//           </span>
//         </label>
//         <select
//           {...register("serviceUnder", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="serve_under_another_name_yes">Yes</option>
//           <option value="serve_under_another_name_no">No</option>
//         </select>
//         {errors.serviceUnder && (
//           <p className="text-error text-xs mt-1">
//             {errors.serviceUnder.message}
//           </p>
//         )}
//       </div>

//       {/* Conditional: Other Names */}
//       {showOtherNames && (
//         <div className="animate-fade-in form-control">
//           <label className="label">
//             <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
//               List of other name(s) you served under
//             </span>
//           </label>
//           <textarea
//             rows={4}
//             {...register("other_names_you_served_under", {
//               required: "Please list the name(s) you served under",
//             })}
//             className="textarea textarea-bordered w-full resize-none py-4 px-5 dark:bg-white dark:border-black dark:text-black placeholder:text-gray-400 uppercase"
//             placeholder="e.g. John A. Smith, Jane Marie Doe, etc..."
//           />
//           {errors.other_names_you_served_under && (
//             <p className="text-error text-xs mt-1">
//               {errors.other_names_you_served_under.message}
//             </p>
//           )}
//         </div>
//       )}

//       {/* Place of Separation */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
//             Place of Separation
//           </span>
//         </label>
//         <input
//           type="text"
//           {...register("place_of_last_or_anticipated_separation_1", {
//             required: "Place of Separation is required",
//           })}
//           className="input input-bordered w-full py-5 uppercase dark:bg-white dark:border-black dark:text-black"
//           placeholder="Enter place of separation"
//         />
//         {errors.place_of_last_or_anticipated_separation_1 && (
//           <p className="text-error text-xs mt-1">
//             {errors.place_of_last_or_anticipated_separation_1.message}
//           </p>
//         )}
//       </div>

//       {/* Did You Serve in the National Guard or Reserves? */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
//             Did You Serve in the National Guard or Reserves?
//           </span>
//         </label>
//         <select
//           {...register("component_national_guard_2", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//         {errors.component_national_guard_2 && (
//           <p className="text-error text-xs mt-1">
//             {errors.component_national_guard_2.message}
//           </p>
//         )}
//       </div>

//       {/* DID YOU SERVE IN A COMBAT ZONE SINCE 9-11-2001? */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black font-bold">
//             DID YOU SERVE IN A COMBAT ZONE SINCE 9-11-2001?
//           </span>
//         </label>
//         <select
//           {...register("servedInCombatZoneSince911", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="did_you_serve_since_9112001_yes">Yes</option>
//           <option value="did_you_serve_since_9112001_no">No</option>
//         </select>
//         {errors.servedInCombatZoneSince911 && (
//           <p className="text-error text-xs mt-1">
//             {errors.servedInCombatZoneSince911.message}
//           </p>
//         )}
//       </div>

//       {/* ARE YOU CURRENTLY ACTIVATED ON FEDERAL ORDERS? */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black font-bold">
//             ARE YOU CURRENTLY ACTIVATED ON FEDERAL ORDERS WITHIN THE NATIONAL
//             GUARD OR RESERVES?
//           </span>
//         </label>
//         <select
//           {...register("currentlyActivatedFederalOrders", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="the_reserves_or_national_guard_yes">Yes</option>
//           <option value="the_reserves_or_national_guard_no">No</option>
//         </select>
//         {errors.currentlyActivatedFederalOrders && (
//           <p className="text-error text-xs mt-1">
//             {errors.currentlyActivatedFederalOrders.message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

import { useFormContext } from "react-hook-form";

export default function Step6MilitaryService() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const serviceUnder = watch("serviceUnder");

  const showOtherNames = serviceUnder === "serve_under_another_name_yes";

  return (
    <div className="space-y-6">
      {/* COMPONENTS */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
            Components
          </span>
        </label>

        <select
          {...register("componentType", {
            required: "Component is required",
          })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select Component</option>
          <option value="19b_component_active">COMPONENT (Active)</option>
          <option value="19b_component_reserve">COMPONENT (Reserve)</option>
          <option value="19b_component_national_guard">
            COMPONENT (National Guard)
          </option>
        </select>

        {errors.componentType && (
          <p className="text-error text-xs mt-1">
            {errors.componentType.message}
          </p>
        )}
      </div>

      {/* BRANCH OF SERVICE */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
            Branch of Service
          </span>
        </label>

        <select
          {...register("branchOfService", {
            required: "Branch of Service is required",
          })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select Branch</option>
          <option value="branch_of_service_army">Army</option>
          <option value="branch_of_service_navy">Navy</option>
          <option value="branch_of_service_marinecorp">Marine Corps</option>
          <option value="branch_of_service_airforce">Air Force</option>
          <option value="branch_of_service_coastguard">Coast Guard</option>
          <option value="branch_of_service_spaceforce">Space Force</option>
          <option value="branch_of_service_noaa">NOAA</option>
          <option value="branch_of_service_usphs">USPHS</option>
        </select>

        {errors.branchOfService && (
          <p className="text-error text-xs mt-1">
            {errors.branchOfService.message}
          </p>
        )}
      </div>

      {/* Did you serve under another name? */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
            Did you ever serve under another name?
          </span>
        </label>

        <select
          {...register("serviceUnder", {
            required: "This field is required",
          })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select</option>
          <option value="serve_under_another_name_yes">Yes</option>
          <option value="serve_under_another_name_no">No</option>
        </select>

        {errors.serviceUnder && (
          <p className="text-error text-xs mt-1">
            {errors.serviceUnder.message}
          </p>
        )}
      </div>

      {/* Conditional */}
      {showOtherNames && (
        <div className="animate-fade-in form-control">
          <label className="label">
            <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
              List of other name(s) you served under
            </span>
          </label>

          <textarea
            rows={4}
            {...register("other_names_you_served_under", {
              required: "Please list the name(s) you served under",
            })}
            className="textarea textarea-bordered w-full resize-none py-4 px-5 dark:bg-white dark:border-black dark:text-black placeholder:text-gray-400 uppercase"
            placeholder="e.g. John A. Smith, Jane Marie Doe"
          />

          {errors.other_names_you_served_under && (
            <p className="text-error text-xs mt-1">
              {errors.other_names_you_served_under.message}
            </p>
          )}
        </div>
      )}

      {/* Place of Separation */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
            Place of Separation
          </span>
        </label>

        <input
          type="text"
          {...register("place_of_last_or_anticipated_separation_1", {
            required: "Place of Separation is required",
          })}
          className="input input-bordered w-full py-5 uppercase dark:bg-white dark:border-black dark:text-black"
          placeholder="Enter place of separation"
        />

        {errors.place_of_last_or_anticipated_separation_1 && (
          <p className="text-error text-xs mt-1">
            {errors.place_of_last_or_anticipated_separation_1.message}
          </p>
        )}
      </div>

      {/* National Guard or Reserves */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
            Did You Serve in the National Guard or Reserves?
          </span>
        </label>

        <select
          {...register("component_national_guard_2", {
            required: "This field is required",
          })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {errors.component_national_guard_2 && (
          <p className="text-error text-xs mt-1">
            {errors.component_national_guard_2.message}
          </p>
        )}
      </div>

      {/* Combat Zone */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black font-bold">
            DID YOU SERVE IN A COMBAT ZONE SINCE 9-11-2001?
          </span>
        </label>

        <select
          {...register("servedInCombatZoneSince911", {
            required: "This field is required",
          })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select</option>
          <option value="did_you_serve_since_9112001_yes">Yes</option>
          <option value="did_you_serve_since_9112001_no">No</option>
        </select>

        {errors.servedInCombatZoneSince911 && (
          <p className="text-error text-xs mt-1">
            {errors.servedInCombatZoneSince911.message}
          </p>
        )}
      </div>

      {/* Federal Orders */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black font-bold">
            ARE YOU CURRENTLY ACTIVATED ON FEDERAL ORDERS?
          </span>
        </label>

        <select
          {...register("currentlyActivatedFederalOrders", {
            required: "This field is required",
          })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select</option>
          <option value="the_reserves_or_national_guard_yes">Yes</option>
          <option value="the_reserves_or_national_guard_no">No</option>
        </select>

        {errors.currentlyActivatedFederalOrders && (
          <p className="text-error text-xs mt-1">
            {errors.currentlyActivatedFederalOrders.message}
          </p>
        )}
      </div>
    </div>
  );
}
