// export default function Step5Address({ register, errors, watch, setValue }) {
//   const permanent = watch("adress_changes_PERMANENT") || "off";
//   const temporary = watch("adress_changes_TEMPORARY") || "off";

//   return (
//     <div className="space-y-4">
//       <div>
//         <label className="label-text font-medium md:text-base text-[12px] pb-2 dark:text-black block">
//           Type of address change (complete if applicable)
//         </label>

//         <div className="flex items-center gap-12 mt-3">
//           {/* Permanent */}
//           <label className="flex items-center  gap-3 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={permanent === "on"}
//               onChange={(e) =>
//                 setValue(
//                   "adress_changes_PERMANENT",
//                   e.target.checked ? "on" : "off"
//                 )
//               }
//               className="checkbox checkbox-sm checkbox-primary"
//             />

//             <span className="text-sm dark:text-black font-medium">
//               Permanent
//             </span>
//           </label>

//           {/* Temporary */}
//           <label className="flex items-center gap-3 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={temporary === "on"}
//               onChange={(e) =>
//                 setValue(
//                   "adress_changes_TEMPORARY",
//                   e.target.checked ? "on" : "off"
//                 )
//               }
//               className="checkbox checkbox-sm checkbox-primary"
//             />
//             <span className="text-sm dark:text-black font-medium">
//               Temporary
//             </span>
//           </label>
//         </div>
//       </div>

//       {/* === REST OF YOUR ORIGINAL CODE UNCHANGED === */}
//       <div className="form-control md:flex items-center gap-6">
//         <div className="basis-6/12">
//           <label className="label">
//             <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:bg-white dark:border-black dark:text-black">
//               Street Address
//             </span>
//           </label>
//           <input
//             type="text"
//             {...register("MailingAddress_NumberAndStreet[0]", {
//               required: "Street Address is required",
//             })}
//             className="input input-bordered w-full py-5 dark:bg-white uppercase dark:border-black dark:text-black"
//             placeholder="No. & Street"
//           />
//           {errors.MailingAddress_NumberAndStreet?.[0] && (
//             <label className="label">
//               <span className="label-text-alt text-error text-sm md:text-base pt-1">
//                 {errors.MailingAddress_NumberAndStreet[0].message}
//               </span>
//             </label>
//           )}
//         </div>
//         <div className="basis-6/12">
//           <label className="label">
//             <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:bg-white dark:border-black dark:text-black">
//               APT./UNIT NUMBER{" "}
//             </span>
//           </label>
//           <input
//             type="text"
//             {...register("apt_unit_number", {
//               required: "Apt./Unit number is required",
//             })}
//             className="input input-bordered w-full py-5 dark:bg-white uppercase dark:border-black dark:text-black"
//             placeholder="Apt./Unit number"
//           />
//           {errors.apt_unit_number && (
//             <label className="label">
//               <span className="label-text-alt text-error text-sm md:text-base pt-1">
//                 {errors.apt_unit_number.message}
//               </span>
//             </label>
//           )}
//         </div>
//       </div>

//       {/* City */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:bg-white dark:border-black dark:text-black">
//             City
//           </span>
//         </label>
//         <input
//           type="text"
//           {...register("MailingAddress_City[0]", {
//             required: "City is required",
//           })}
//           className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
//           placeholder="City"
//         />
//         {errors.MailingAddress_City?.[0] && (
//           <label className="label">
//             <span className="label-text-alt text-error text-sm md:text-base pt-1">
//               {errors.MailingAddress_City[0].message}
//             </span>
//           </label>
//         )}
//       </div>

//       {/* State and Country */}
//       <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
//         <div className="form-control w-full md:w-1/2">
//           <label className="label">
//             <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:bg-white dark:border-black dark:text-black">
//               State
//             </span>
//           </label>
//           <input
//             type="text"
//             maxLength="2"
//             {...register("MailingAddress_StateOrProvince[0]", {
//               required: "State is required",
//             })}
//             className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
//             placeholder="State"
//           />
//           {errors.MailingAddress_StateOrProvince?.[0] && (
//             <label className="label">
//               <span className="label-text-alt text-error text-sm md:text-base pt-1">
//                 {errors.MailingAddress_StateOrProvince[0].message}
//               </span>
//             </label>
//           )}
//         </div>

