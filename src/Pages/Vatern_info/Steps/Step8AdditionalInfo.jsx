// import { useFormContext } from "react-hook-form";

// export default function Step8AdditionalInfo() {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div className="space-y-6">
//       {/* Additional Information Section */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
//             Do you have any special skills or certifications?
//           </span>
//         </label>
//         <select
//           {...register("specialSkills", {
//             required: "This field is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>
//         {errors.specialSkills && (
//           <p className="text-error text-xs mt-1">
//             {errors.specialSkills.message}
//           </p>
//         )}
//       </div>

//       {/* Education Level */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
//             Highest Education Level Completed
//           </span>
//         </label>
//         <select
//           {...register("educationLevel", {
//             required: "Education level is required",
//           })}
//           className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
//         >
//           <option value="">Select Education Level</option>
//           <option value="high_school">High School Diploma/GED</option>
//           <option value="some_college">Some College</option>
//           <option value="associates">Associate's Degree</option>
//           <option value="bachelors">Bachelor's Degree</option>
//           <option value="masters">Master's Degree</option>
//           <option value="doctoral">Doctoral Degree</option>
//           <option value="other">Other</option>
//         </select>
//         {errors.educationLevel && (
//           <p className="text-error text-xs mt-1">
//             {errors.educationLevel.message}
//           </p>
//         )}
//       </div>

//       {/* Emergency Contact */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
//             Emergency Contact Name
//           </span>
//         </label>
//         <input
//           type="text"
//           {...register("emergencyContactName", {
//             required: "Emergency contact name is required",
//           })}
//           className="input input-bordered w-full py-5 uppercase dark:bg-white dark:border-black dark:text-black"
//           placeholder="Full name of emergency contact"
//         />
//         {errors.emergencyContactName && (
//           <p className="text-error text-xs mt-1">
//             {errors.emergencyContactName.message}
//           </p>
//         )}
//       </div>

//       {/* Emergency Contact Phone */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
//             Emergency Contact Phone Number
//           </span>
//         </label>
//         <input
//           type="text"
//           {...register("emergencyContactPhone", {
//             required: "Emergency contact phone is required",
//             pattern: {
//               value: /^\d{10}$/,
//               message: "Please enter a valid 10-digit phone number",
//             },
//           })}
//           className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black"
//           placeholder="10-digit phone number"
//           onInput={(e) => {
//             e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
//           }}
//         />
//         {errors.emergencyContactPhone && (
//           <p className="text-error text-xs mt-1">
//             {errors.emergencyContactPhone.message}
//           </p>
//         )}
//       </div>

//       {/* Relationship to Veteran */}
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
//             Relationship to Veteran
//           </span>
//         </label>
//         <input
//           type="text"
//           {...register("emergencyContactRelationship", {
//             required: "Relationship is required",
//           })}
//           className="input input-bordered w-full py-5 uppercase dark:bg-white dark:border-black dark:text-black"
//           placeholder="e.g., Spouse, Parent, Friend"
//         />
//         {errors.emergencyContactRelationship && (
//           <p className="text-error text-xs mt-1">
//             {errors.emergencyContactRelationship.message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

