import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function GreatConfirmation() {
  const categorizedConditions = useSelector(
    (state) => state.issueSlice.selectedCategories
  );
  const navigate = useNavigate();
  console.log(categorizedConditions);

  const handleNavigate = () => {
    if (categorizedConditions.length == 0) {
      console.log("no parent category");
      return;
    }

    const firstCategory = categorizedConditions[0];

    switch (firstCategory) {
      case "Mental Health":
        navigate("/mental_health_info");
        break;
      case "Body Health":
        navigate("/service_details");
        break;
      case "Migraine & Headache Claim Information":
        navigate("/migraine");
        break;
      case "Sinusitis, Rhinitis & Asthma Claim Information":
        navigate("/sinusitis_form");
        break;
      case "Gastrointestinal Issues (GERD/IBS) Claim Information":
        navigate("/gastrointestinal_form");
        break;
      case "Tinnitus and Hearing Loss Claim Information":
        navigate("/tinnitus_hearing_loss");
        break;
      default:
        navigate("/others");
    }
  };

  return (
    <div className="md:min-h-screen min-h-[85vh] md:py-0 bg-white flex justify-center items-center p-4 md:mt-14">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-[#B31942] mb-6 pt-20 md:pt-0">
          GREAT!
        </h1>
        <p className="text-blue-800 md:text-lg text-md mb-8">
          Now we need some additional information on these conditions. In the
          next step, please provide as much detail as you can recall for each
          condition. This will help make your claim stronger and add verifiable
          evidence
        </p>
        <button>
          <button
            // to="/mental_health_info"
            onClick={handleNavigate}
            className="bg-[#0A3161] text-white uppercase py-3 px-20 rounded-md hover:bg-[#104381] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold"
          >
            Save & Proceed
          </button>
        </button>
      </div>
    </div>
  );
}

export default GreatConfirmation;