//         <div className="form-control w-full md:w-1/2">
//           <label className="label">
//             <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:bg-white dark:border-black dark:text-black">
//               Country
//             </span>
//           </label>
//           <input
//             type="text"
//             maxLength="2"
//             {...register("MailingAddress_Country[0]", {
//               required: "Country is required",
//             })}
//             className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
//             placeholder="Country"
//           />
//           {errors.MailingAddress_Country?.[0] && (
//             <label className="label">
//               <span className="label-text-alt text-error text-sm md:text-base pt-1">
//                 {errors.MailingAddress_Country[0].message}
//               </span>
//             </label>
//           )}
//         </div>
//       </div>

//       {/* ZIP Code */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:bg-white dark:border-black dark:text-black">
//             ZIP Code (First 5 digits)
//           </span>
//         </label>
//         <input
//           type="text"
//           inputMode="numeric"
//           pattern="\d*"
//           maxLength={5}
//           {...register("MailingAddress_ZIPOrPostalCode_FirstFiveNumbers[0]", {
//             required: "ZIP Code is required",
//             pattern: {
//               value: /^\d{5}$/,
//               message: "Must be 5 digits",
//             },
//           })}
//           className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
//           placeholder="12345"
//         />
//         {errors.MailingAddress_ZIPOrPostalCode_FirstFiveNumbers?.[0] && (
//           <label className="label">
//             <span className="label-text-alt text-error text-sm md:text-base pt-1">
//               {
//                 errors.MailingAddress_ZIPOrPostalCode_FirstFiveNumbers[0]
//                   .message
//               }
//             </span>
//           </label>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useEffect } from "react";

// export default function Step5Address({ register, errors, watch, setValue }) {
//   const permanent = watch("adress_changes_PERMANENT") || "off";
//   const temporary = watch("adress_changes_TEMPORARY") || "off";

//   // Set default "off" on first load
//   useEffect(() => {
//     setValue("adress_changes_PERMANENT", "off");
//     setValue("adress_changes_TEMPORARY", "off");
//   }, [setValue]);

//   // Handle Permanent checkbox
//   const handlePermanentChange = (checked) => {
//     if (checked) {
//       setValue("adress_changes_PERMANENT", "on");
//       setValue("adress_changes_TEMPORARY", "off"); // Uncheck Temporary
//     } else {
//       setValue("adress_changes_PERMANENT", "off");
//     }
//   };

//   // Handle Temporary checkbox
//   const handleTemporaryChange = (checked) => {
//     if (checked) {
//       setValue("adress_changes_TEMPORARY", "on");
//       setValue("adress_changes_PERMANENT", "off"); // Uncheck Permanent
//     } else {
//       setValue("adress_changes_TEMPORARY", "off");
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {/* Address Change Type - Only One Allowed */}
//       <div>
//         <label className="label-text font-medium md:text-base text-[12px] pb-2 dark:text-black block">
//           Type of address change (complete if applicable)
//         </label>

//         <div className="flex items-center gap-12 mt-3">
//           {/* Permanent */}
//           <label className="flex items-center gap-3 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={permanent === "on"}
//               onChange={(e) => handlePermanentChange(e.target.checked)}
//               className="checkbox checkbox-sm checkbox-primary"
//             />
//             <span className="text-sm dark:text-black font-medium">
//               Permanent
//             </span>
//           </label>

//           {/* Temporary */}
//           <label className="flex items-center gap-3 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={temporary === "on"}
//               onChange={(e) => handleTemporaryChange(e.target.checked)}
//               className="checkbox checkbox-sm checkbox-primary"
//             />
//             <span className="text-sm dark:text-black font-medium">
//               Temporary
//             </span>
//           </label>
//         </div>
//       </div>

