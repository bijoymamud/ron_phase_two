import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useCheckPTSD() {
  const navigate = useNavigate();

  useEffect(() => {
    const issuesString = localStorage.getItem("issues");

    if (!issuesString) {
      navigate("/gulf_war_location", { replace: true });
      return;
    }

    const issues = JSON.parse(issuesString);
    // Example: { current_disabilityiesrow1: "PTSD" }

    const hasPTSD = Object.values(issues).some((item) => item === "PTSD");

    if (!hasPTSD) {
      navigate("/gulf_war_location", { replace: true });
    }

    // If PTSD exists → stay here
  }, [navigate]);
}
