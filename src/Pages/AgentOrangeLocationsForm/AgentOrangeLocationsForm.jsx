// import React from "react";

// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// function AgentOrangeLocationsForm() {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       locations: {
//         thailand: false,
//         republicOfVietnam: false,
//         laos: false,
//         cambodia: false,
//         guamOrAmericanSamoa: false,
//         johnstonAtoll: false,
//         koreanDMZ: false,
//         c123Aircraft: false,
//       },
//     },
//   });

//   const onSubmit = (data) => {
//     // Transform selected locations into an array
//     const locations = Object.keys(data.locations)
//       .filter((key) => data.locations[key])
//       .map((key) => {
//         switch (key) {
//           case "thailand":
//             return "Thailand (Any U.S. or Royal Thai Base)";
//           case "republicOfVietnam":
//             return "Republic of Vietnam, Including 12 Nautical Miles of Territorial Waters";
//           case "laos":
//             return "Laos";
//           case "cambodia":
//             return "Cambodia (Mimot, Krek, Kampong Cham Province)";
//           case "guamOrAmericanSamoa":
//             return "Guam or American Samoa (Including Territorial Waters)";
//           case "johnstonAtoll":
//             return "Johnston Atoll or Any Ship That Visited Johnston Atoll";
//           case "koreanDMZ":
//             return "Korean Demilitarized Zone (DMZ)";
//           case "c123Aircraft":
//             return "C-123 Aircraft Used For Herbicide Spraying Operations (Air Force and Air Force Reserves)";
//           default:
//             return key;
//         }
//       });

//     const submittedData = { locations };
//     console.log("Submitted Data:", submittedData);
//     localStorage.setItem("agentOrangeLocations", JSON.stringify(submittedData));
//     navigate("/toxin_exposure", { state: submittedData });
//   };

//   return (
//     <div className="min-h-screen bg-white flex justify-center items-center  md:p-4 p-2 pt-14 md:mt-10">
//       <div className="w-full max-w-4xl md:bg-white md:shadow-md rounded-lg md:p-6">
//         <h1 className="md:text-2xl text-lg font-bold text-blue-800 mb-6 text-center pt-20 md:pt-0">
//           Did you serve in any of the below herbicide (Agent Orange) hazard
//           locations?
//         </h1>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Checkboxes for locations */}
//           <div className="grid grid-cols-1 gap-4 ms-2 md:ms-0">
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("locations.thailand")}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800 ">
//                 Thailand (Any U.S. or Royal Thai Base)
//               </span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("locations.republicOfVietnam")}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800">
//                 Republic of Vietnam, Including 12 Nautical Miles of Territorial
//                 Waters
//               </span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("locations.laos")}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800">Laos</span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("locations.cambodia")}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800">
//                 Cambodia (Mimot, Krek, Kampong Cham Province)
//               </span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("locations.guamOrAmericanSamoa")}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800">
//                 Guam or American Samoa (Including Territorial Waters)
//               </span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("locations.johnstonAtoll")}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800">
//                 Johnston Atoll or Any Ship That Visited Johnston Atoll
//               </span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("locations.koreanDMZ")}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800">
//                 Korean Demilitarized Zone (DMZ)
//               </span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("locations.c123Aircraft")}
//                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="text-blue-800">
//                 C-123 Aircraft Used For Herbicide Spraying Operations (Air Force
//                 and Air Force Reserves)
//               </span>
//             </label>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-center gap-5 md:mt-6 md:pt-10 mt-10 pt-10 pb-10 md:pb-0">
//             <button
//               type="button"
//               className="bg-white text-blue-800 py-2 px-6 uppercase md:px-20 md:w-[200px] w-[150px] border border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold"
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

