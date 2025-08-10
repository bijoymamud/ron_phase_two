

import { useFormContext } from "react-hook-form";

export default function Step7CurrentStatus({ register, errors }) {
  const { watch } = useFormContext();
  const vaHealthCare = watch("vaHealthCare");

  return (
    <div className="space-y-4 px-2 md:px-0">
      {/* Active Duty Orders */}
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

      {/* VA Direct Deposit */}
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

      {/* Homelessness Question */}
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
        {errors.vaHealthCare && (
          <label className="label">
            <span className="label-text-alt text-error text-xs">
              {errors.vaHealthCare.message}
            </span>
          </label>
        )}
      </div>

      {/* Living Situation (conditional) */}
      {vaHealthCare === "Yes" && (
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium text-sm md:text-base pb-1 break-words whitespace-normal dark:border-black dark:text-black">
              Check The Answer That Most Closely Aligns To Your Living Situation:
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
              Not Currently In A Sheltered Environment (e.g., living in a car or tent)
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
          </select>
          {errors.livingSituation && (
            <label className="label">
              <span className="label-text-alt text-error text-xs">
                {errors.livingSituation.message}
              </span>
            </label>
          )}
        </div>
      )}
    </div>
  );
}
