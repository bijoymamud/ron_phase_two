import { useFormContext } from "react-hook-form";

export default function Step6MilitaryService() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Watch fields
  const serviceUnder = watch("serviceUnder");
  const servedInCombatZone = watch("servedInCombatZoneSince911");
  const activatedInGuardOrReserves = watch(
    "the_reserves_or_national_guard_yes"
  );

  // Conditional visibility
  const showOtherNames = serviceUnder === "serve_under_another_name_yes";
  const showCombatDates =
    servedInCombatZone === "did_you_serve_since_9112001_yes";
  const showComponentSection = activatedInGuardOrReserves === "Yes";

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
          {...register("componentType", { required: "Component is required" })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-gray-900"
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
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-gray-900"
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

      {/* Serve under another name */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
            Did you ever serve under another name?
          </span>
        </label>
        <select
          {...register("serviceUnder", { required: "This field is required" })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-gray-900"
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
            className="textarea textarea-bordered w-full resize-none py-4 px-5 dark:bg-white dark:border-black dark:text-gray-900 placeholder:text-gray-400 uppercase"
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
          className="input input-bordered w-full py-5 uppercase dark:bg-white dark:border-black dark:text-gray-900"
          placeholder="Enter place of separation"
        />
        {errors.place_of_last_or_anticipated_separation_1 && (
          <p className="text-error text-xs mt-1">
            {errors.place_of_last_or_anticipated_separation_1.message}
          </p>
        )}
      </div>

      {/* COMBAT ZONE SINCE 9/11 */}
      <div>
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
            className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-gray-900"
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

        {showCombatDates && (
          <div className="animate-fade-in space-y-6 border-l-4 mt-3 border-[#0B2A52] pl-4">
            {/* Combat Start Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-[#0B2A52] mb-1">
                  Combat Start Date
                </span>
              </label>
              <div className="flex gap-3">
                <div className="w-24">
                  <input
                    type="text"
                    maxLength={2}
                    placeholder="MM"
                    {...register("from_month_4", {
                      required: "Month is required",
                    })}
                    className="input input-bordered w-full text-center uppercase dark:bg-white dark:border-black dark:text-gray-900"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="text"
                    maxLength={2}
                    placeholder="DD"
                    {...register("from_day_4", { required: "Day is required" })}
                    className="input input-bordered w-full text-center uppercase dark:bg-white dark:border-black dark:text-gray-900"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="YYYY"
                    {...register("from_year_4", {
                      required: "Year is required",
                      validate: (v) =>
                        parseInt(v) >= 2001 || "Year must be 2001 or later",
                    })}
                    className="input input-bordered w-full text-center uppercase dark:bg-white dark:border-black dark:text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Combat End Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-[#0B2A52] mb-1">
                  Combat End Date
                </span>
              </label>
              <div className="flex gap-3">
                <div className="w-24">
                  <input
                    type="text"
                    maxLength={2}
                    placeholder="MM"
                    {...register("to_month_4", {
                      required: "Month is required",
                    })}
                    className="input input-bordered w-full text-center uppercase dark:bg-white dark:border-black dark:text-gray-900"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="text"
                    maxLength={2}
                    placeholder="DD"
                    {...register("to_day_4", { required: "Day is required" })}
                    className="input input-bordered w-full text-center uppercase dark:bg-white dark:border-black dark:text-gray-900"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="YYYY"
                    {...register("to_year_4", { required: "Year is required" })}
                    className="input input-bordered w-full text-center uppercase dark:bg-white dark:border-black dark:text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* KEY QUESTION - Controls COMPONENT Section */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
            ARE YOU CURRENTLY ACTIVATED ON FEDERAL ORDERS WITHIN THE NATIONAL
            GUARD OR RESERVES?
          </span>
        </label>
        <select
          {...register("the_reserves_or_national_guard_yes", {
            required: "This field is required",
          })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-gray-900"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.the_reserves_or_national_guard_yes && (
          <p className="text-error text-xs mt-1">
            {errors.the_reserves_or_national_guard_yes.message}
          </p>
        )}
      </div>

      {showComponentSection && (
        <>
          <div className="pt-6 ">
            <p className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
              COMPONENT
            </p>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("component_national_guard_2")}
                  className="checkbox checkbox-primary"
                />
                <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
                  COMPONENT (National Guard)
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("component_reserves_2")}
                  className="checkbox checkbox-primary"
                />
                <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:border-black dark:text-black">
                  COMPONENT (RESERVES)
                </span>
              </label>
            </div>
          </div>

          <div className="animate-fade-in space-y-6 border-l-4 mt-6 border-[#0B2A52] pl-4">
            <h3 className="text-xl font-bold text-[#0B2A52]">
              OBLIGATION TERM OF SERVICE
            </h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium dark:text-gray-900 mb-1">
                  From:
                </span>
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  maxLength={2}
                  placeholder="MM"
                  {...register("from_month_5", { required: true })}
                  className="input input-bordered border border-gray-400 w-32 text-center uppercase dark:bg-white dark:text-gray-900"
                />
                <input
                  type="text"
                  maxLength={2}
                  placeholder="DD"
                  {...register("from_day_5", { required: true })}
                  className="input input-bordered w-32 text-center border-gray-400 uppercase dark:bg-white dark:text-gray-900"
                />
                <input
                  type="text"
                  maxLength={4}
                  placeholder="YYYY"
                  {...register("from_year_5", { required: true })}
                  className="input input-bordered w-32 text-center border-gray-400 uppercase dark:bg-white dark:text-gray-900"
                />
              </div>
            </div>

            {/* To */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium dark:text-gray-900 mb-1">
                  To:
                </span>
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  maxLength={2}
                  placeholder="MM"
                  {...register("to_month_5", { required: true })}
                  className="input input-bordered w-32 border border-gray-400 text-center uppercase dark:bg-white dark:text-gray-900"
                />
                <input
                  type="text"
                  maxLength={2}
                  placeholder="DD"
                  {...register("to_day_5", { required: true })}
                  className="input input-bordered  w-32 border border-gray-400 text-center uppercase dark:bg-white dark:text-gray-900"
                />
                <input
                  type="text"
                  maxLength={4}
                  placeholder="YYYY"
                  {...register("to_year_5", { required: true })}
                  className="input input-bordered w-32 border border-gray-400 text-center uppercase dark:bg-white dark:text-gray-900"
                />
              </div>
            </div>

            {/* Unit Name & Address */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium dark:text-gray-900 mb-1">
                  CURRENT OR LAST ASSIGNED NAME AND ADDRESS OF UNIT
                </span>
              </label>
              <textarea
                rows={4}
                {...register(
                  "21d_current_or_last_assigned_name_and_address_of_unit",
                  { required: true }
                )}
                className="textarea textarea-bordered  border border-gray-400 w-full resize-none uppercase dark:bg-white dark:text-gray-900"
              />
            </div>

            {/* Unit Phone */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium dark:text-gray-900 mb-1">
                  CURRENT OR ASSIGNED PHONE NUMBER OF UNIT (Include Area Code)
                </span>
              </label>
              <input
                type="text"
                {...register(
                  "21e_current_or_assigned_phone_number_of_unit_include_area_code",
                  { required: true }
                )}
                className="input input-bordered w-full  border border-gray-400 uppercase dark:bg-white dark:text-gray-900"
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text font-medium dark:text-gray-900 mb-1">
                  ARE YOU CURRENTLY RECEIVING INACTIVE DUTY TRAINING PAY?
                </span>
              </label>
              <div className="flex gap-10 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register("21f_training_pay", {
                      required: "Please select Yes or No",
                    })}
                    onChange={() => {
                      setValue("21f_training_pay_yes", true);
                      setValue("21f_training_pay_no", false);
                    }}
                    className="radio radio-primary"
                  />
                  <span className="dark:text-gray-900">Yes</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register("21f_training_pay")}
                    onChange={() => {
                      setValue("21f_training_pay_yes", false);
                      setValue("21f_training_pay_no", true);
                    }}
                    className="radio radio-primary"
                  />
                  <span className="dark:text-gray-900">No</span>
                </label>
              </div>
              {errors["21f_training_pay"] && (
                <p className="text-error text-xs mt-1">
                  {errors["21f_training_pay"].message}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