//       {/* Rest of your address fields (unchanged) */}
//       <div className="form-control md:flex items-center gap-6">
//         <div className="basis-6/12">
//           <label className="label">
//             <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
//               Street Address
//             </span>
//           </label>
//           <input
//             type="text"
//             {...register("MailingAddress_NumberAndStreet[0]", {
//               required: "Street Address is required",
//             })}
//             className="input input-bordered w-full py-5 dark:bg-white uppercase dark:border-black dark:text-black"
//             placeholder="No. & Street"
//           />
//           {errors.MailingAddress_NumberAndStreet?.[0] && (
//             <p className="text-error text-sm mt-1">
//               {errors.MailingAddress_NumberAndStreet[0].message}
//             </p>
//           )}
//         </div>

//         <div className="basis-6/12">
//           <label className="label">
//             <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
//               APT./UNIT NUMBER
//             </span>
//           </label>
//           <input
//             type="text"
//             {...register("apt_unit_number")}
//             className="input input-bordered w-full py-5 dark:bg-white uppercase dark:border-black dark:text-black"
//             placeholder="Apt./Unit number"
//           />
//         </div>
//       </div>

//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
//             City
//           </span>
//         </label>
//         <input
//           type="text"
//           {...register("MailingAddress_City[0]", {
//             required: "City is required",
//           })}
//           className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
//           placeholder="City"
//         />
//         {errors.MailingAddress_City?.[0] && (
//           <p className="text-error text-sm mt-1">
//             {errors.MailingAddress_City[0].message}
//           </p>
//         )}
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         <div>
//           <label className="label">
//             <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
//               State
//             </span>
//           </label>
//           <input
//             type="text"
//             maxLength={2}
//             {...register("MailingAddress_StateOrProvince[0]", {
//               required: "State is required",
//             })}
//             className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
//             placeholder="State"
//           />
//           {errors.MailingAddress_StateOrProvince?.[0] && (
//             <p className="text-error text-sm mt-1">
//               {errors.MailingAddress_StateOrProvince[0].message}
//             </p>
//           )}
//         </div>

//         <div>
//           <label className="label">
//             <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
//               Country
//             </span>
//           </label>
//           <input
//             type="text"
//             defaultValue="US"
//             {...register("MailingAddress_Country[0]")}
//             className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
//             placeholder="Country"
//           />
//         </div>
//       </div>

//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
//             ZIP Code (First 5 digits)
//           </span>
//         </label>
//         <input
//           type="text"
//           inputMode="numeric"
//           maxLength={5}
//           placeholder="12345"
//           {...register("MailingAddress_ZIPOrPostalCode_FirstFiveNumbers[0]", {
//             required: "ZIP Code is required",
//             pattern: { value: /^\d{5}$/, message: "Must be 5 digits" },
//           })}
//           className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black"
//           onInput={(e) => {
//             e.target.value = e.target.value.replace(/\D/g, "").slice(0, 5);
//           }}
//         />
//         {errors.MailingAddress_ZIPOrPostalCode_FirstFiveNumbers?.[0] && (
//           <p className="text-error text-sm mt-1">
//             {errors.MailingAddress_ZIPOrPostalCode_FirstFiveNumbers[0].message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useEffect } from "react";

// export default function Step5Address({ register, errors, watch, setValue }) {
//   const permanent = watch("adress_changes_PERMANENT") === "on" ? "on" : "off";
//   const temporary = watch("adress_changes_TEMPORARY") === "on" ? "on" : "off";

//   useEffect(() => {
//     setValue("adress_changes_PERMANENT", "off");
//     setValue("adress_changes_TEMPORARY", "off");
//   }, [setValue]);

//   const handleChange = (type) => {
//     if (type === "permanent") {
//       setValue("adress_changes_PERMANENT", "on");
//       setValue("adress_changes_TEMPORARY", "off");
//     } else if (type === "temporary") {
//       setValue("adress_changes_TEMPORARY", "on");
//       setValue("adress_changes_PERMANENT", "off");
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div>
//         <label className="label-text font-medium md:text-base text-[12px] pb-2 dark:text-black block">
//           Type of address change (complete if applicable)
//         </label>

