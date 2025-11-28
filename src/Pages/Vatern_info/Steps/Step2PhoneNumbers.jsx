// import { useEffect } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// export default function Step2PhoneNumbers({
//   register,
//   errors,
//   setValue,
//   watch,
//   trigger,
// }) {
//   const internationalPhoneNumber = watch("International_Phone_Number[0]");

//   useEffect(() => {
//     if (internationalPhoneNumber) {
//       setValue("International_Phone_Number[0]", internationalPhoneNumber, {
//         shouldValidate: true,
//       });
//     }
//   }, [internationalPhoneNumber, setValue]);

//   return (
//     <div className="space-y-6">
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base dark:text-black text-[12px] pb-1">
//             International Phone Number
//           </span>
//         </label>

//         <PhoneInput
//           country={"us"}
//           value={internationalPhoneNumber}
//           onChange={(phone) => {
//             const cleanedPhone = phone.replace(/\s+/g, "");
//             setValue("International_Phone_Number[0]", cleanedPhone, {
//               shouldValidate: true,
//               shouldDirty: true,
//             });
//             trigger("International_Phone_Number[0]");
//           }}
//           inputProps={{
//             name: "International_Phone_Number[0]",
//             required: true,
//             className:
//               "input input-bordered w-full dark:bg-white dark:border-black dark:text-black py-5 pl-12",
//           }}
//           containerClass="w-full"
//           buttonClass="!bg-white !text-black" // force dropdown area to have white background and black text
//           dropdownClass="!bg-white !text-black" // force dropdown menu text to be black
//           specialLabel={false}
//         />

//         <input
//           type="hidden"
//           {...register("International_Phone_Number[0]", {
//             required: "Input valid number",
//           })}
//         />

//         {errors["International_Phone_Number[0]"] && (
//           <label className="label">
//             <span className="label-text-alt text-error text-sm pt-1">
//               {errors["International_Phone_Number[0]"].message}
//             </span>
//           </label>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useRef } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// export default function Step2PhoneNumbers({
//   register,
//   errors,
//   setValue,
//   watch,
//   trigger,
//   control,
// }) {
//   const internationalPhoneNumber = watch("International_Phone_Number[0]");

//   const ssn1Ref = useRef(null);
//   const ssn2Ref = useRef(null);
//   const ssn3Ref = useRef(null);

//   const ssn1 = watch("veterans_social_security_no_1") || "";
//   const ssn2 = watch("veterans_social_security_no_2") || "";
//   const ssn3 = watch("veterans_social_security_no_3") || "";

//   useEffect(() => {
//     if (ssn1.length === 3) ssn2Ref.current?.focus();
//     if (ssn2.length === 2) ssn3Ref.current?.focus();
//   }, [ssn1, ssn2]);

//   const handleSSNInput = (e, fieldName, maxLength, nextRef) => {
//     let value = e.target.value.replace(/[^0-9]/g, "").slice(0, maxLength);

//     setValue(fieldName, value, { shouldValidate: true, shouldDirty: true });

//     if (value.length === maxLength && nextRef?.current) {
//       nextRef.current.focus();
//     }
//   };

//   const blockTextPaste = (e) => {
//     const pasted = (e.clipboardData || window.clipboardData).getData("text");
//     if (!/^\d*$/.test(pasted)) e.preventDefault();
//   };

//   const blockNonNumericKeys = (e) => {
//     if (!/[0-9]|Backspace|Delete|Tab|ArrowLeft|ArrowRight/.test(e.key)) {
//       e.preventDefault();
//     }
//   };

//   // Trigger validation on mount & when values change
//   useEffect(() => {
//     trigger([
//       "veterans_social_security_no_1",
//       "veterans_social_security_no_2",
//       "veterans_social_security_no_3",
//     ]);
//   }, [ssn1, ssn2, ssn3, trigger]);

//   return (
//     <div className="space-y-8">
//       {/* Phone Number - unchanged */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base dark:text-black text-[12px] pb-1">
//             International Phone Number
//           </span>
//         </label>

