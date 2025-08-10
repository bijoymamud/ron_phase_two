import { useNavigate } from "react-router-dom";

const useCategoryNavigation = () => {
  const navigate = useNavigate();

  const navigateToNextCategory = (nextCategory) => {
    console.log(nextCategory);
    if (nextCategory === "Mental Health") {
      navigate("/mental_health_info");
    } else if (nextCategory === "Body Health") {
      navigate("/service_details");
    } else if (nextCategory === "Migraine & Headache Claim Information") {
      navigate("/migraine");
    } else if (
      nextCategory === "Sinusitis, Rhinitis & Asthma Claim Information"
    ) {
      navigate("/sinusitis_form");
    } else if (
      nextCategory === "Gastrointestinal Issues (GERD/IBS) Claim Information"
    ) {
      navigate("/gastrointestinal_form");
    } else if (nextCategory === "Tinnitus and Hearing Loss Claim Information") {
      navigate("/tinnitus_hearing_loss");
    } else {
      navigate("/ai_narrative");
    }
  };

  return { navigateToNextCategory };
};

export default useCategoryNavigation;