//         <div className="flex items-center gap-12 mt-3">
//           <label className="flex items-center gap-3 cursor-pointer select-none">
//             <input
//               type="checkbox"
//               checked={permanent === "on"}
//               onChange={() => handleChange("permanent")}
//               className="checkbox checkbox-sm checkbox-primary"
//             />
//             <span className="text-sm dark:text-black font-medium">
//               Permanent
//             </span>
//           </label>

//           <label className="flex items-center gap-3 cursor-pointer select-none">
//             <input
//               type="checkbox"
//               checked={temporary === "on"}
//               onChange={() => handleChange("temporary")}
//               className="checkbox checkbox-sm checkbox-primary"
//             />
//             <span className="text-sm dark:text-black font-medium">
//               Temporary
//             </span>
//           </label>
//         </div>
//       </div>

//       <div className="form-control md:flex items-center gap-6">
//         <div className="basis-6/12">
//           <label className="label">
//             <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
//               Street Address
//             </span>
//           </label>
//           <input
//             type="text"
//             {...register("MailingAddress_NumberAndStreet[0]", {
//               required: "Street Address is required",
//             })}
//             className="input input-bordered w-full py-5 dark:bg-white uppercase dark:border-black dark:text-black"
//             placeholder="No. & Street"
//           />
//           {errors.MailingAddress_NumberAndStreet?.[0] && (
//             <p className="text-error text-sm mt-1">
//               {errors.MailingAddress_NumberAndStreet[0].message}
//             </p>
//           )}
//         </div>

//         <div className="basis-6/12">
//           <label className="label">
//             <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
//               APT./UNIT NUMBER
//             </span>
//           </label>
//           <input
//             type="text"
//             {...register("apt_unit_number")}
//             className="input input-bordered w-full py-5 dark:bg-white uppercase dark:border-black dark:text-black"
//             placeholder="Apt./Unit number"
//           />
//         </div>
//       </div>

//       {/* City */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
//             City
//           </span>
//         </label>
//         <input
//           type="text"
//           {...register("MailingAddress_City[0]", {
//             required: "City is required",
//           })}
//           className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
//           placeholder="City"
//         />
//         {errors.MailingAddress_City?.[0] && (
//           <p className="text-error text-sm mt-1">
//             {errors.MailingAddress_City[0].message}
//           </p>
//         )}
//       </div>

//       {/* State & Country */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <div>
//           <label className="label">
//             <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
//               State
//             </span>
//           </label>
//           <input
//             type="text"
//             maxLength={2}
//             {...register("MailingAddress_StateOrProvince[0]", {
//               required: "State is required",
//             })}
//             className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
//             placeholder="State"
//           />
//           {errors.MailingAddress_StateOrProvince?.[0] && (
//             <p className="text-error text-sm mt-1">
//               {errors.MailingAddress_StateOrProvince[0].message}
//             </p>
//           )}
//         </div>

//         <div>
//           <label className="label">
//             <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
//               Country
//             </span>
//           </label>
//           <input
//             type="text"
//             defaultValue="US"
//             {...register("MailingAddress_Country[0]")}
//             className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
//             placeholder="Country"
//           />
//         </div>
//       </div>

//       {/* ZIP Code */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
//             ZIP Code (First 5 digits)
//           </span>
//         </label>
//         <input
//           type="text"
//           inputMode="numeric"
//           maxLength={5}
//           placeholder="12345"
//           {...register("MailingAddress_ZIPOrPostalCode_FirstFiveNumbers[0]", {
//             required: "ZIP Code is required",
//             pattern: { value: /^\d{5}$/, message: "Must be 5 digits" },
//           })}
//           className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black"
//           onInput={(e) => {
//             e.target.value = e.target.value.replace(/\D/g, "").slice(0, 5);
//           }}
//         />
//         {errors.MailingAddress_ZIPOrPostalCode_FirstFiveNumbers?.[0] && (
//           <p className="text-error text-sm mt-1">
//             {errors.MailingAddress_ZIPOrPostalCode_FirstFiveNumbers[0].message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";

