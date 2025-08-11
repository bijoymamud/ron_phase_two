import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCategoryByIssue,
  removeCategoryIfNoIssuesLeft,
} from "../../redux/slice/issueSlice";

function Issues() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      CURRENTDISABILITY: [],
    },
  });
  const [submittedData, setSubmittedData] = React.useState(null);
  const navigate = useNavigate();

  // Category-wise Conditions
  const categories = {
    "Mental Health": ["PTSD", "Depression", "Anxiety", "Insomnia"],
    "Body Health": [
      "Neck Condition",
      "Hip Condition",
      "Shoulder Condition",
      "Elbow Condition",
      "Head Injury",
      "Wrist Condition",
      "Nerve Damage",
      "Mid Back Condition",
      "Knee Condition",
      "Foot Condition",
      "Low Back Condition",
      "Leg Condition",
      "Flat Feet",
      "Arm Condition",
      "High Blood Pressure",
      "Plantar Fasciitis",
      "Ankle Condition",
      "Hammer Toes",
      "Ingrown Toenails",
      "Radiculopathy of Upper Extremities",
      "Sciatica",
    ],
    "Migraine & Headache Claim Information": ["Prostrating Migraines"],
    "Sinusitis, Rhinitis & Asthma Claim Information": ["Rhinitis", "Sinusitis"],
    "Gastrointestinal Issues (GERD/IBS) Claim Information": [
      "GERD (Acid Reflux)",
      "IBS (Irritable Bowel Syndrome)",
    ],
    "Tinnitus and Hearing Loss Claim Information": ["Tinnitus"],
    "Cancer Related": ["Cancer"],
    "Diabetes Related": ["Diabetes"],
    "Traumatic Brain Injury Related": ["Traumatic Brain Injury"],
  };

  const dispatch = useDispatch();

  // Flat list for checkbox rendering
  const conditionsList = Object.values(categories).flat();

  const getCategoryForCondition = (condition) => {
    for (const [category, conditions] of Object.entries(categories)) {
      if (conditions.includes(condition)) {
        return category;
      }
    }
    return "Other";
  };

  const onSubmit = (data) => {
    if (data.CURRENTDISABILITY.length === 0) {
      alert("Please select at least one condition.");
      return;
    }

    localStorage.setItem("issues", JSON.stringify(data));

    const categorizedConditions = {};
    data.CURRENTDISABILITY.forEach((condition) => {
      const category = getCategoryForCondition(condition);
      if (!categorizedConditions[category]) {
        categorizedConditions[category] = [];
      }
      categorizedConditions[category].push(condition);
    });

    console.log("Selected with categories:", categorizedConditions);
    setSubmittedData(categorizedConditions);

    navigate("/issue_details", { state: { categorizedConditions } });
  };

  return (
    <div className="md:py-28 md:mt-10 mt-0  min-h-[85vh] py-10 dark:bg-white  flex justify-center items-center md:p-4">
      <div className="w-full max-w-3xl bg-white md:shadow-md rounded-lg md:p-6 p-3">
        <h1 className="text-xl md:text-2xl font-bold text-blue-900 mb-2">
          What condition(s) do you want to start a claim for?
        </h1>
        <p className="md:text-sm text-gray-600 mb-6 text-[14px]">
          You can choose multiple conditions. We recommend starting with mental
          health conditions first. We'll guide you step-by-step.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:mb-0 mb-5">
            {conditionsList.map((condition, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  value={condition}
                  {...register("CURRENTDISABILITY", {
                    onChange: (e) => {
                      const { value, checked } = e.target;

                      if (checked) {
                        dispatch(addCategoryByIssue(value));
                      } else {
                        const selected = getValues("CURRENTDISABILITY").filter(
                          (item) => item !== value
                        );

                        dispatch(
                          removeCategoryIfNoIssuesLeft({
                            uncheckedIssue: value,
                            stillCheckedIssues: selected,
                          })
                        );
                      }
                    },
                  })}
                  className="checkbox checkbox-primary mr-2"
                />

                <label className="text-sm text-gray-700">{condition}</label>
              </div>
            ))}
          </div>

          {errors.CURRENTDISABILITY && (
            <span className="text-red-500 text-sm">
              {errors.CURRENTDISABILITY.message ||
                "Please select at least one condition."}
            </span>
          )}

          <button
            type="submit"
            className="w-full bg-[#B31942] text-white uppercase py-2 px-4 rounded-md hover:bg-[#aa2b4d] font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 basis-6/12"
          >
            Continue
          </button>
        </form>

        {submittedData && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-bold text-blue-900 mb-4">
              Submitted Categories:
            </h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Issues;
