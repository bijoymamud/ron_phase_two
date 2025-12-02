// import React from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// function ToxinExposureForm() {
//   const navigate = useNavigate();
//   const { register, handleSubmit } = useForm({
//     defaultValues: {
//       ASBESTOS: false,
//       SHAD_Shipboard_Hazard_And_Defense: false,
//       Mustard_Gas: false,
//       Military_Occupational_Specialty_MOS_Related_Toxin: false,
//       Radiation: false,
//       Contaminated_Water_At_Camp_Lejeune: false,
//       Jet_Fuel: false,
//       Other_Toxins: "",
//       Additional_Details: "",
//     },
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//     localStorage.setItem("toxinExposure", JSON.stringify(data));
//     navigate("/confirmation");
//   };

//   return (
//     <div className="min-h-screen bg-white flex justify-center items-center md:p-4 p-2 pt-14 md:mt-14">
//       <div className="w-full max-w-2xl md:bg-white md:shadow-md rounded-lg md:p-6">
//         <h1 className="md:text-2xl text-xl font-bold text-blue-800 mb-6 text-center pt-20 md:pt-0">
//           Have you been exposed to any of the following?
//         </h1>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-4 ms-1 md:ms-0"
//         >
//           {/* Checkboxes for exposures */}
//           <div className="grid grid-cols-1 gap-4 ">
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("ASBESTOS[0]")}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800">Asbestos</span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("SHAD_Shipboard_Hazard_And_Defense[0]")}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800">
//                 Shipboard Hazard And Defense (SHAD)
//               </span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("Mustard_Gas[0]")}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800">Mustard Gas</span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register(
//                   "Military_Occupational_Specialty_MOS_Related_Toxin[0]"
//                 )}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800">
//                 Military Occupational Specialties (MOS) Related Toxin
//               </span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("Radiation")}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800">Radiation</span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("Contaminated_Water_At_Camp_Lejeune[0]")}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800">
//                 Contaminated Water At Camp Lejeune
//               </span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("others")}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800">Other</span>
//             </label>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-center gap-5 md:mt-6 md:pt-10 mt-10 pt-10 pb-10 md:pb-0">
//             <button
//               type="button"
//               className="bg-white text-blue-800 py-2 px-6 md:px-20 uppercase md:w-[200px] w-[150px] border border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold"
//               onClick={() => window.history.back()}
//             >
//               Back
//             </button>

//             <button
//               type="submit"
//               className="bg-[#B31942] text-white uppercase py-2 px-6 md:px-20 md:w-[200px] w-[150px] rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-semibold text-center flex items-center justify-center"
//             >
//               Continue
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ToxinExposureForm;

