import { useFormContext } from "react-hook-form";

export default function Step7CurrentStatus() {
  const {
    register,
    watch,
    setValue,
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

  const activatedFederalOrders = watch("22a_reserves_2_yes");
  const isActivatedFederal = activatedFederalOrders === "Yes";

  const prisonerOfWarValue = watch("prisoner_of_war_yes");
  const isPrisonerOfWar = prisonerOfWarValue === "Yes";

  const handlePrisonerOfWarChange = (value) => {
    if (prisonerOfWarValue === value) {
      setValue("prisoner_of_war_yes", null);
    } else {
      setValue("prisoner_of_war_yes", value);
    }
  };

  // Date validation helper
  const validateDay = (value) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return "Enter a valid day";
    if (num < 1 || num > 31) return "Day must be between 1-31";
    return true;
  };

  const validateMonth = (value) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return "Enter a valid month";
    if (num < 1 || num > 12) return "Month must be between 1-12";
    return true;
  };

  const validateYear = (value) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return "Enter a valid year";
    if (num < 1900 || num > 2100) return "Enter a valid year";
    return true;
  };

  // Input restriction helper - prevents typing invalid values
  const handleNumberInput = (e, max) => {
    const value = e.target.value;
    const num = parseInt(value, 10);

    // Allow empty or single digit
    if (value === "" || value.length === 1) return;

    // Restrict to max value
    if (num > max) {
      e.target.value = value.slice(0, -1);
    }
  };

  return (
    <div className="space-y-8 pb-14">
      {/* === ARE YOU CURRENTLY ACTIVATED ON FEDERAL ORDERS === */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium text-lg pb-1 text-primary dark:text-black ">
            ARE YOU CURRENTLY ACTIVATED ON FEDERAL ORDERS WITHIN THE NATIONAL{" "}
            <br />
            GUARD OR RESERVES?
          </span>
        </label>
        <select
          {...register("22a_reserves_2_yes", {
            required: "This field is required",
          })}
          className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors["22a_reserves_2_yes"] && (
          <p className="text-error text-xs mt-1">
            {errors["22a_reserves_2_yes"].message}
          </p>
        )}
      </div>

      {isActivatedFederal && (
        <div className="space-y-6 pt-6 border-t border-gray-300 animate-fade-in">
          <h3 className="text-xl font-semibold text-primary dark:text-black">
            Federal Orders Activation Details
          </h3>

          {/* Date of Activation */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-sm md:text-base dark:text-black">
                DATE OF ACTIVATION (MM - DD - YYYY)
              </span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                placeholder="MM"
                {...register("activation_month_6", {
                  required: "Month is required",
                  validate: validateMonth,
                  min: { value: 1, message: "Month must be 1-12" },
                  max: { value: 12, message: "Month must be 1-12" },
                })}
                onInput={(e) => handleNumberInput(e, 12)}
                className="input input-bordered flex-1 dark:bg-white dark:text-gray-900 dark:border-black"
                min="1"
                max="12"
              />
              <input
                type="number"
                placeholder="DD"
                {...register("activation_day_6", {
                  required: "Day is required",
                  validate: validateDay,
                  min: { value: 1, message: "Day must be 1-31" },
                  max: { value: 31, message: "Day must be 1-31" },
                })}
                onInput={(e) => handleNumberInput(e, 31)}
                className="input input-bordered flex-1 dark:bg-white dark:text-gray-900 dark:border-black"
                min="1"
                max="31"
              />
              <input
                type="number"
                placeholder="YYYY"
                {...register("activation_year_6", {
                  required: "Year is required",
                  validate: validateYear,
                })}
                className="input input-bordered flex-1 dark:bg-white dark:text-gray-900 dark:border-black"
                min="1900"
                max="2100"
              />
            </div>
            {(errors.activation_month_6 ||
              errors.activation_day_6 ||
              errors.activation_year_6) && (
              <p className="text-error text-xs mt-1">
                {errors.activation_month_6?.message ||
                  errors.activation_day_6?.message ||
                  errors.activation_year_6?.message ||
                  "Please complete activation date"}
              </p>
            )}
          </div>

          {/* Anticipated Separation Date */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-sm md:text-base dark:text-black">
                ANTICIPATED SEPARATION DATE (MM - DD - YYYY)
              </span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                placeholder="MM"
                {...register("anticipated_month_7", {
                  required: "Month is required",
                  validate: validateMonth,
                  min: { value: 1, message: "Month must be 1-12" },
                  max: { value: 12, message: "Month must be 1-12" },
                })}
                onInput={(e) => handleNumberInput(e, 12)}
                className="input input-bordered flex-1 dark:bg-white dark:text-gray-900 dark:border-black"
                min="1"
                max="12"
              />
              <input
                type="number"
                placeholder="DD"
                {...register("anticipated_day_7", {
                  required: "Day is required",
                  validate: validateDay,
                  min: { value: 1, message: "Day must be 1-31" },
                  max: { value: 31, message: "Day must be 1-31" },
                })}
                onInput={(e) => handleNumberInput(e, 31)}
                className="input input-bordered flex-1 dark:bg-white dark:text-gray-900 dark:border-black"
                min="1"
                max="31"
              />
              <input
                type="number"
                placeholder="YYYY"
                {...register("anticipated_year_7", {
                  required: "Year is required",
                  validate: validateYear,
                })}
                className="input input-bordered flex-1 dark:bg-white dark:text-gray-900 dark:border-black"
                min="1900"
                max="2100"
              />
            </div>
            {(errors.anticipated_month_7 ||
              errors.anticipated_day_7 ||
              errors.anticipated_year_7) && (
              <p className="text-error text-xs mt-1">
                {errors.anticipated_month_7?.message ||
                  errors.anticipated_day_7?.message ||
                  errors.anticipated_year_7?.message ||
                  "Please complete separation date"}
              </p>
            )}
          </div>
        </div>
      )}

      {/* === PRISONER OF WAR STATUS === */}
      <div className="space-y-6 pt-6 border-t border-gray-300">
        <h3 className="text-xl font-semibold text-primary dark:text-black">
          Prisoner of War Status
        </h3>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-sm md:text-base dark:text-black">
              HAVE YOU EVER BEEN A PRISONER OF WAR?
            </span>
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={prisonerOfWarValue === "Yes"}
                onChange={() => handlePrisonerOfWarChange("Yes")}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="label-text dark:text-black">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={prisonerOfWarValue === "No"}
                onChange={() => handlePrisonerOfWarChange("No")}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="label-text dark:text-black">No</span>
            </label>
          </div>
          {errors.prisoner_of_war_yes && (
            <p className="text-error text-xs mt-1">
              {errors.prisoner_of_war_yes.message}
            </p>
          )}
        </div>

        {/* === DATES OF CONFINEMENT === */}
        {isPrisonerOfWar && (
          <div className="space-y-4 animate-fade-in">
            <label className="label">
              <span className="label-text font-medium text-sm md:text-base dark:text-black">
                DATES OF CONFINEMENT
              </span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* From Date */}
              <div>
                <label className="label">
                  <span className="label-text text-sm dark:text-black">
                    From:
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="MM"
                    {...register("confinement_from_month_8", {
                      required: isPrisonerOfWar ? "Month required" : false,
                      validate: isPrisonerOfWar ? validateMonth : undefined,
                      min: { value: 1, message: "Month must be 1-12" },
                      max: { value: 12, message: "Month must be 1-12" },
                    })}
                    onInput={(e) => handleNumberInput(e, 12)}
                    className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    min="1"
                    max="12"
                  />
                  <input
                    type="number"
                    placeholder="DD"
                    {...register("confinement_from_day_8", {
                      required: isPrisonerOfWar ? "Day required" : false,
                      validate: isPrisonerOfWar ? validateDay : undefined,
                      min: { value: 1, message: "Day must be 1-31" },
                      max: { value: 31, message: "Day must be 1-31" },
                    })}
                    onInput={(e) => handleNumberInput(e, 31)}
                    className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    min="1"
                    max="31"
                  />
                  <input
                    type="number"
                    placeholder="YYYY"
                    {...register("confinement_from_year_8", {
                      required: isPrisonerOfWar ? "Year required" : false,
                      validate: isPrisonerOfWar ? validateYear : undefined,
                    })}
                    className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    min="1900"
                    max="2100"
                  />
                </div>
              </div>

              {/* To Date */}
              <div>
                <label className="label">
                  <span className="label-text text-sm dark:text-black">
                    To:
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="MM"
                    {...register("confinement_to_month_9", {
                      required: isPrisonerOfWar ? "Month required" : false,
                      validate: isPrisonerOfWar ? validateMonth : undefined,
                      min: { value: 1, message: "Month must be 1-12" },
                      max: { value: 12, message: "Month must be 1-12" },
                    })}
                    onInput={(e) => handleNumberInput(e, 12)}
                    className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    min="1"
                    max="12"
                  />
                  <input
                    type="number"
                    placeholder="DD"
                    {...register("confinement_to_day_9", {
                      required: isPrisonerOfWar ? "Day required" : false,
                      validate: isPrisonerOfWar ? validateDay : undefined,
                      min: { value: 1, message: "Day must be 1-31" },
                      max: { value: 31, message: "Day must be 1-31" },
                    })}
                    onInput={(e) => handleNumberInput(e, 31)}
                    className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    min="1"
                    max="31"
                  />
                  <input
                    type="number"
                    placeholder="YYYY"
                    {...register("confinement_to_year_9", {
                      required: isPrisonerOfWar ? "Year required" : false,
                      validate: isPrisonerOfWar ? validateYear : undefined,
                    })}
                    className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-black"
                    min="1"
                    max="2100"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* === ARE YOU CURRENTLY HOMELESS? === */}
      <div className="form-control w-full pt-6 border-t border-gray-300">
        <label className="label">
          <span className="label-text font-medium text-lg pb-1 text-primary dark:text-black">
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
          <h3 className="text-xl font-semibold text-primary dark:text-black">
            Current Living Situation
          </h3>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text pb-1 font-medium text-sm md:text-base dark:text-black">
                Check the answer that most closely aligns to your living
                situation:
              </span>
            </label>
            <select
              {...register("livingSituation", {
                required: showLivingSection
                  ? "Please select your living situation"
                  : false,
              })}
              className="select select-bordered w-full uppercase dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select an option</option>
              <option value="your_living-situation_shelter">
                Living In A Homeless Shelter
              </option>
              <option value="your_living-situation_not-sheltered">
                Not Currently In A Sheltered Environment (e.g., car, tent)
              </option>
              <option value="your_living-situation_another-person">
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

            {showLivingOther && (
              <div className="mt-4 animate-fade-in">
                <label className="label">
                  <span className="label-text pb-1 font-medium text-sm md:text-base dark:text-black">
                    Provide Details About Your Living Situation
                  </span>
                </label>
                <textarea
                  rows={5}
                  {...register("livingSituationDetails", {
                    required: showLivingOther
                      ? "Please provide details about your living situation"
                      : false,
                  })}
                  className="textarea textarea-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black placeholder:text-gray-400"
                  placeholder="Describe your situation..."
                />
                {errors.livingSituationDetails && (
                  <p className="text-error text-xs mt-1">
                    {errors.livingSituationDetails.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* === AT RISK OF HOMELESSNESS === */}
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

          {showRiskSection && (
            <div className="animate-fade-in">
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