//         <PhoneInput
//           country={"us"}
//           value={internationalPhoneNumber || ""}
//           onChange={(phone) => {
//             const cleanedPhone = phone.replace(/[^0-9]/g, "");
//             setValue("International_Phone_Number[0]", cleanedPhone, {
//               shouldValidate: true,
//               shouldDirty: true,
//             });
//             trigger("International_Phone_Number[0]");
//           }}
//           inputProps={{
//             name: "International_Phone_Number[0]",
//             required: true,
//             className:
//               "input input-bordered w-full dark:bg-white dark:border-black dark:text-black py-5 pl-12",
//           }}
//           containerClass="w-full"
//           buttonClass="!bg-white !text-black"
//           dropdownClass="!bg-white !text-black"
//           specialLabel={false}
//         />

//         <input
//           type="hidden"
//           {...register("International_Phone_Number[0]", {
//             required: "Input valid number",
//           })}
//         />

//         {errors["International_Phone_Number[0]"] && (
//           <label className="label">
//             <span className="label-text-alt text-error text-sm pt-1">
//               {errors["International_Phone_Number[0]"]?.message}
//             </span>
//           </label>
//         )}
//       </div>

//       <div className="flex items-center md:justify-between md:gap-10">
//         <div className="form-control basis-6/12">
//           <label className="label">
//             <span className="label-text font-medium md:text-base dark:text-black text-[12px] pb-1">
//               Veteran's Social Security Number
//             </span>
//           </label>

//           <div className="flex items-center gap-3 justify-center md:justify-start">
//             <input
//               type="text"
//               inputMode="numeric"
//               maxLength={3}
//               placeholder="123"
//               value={ssn1}
//               ref={ssn1Ref}
//               className={`input input-bordered w-24 text-center text-lg  tracking-widest dark:bg-white text-[12px] dark:text-black dark:border-black remove-arrow ${
//                 errors.veterans_social_security_no_1
//                   ? "input-error border-red-500"
//                   : ""
//               }`}
//               onChange={(e) =>
//                 handleSSNInput(e, "veterans_social_security_no_1", 3, ssn2Ref)
//               }
//               onPaste={blockTextPaste}
//               onKeyPress={blockNonNumericKeys}
//               {...register("veterans_social_security_no_1", {
//                 required: "First 3 digits required",
//                 pattern: {
//                   value: /^\d{3}$/,
//                   message: "Must be exactly 3 digits",
//                 },
//               })}
//             />

//             <span className="text-2xl font-light text-gray-500">–</span>

//             <input
//               type="text"
//               inputMode="numeric"
//               maxLength={2}
//               placeholder="45"
//               value={ssn2}
//               ref={ssn2Ref}
//               className={`input input-bordered w-20 text-center text-lg  dark:bg-white dark:text-black dark:border-black ${
//                 errors.veterans_social_security_no_2
//                   ? "input-error border-red-500"
//                   : ""
//               }`}
//               onChange={(e) =>
//                 handleSSNInput(e, "veterans_social_security_no_2", 2, ssn3Ref)
//               }
//               onPaste={blockTextPaste}
//               onKeyPress={blockNonNumericKeys}
//               {...register("veterans_social_security_no_2", {
//                 required: "Middle 2 digits required",
//                 pattern: {
//                   value: /^\d{2}$/,
//                   message: "Must be exactly 2 digits",
//                 },
//               })}
//             />

//             <span className="text-2xl font-light text-gray-500">–</span>

//             <input
//               type="text"
//               inputMode="numeric"
//               maxLength={4}
//               placeholder="6789"
//               value={ssn3}
//               ref={ssn3Ref}
//               className={`input input-bordered w-28 text-center text-lg  dark:bg-white dark:text-black dark:border-black ${
//                 errors.veterans_social_security_no_3
//                   ? "input-error border-red-500"
//                   : ""
//               }`}
//               onChange={(e) =>
//                 handleSSNInput(e, "veterans_social_security_no_3", 4, null)
//               }
//               onPaste={blockTextPaste}
//               onKeyPress={blockNonNumericKeys}
//               {...register("veterans_social_security_no_3", {
//                 required: "Last 4 digits required",
//                 pattern: {
//                   value: /^\d{4}$/,
//                   message: "Must be exactly 4 digits",
//                 },
//               })}
//             />
//           </div>
//         </div>

