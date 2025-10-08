// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Final_Sub() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     setIsSubmitting(true);

//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       toast.error("Authentication token missing. Please log in again.");
//       setIsSubmitting(false);
//       return;
//     }

//     const excludedKeys = ["access_token", "refresh_token"];

//     const payload = {};
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);

//       if (excludedKeys.includes(key)) continue;
//       try {
//         const value = JSON.parse(localStorage.getItem(key));
//         payload[key] = value;
//       } catch (err) {
//         payload[key] = localStorage.getItem(key);
//       }
//     }

//     payload.document = {
//       discharge_condition: payload["discharge_condition"] || {},
//       evidenceData: payload["evidenceData"] || {},
//     };

//     try {
//       const response = await fetch(
//         " http://10.10.13.73:2000/api/va/vaform/submit/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to submit data");
//       }

//       const result = await response.json();
//       console.log("✅ Data submitted successfully:", result);

//       toast.success("Form submitted successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//       });

//       navigate("/va_form");
//     } catch (error) {
//       console.error("❌ Submission error:", error);
//       toast.error(`Failed to submit: ${error.message || "Please try again."}`, {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="md:min-h-screen min-h-[85vh] bg-white flex justify-center items-center p-4 mt-14">
//       <div className="w-full max-w-2xl text-center">
//         <h1 className="text-5xl font-bold text-[#B31942] mb-6">GREAT!</h1>
//         <p className="text-blue-800 md:text-lg text-md mb-8">
//           We are done. Want to submit the form?
//         </p>

//         <button
//           onClick={handleSubmit}
//           className={`bg-[#0A3161] text-white uppercase py-3 px-20 rounded-md hover:bg-[#104381] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold ${
//             isSubmitting ? "cursor-not-allowed" : ""
//           }`}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             <span className="loading loading-bars loading-lg"></span>
//           ) : (
//             "Submit"
//           )}
//         </button>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Final_Sub;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Final_Sub() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Authentication token missing. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    const excludedKeys = ["access_token", "refresh_token"];

    const payload = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (excludedKeys.includes(key)) continue;

      try {
        const value = JSON.parse(localStorage.getItem(key));
        payload[key] = value;
      } catch (err) {
        payload[key] = localStorage.getItem(key);
      }
    }

    payload.document = {
      discharge_condition: payload["discharge_condition"] || {},
      evidenceData: payload["evidenceData"] || {},
    };

    try {
      const response = await fetch(
        "http://10.10.13.73:2000/api/va/vaform/submit/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit data");
      }

      const result = await response.json();
      console.log("✅ Data submitted successfully:", result);

      toast.success("Form submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      const keysToKeep = [
        "access_token",
        "chatUser",
        "isAdmin",
        "refresh_token",
        "user_role",
      ];
      Object.keys(localStorage).forEach((key) => {
        if (!keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      });

      navigate("/va_form");
    } catch (error) {
      console.error("❌ Submission error:", error);
      toast.error(`Failed to submit: ${error.message || "Please try again."}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="md:min-h-screen min-h-[85vh] bg-white flex justify-center items-center p-4 mt-14">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-[#B31942] mb-6">GREAT!</h1>
        <p className="text-blue-800 md:text-lg text-md mb-8">
          We are done. Want to submit the form?
        </p>

        <button
          onClick={handleSubmit}
          className={`bg-[#0A3161] text-white uppercase py-3 px-20 rounded-md hover:bg-[#104381] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold ${
            isSubmitting ? "cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-bars loading-lg"></span>
          ) : (
            "Submit"
          )}
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Final_Sub;
