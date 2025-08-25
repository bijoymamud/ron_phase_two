import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import narrationVoice from "../../../src/cris_voice/Have_You_Ever_Applied_for_VA_Benefits_chris.mp3";

const Auto_Narative = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [step, setStep] = useState("start");
  const navigate = useNavigate();

  const audioRef = useRef(new Audio(narrationVoice));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Auto-play failed:", error);
        setIsPlaying(false);
      });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const onSubmit = (data) => {
    const mappedData = {
      ...data,
      have_you_ever_field_a_claim_with_va: data.applied,
    };

    localStorage.setItem("va_claim_data", JSON.stringify(mappedData));
    console.log("\u{1F4BE} Saved Form Data:", mappedData);
    navigate("/video");
  };

  const applied = watch("applied");
  const hasLetter = watch("hasLetter");
  const hasIntent = watch("hasIntent");

  const goBack = () => {
    if (step === "yesFlowStart") setStep("start");
    else if (step === "letterDetails" || step === "ratingsDetails")
      setStep("yesFlowStart");
    else if (step === "noFlowStart") setStep("start");
    else if (step === "intentDetails") setStep("noFlowStart");
    else if (step === "startNow") setStep("noFlowStart");
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
        {/* Audio Controls */}

        {step === "start" && (
          <>
            <h2 className="text-xl font-semibold">
              Have you ever applied for VA benefits?
            </h2>
            <select
              {...register("applied")}
              onChange={(e) => {
                const value = e.target.value;

                localStorage.setItem(
                  "va_claim_data",
                  JSON.stringify({
                    have_you_ever_field_a_claim_with_va: value,
                  })
                );

                if (value === "yes") setStep("yesFlowStart");
                else if (value === "no") setStep("noFlowStart");
              }}
              className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
            >
              <option value="">Select</option>
              <option value="yes">YES</option>
              <option value="no">NO</option>
            </select>
          </>
        )}

        {step === "yesFlowStart" && (
          <>
            <h2 className="text-xl font-semibold">
              Do you have a decision letter within the past year?
            </h2>
            <select
              {...register("hasLetter")}
              onChange={(e) => {
                if (e.target.value === "yes") setStep("letterDetails");
                else if (e.target.value === "no") setStep("ratingsDetails");
              }}
              className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
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

        {step === "letterDetails" && (
          <>
            <h2 className="text-xl font-semibold">
              What is the date of that letter?
            </h2>
            <input
              type="date"
              {...register("letterDate", {
                required: "This field is required",
              })}
              className={`w-full p-2 uppercase border rounded dark:bg-white dark:border-black dark:text-black text-sm
              [&::-webkit-calendar-picker-indicator]:bg-transparent
              [&::-webkit-calendar-picker-indicator]:cursor-pointer
              [&::-webkit-calendar-picker-indicator]:opacity-100
              dark:[&::-webkit-calendar-picker-indicator]:invert
              ${errors.letterDate ? "border-red-500" : "border-gray-300"}`}
              id="letterDate"
            />

            <h2 className="text-xl font-semibold mt-4">
              What are the conditions listed in this recent letter and what were
              they rated at?
            </h2>
            <textarea
              {...register("conditionsListed")}
              className="w-full uppercase p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
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
              What are your current ratings and when were they rated? (Exact
              dates if possible)
            </h2>
            <textarea
              {...register("currentRatings")}
              className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black "
              rows="4"
            />

            <h2 className="text-xl font-semibold mt-4">
              What is the date of the letter?
            </h2>
            <input
              type="date"
              {...register("ratingsLetterDate")}
              className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
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

        {/* NO Flow */}
        {step === "noFlowStart" && (
          <>
            <h2 className="text-xl font-semibold">
              Do you have an active intent to file?
            </h2>
            <select
              {...register("hasIntent")}
              onChange={(e) => {
                if (e.target.value === "yes") setStep("intentDetails");
                else if (e.target.value === "no") setStep("startNow");
              }}
              className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
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
              className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
            />

            <h2 className="text-xl font-semibold mt-4">
              Did you submit anything else with your intent?
            </h2>
            <select
              {...register("submittedOthers")}
              className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
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
              className="w-full p-2 border rounded dark:bg-white dark:input-bordered dark:border-black dark:text-black"
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
