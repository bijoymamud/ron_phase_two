import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import narrationVoice from "../../../src/cris_voice/Have_You_Ever_Applied_for_VA_Benefits_chris.mp3";

const Auto_Narative = () => {
  const navigate = useNavigate();
  const audioRef = useRef(new Audio(narrationVoice));

  const getSavedData = () => {
    try {
      const data = localStorage.getItem("va_claim_data");
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  };

  const savedData = getSavedData();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: savedData,
  });

  const [step, setStep] = useState("start");

  const watchedValues = watch();

  useEffect(() => {
    const dataToSave = {
      ...savedData,
      ...watchedValues,
      have_you_ever_field_a_claim_with_va: watchedValues.applied,
    };
    localStorage.setItem("va_claim_data", JSON.stringify(dataToSave));
  }, [watchedValues, savedData]);

  useEffect(() => {
    if (savedData.applied === "yes") {
      if (savedData.hasLetter === "yes") setStep("letterDetails");
      else if (savedData.hasLetter === "no") setStep("ratingsDetails");
      else setStep("yesFlowStart");
    } else if (savedData.applied === "no") {
      if (savedData.hasIntent === "yes") setStep("intentDetails");
      else if (savedData.hasIntent === "no") setStep("startNow");
      else setStep("noFlowStart");
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const goBack = () => {
    if (step === "yesFlowStart" || step === "noFlowStart") setStep("start");
    else if (["letterDetails", "ratingsDetails"].includes(step))
      setStep("yesFlowStart");
    else if (step === "intentDetails" || step === "startNow")
      setStep("noFlowStart");
  };

  const onSubmit = () => {
    navigate("/video");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen text-white flex justify-center items-center p-2 md:p-6"
      style={{
        backgroundImage:
          'url("https://i.ibb.co/Y7Z6tdQk/Frame-1597884882-1.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white text-black md:p-6 p-2 rounded shadow-md w-full max-w-xl space-y-4 mt-20 md:mt-0">
        {/* START */}
        {step === "start" && (
          <>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="va_employee"
                {...register(
                  "if_you_are_currently_a_va_employee_check_the_box_includes_work_studyinternship"
                )}
                className="mt-1 w-4 h-4"
              />
              <label
                htmlFor="va_employee"
                className="text-sm md:text-base font-semibold leading-snug"
              >
                IF YOU ARE CURRENTLY A VA EMPLOYEE, CHECK THE BOX (INCLUDES WORK
                STUDY/INTERNSHIP)
                <br />
                (IF YOU ARE NOT A VA EMPLOYEE SKIP TO SECTION II, IF APPLICABLE)
              </label>
            </div>

            <h2 className="text-xl font-semibold">
              Have you ever applied for VA benefits?
            </h2>
            <select
              {...register("applied", { required: true })}
              onChange={(e) => {
                setStep(
                  e.target.value === "yes" ? "yesFlowStart" : "noFlowStart"
                );
              }}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select</option>
              <option value="yes">YES</option>
              <option value="no">NO</option>
            </select>
          </>
        )}

        {/* YES FLOW */}
        {step === "yesFlowStart" && (
          <>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">
                Have you ever filed a claim with VA?
              </h2>
              <select
                {...register("previous_claim", { required: "Required" })}
                className={`w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black ${
                  errors.previous_claim ? "border-red-500" : ""
                }`}
              >
                <option value="">Select</option>
                <option value="Yes">YES</option>
                <option value="No">NO</option>
              </select>
            </div>

            {watch("previous_claim") === "yes" && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">
                  Please enter your VA File Number
                </h2>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="e.g. 123456789"
                  {...register("va_file_number", {
                    pattern: {
                      value: /^\d{8,10}$/,
                      message: "Must be 8–10 digits",
                    },
                  })}
                  className={`w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black ${
                    errors.va_file_number ? "border-red-500" : ""
                  }`}
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                  }}
                />
                {errors.va_file_number && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.va_file_number.message}
                  </p>
                )}
              </div>
            )}

            <h2 className="text-xl font-semibold mt-8">
              Do you have a decision letter within the past year?
            </h2>
            <select
              {...register("hasLetter")}
              onChange={(e) => {
                setStep(
                  e.target.value === "yes" ? "letterDetails" : "ratingsDetails"
                );
              }}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select</option>
              <option value="yes">YES</option>
              <option value="no">NO</option>
            </select>

            <button
              type="button"
              onClick={goBack}
              className="mt-6 bg-gray-300 text-black px-4 py-2 rounded"
            >
              Back
            </button>
          </>
        )}

        {step === "letterDetails" && (
          <>
            <h2 className="text-xl font-semibold">
              What is the date of that letter?
            </h2>
            <input
              type="date"
              {...register("letterDate", { required: "Required" })}
              className={`w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black ${
                errors.letterDate ? "border-red-500" : ""
              }`}
            />

            <h2 className="text-xl font-semibold mt-4">
              What are the conditions listed in this recent letter and what were
              they rated at?
            </h2>
            <textarea
              {...register("conditionsListed")}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
              rows="4"
            />

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={goBack}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-[#B31942] text-white px-6 py-2 rounded"
              >
                NEXT
              </button>
            </div>
          </>
        )}

        {step === "ratingsDetails" && (
          <>
            <h2 className="text-xl font-semibold">
              What are your current ratings and when were they rated?
            </h2>
            <textarea
              {...register("currentRatings")}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
              rows="4"
            />

            <h2 className="text-xl font-semibold mt-4">
              What is the date of the letter?
            </h2>
            <input
              type="date"
              {...register("ratingsLetterDate")}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
            />

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={goBack}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-[#B31942] text-white px-6 py-2 rounded"
              >
                NEXT
              </button>
            </div>
          </>
        )}

        {/* NO FLOW */}
        {step === "noFlowStart" && (
          <>
            <h2 className="text-xl font-semibold">
              Do you have an active intent to file?
            </h2>
            <select
              {...register("hasIntent")}
              onChange={(e) => {
                setStep(
                  e.target.value === "yes" ? "intentDetails" : "startNow"
                );
              }}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select</option>
              <option value="yes">YES</option>
              <option value="no">NO</option>
            </select>

            <button
              type="button"
              onClick={goBack}
              className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
            >
              Back
            </button>
          </>
        )}

        {step === "intentDetails" && (
          <>
            <h2 className="text-xl font-semibold">
              What date was your intent to file submitted?
            </h2>
            <input
              type="date"
              {...register("intentDate")}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
            />

            <h2 className="text-xl font-semibold mt-4">
              Did you submit anything else with your intent?
            </h2>
            <select
              {...register("submittedOthers")}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
            >
              <option value="">Select</option>
              <option value="yes">YES</option>
              <option value="no">NO</option>
            </select>

            <h2 className="text-xl font-semibold mt-4">
              Please list any other items submitted:
            </h2>
            <textarea
              {...register("otherItemsListed")}
              className="w-full p-2 border rounded dark:bg-white dark:border-black dark:text-black"
              rows="4"
            />

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={goBack}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-[#B31942] text-white px-6 py-2 rounded"
              >
                NEXT
              </button>
            </div>
          </>
        )}

        {step === "startNow" && (
          <>
            <h2 className="text-xl font-semibold">
              Perfect! Let’s get started.
            </h2>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={goBack}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-[#B31942] text-white px-6 py-2 rounded"
              >
                NEXT
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default Auto_Narative;