import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function ToxinExposureForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      been_exposed_asbestos: false,
      been_exposed_shad: false,
      been_exposed_mustard_gas: false,
      been_exposed_military_occupational_specialty: false,
      been_exposed_radiation: false,
      been_exposed_contaminated_water: false,
      been_exposed_other: false,
      other_specify_3: "",

      // New fields for exposure dates
      when_were_you_exposed_from_month: "",
      when_were_you_exposed_from_year: "",
      when_were_you_exposed_to_month: "",
      when_were_you_exposed_to_year: "",
      "15e_if_you_were_exposed_multiple_times_please_provide_all_additional_dates_and_locations_of_potential_exposure":
        "",
    },
  });

  // Watch all exposure checkboxes
  const watchedExposures = watch([
    "been_exposed_asbestos",
    "been_exposed_shad",
    "been_exposed_mustard_gas",
    "been_exposed_military_occupational_specialty",
    "been_exposed_radiation",
    "been_exposed_contaminated_water",
    "been_exposed_other",
  ]);

  const watchedOther = watch("been_exposed_other");

  const hasAnyExposure = watchedExposures.some(Boolean);

  const onSubmit = (data) => {
    if (!hasAnyExposure) {
      data.when_were_you_exposed_from_month = null;
      data.when_were_you_exposed_from_year = null;
      data.when_were_you_exposed_to_month = null;
      data.when_were_you_exposed_to_year = null;
      data[
        "15e_if_you_were_exposed_multiple_times_please_provide_all_additional_dates_and_locations_of_potential_exposure"
      ] = null;
    }

    if (!data.been_exposed_other) {
      data.other_specify_3 = null;
    }

    console.log("Final Toxin Exposure Data:", data);
    localStorage.setItem("toxinExposurePart2", JSON.stringify(data));
    navigate("/confirmation");
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center md:p-4 p-2 pt-14 md:pt-40">
      <div className="w-full max-w-3xl md:bg-white md:shadow-md rounded-lg md:p-6">
        <h1 className="md:text-2xl text-xl font-bold text-blue-800 mb-8 text-center pt-20 md:pt-0">
          Have you been exposed to any of the following?
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Checkboxes */}
          <div className="space-y-5">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("been_exposed_asbestos")}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg text-blue-800 font-medium">
                Asbestos
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("been_exposed_shad")}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg text-blue-800 font-medium">
                Shipboard Hazard And Defense (SHAD)
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("been_exposed_mustard_gas")}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg text-blue-800 font-medium">
                Mustard Gas
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("been_exposed_military_occupational_specialty")}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg text-blue-800 font-medium">
                Military Occupational Specialties (MOS) Related Toxin
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("been_exposed_radiation")}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg text-blue-800 font-medium">
                Radiation
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("been_exposed_contaminated_water")}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg text-blue-800 font-medium">
                Contaminated Water At Camp Lejeune
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("been_exposed_other")}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg text-blue-800 font-medium">Other</span>
            </label>
          </div>

          {/* "Other" specify field */}
          {watchedOther && (
            <div className="mt-6 p-5 bg-gray-50 rounded-lg border border-gray-300">
              <label className="block text-lg font-medium text-blue-800 mb-3">
                Please provide additional details in the space below:
              </label>
              <textarea
                {...register("other_specify_3", {
                  required: watchedOther
                    ? "This field is required when 'Other' is selected"
                    : false,
                })}
                rows="4"
                className="w-full px-4 py-3 border border-gray-400 dark:bg-white dark:text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Describe the other exposure(s)..."
              />
              {errors.other_specify_3 && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.other_specify_3.message}
                </p>
              )}
            </div>
          )}

          {/* Date Range + Multiple Exposures - Show if ANY checkbox is checked */}
          {hasAnyExposure && (
            <div className="md:mt-20  ">
              <h3 className="text-xl font-bold text-blue-800 mb-6 md:mt-10">
                When were you exposed?
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block font-medium text-blue-800 mb-2">
                    From:
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="MM"
                      maxLength="2"
                      {...register("when_were_you_exposed_from_month", {
                        required: hasAnyExposure ? "Month required" : false,
                        pattern: {
                          value: /^(0?[1-9]|1[0-2])$/,
                          message: "01–12",
                        },
                      })}
                      className="w-32 px-4 dark:bg-white dark:text-gray-900 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="YYYY"
                      maxLength="4"
                      {...register("when_were_you_exposed_from_year", {
                        required: hasAnyExposure ? "Year required" : false,
                        pattern: { value: /^\d{4}$/, message: "4-digit year" },
                      })}
                      className="w-32 px-4 py-2 border rounded-md dark:bg-white dark:text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-blue-800 mb-2">
                    To:
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="MM"
                      maxLength="2"
                      {...register("when_were_you_exposed_to_month", {
                        pattern: {
                          value: /^(0?[1-9]|1[0-2])$/,
                          message: "01–12",
                        },
                      })}
                      className="w-32 px-4 py-2 border rounded-md dark:bg-white dark:text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="YYYY"
                      maxLength="4"
                      {...register("when_were_you_exposed_to_year", {
                        pattern: { value: /^\d{4}$/, message: "4-digit year" },
                      })}
                      className="w-32 px-4 py-2 border rounded-md dark:bg-white dark:text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Multiple Exposures Textarea */}
              <div className="mt-6">
                <label className="block text-lg font-medium text-blue-800 mb-3">
                  IF YOU WERE EXPOSED MULTIPLE TIMES, PLEASE PROVIDE ALL
                  ADDITIONAL DATES AND LOCATIONS OF POTENTIAL EXPOSURE:
                </label>
                <textarea
                  {...register(
                    "15e_if_you_were_exposed_multiple_times_please_provide_all_additional_dates_and_locations_of_potential_exposure"
                  )}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-400 dark:bg-white dark:text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Example: 2004-2006 at Fort Bragg, burn pit exposure; 2010 in Afghanistan..."
                />
              </div>
            </div>
          )}

          {/* Buttons */}
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
        </form>
      </div>
    </div>
  );
}

export default ToxinExposureForm;
