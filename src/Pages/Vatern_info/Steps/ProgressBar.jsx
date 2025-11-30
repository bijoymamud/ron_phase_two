import { useEffect, useState } from "react";

export default function ProgressBar({ currentStep, totalSteps }) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedWidth(progressPercentage), 100);
    return () => clearTimeout(timeout);
  }, [progressPercentage]);

  return (
    <div
      className="space-y-2 mb-6"
      role="progressbar"
      aria-valuenow={Math.round(progressPercentage)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progress"
    >
      <div className="flex justify-between text-sm text-gray-700 font-medium">
        <span>
          Step <span className="font-semibold">{currentStep + 1}</span> of{" "}
          <span className="font-semibold">{totalSteps}</span>
        </span>
        <span>{Math.round(progressPercentage)}% Complete</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden relative">
        <div
          className="h-4 rounded-full transition-[width] duration-700 ease-in-out shadow-md"
          style={{
            width: `${animatedWidth}%`,
            background: `linear-gradient(90deg, #002b5c, #B31942)`,
            backgroundSize: "200% 100%",
            animation: "gradientShift 3s ease infinite",
          }}
        ></div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}

// import { useEffect, useState } from "react";

// export default function ProgressBar({ currentStep, totalSteps }) {
//   const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
//   const [animatedWidth, setAnimatedWidth] = useState(0);

//   useEffect(() => {
//     const timeout = setTimeout(() => setAnimatedWidth(progressPercentage), 100);
//     return () => clearTimeout(timeout);
//   }, [progressPercentage]);

//   return (
//     <div
//       className="space-y-2 mb-6"
//       role="progressbar"
//       aria-valuenow={Math.round(progressPercentage)}
//       aria-valuemin={0}
//       aria-valuemax={100}
//       aria-label="Progress"
//     >
//       <div className="flex justify-between text-sm text-gray-700 font-medium">
//         <span>
//           Step <span className="font-semibold">{currentStep + 1}</span> of{" "}
//           <span className="font-semibold">{totalSteps}</span>
//         </span>
//         <span>{Math.round(progressPercentage)}% Complete</span>
//       </div>

//       <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden relative">
//         <div
//           className="h-4 rounded-full transition-[width] duration-700 ease-in-out shadow-md"
//           style={{
//             width: `${animatedWidth}%`,
//             background: `linear-gradient(90deg, #002b5c, #B31942)`,
//             backgroundSize: "200% 100%",
//             animation: "gradientShift 3s ease infinite",
//           }}
//         ></div>
//       </div>

//       <style>{`
//         @keyframes gradientShift {
//           0% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//           100% {
//             background-position: 0% 50%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
