

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isLastStep,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 md:px-4">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="w-full sm:w-[180px] md:w-[180px] md:bg-[#B31942] hover:bg-[#a52648] bg-[#152A45] text-white py-2 px-4 rounded-md font-semibold flex items-center justify-center gap-2 text-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} />
        <span className="text-sm sm:text-base uppercase">Back</span>
      </button>

      {isLastStep ? (
        <button
          type="submit"
          onClick={onSubmit}
          className="w-full sm:w-[150px] md:w-[180px] bg-[#B31942] hover:bg-[#a52648] text-white py-2 px-4 rounded-md font-semibold flex items-center justify-center gap-2 text-center"
        >
          <span className="text-sm sm:text-base">Submit</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-[150px] md:w-[180px] bg-[#B31942] hover:bg-[#a52648] text-white py-2 px-4 rounded-md font-semibold flex items-center justify-center gap-2 text-center"
        >
          <span className="text-sm sm:text-base uppercase">Continue</span>
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