export default function Step5Address({ register, errors, watch, setValue }) {
  const permanent = watch("adress_changes_PERMANENT");
  const temporary = watch("adress_changes_TEMPORARY");

  useEffect(() => {
    setValue("adress_changes_PERMANENT", false);
    setValue("adress_changes_TEMPORARY", false);
  }, [setValue]);

  const handleChange = (type) => {
    if (type === "permanent") {
      setValue("adress_changes_PERMANENT", true);
      setValue("adress_changes_TEMPORARY", false);
    } else if (type === "temporary") {
      setValue("adress_changes_TEMPORARY", true);
      setValue("adress_changes_PERMANENT", false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="label-text font-medium md:text-base text-[12px] pb-2 dark:text-black block">
          Type of address change (complete if applicable)
        </label>

        <div className="flex items-center gap-12 mt-3">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={permanent === true}
              onChange={() => handleChange("permanent")}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm dark:text-black font-medium">
              Permanent
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={temporary === true}
              onChange={() => handleChange("temporary")}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm dark:text-black font-medium">
              Temporary
            </span>
          </label>
        </div>
      </div>

      <div className="form-control md:flex items-center gap-6">
        <div className="basis-6/12">
          <label className="label">
            <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
              Street Address
            </span>
          </label>
          <input
            type="text"
            {...register("MailingAddress_NumberAndStreet[0]", {
              required: "Street Address is required",
            })}
            className="input input-bordered w-full py-5 dark:bg-white uppercase dark:border-black dark:text-black"
            placeholder="No. & Street"
          />
          {errors.MailingAddress_NumberAndStreet?.[0] && (
            <p className="text-error text-sm mt-1">
              {errors.MailingAddress_NumberAndStreet[0].message}
            </p>
          )}
        </div>

        <div className="basis-6/12">
          <label className="label">
            <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
              APT./UNIT NUMBER
            </span>
          </label>
          <input
            type="text"
            {...register("apt_unit_number")}
            className="input input-bordered w-full py-5 dark:bg-white uppercase dark:border-black dark:text-black"
            placeholder="Apt./Unit number"
          />
        </div>
      </div>

      {/* City */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
            City
          </span>
        </label>
        <input
          type="text"
          {...register("MailingAddress_City[0]", {
            required: "City is required",
          })}
          className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
          placeholder="City"
        />
        {errors.MailingAddress_City?.[0] && (
          <p className="text-error text-sm mt-1">
            {errors.MailingAddress_City[0].message}
          </p>
        )}
      </div>

      {/* State & Country */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="label">
            <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
              State
            </span>
          </label>
          <input
            type="text"
            maxLength={2}
            {...register("MailingAddress_StateOrProvince[0]", {
              required: "State is required",
            })}
            className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
            placeholder="State"
          />
          {errors.MailingAddress_StateOrProvince?.[0] && (
            <p className="text-error text-sm mt-1">
              {errors.MailingAddress_StateOrProvince[0].message}
            </p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
              Country
            </span>
          </label>
          <input
            type="text"
            defaultValue="US"
            {...register("MailingAddress_Country[0]")}
            className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
            placeholder="Country"
          />
        </div>
      </div>

      {/* ZIP Code */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
            ZIP Code (First 5 digits)
          </span>
        </label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="12345"
          {...register("MailingAddress_ZIPOrPostalCode_FirstFiveNumbers[0]", {
            required: "ZIP Code is required",
            pattern: { value: /^\d{5}$/, message: "Must be 5 digits" },
          })}
          className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 5);
          }}
        />
        {errors.MailingAddress_ZIPOrPostalCode_FirstFiveNumbers?.[0] && (
          <p className="text-error text-sm mt-1">
            {errors.MailingAddress_ZIPOrPostalCode_FirstFiveNumbers[0].message}
          </p>
        )}
      </div>
    </div>
  );
}