export default function Step8AdditionalInfo() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "traumaticEventDetails",
  });

  const addEvent = () => {
    if (fields.length < 6) {
      append({
        description: "",
        location: "",
        date: "",
      });
    }
  };

  const removeEvent = (index) => {
    remove(index);
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-black mb-2">
          Traumatic Event(s)
        </h2>
        <p className="text-sm text-gray-600 mb-6">Check all that apply</p>

        <div className="space-y-5">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              {...register("combat_tramatic_event")}
              className="checkbox checkbox-primary mt-1"
            />
            <span className="ml-3 text-base font-medium uppercase dark:text-black">
              Combat Traumatic Event(s)
            </span>
          </label>

          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              {...register("personal_traumatic_event_mst_no")}
              className="checkbox checkbox-primary mt-1"
            />
            <span className="ml-3 text-base font-medium uppercase dark:text-black">
              Personal Traumatic Event(s) (not involving military sexual trauma
              (MST))
            </span>
          </label>

          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              {...register("personal_traumatic_event_mst_yes")}
              className="checkbox checkbox-primary mt-1"
            />
            <div className="ml-3">
              <span className="text-base font-medium uppercase dark:text-black">
                Personal Traumatic Event(s) (involving MST)
              </span>
            </div>
          </label>

          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              {...register("other_traumatic_event")}
              className="checkbox checkbox-primary mt-1"
            />
            <span className="ml-3 text-base font-medium uppercase dark:text-black">
              Other Traumatic Event(s)
            </span>
          </label>
        </div>
      </div>

      {/* === DYNAMIC EVENT DETAILS === */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-black">
            Details of Traumatic Event(s)
          </h2>
          {fields.length < 6 && (
            <button
              type="button"
              onClick={addEvent}
              className="btn btn-outline border-gray-200 hover:bg-[#0B2A52] hover:shadow-none hover:text-white  dark:text-gray-900 flex items-center gap-2"
            >
              <Plus size={18} />
              Add Event ({fields.length}/6)
            </button>
          )}
        </div>

        {fields.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">No traumatic events added yet.</p>
            <button
              type="button"
              onClick={addEvent}
              className="mt-4 btn bg-[#0B2A52] btn-sm"
            >
              <Plus size={18} /> Add First Event
            </button>
            D{" "}
          </div>
        )}

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="bg-gray-50 p-6 rounded-lg border border-gray-300 space-y-5 relative"
          >
            {/* Event Number & Remove Button */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-[#0B2A52]">
                Event {index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeEvent(index)}
                className="btn btn-ghost btn-xs text-red-600 border-gray-200 shadow-sm hover:shadow-md hover:bg-red-50"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>

            {/* Description */}
            <div className="form-control flex flex-col items-start w-full">
              <label className="label">
                <span className="label-text font-medium pb-1 text-sm dark:text-black">
                  Brief Description of the Traumatic Event(s)
                </span>
              </label>
              <textarea
                {...register(`traumaticEventDetails.${index}.description`, {
                  required: "Description is required",
                })}
                className="textarea w-full textarea-bordered h-24 uppercase dark:bg-white dark:border-black dark:text-black"
                placeholder="e.g., injury in warfare, physical assault, sexual harassment, witnessed death..."
              />
              {errors.traumaticEventDetails?.[index]?.description && (
                <p className="text-error text-xs mt-1">
                  {errors.traumaticEventDetails[index].description.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text pb-1 font-medium text-sm dark:text-black">
                  Location of the Traumatic Event(s)
                </span>
              </label>
              <input
                type="text"
                {...register(`traumaticEventDetails.${index}.location`, {
                  required: "Location is required",
                })}
                className="input input-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
                placeholder="e.g., unit assignment, residence, off-base, Iraq, Fort Bragg..."
              />
              {errors.traumaticEventDetails?.[index]?.location && (
                <p className="text-error text-xs mt-1">
                  {errors.traumaticEventDetails[index].location.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium pb-1 text-sm dark:text-black">
                  Date(s) the Traumatic Event(s) Occurred
                </span>
              </label>
              <input
                type="text"
                {...register(`traumaticEventDetails.${index}.date`, {
                  required: "Date is required",
                })}
                className="input input-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
                placeholder="e.g., June 2009, 2011–2013, approx. Spring 2004"
              />
              {errors.traumaticEventDetails?.[index]?.date && (
                <p className="text-error text-xs mt-1">
                  {errors.traumaticEventDetails[index].date.message}
                </p>
              )}
            </div>
          </div>
        ))}

        {fields.length === 6 && (
          <div className="alert alert-info shadow-lg">
            <span>Maximum of 6 events reached.</span>
          </div>
        )}
      </div>
    </div>
  );
}