//         <div className="basis-6/12">
//           <label className="label p-0">
//             <span className="label-text font-medium md:text-base text-[12px] dark:text-black pb-1">
//               Service number / dod id Number (if application)
//             </span>
//           </label>

//           <input
//             type="text"
//             placeholder="+1 234 567 890"
//             className="input input-bordered w-full dark:bg-white dark:border-black dark:text-black"
//             {...register("International_Phone_Number.0", {
//               required: "Please enter a valid phone number",
//               pattern: {
//                 value: /^\+?[0-9\s\-]{7,20}$/,
//                 message: "Enter a valid international phone number",
//               },
//             })}
//           />

//           {errors?.International_Phone_Number?.[0] && (
//             <p className="text-red-500 text-xs mt-1">
//               {errors.International_Phone_Number[0].message}
//             </p>
//           )}
//         </div>

//         {(errors.veterans_social_security_no_1 ||
//           errors.veterans_social_security_no_2 ||
//           errors.veterans_social_security_no_3) && (
//           <div className="mt-2">
//             <span className="text-error text-sm font-medium">
//               {errors.veterans_social_security_no_1?.message ||
//                 errors.veterans_social_security_no_2?.message ||
//                 errors.veterans_social_security_no_3?.message ||
//                 "Please complete all 9 digits of SSN"}
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useRef } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// export default function Step2PhoneNumbers({
//   register,
//   errors,
//   setValue,
//   watch,
//   trigger,
//   control,
// }) {
//   const internationalPhoneNumber = watch("International_Phone_Number[0]");

//   const ssn1Ref = useRef(null);
//   const ssn2Ref = useRef(null);
//   const ssn3Ref = useRef(null);

//   const ssn1 = watch("veterans_social_security_no_1") || "";
//   const ssn2 = watch("veterans_social_security_no_2") || "";
//   const ssn3 = watch("veterans_social_security_no_3") || "";

//   useEffect(() => {
//     if (ssn1.length === 3) ssn2Ref.current?.focus();
//     if (ssn2.length === 2) ssn3Ref.current?.focus();
//   }, [ssn1, ssn2]);

//   const handleSSNInput = (e, fieldName, maxLength, nextRef) => {
//     let value = e.target.value.replace(/[^0-9]/g, "").slice(0, maxLength);

//     setValue(fieldName, value, { shouldValidate: true, shouldDirty: true });

//     if (value.length === maxLength && nextRef?.current) {
//       nextRef.current.focus();
//     }
//   };

//   const blockTextPaste = (e) => {
//     const pasted = (e.clipboardData || window.clipboardData).getData("text");
//     if (!/^\d*$/.test(pasted)) e.preventDefault();
//   };

//   const blockNonNumericKeys = (e) => {
//     if (
//       !/[0-9]|Backspace|Delete|Tab|ArrowLeft|ArrowRight|Enter|Escape/.test(
//         e.key
//       )
//     ) {
//       e.preventDefault();
//     }
//   };

//   useEffect(() => {
//     trigger([
//       "veterans_social_security_no_1",
//       "veterans_social_security_no_2",
//       "veterans_social_security_no_3",
//     ]);
//   }, [ssn1, ssn2, ssn3, trigger]);

//   const hasSSNError =
//     errors.veterans_social_security_no_1 ||
//     errors.veterans_social_security_no_2 ||
//     errors.veterans_social_security_no_3;

//   return (
//     <div className="space-y-8">
//       {/* Phone Number */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base dark:text-black text-[12px] pb-1">
//             International Phone Number
//           </span>
//         </label>

//         <PhoneInput
//           country={"us"}
//           value={internationalPhoneNumber || ""}
//           onChange={(phone) => {
//             const cleanedPhone = phone.replace(/[^0-9]/g, "");
//             setValue("International_Phone_Number[0]", cleanedPhone, {
//               shouldValidate: true,
//               shouldDirty: true,
//             });
//             trigger("International_Phone_Number[0]");
//           }}
//           inputProps={{
//             name: "International_Phone_Number[0]",
//             required: true,
//             className:
//               "input input-bordered w-full dark:bg-white dark:border-black dark:text-black py-5 pl-12",
//           }}
//           containerClass="w-full"
//           buttonClass="!bg-white !text-black"
//           dropdownClass="!bg-white !text-black"
//           specialLabel={false}
//         />

