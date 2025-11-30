// import { useState, useEffect, useRef } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import Step1PersonalInfo from "./Steps/Step1PersonalInfo";
// import Step2PhoneNumbers from "./Steps/Step2PhoneNumbers";
// import Step3DateOfBirth from "./Steps/Step3DateOfBirth";
// import Step4ServiceDates from "./Steps/Step4ServiceDates";
// import Step5Address from "./Steps/Step5Address";
// import Step6MilitaryService from "./Steps/Step6MilitaryService";
// import Step7CurrentStatus from "./Steps/Step7CurrentStatus";
// import ProgressBar from "./Steps/ProgressBar";
// import FormNavigation from "./Steps/FormNavigation";

// import Veterans_info_voice from "../../../src/cris_voice/Personal_Information_chris.mp3";
// import Veterans_contact_voice from "../../../src/cris_voice/Contact_Numbers_chris.mp3";
// import Veterans_dob_voice from "../../../src/cris_voice/Date_of_Birth_chris.mp3";
// import Veterans_service_voice from "../../../src/cris_voice/Service_Dates_chris.mp3";
// import Veterans_address_voice from "../../../src/cris_voice/Address_Information_chris.mp3";
// import Veterans_military_service_voice from "../../../src/cris_voice/Military_Service_Details_chris.mp3";
// import Veterans_current_status_voice from "../../../src/cris_voice/Current_Status_chris.mp3";
// import { Pause, Play } from "lucide-react";
// import audioWave from "../../../public/Voice.json";
// import Lottie from "lottie-react";
// import Step8AdditionalInfo from "./Steps/Step8AdditionalInfo";

// const STORAGE_KEY = "veteranFormData";

// export default function VeteranInformationForm() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);
//   const navigate = useNavigate();
//   const totalSteps = 8;

//   const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");

//   const methods = useForm({
//     defaultValues: persisted,
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     trigger,
//     setValue,
//     watch,
//   } = methods;

//   const formValues = watch();

//   useEffect(() => {
//     console.log("Current form values:", formValues);

//     const keyValueBackendDataLocalStorage = {
//       ...formValues,
//       currentlyHomeless: formValues.currentlyHomeless ? "Yes" : "",
//       branchOfService: formValues.branchOfService ? "Yes" : "",
//       serviceUnder: formValues.serviceUnder ? "Yes" : "",
//       servedInNationalGuardOrReserves:
//         formValues.servedInNationalGuardOrReserves ? "Yes" : "",
//       servedInCombatZoneSince911: formValues.servedInCombatZoneSince911
//         ? "Yes"
//         : "",
//       currentlyActivatedFederalOrders:
//         formValues.currentlyActivatedFederalOrders ? "Yes" : "",
//       livingSituation: formValues.livingSituation ? "Yes" : "",
//       riskSituation: formValues.riskSituation ? "Yes" : "",
//       specialSkills: formValues.specialSkills ? "Yes" : "",
//       educationLevel: formValues.educationLevel ? "Yes" : "",
//     };

//     console.log(
//       "Transformed data for localStorage:",
//       keyValueBackendDataLocalStorage
//     );

//     const timeout = setTimeout(() => {
//       localStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify(keyValueBackendDataLocalStorage)
//       );
//     }, 300);
//     return () => clearTimeout(timeout);
//   }, [formValues]);

//   const audioFiles = [
//     Veterans_info_voice,
//     Veterans_contact_voice,
//     Veterans_dob_voice,
//     Veterans_service_voice,
//     Veterans_address_voice,
//     Veterans_military_service_voice,
//     Veterans_current_status_voice,
//   ];

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
//     audioRef.current = new Audio(audioFiles[currentStep]);

//     audioRef.current.addEventListener("play", () => setIsPlaying(true));
//     audioRef.current.addEventListener("pause", () => setIsPlaying(false));
//     audioRef.current.addEventListener("ended", () => setIsPlaying(false));

//     audioRef.current.play().catch((e) => {
//       console.error("Audio playback failed:", e);
//       setIsPlaying(false);
//     });

//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//         audioRef.current = null;
//       }
//     };
//   }, [currentStep]);

//   const toggleAudio = () => {
//     if (!audioRef.current) return;
//     isPlaying
//       ? audioRef.current.pause()
//       : audioRef.current.play().catch(() => {});
//   };

//   const getFieldsForStep = (step) => {
//     switch (step) {
//       case 0:
//         return [
//           "veteran_service_member_first_fname",
//           "veteran_service_member_last_lname",
//         ];
//       case 1:
//         return [
//           "veterans_international_phone",
//           "veterans_telephone_area_code",
//           "veterans_telephone_operator_code",
//           "veterans_telephone_line_number",
//         ];
//       case 2:
//         return ["veterans_dob_month", "veterans_dob_day", "veterans_dob_year"];
//       case 3:
//         return [
//           "most_recent_active_service_month_3",
//           "most_recent_active_service_day_3",
//           "most_recent_active_service_year_3",
//         ];
//       case 4:
//         return [
//           "veterans_mailing_address",
//           "veterans_city",
//           "veterans_state",
//           "veterans_zip_code",
//         ];
//       case 5:
//         return ["branchOfService"];
//       case 6:
//         return ["activeDutyOrders", "vaDirectDeposit"];
//       case 7:
//         return [
//           "specialSkills",
//           "educationLevel",
//           "emergencyContactName",
//           "emergencyContactPhone",
//           "emergencyContactRelationship",
//         ];
//       default:
//         return [];
//     }
//   };

