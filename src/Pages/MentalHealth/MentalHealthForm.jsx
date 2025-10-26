import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { Play, Pause } from "lucide-react";
import mentalLogo from "../../assets/mental_health_logo.png";
import mental_health_audio from "../../henas_voice/Mental_Health_henna.mp3";
import audioWave from "../../../public/Voice.json";

export default function MentalHealthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioError, setAudioError] = useState(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        setAudioError(
          "Audio playback was blocked. Click the play button to start."
        );
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setAudioError("Failed to play audio. Please try again.");
        });
      }
      setIsPlaying(!isPlaying);
      setAudioError(null);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("mental_health_info", JSON.stringify(data));
    navigate("/mental_health_survey");
  };

  return (
    <div className="md:min-h-screen min-h-[85vh] p-2 md:p-6 md:pt-32 pt-16 dark:bg-white">
      <div className="max-w-4xl mx-auto">
        <audio ref={audioRef} src={mental_health_audio} loop />

        {/* Header with Icon */}
        <div className="bg-[#002B5C] w-full rounded-lg p-6 mb-6 flex flex-col items-center mt-20 md:pt-0">
          <div className="w-52 h-52 bg-purple-600 rounded-full flex items-center justify-center mb-3">
            <img
              src={mentalLogo}
              alt="Mental Health Logo"
              className="w-32 h-32 object-cover"
            />
          </div>
          <h1 className="text-white text-2xl font-medium mt-2">
            Mental Health
          </h1>
        </div>

        {/* Play/Pause Button */}
        <div className="flex justify-end mb-6">
          <button
            type="button"
            onClick={toggleAudio}
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
            className="flex items-center gap-2  py-2  text-white rounded-lg  transition-colors"
          >
            {isPlaying ? (
              <>
                <Lottie
                  animationData={audioWave}
                  loop
                  autoplay
                  className="w-20 h-14"
                />
                <div className="bg-gray-200 p-2 shadow-md border border-gray-400 rounded-full">
                  <Pause size={16} className="text-gray-900" />
                </div>
              </>
            ) : (
              <>
                <div className="bg-gray-200 p-2 shadow-md border border-gray-400 rounded-full">
                  <Play size={14} className="text-gray-900" />
                </div>
              </>
            )}
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-1 md:px-0"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What Was Your Job/Role In The Service?
            </label>
            <input
              type="text"
              placeholder="Enter role/job"
              {...register("mental_jobRole", {
                // Fixed typo
                required: "This field is required",
              })}
              className="w-full p-2 border border-gray-300 uppercase rounded-md dark:bg-white dark:border-black dark:text-black text-sm"
            />
            {errors.mental_jobRole && (
              <p className="text-red-600 text-sm mt-1">
                {errors.mental_jobRole.message}
              </p>
            )}
          </div>

          {/* Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How Many Hours Did You Typically Work?
            </label>
            <input
              type="number"
              placeholder="work period (hour)"
              {...register("mental_hours", {
                // Fixed typo
                required: "This field is required",
              })}
              className="w-full p-2 border uppercase border-gray-300 rounded-md dark:bg-white dark:border-black dark:text-black text-sm"
            />
            {errors.mental_hours && (
              <p className="text-red-600 text-sm mt-1">
                {errors.mental_hours.message}
              </p>
            )}
          </div>

          {/* Stress Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What Was Your Stress Level Like During Service?
            </label>
            <input
              type="text"
              placeholder="Stress Level"
              {...register("mental_stressLevel", {
                // Fixed typo and naming
                required: "This field is required",
              })}
              className="w-full p-2 border border-gray-300 uppercase dark:bg-white dark:border-black dark:text-black rounded-md text-sm"
            />
            {errors.mental_stressLevel && (
              <p className="text-red-600 text-sm mt-1">
                {errors.mental_stressLevel.message}
              </p>
            )}
          </div>

          {/* Roles and Duties */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Describe Your Roles And Duties
            </label>
            <textarea
              {...register("mental_rolesAndDuties", {
                // Fixed typo
                required: "This field is required",
              })}
              rows={4}
              placeholder="Please provide as much detail as possible..."
              className="w-full p-2 border border-gray-300 uppercase dark:bg-white dark:border-black dark:text-black rounded-md text-sm"
            />
            {errors.mental_rolesAndDuties && (
              <p className="text-red-600 text-sm mt-1">
                {errors.mental_rolesAndDuties.message}
              </p>
            )}
          </div>

          <div className="flex justify-center gap-4 mt-6 pb-5 md:pb-0">
            <Link
              to="#"
              className="bg-white text-blue-800 px-6 py-2 border border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[150px] md:w-[200px] text-center font-semibold"
              onClick={() => window.history.back()}
            >
              Back
            </Link>

            <button
              type="submit"
              className="bg-[#B31942] text-white px-6 py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-red-500 w-[150px] md:w-[200px] font-semibold"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