//         <input
//           type="hidden"
//           {...register("International_Phone_Number[0]", {
//             required: "Input valid number",
//           })}
//         />

//         {errors["International_Phone_Number[0]"] && (
//           <label className="label">
//             <span className="label-text-alt text-error text-sm pt-1">
//               {errors["International_Phone_Number[0]"]?.message}
//             </span>
//           </label>
//         )}
//       </div>

//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base dark:text-black text-[12px] pb-1">
//             Local Phone Number
//           </span>
//         </label>

//         <input
//           type="hidden"
//           {...register("International_Phone_Number[0]", {
//             required: "Input valid number",
//           })}
//         />

//         {errors["International_Phone_Number[0]"] && (
//           <label className="label">
//             <span className="label-text-alt text-error text-sm pt-1">
//               {errors["International_Phone_Number[0]"]?.message}
//             </span>
//           </label>
//         )}
//       </div>
//       <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-10 gap-6">
//         <div className="form-control md:basis-6/12">
//           <label className="label">
//             <span className="label-text font-medium md:text-base dark:text-black text-[12px] pb-1">
//               Veteran's Social Security Number
//             </span>
//           </label>

//           <div className="flex items-center gap-3 justify-center md:justify-start">
//             <input
//               type="text"
//               inputMode="numeric"
//               maxLength={3}
//               placeholder="123"
//               value={ssn1}
//               ref={ssn1Ref}
//               className={`input input-bordered w-24 text-center text-lg tracking-widest dark:bg-white text-[12px] dark:text-black dark:border-black remove-arrow ${
//                 errors.veterans_social_security_no_1
//                   ? "input-error border-red-500"
//                   : ""
//               }`}
//               onChange={(e) =>
//                 handleSSNInput(e, "veterans_social_security_no_1", 3, ssn2Ref)
//               }
//               onPaste={blockTextPaste}
//               onKeyDown={blockNonNumericKeys}
//               {...register("veterans_social_security_no_1", {
//                 required: "First 3 digits required",
//                 pattern: {
//                   value: /^\d{3}$/,
//                   message: "Must be exactly 3 digits",
//                 },
//               })}
//             />

//             <span className="text-lg font-light text-gray-500">–</span>

//             <input
//               type="text"
//               inputMode="numeric"
//               maxLength={2}
//               placeholder="45"
//               value={ssn2}
//               ref={ssn2Ref}
//               className={`input input-bordered w-20 text-center text-base dark:bg-white dark:text-black dark:border-black ${
//                 errors.veterans_social_security_no_2
//                   ? "input-error border-red-500"
//                   : ""
//               }`}
//               onChange={(e) =>
//                 handleSSNInput(e, "veterans_social_security_no_2", 2, ssn3Ref)
//               }
//               onPaste={blockTextPaste}
//               onKeyDown={blockNonNumericKeys}
//               {...register("veterans_social_security_no_2", {
//                 required: "Middle 2 digits required",
//                 pattern: {
//                   value: /^\d{2}$/,
//                   message: "Must be exactly 2 digits",
//                 },
//               })}
//             />

//             <span className="text-lg font-light text-gray-500">–</span>

//             <input
//               type="text"
//               inputMode="numeric"
//               maxLength={4}
//               placeholder="6789"
//               value={ssn3}
//               ref={ssn3Ref}
//               className={`input input-bordered w-28 text-center text-base dark:bg-white dark:text-black dark:border-black ${
//                 errors.veterans_social_security_no_3
//                   ? "input-error border-red-500"
//                   : ""
//               }`}
//               onChange={(e) =>
//                 handleSSNInput(e, "veterans_social_security_no_3", 4, null)
//               }
//               onPaste={blockTextPaste}
//               onKeyDown={blockNonNumericKeys}
//               {...register("veterans_social_security_no_3", {
//                 required: "Last 4 digits required",
//                 pattern: {
//                   value: /^\d{4}$/,
//                   message: "Must be exactly 4 digits",
//                 },
//               })}
//             />
//           </div>