// export default AgentOrangeLocationsForm;

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
      did_you_serve_gulf_war_hazard_location_yes: "",
      location_from_month: "",
      location_from_year: "",
      location_to_month: "",
      location_to_year: "",

      herbicide_yes: "",
      location_from_month2: "",
      location_from_year2: "",
      location_to_month2: "",
      location_to_year2: "",
      please_list_other_locations_where_you_served_if_not_listed_above: "",
    },
  });

  const gulfWarYes = watch("did_you_serve_gulf_war_hazard_location_yes");
  const herbicideYes = watch("herbicide_yes");

  const onSubmit = (data) => {
    const result = {
      // Gulf War Section
      did_you_serve_gulf_war_hazard_location_yes:
        data.did_you_serve_gulf_war_hazard_location_yes === "true",
      did_you_serve_gulf_war_hazard_location_no:
        data.did_you_serve_gulf_war_hazard_location_yes === "false",

      location_from_month:
        gulfWarYes === "true" ? data.location_from_month : null,
      location_from_year:
        gulfWarYes === "true" ? data.location_from_year : null,
      location_to_month: gulfWarYes === "true" ? data.location_to_month : null,
      location_to_year: gulfWarYes === "true" ? data.location_to_year : null,

      // Herbicide Section
      herbicide_yes: data.herbicide_yes === "true",
      herbicide_no: data.herbicide_yes === "false",

      location_from_month2: data.location_from_month2 || null,
      location_from_year2: data.location_from_year2 || null,
      location_to_month2: data.location_to_month2 || null,
      location_to_year2: data.location_to_year2 || null,

      please_list_other_locations_where_you_served_if_not_listed_above:
        data.herbicide_yes === "false"
          ? data.please_list_other_locations_where_you_served_if_not_listed_above
          : null,
    };

    localStorage.setItem("toxinExposure", JSON.stringify(result));
    navigate("/toxin_exposure", { state: result });
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center md:p-4 p-2 pt-14 md:pt-40">
      <div className="w-full max-w-4xl md:bg-white md:shadow-md rounded-lg md:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* === Gulf War Section === */}
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              Did you serve in GULF WAR HAZARD LOCATIONS?
            </h2>

            <div className="flex gap-16">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="true"
                  {...register("did_you_serve_gulf_war_hazard_location_yes", {
                    required: "Required",
                  })}
                  className="h-6 w-6 text-blue-600"
                />
                <span className="text-xl font-medium text-blue-800">Yes</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="false"
                  {...register("did_you_serve_gulf_war_hazard_location_yes", {
                    required: "Required",
                  })}
                  className="h-6 w-6 text-blue-600"
                />
                <span className="text-xl font-medium text-blue-800">No</span>
              </label>
            </div>
            {errors.did_you_serve_gulf_war_hazard_location_yes && (
              <p className="text-red-600 mt-2">This field is required</p>
            )}

            {gulfWarYes === "true" && (
              <div className="mt-8">
                <p className="font-semibold text-blue-800 mb-4">
                  When did you serve there?
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <span className="font-medium text-blue-800">From:</span>
                    <div className="flex gap-3 mt-2">
                      <input
                        type="text"
                        placeholder="MM"
                        maxLength="2"
                        {...register("location_from_month", {
                          required: "MM required",
                        })}
                        className="w-32 px-4 py-2 dark:bg-white dark:text-gray-900  border rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="YYYY"
                        maxLength="4"
                        {...register("location_from_year", {
                          required: "YYYY required",
                        })}
                        className="w-32 px-4 py-2 border dark:bg-white dark:text-gray-900  rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-blue-800">To:</span>
                    <div className="flex gap-3 mt-2">
                      <input
                        type="text"
                        placeholder="MM"
                        maxLength="2"
                        {...register("location_to_month", {
                          required: "MM required",
                        })}
                        className="w-32 px-4 py-2 dark:bg-white dark:text-gray-900  border rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="YYYY"
                        maxLength="4"
                        {...register("location_to_year", {
                          required: "YYYY required",
                        })}
                        className="w-32 px-4 py-2 dark:bg-white dark:text-gray-900 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* === Herbicide Section === */}
          <div className="pb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              DID YOU SERVE IN ANY OF THE FOLLOWING HERBICIDE (e.g., Agent
              Orange) LOCATIONS?
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Republic of Vietnam (incl. territorial waters), Thailand
              U.S./Royal Thai bases, Laos, Cambodia (Mimot/Krek, Kampong Cham),
              Guam/American Samoa, Johnston Atoll, Korean DMZ, or C-123 aircraft
              with herbicide exposure
            </p>

            <div className="flex gap-16 mb-8">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="true"
                  {...register("herbicide_yes", {
                    required: "Please select Yes or No",
                  })}
                  className="h-6 w-6 text-blue-600"
                />
                <span className="text-xl font-medium text-blue-800">Yes</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="false"
                  {...register("herbicide_yes", {
                    required: "Please select Yes or No",
                  })}
                  className="h-6 w-6 text-blue-600"
                />
                <span className="text-xl font-medium text-blue-800">No</span>
              </label>
            </div>
            {errors.herbicide_yes && (
              <p className="text-red-600">{errors.herbicide_yes.message}</p>
            )}

            {/* Other locations - only if No */}
            {herbicideYes === "false" && (
              <div className="mb-8">
                <label className="block text-lg font-medium text-blue-800 mb-3">
                  Please list other location(s) where you served, if not listed
                  above:
                </label>
                <textarea
                  {...register(
                    "please_list_other_locations_where_you_served_if_not_listed_above",
                    {
                      required:
                        herbicideYes === "false"
                          ? "This field is required"
                          : false,
                    }
                  )}
                  rows="4"
                  className="w-full px-4 py-3 border dark:bg-white dark:text-gray-900 border-gray-400 rounded-md"
                  placeholder="Type locations here..."
                />
                {errors.please_list_other_locations_where_you_served_if_not_listed_above && (
                  <p className="text-red-600 text-sm mt-1">
                    {
                      errors
                        .please_list_other_locations_where_you_served_if_not_listed_above
                        .message
                    }
                  </p>
                )}
              </div>
            )}

            {/* Date fields - show always after selecting yes/no */}
            {(herbicideYes === "true" || herbicideYes === "false") && (
              <div className="mt-8">
                <p className="text-xl font-semibold text-blue-800 mb-6">
                  WHEN DID YOU SERVE IN THESE LOCATIONS? (MM-YYYY)
                </p>
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <label className="block font-medium text-blue-800 mb-2">
                      From:
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="MM"
                        maxLength="2"
                        {...register("location_from_month2", {
                          required: "Month required",
                          pattern: {
                            value: /^(0?[1-9]|1[0-2])$/,
                            message: "01–12",
                          },
                        })}
                        className="w-32 px-4 py-2 border dark:bg-white dark:text-gray-900 rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="YYYY"
                        maxLength="4"
                        {...register("location_from_year2", {
                          required: "Year required",
                          pattern: {
                            value: /^\d{4}$/,
                            message: "4-digit year",
                          },
                        })}
                        className="w-32 px-4 py-2 dark:bg-white dark:text-gray-900 border rounded-md"
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
                        {...register("location_to_month2", {
                          required: "Month required",
                          pattern: {
                            value: /^(0?[1-9]|1[0-2])$/,
                            message: "01–12",
                          },
                        })}
                        className="w-32 px-4 py-2 border dark:bg-white dark:text-gray-900 rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="YYYY"
                        maxLength="4"
                        {...register("location_to_year2", {
                          required: "Year required",
                          pattern: {
                            value: /^\d{4}$/,
                            message: "4-digit year",
                          },
                        })}
                        className="w-32 px-4 py-2 border dark:bg-white dark:text-gray-900 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}

          <div className="flex justify-center gap-4 md:gap-10 mt-10 pt-10 md:mt-6 md:pt-10 md:pb-10">
            {/* Back Button */}
            <button
              type="button"
              className="w-[150px] md:w-[200px] bg-white text-blue-800 py-2 border uppercase border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold"
              onClick={() => window.history.back()}
            >
              Back
            </button>

            {/* Continue Button */}
            <Link
              onClick={handleSubmit(onSubmit)}
              className="w-[150px] md:w-[200px] bg-[#B31942] text-white py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-semibold text-center flex items-center justify-center"
            >
              Continue
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ToxinExposureForm;