//   const handleNext = async () => {
//     const fields = getFieldsForStep(currentStep);
//     const ok = await trigger(fields);
//     if (ok && currentStep < totalSteps - 1) {
//       setCurrentStep((p) => p + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) setCurrentStep((p) => p - 1);
//   };

//   const onSubmit = (data) => {
//     console.log("Submitted data →", data);
//     navigate("/issues");
//   };

//   const renderStep = () => {
//     const props = { register, errors, setValue, watch };
//     switch (currentStep) {
//       case 0:
//         return <Step1PersonalInfo {...props} />;
//       case 1:
//         return <Step2PhoneNumbers {...props} trigger={trigger} />;
//       case 2:
//         return <Step3DateOfBirth {...props} />;
//       case 3:
//         return <Step4ServiceDates {...props} />;
//       case 4:
//         return <Step5Address {...props} />;
//       case 5:
//         return <Step6MilitaryService {...props} />;
//       case 6:
//         return <Step7CurrentStatus {...props} />;
//       case 7:
//         return <Step8AdditionalInfo {...props} />;
//       default:
//         return null;
//     }
//   };

//   const stepTitles = [
//     "Personal Information",
//     "Contact Numbers",
//     "Date of Birth",
//     "Service Dates",
//     "Address Information",
//     "Military Service Details",
//     "Current Status",
//     "Additional Information",
//   ];

//   return (
//     <div className="md:min-h-screen my-16 md:py-10 bg-white flex justify-center items-center md:p-4">
//       <div className="md:card w-full md:max-w-4xl bg-white md:shadow-md">
//         <div className="md:card-body p-3 md:p-5">
//           <h1 className="card-title text-2xl font-bold text-blue-800 justify-center md:mb-4 mb-10">
//             Veteran Information
//           </h1>

//           <FormProvider {...methods}>
//             <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

//             <div className="mb-4 flex justify-between items-center">
//               <h2 className="text-lg font-semibold text-gray-700">
//                 {stepTitles[currentStep]}
//               </h2>

//               <button
//                 type="button"
//                 onClick={toggleAudio}
//                 className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors"
//               >
//                 {isPlaying ? (
//                   <>
//                     <Lottie
//                       animationData={audioWave}
//                       loop
//                       autoplay
//                       className="w-20 h-14"
//                     />
//                     <div className="bg-gray-200 p-2 shadow-md border border-gray-400 rounded-full">
//                       <Pause size={16} className="text-gray-900" />
//                     </div>
//                   </>
//                 ) : (
//                   <div className="bg-gray-200 p-2 shadow-md border border-gray-400 rounded-full">
//                     <Play size={14} className="text-gray-900" />
//                   </div>
//                 )}
//               </button>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               {renderStep()}

//               <FormNavigation
//                 currentStep={currentStep}
//                 onPrevious={handlePrevious}
//                 onNext={handleNext}
//                 onSubmit={handleSubmit(onSubmit)}
//                 isLastStep={currentStep === totalSteps - 1}
//               />
//             </form>
//           </FormProvider>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Step1PersonalInfo from "./Steps/Step1PersonalInfo";
import Step2PhoneNumbers from "./Steps/Step2PhoneNumbers";
import Step3DateOfBirth from "./Steps/Step3DateOfBirth";
import Step4ServiceDates from "./Steps/Step4ServiceDates";
import Step5Address from "./Steps/Step5Address";
import Step6MilitaryService from "./Steps/Step6MilitaryService";
import Step7CurrentStatus from "./Steps/Step7CurrentStatus";
import ProgressBar from "./Steps/ProgressBar";
import FormNavigation from "./Steps/FormNavigation";

import Veterans_info_voice from "../../../src/cris_voice/Personal_Information_chris.mp3";
import Veterans_contact_voice from "../../../src/cris_voice/Contact_Numbers_chris.mp3";
import Veterans_dob_voice from "../../../src/cris_voice/Date_of_Birth_chris.mp3";
import Veterans_service_voice from "../../../src/cris_voice/Service_Dates_chris.mp3";
import Veterans_address_voice from "../../../src/cris_voice/Address_Information_chris.mp3";
import Veterans_military_service_voice from "../../../src/cris_voice/Military_Service_Details_chris.mp3";
import Veterans_current_status_voice from "../../../src/cris_voice/Current_Status_chris.mp3";
import { Pause, Play } from "lucide-react";
import audioWave from "../../../public/Voice.json";
import Lottie from "lottie-react";

const STORAGE_KEY = "veteranFormData";

