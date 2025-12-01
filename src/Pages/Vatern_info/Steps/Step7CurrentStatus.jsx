
import { useFormContext } from "react-hook-form";

export default function Step7CurrentStatus() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const currentlyHomeless = watch("currently_homeless_yes");
  const atRiskOfHomelessness = watch("risk_of_becoming_homeless_yes");
  const livingSituation = watch("livingSituation");
  const riskSituation = watch("riskSituation");

  const isCurrentlyHomeless = currentlyHomeless === "Yes";
  const showLivingSection = isCurrentlyHomeless;
  const showRiskQuestion = isCurrentlyHomeless;
  const isAtRiskOfHomelessness = atRiskOfHomelessness === "Yes";
  const showRiskSection = showRiskQuestion && isAtRiskOfHomelessness;

  const showLivingOther = livingSituation === "your_living-situation_other";
  const showRiskOther = riskSituation === "your_living-situation_2_other";

  return (
    <div className="space-y-8 px-2 md:px-0">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
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
          <p className="text-error text-xs mt-1">
            {errors.activeDutyOrders.message}
          </p>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
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
          <p className="text-error text-xs mt-1">
            {errors.vaDirectDeposit.message}
          </p>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium text-sm md:text-base pb-1 dark:border-black dark:text-black">
            Are you currently homeless?
          </span>
        </label>
        <select
          {...register("currently_homeless_yes", {
            required: "This field is required",
          })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.currently_homeless_yes && (
          <p className="text-error text-xs mt-1">
            {errors.currently_homeless_yes.message}
          </p>
        )}
      </div>

      {showLivingSection && (
        <div className="space-y-6 pt-6 border-t border-gray-300 animate-fade-in">
          <h3 className="text-lg font-semibold text-primary dark:text-black">
            Current Living Situation
          </h3>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium pb-1 text-sm md:text-base dark:text-black">
                Check the answer that most closely aligns to your living
                situation:
              </span>
            </label>
            <select
              {...register("livingSituation", {
                required: showLivingSection
                  ? "Please select your current living situation"
                  : false,
              })}
              className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select an option</option>
              <option value="your_living-situation_shelter">
                Living In A Homeless Shelter
              </option>
              <option value="your_living-situation_not_currently">
                Not Currently In A Sheltered Environment (e.g., car, tent)
              </option>
              <option value="your_living-situation_staying">
                Staying With Another Person
              </option>
              <option value="your_living-situation_fleeing">
                Fleeing Current Residence
              </option>
              <option value="your_living-situation_other">Others</option>
            </select>
            {errors.livingSituation && (
              <p className="text-error text-xs mt-1">
                {errors.livingSituation.message}
              </p>
            )}
          </div>

          {/* Others → Provide Details */}
          {showLivingOther && (
            <div className="animate-fade-in">
              <label className="label">
                <span className="label-text font-medium text-sm md:text-base dark:text-black">
                  Provide Details About Your Living Situation
                </span>
              </label>
              <textarea
                rows={4}
                {...register("livingSituationDetails", {
                  required: showLivingOther
                    ? "Please describe your current living situation"
                    : false,
                })}
                className="textarea textarea-bordered w-full resize-none py-4 px-5 dark:bg-white dark:border-black dark:text-black placeholder:text-gray-400"
                placeholder="Ex: Sleeping in car, staying with friends, etc..."
              />
              {errors.livingSituationDetails && (
                <p className="text-error text-xs mt-1">
                  {errors.livingSituationDetails.message}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {showRiskQuestion && (
        <div className="space-y-6 pt-6 border-t border-gray-300 animate-fade-in">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium text-lg pb-1 text-primary dark:text-black">
                Are You At Risk of Becoming Homeless?
              </span>
            </label>
            <select
              {...register("risk_of_becoming_homeless_yes", {
                required: showRiskQuestion ? "This field is required" : false,
              })}
              className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.risk_of_becoming_homeless_yes && (
              <p className="text-error text-xs mt-1">
                {errors.risk_of_becoming_homeless_yes.message}
              </p>
            )}
          </div>

          {/* Risk Situation Details - Only if Yes */}
          {showRiskSection && (
            <div className=" animate-fade-in">
              <label className="label">
                <span className="label-text pb-1 font-medium text-sm md:text-base dark:text-black">
                  Select the situation that applies to you:
                </span>
              </label>
              <select
                {...register("riskSituation", {
                  required: showRiskSection
                    ? "Please select your risk situation"
                    : false,
                })}
                className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
              >
                <option value="">Select an option</option>
                <option value="your_living-situation_2_housing">
                  Housing Will Be Lost In 30 Days
                </option>
                <option value="your_living-situation_2_homeless">
                  Leaving Publicly Funded System Of Care
                </option>
                <option value="your_living-situation_2_other">Others</option>
              </select>
              {errors.riskSituation && (
                <p className="text-error text-xs mt-1">
                  {errors.riskSituation.message}
                </p>
              )}

              {/* Others → Specify Risk */}
              {showRiskOther && (
                <div className="mt-4 animate-fade-in">
                  <label className="label">
                    <span className="label-text pb-1 font-medium text-sm md:text-base dark:text-black">
                      Please Specify Your Risk Situation
                    </span>
                  </label>
                  <textarea
                    rows={5}
                    {...register("other_specify_2", {
                      required: showRiskOther
                        ? "Please specify your risk situation"
                        : false,
                    })}
                    className="textarea textarea-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black placeholder:text-gray-400"
                    placeholder="Describe your situation..."
                  />
                  {errors.other_specify_2 && (
                    <p className="text-error text-xs mt-1">
                      {errors.other_specify_2.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
