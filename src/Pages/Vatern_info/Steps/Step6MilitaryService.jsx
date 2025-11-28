// export default function Step6MilitaryService({ register, errors, setValue }) {
//   return (
//     <div className="space-y-4">
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
//           className="select select-bordered w-full md:w-full uppercase py-2 dark:bg-white dark:border-black dark:text-black "
//         >
//           <option value="">Select Branch</option>
//           <option value="Army">Army</option>
//           <option value="Navy">Navy</option>
//           <option value="Marine Corps">Marine Corps</option>
//           <option value="Air Force">Air Force</option>
//           <option value="Coast Guard">Coast Guard</option>
//           <option value="Space Force">Space Force</option>
//           <option value="NOAA">
//             National Oceanic and Atmospheric Administration (NOAA)
//           </option>
//           <option value="USPHS">U.S. Public Health Service (USPHS)</option>
//         </select>
//         {errors.branchOfService && (
//           <label className="label">
//             <span className="label-text-alt text-error">
//               {errors.branchOfService.message}
//             </span>
//           </label>
//         )}
//       </div>

//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium pb-1 md:text-base text-[12px] dark:border-black dark:text-black">
//             Did you ever serve under another name?
//           </span>
//         </label>
//         <select
//           {...register("serviceUnder", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full py-2 uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//         {errors.serviceUnder && (
//           <label className="label">
//             <span className="label-text-alt text-error">
//               {errors.serviceUnder.message}
//             </span>
//           </label>
//         )}
//       </div>

//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
//             Place of Separation
//           </span>
//         </label>
//         <input
//           type="text"
//           {...register("placeOfService", {
//             required: "Place of Separation is required",
//           })}
//           className="input input-bordered w-full py-2 uppercase dark:bg-white dark:border-black dark:text-black"
//           placeholder="Enter place of separation"
//         />
//         {errors.placeOfService && (
//           <label className="label">
//             <span className="label-text-alt text-error">
//               {errors.placeOfService.message}
//             </span>
//           </label>
//         )}
//       </div>

//       <div className="form-control">
//         <label className="label">
//           <span className="label-text w-9/12 md:w-full font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
//             Did You Serve in the National  Guard or <br />Reserves?
//           </span>
//         </label>
//         <select
//           {...register("nationalGuardReserves", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full py-2 uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//         {errors.nationalGuardReserves && (
//           <label className="label">
//             <span className="label-text-alt text-error">
//               {errors.nationalGuardReserves.message}
//             </span>
//           </label>
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

  const showOtherNames = serviceUnder === "Yes";

  return (
    <div className="space-y-6 ">
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
          className="select select-bordered w-full  md:w-full uppercase  dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select Branch</option>
          <option value="Army">Army</option>
          <option value="Navy">Navy</option>
          <option value="Marine Corps">Marine Corps</option>
          <option value="Air Force">Air Force</option>
          <option value="Coast Guard">Coast Guard</option>
          <option value="Space Force">Space Force</option>
          <option value="NOAA">
            National Oceanic and Atmospheric Administration (NOAA)
          </option>
          <option value="USPHS">U.S. Public Health Service (USPHS)</option>
        </select>
        {errors.branchOfService && (
          <p className="text-error text-xs mt-1">
            {errors.branchOfService.message}
          </p>
        )}
      </div>

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
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.serviceUnder && (
          <p className="text-error text-xs mt-1">
            {errors.serviceUnder.message}
          </p>
        )}
      </div>

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
            placeholder="e.g. John A. Smith, Jane Marie Doe, etc..."
          />
          {errors.other_names_you_served_under && (
            <p className="text-error text-xs mt-1">
              {errors.other_names_you_served_under.message}
            </p>
          )}
        </div>
      )}

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
            Place of Separation
          </span>
        </label>
        <input
          type="text"
          {...register("placeOfService", {
            required: "Place of Separation is required",
          })}
          className="input input-bordered w-full py-5 uppercase dark:bg-white dark:border-black dark:text-black"
          placeholder="Enter place of separation"
        />
        {errors.placeOfService && (
          <p className="text-error text-xs mt-1">
            {errors.placeOfService.message}
          </p>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
            Did You Serve in the National Guard or Reserves?
          </span>
        </label>
        <select
          {...register("nationalGuardReserves", {
            required: "This field is required",
          })}
          className="select select-bordered w-full  uppercase dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.nationalGuardReserves && (
          <p className="text-error text-xs mt-1">
            {errors.nationalGuardReserves.message}
          </p>
        )}
      </div>
    </div>
  );
}
