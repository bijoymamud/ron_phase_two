// import React from "react";
// import { useFormContext } from "react-hook-form";

// const BankInformation = () => {
//   const {
//     register,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useFormContext();

//   const checkingChecked = watch("account_number_checkings");
//   const savingsChecked = watch("account_number_savings");

//   const handleAccountTypeChange = (type) => {
//     if (type === "checking") {
//       setValue("account_number_checkings", true);
//       setValue("account_number_savings", false);
//     } else if (type === "savings") {
//       setValue("account_number_savings", true);
//       setValue("account_number_checkings", false);
//     }
//   };

//   return (
//     <div className="space-y-8 max-w-2xl mx-auto">
//       {/* Account Number */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium text-base dark:text-black">
//             Account Number
//           </span>
//         </label>
//         <input
//           type="text"
//           placeholder="Enter your account number"
//           {...register("account_number", {
//             required: "Account number is required",
//             pattern: {
//               value: /^\d+$/,
//               message: "Account number must contain only digits",
//             },
//           })}
//           className="input input-bordered w-full py-5 uppercase dark:bg-white dark:border-black dark:text-black"
//         />
//         {errors.account_number && (
//           <p className="text-error text-xs mt-1">
//             {errors.account_number.message}
//           </p>
//         )}
//       </div>
//       {/* Account Type: Checking or Savings (Only one allowed) */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium text-base dark:text-black">
//             Account Type
//           </span>
//         </label>
//         <div className="flex flex-col sm:flex-row gap-8">
//           {/* CHECKING */}
//           <label className="label cursor-pointer justify-start gap-3">
//             <input
//               type="checkbox"
//               checked={checkingChecked || false}
//               onChange={() => handleAccountTypeChange("checking")}
//               className="checkbox checkbox-primary"
//             />
//             <span className="label-text text-base">CHECKING</span>
//             {/* Hidden input to include in form data */}
//             <input type="hidden" {...register("account_number_checkings")} />
//           </label>

//           {/* SAVINGS */}
//           <label className="label cursor-pointer justify-start gap-3">
//             <input
//               type="checkbox"
//               checked={savingsChecked || false}
//               onChange={() => handleAccountTypeChange("savings")}
//               className="checkbox checkbox-primary"
//             />
//             <span className="label-text text-base">SAVINGS</span>
//             {/* Hidden input to include in form data */}
//             <input type="hidden" {...register("account_number_savings")} />
//           </label>
//         </div>

//         {/* Validation: At least one must be selected */}
//         {(errors.account_number_checkings || errors.account_number_savings) && (
//           <p className="text-error text-xs mt-2">
//             Please select either Checking or Savings
//           </p>
//         )}
//       </div>
//       {/* Name of Financial Institution */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium text-base dark:text-black">
//             Name of Financial Institution
//             <span className="text-xs block text-gray-600">
//               (Provide the name of the bank where you want your direct deposit)
//             </span>
//           </span>
//         </label>
//         <input
//           type="text"
//           placeholder="e.g. Chase Bank, Bank of America"
//           {...register("name_of_financial_institution", {
//             required: "Bank name is required",
//           })}
//           className="input input-bordered w-full py-5 uppercase dark:bg-white dark:border-black dark:text-black"
//         />
//         {errors.name_of_financial_institution && (
//           <p className="text-error text-xs mt-1">
//             {errors.name_of_financial_institution.message}
//           </p>
//         )}
//       </div>
//       {/* Routing / Transit Number */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium text-base dark:text-black">
//             Routing or Transit Number
//           </span>
//         </label>
//         <input
//           type="text"
//           placeholder="Enter 9-digit routing number"
//           maxLength={9}
//           {...register("routing_or_transit_number", {
//             required: "Routing number is required",
//             pattern: {
//               value: /^\d{9}$/,
//               message: "Routing number must be exactly 9 digits",
//             },
//           })}
//           className="input input-bordered w-full py-5 uppercase dark:bg-white dark:border-black dark:text-black"
//         />
//         {errors.routing_or_transit_number && (
//           <p className="text-error text-xs mt-1">
//             {errors.routing_or_transit_number.message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BankInformation;

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Make sure you have react-router-dom installed