export default function VeteranInformationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const totalSteps = 7;

  const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");

  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = methods;

  const formValues = watch();

  useEffect(() => {
    console.log(formValues);
    const keyValueBackendDataLcoalStorage = {
      ...formValues,
      [formValues.currentlyHomeless]: formValues.currentlyHomeless ? "Yes" : "",
      [formValues.branchOfService]: formValues.branchOfService ? "Yes" : "",
      [formValues.serviceUnder]: formValues.serviceUnder ? "Yes" : "",
      [formValues.servedInNationalGuardOrReserves]:
        formValues.servedInNationalGuardOrReserves ? "Yes" : "",
      [formValues.servedInCombatZoneSince911]:
        formValues.servedInCombatZoneSince911 ? "Yes" : "",
      [formValues.currentlyActivatedFederalOrders]:
        formValues.currentlyActivatedFederalOrders ? "Yes" : "",
      [formValues.livingSituation]: formValues.livingSituation ? "Yes" : "",
      [formValues.componentType]: formValues.componentType ? "Yes" : "",
    };

    console.log(keyValueBackendDataLcoalStorage);
    const timeout = setTimeout(() => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(keyValueBackendDataLcoalStorage)
      );
    }, 300);
    return () => clearTimeout(timeout);
  }, [formValues]);

  const audioFiles = [
    Veterans_info_voice,
    Veterans_contact_voice,
    Veterans_dob_voice,
    Veterans_service_voice,
    Veterans_address_voice,
    Veterans_military_service_voice,
    Veterans_current_status_voice,
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current = new Audio(audioFiles[currentStep]);

    audioRef.current.addEventListener("play", () => setIsPlaying(true));
    audioRef.current.addEventListener("pause", () => setIsPlaying(false));
    audioRef.current.addEventListener("ended", () => setIsPlaying(false));

    audioRef.current.play().catch((e) => {
      console.error("Audio playback failed:", e);
      setIsPlaying(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [currentStep]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    isPlaying
      ? audioRef.current.pause()
      : audioRef.current.play().catch(() => {});
  };

  const getFieldsForStep = (step) => {
    switch (step) {
      case 0:
        return [
          "veteran_service_member_first_fname",
          "veteran_service_member_middle_mname",
          "veteran_service_member_last_l`name",
        ];
      case 1:
        return [
          "veterans_international_phone",
          "veterans_telephone_area_code",
          "veterans_telephone_operator_code",
          "veterans_telephone_line_number",
        ];
      case 2:
        return ["DOB_Month[0]", "DOB_Day[0]", "DOB_Year[0]"];
      case 3:
        return [
          "Beginning_Date_Month[0]",
          "Beginning_Date_Day[0]",
          "Beginning_Date_Year[0]",
        ];
      case 4:
        return [
          "veterans_mailing_address",
          "veterans_city",
          "MailingAddress_StateOrProvince[0]",
          "MailingAddress_ZIPOrPostalCode_FirstFiveNumbers[0]",
        ];
      case 5:
        return ["branchOfService", "nationalGuardReserves"];
      case 6:
        return ["activeDutyOrders", "vaDirectDeposit"];
      default:
        return [];
    }
  };

  const handleNext = async () => {
    const ok = await trigger(getFieldsForStep(currentStep));
    if (ok && currentStep < totalSteps - 1) setCurrentStep((p) => p + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  const onSubmit = (data) => {
    console.log("Submitted data →", data);

    navigate("/issues");
  };

  const renderStep = () => {
    const props = { register, errors, setValue, watch };
    switch (currentStep) {
      case 0:
        return <Step1PersonalInfo {...props} />;
      case 1:
        return <Step2PhoneNumbers {...props} trigger={trigger} />;
      case 2:
        return <Step3DateOfBirth {...props} />;
      case 3:
        return <Step4ServiceDates {...props} />;
      case 4:
        return <Step5Address {...props} />;
      case 5:
        return <Step6MilitaryService {...props} />;
      case 6:
        return <Step7CurrentStatus {...props} />;
      default:
        return null;
    }
  };

  const stepTitles = [
    "Personal Information",
    "Contact Numbers",
    "Date of Birth",
    "Service Dates",
    "Address Information",
    "Military Service Details",
    "Current Status",
  ];

  return (
    <div className="md:min-h-screen my-16 md:py-10 bg-white flex justify-center items-center md:p-4">
      <div className="md:card w-full md:max-w-4xl bg-white md:shadow-md">
        <div className="md:card-body p-3 md:p-5">
          <h1 className="card-title text-2xl font-bold text-blue-800 justify-center md:mb-4 mb-10">
            Veteran Information
          </h1>

          <FormProvider {...methods}>
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">
                {stepTitles[currentStep]}
              </h2>

              <button
                type="button"
                onClick={toggleAudio}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors"
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
                  <div className="bg-gray-200 p-2 shadow-md border border-gray-400 rounded-full">
                    <Play size={14} className="text-gray-900" />
                  </div>
                )}
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {renderStep()}

              <FormNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit(onSubmit)}
                isLastStep={currentStep === totalSteps - 1}
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