//           {/* SSN Error Messages */}
//           {hasSSNError && (
//             <label className="label pt-2">
//               <span className="label-text-alt text-error text-sm">
//                 {errors.veterans_social_security_no_1?.message ||
//                   errors.veterans_social_security_no_2?.message ||
//                   errors.veterans_social_security_no_3?.message ||
//                   "Please complete all 9 digits of SSN"}
//               </span>
//             </label>
//           )}
//         </div>

//         {/* Service number / dod id Number */}
//         <div className="form-control md:basis-6/12">
//           <label className="label">
//             <span className="label-text font-medium md:text-base text-[12px] dark:text-black pb-1">
//               Service number / DOD ID Number (if applicable)
//             </span>
//           </label>

//           <input
//             type="number"
//             placeholder="Enter service or DOD ID number"
//             className="input input-bordered text-base w-full dark:bg-white dark:border-black dark:text-black"
//             {...register("service_dod_id_number", {
//               pattern: {
//                 value: /^[a-zA-Z0-9\s\-]*$/,
//                 message: "Enter a valid service or DOD ID number",
//               },
//             })}
//           />

//           {errors?.service_dod_id_number && (
//             <label className="label">
//               <span className="label-text-alt text-error text-sm pt-1">
//                 {errors.service_dod_id_number.message}
//               </span>
//             </label>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Step2PhoneNumbers({
  register,
  errors,
  setValue,
  watch,
  trigger,
  control,
}) {
  const internationalPhoneNumber = watch("International_Phone_Number[0]");
  const localPhoneNumber = watch("local_phone_number") || "";

  const ssn1Ref = useRef(null);
  const ssn2Ref = useRef(null);
  const ssn3Ref = useRef(null);
  const phone1Ref = useRef(null);
  const phone2Ref = useRef(null);
  const phone3Ref = useRef(null);

  const ssn1 = watch("veterans_social_security_no_1") || "";
  const ssn2 = watch("veterans_social_security_no_2") || "";
  const ssn3 = watch("veterans_social_security_no_3") || "";
  const phone1 = watch("local_phone_1") || "";
  const phone2 = watch("local_phone_2") || "";
  const phone3 = watch("local_phone_3") || "";

  // Auto-focus for SSN fields
  useEffect(() => {
    if (ssn1.length === 3) ssn2Ref.current?.focus();
    if (ssn2.length === 2) ssn3Ref.current?.focus();
  }, [ssn1, ssn2]);

  // Auto-focus for phone fields
  useEffect(() => {
    if (phone1.length === 3) phone2Ref.current?.focus();
    if (phone2.length === 3) phone3Ref.current?.focus();
  }, [phone1, phone2]);

  const handleInput = (e, fieldName, maxLength, nextRef) => {
    let value = e.target.value.replace(/[^0-9]/g, "").slice(0, maxLength);

    setValue(fieldName, value, { shouldValidate: true, shouldDirty: true });

    if (value.length === maxLength && nextRef?.current) {
      nextRef.current.focus();
    }
  };

  const blockTextPaste = (e) => {
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    if (!/^\d*$/.test(pasted)) e.preventDefault();
  };

  const blockNonNumericKeys = (e) => {
    if (
      !/[0-9]|Backspace|Delete|Tab|ArrowLeft|ArrowRight|Enter|Escape/.test(
        e.key
      )
    ) {
      e.preventDefault();
    }
  };

  // Combine phone parts into full number
  useEffect(() => {
    const fullPhone = `${phone1}${phone2}${phone3}`;
    if (fullPhone.length === 10) {
      setValue("local_phone_number", fullPhone, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [phone1, phone2, phone3, setValue]);

  // Trigger validation
  useEffect(() => {
    trigger([
      "veterans_social_security_no_1",
      "veterans_social_security_no_2",
      "veterans_social_security_no_3",
      "local_phone_1",
      "local_phone_2",
      "local_phone_3",
      "local_phone_number",
    ]);
  }, [ssn1, ssn2, ssn3, phone1, phone2, phone3, trigger]);

  const hasSSNError =
    errors.veterans_social_security_no_1 ||
    errors.veterans_social_security_no_2 ||
    errors.veterans_social_security_no_3;

  const hasPhoneError =
    errors.local_phone_1 || errors.local_phone_2 || errors.local_phone_3;

  return (
    <div className="space-y-8">
      {/* International Phone Number */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base dark:text-black text-[12px] pb-1">
            International Phone Number
          </span>
        </label>

        <PhoneInput
          country={"us"}
          value={internationalPhoneNumber || ""}
          onChange={(phone) => {
            const cleanedPhone = phone.replace(/[^0-9]/g, "");
            setValue("International_Phone_Number[0]", cleanedPhone, {
              shouldValidate: true,
              shouldDirty: true,
            });
            trigger("International_Phone_Number[0]");
          }}
          inputProps={{
            name: "International_Phone_Number[0]",
            required: true,
            className:
              "input input-bordered w-full dark:bg-white dark:border-black dark:text-black py-5 pl-12",
          }}
          containerClass="w-full"
          buttonClass="!bg-white !text-black"
          dropdownClass="!bg-white !text-black"
          specialLabel={false}
        />

        <input
          type="hidden"
          {...register("International_Phone_Number[0]", {
            required: "Input valid number",
          })}
        />

        {errors["International_Phone_Number[0]"] && (
          <label className="label">
            <span className="label-text-alt text-error text-sm pt-1">
              {errors["International_Phone_Number[0]"]?.message}
            </span>
          </label>
        )}
      </div>

      {/* Local Phone Number - 3-3-4 format */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base dark:text-black text-[12px] pb-1">
            Local Phone Number
          </span>
        </label>

        <div className="flex items-center gap-3 justify-center md:justify-start">
          <input
            type="text"
            inputMode="numeric"
            maxLength={3}
            placeholder="123"
            value={phone1}
            ref={phone1Ref}
            className={`input input-bordered w-24 text-center text-lg tracking-widest dark:bg-white text-[12px] dark:text-black dark:border-black remove-arrow ${
              errors.local_phone_1 ? "input-error border-red-500" : ""
            }`}
            onChange={(e) => handleInput(e, "local_phone_1", 3, phone2Ref)}
            onPaste={blockTextPaste}
            onKeyDown={blockNonNumericKeys}
            {...register("local_phone_1", {
              required: "First 3 digits required",
              pattern: {
                value: /^\d{3}$/,
                message: "Must be exactly 3 digits",
              },
            })}
          />

          <span className="text-lg font-light text-gray-500">–</span>

          <input
            type="text"
            inputMode="numeric"
            maxLength={3}
            placeholder="456"
            value={phone2}
            ref={phone2Ref}
            className={`input input-bordered w-24 text-center text-base dark:bg-white dark:text-black dark:border-black ${
              errors.local_phone_2 ? "input-error border-red-500" : ""
            }`}
            onChange={(e) => handleInput(e, "local_phone_2", 3, phone3Ref)}
            onPaste={blockTextPaste}
            onKeyDown={blockNonNumericKeys}
            {...register("local_phone_2", {
              required: "Middle 3 digits required",
              pattern: {
                value: /^\d{3}$/,
                message: "Must be exactly 3 digits",
              },
            })}
          />

          <span className="text-lg font-light text-gray-500">–</span>

          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="7890"
            value={phone3}
            ref={phone3Ref}
            className={`input input-bordered w-28 text-center text-base dark:bg-white dark:text-black dark:border-black ${
              errors.local_phone_3 ? "input-error border-red-500" : ""
            }`}
            onChange={(e) => handleInput(e, "local_phone_3", 4, null)}
            onPaste={blockTextPaste}
            onKeyDown={blockNonNumericKeys}
            {...register("local_phone_3", {
              required: "Last 4 digits required",
              pattern: {
                value: /^\d{4}$/,
                message: "Must be exactly 4 digits",
              },
            })}
          />
        </div>

        {/* Hidden field for complete phone number */}
        <input
          type="hidden"
          {...register("local_phone_number", {
            required: "Please complete the phone number",
            pattern: {
              value: /^\d{10}$/,
              message: "Must be exactly 10 digits",
            },
          })}
        />

        {/* Phone Error Messages */}
        {hasPhoneError && (
          <label className="label pt-2">
            <span className="label-text-alt text-error text-sm">
              {errors.local_phone_1?.message ||
                errors.local_phone_2?.message ||
                errors.local_phone_3?.message ||
                "Please complete all 10 digits of phone number"}
            </span>
          </label>
        )}

        {errors.local_phone_number && !hasPhoneError && (
          <label className="label pt-2">
            <span className="label-text-alt text-error text-sm">
              {errors.local_phone_number.message}
            </span>
          </label>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-10 gap-6">
        {/* Veteran's Social Security Number */}
        <div className="form-control md:basis-6/12">
          <label className="label">
            <span className="label-text font-medium md:text-base dark:text-black text-[12px] pb-1">
              Veteran's Social Security Number
            </span>
          </label>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <input
              type="text"
              inputMode="numeric"
              maxLength={3}
              placeholder="123"
              value={ssn1}
              ref={ssn1Ref}
              className={`input input-bordered w-24 text-center text-lg tracking-widest dark:bg-white text-[12px] dark:text-black dark:border-black remove-arrow ${
                errors.veterans_social_security_no_1
                  ? "input-error border-red-500"
                  : ""
              }`}
              onChange={(e) =>
                handleInput(e, "veterans_social_security_no_1", 3, ssn2Ref)
              }
              onPaste={blockTextPaste}
              onKeyDown={blockNonNumericKeys}
              {...register("veterans_social_security_no_1", {
                required: "First 3 digits required",
                pattern: {
                  value: /^\d{3}$/,
                  message: "Must be exactly 3 digits",
                },
              })}
            />

            <span className="text-lg font-light text-gray-500">–</span>

            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              placeholder="45"
              value={ssn2}
              ref={ssn2Ref}
              className={`input input-bordered w-20 text-center text-base dark:bg-white dark:text-black dark:border-black ${
                errors.veterans_social_security_no_2
                  ? "input-error border-red-500"
                  : ""
              }`}
              onChange={(e) =>
                handleInput(e, "veterans_social_security_no_2", 2, ssn3Ref)
              }
              onPaste={blockTextPaste}
              onKeyDown={blockNonNumericKeys}
              {...register("veterans_social_security_no_2", {
                required: "Middle 2 digits required",
                pattern: {
                  value: /^\d{2}$/,
                  message: "Must be exactly 2 digits",
                },
              })}
            />

            <span className="text-lg font-light text-gray-500">–</span>

            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="6789"
              value={ssn3}
              ref={ssn3Ref}
              className={`input input-bordered w-28 text-center text-base dark:bg-white dark:text-black dark:border-black ${
                errors.veterans_social_security_no_3
                  ? "input-error border-red-500"
                  : ""
              }`}
              onChange={(e) =>
                handleInput(e, "veterans_social_security_no_3", 4, null)
              }
              onPaste={blockTextPaste}
              onKeyDown={blockNonNumericKeys}
              {...register("veterans_social_security_no_3", {
                required: "Last 4 digits required",
                pattern: {
                  value: /^\d{4}$/,
                  message: "Must be exactly 4 digits",
                },
              })}
            />
          </div>

          {/* SSN Error Messages */}
          {hasSSNError && (
            <label className="label pt-2">
              <span className="label-text-alt text-error text-sm">
                {errors.veterans_social_security_no_1?.message ||
                  errors.veterans_social_security_no_2?.message ||
                  errors.veterans_social_security_no_3?.message ||
                  "Please complete all 9 digits of SSN"}
              </span>
            </label>
          )}
        </div>

        {/* Service number / DOD ID Number */}
        <div className="form-control md:basis-6/12">
          <label className="label">
            <span className="label-text font-medium md:text-base text-[12px] dark:text-black pb-1">
              Service number / DOD ID Number (if applicable)
            </span>
          </label>

          <input
            type="text"
            placeholder="Enter service or DOD ID number"
            className="input input-bordered text-base w-full dark:bg-white dark:border-black dark:text-black"
            {...register("service_dod_id_number", {
              pattern: {
                value: /^[a-zA-Z0-9\s\-]*$/,
                message: "Enter a valid service or DOD ID number",
              },
            })}
          />

          {errors?.service_dod_id_number && (
            <label className="label">
              <span className="label-text-alt text-error text-sm pt-1">
                {errors.service_dod_id_number.message}
              </span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