const BankInformation = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      account_number: "",
      account_number_checkings: false,
      account_number_savings: false,
      name_of_financial_institution: "",
      routing_or_transit_number: "",
    },
  });

  const formValues = watch();
  const checking = watch("account_number_checkings");
  const savings = watch("account_number_savings");

  useEffect(() => {
    const savedData = localStorage.getItem("bankInformation");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      Object.keys(parsed).forEach((key) => {
        setValue(key, parsed[key]);
      });
    }
  }, [setValue]);

  useEffect(() => {
    const hasData = Object.values(formValues).some(
      (val) => val !== "" && val !== false
    );
    if (hasData) {
      localStorage.setItem("bankInformation", JSON.stringify(formValues));
    }
  }, [formValues]);

  const handleAccountTypeChange = (type) => {
    if (type === "checking") {
      setValue("account_number_checkings", true);
      setValue("account_number_savings", false);
    } else {
      setValue("account_number_savings", true);
      setValue("account_number_checkings", false);
    }
    trigger("account_number_checkings");
  };

  const onSubmit = (data) => {
    localStorage.setItem("bankInformation", JSON.stringify(data));
    console.log("Bank Information Saved & Navigating:", data);
    navigate("/e_signature");
  };

  return (
    <section className="min-h-screen flex items-center justify-center dark:bg-gray-50 p-4 md:pt-28">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8 md:p-10">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Bank Information
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Account Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base dark:text-gray-900 pb-1">
                Account Number
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter account number"
              {...register("account_number", {
                required: "Account number is required",
                pattern: { value: /^\d+$/, message: "Only numbers allowed" },
              })}
              className="input input-bordered text-base w-full uppercase tracking-wider dark:bg-white dark:border-black dark:text-black"
            />
            {errors.account_number && (
              <p className="text-error text-sm mt-1">
                {errors.account_number.message}
              </p>
            )}
          </div>

          {/* Account Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base dark:text-gray-900 pb-1">
                Account Type
              </span>
            </label>
            <div className="flex gap-12 justify-start">
              <label className="label cursor-pointer gap-4">
                <input
                  type="checkbox"
                  checked={checking}
                  onChange={() => handleAccountTypeChange("checking")}
                  className="checkbox checkbox-sm checkbox-primary"
                />
                <span className="label-text text-base font-medium dark:text-gray-900">
                  CHECKING
                </span>
              </label>

              <label className="label cursor-pointer gap-4">
                <input
                  type="checkbox"
                  checked={savings}
                  onChange={() => handleAccountTypeChange("savings")}
                  className="checkbox checkbox-sm checkbox-primary"
                />
                <span className="label-text text-base font-medium dark:text-gray-900">
                  SAVINGS
                </span>
              </label>
            </div>

            {!checking && !savings && (
              <p className="text-error text-sm mt-2">
                Please select either Checking or Savings
              </p>
            )}
          </div>

          {/* Hidden fields */}
          <input type="hidden" {...register("account_number_checkings")} />
          <input type="hidden" {...register("account_number_savings")} />

          {/* Bank Name */}
          <div className="form-control">
            <label className="label">
              <span className="text-base font-semibold dark:text-gray-900 pb-1">
                Name of Financial Institution
                <span className="text-sm block font-normal text-gray-600">
                  (Bank name for direct deposit)
                </span>
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. Chase Bank, Wells Fargo"
              {...register("name_of_financial_institution", {
                required: "Bank name is required",
              })}
              className="input input-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
            />
            {errors.name_of_financial_institution && (
              <p className="text-error text-sm mt-1">
                {errors.name_of_financial_institution.message}
              </p>
            )}
          </div>

          {/* Routing Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base dark:text-gray-900 pb-1">
                Routing or Transit Number
              </span>
            </label>
            <input
              type="text"
              maxLength={9}
              placeholder="123456789"
              {...register("routing_or_transit_number", {
                required: "Routing number is required",
                pattern: {
                  value: /^\d{9}$/,
                  message: "Must be exactly 9 digits",
                },
              })}
              className="input input-bordered input-lg w-full text-base tracking-widest text-start uppercase dark:bg-white dark:border-black dark:text-black"
            />
            {errors.routing_or_transit_number && (
              <p className="text-error text-sm mt-1">
                {errors.routing_or_transit_number.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 md:gap-10 mt-10 pt-10 md:mt-6 md:pt-10 md:pb-10">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="w-[150px] md:w-[200px] bg-white text-blue-800 py-3 border-2 uppercase border-blue-800 rounded-md hover:bg-gray-50 font-bold text-sm md:text-base transition"
            >
              Back
            </button>

            <button
              type="submit"
              className="w-[150px] md:w-[200px] bg-[#B31942] text-white py-3 rounded-md hover:bg-[#aa2b4d] font-bold uppercase text-sm md:text-base transition shadow-lg"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BankInformation;
