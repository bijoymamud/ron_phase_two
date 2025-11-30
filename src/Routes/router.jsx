import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import Forgot_Password from "../Pages/Authentication/Forgot_Password";
import OTPVerification from "../Pages/Authentication/OTPVerification";
import ResetPassword from "../Pages/Authentication/ResetPassword";
import SuccessAuthentication from "../Pages/Authentication/SuccessAuthentication";
import Dd_214 from "../Pages/DD_214/Dd_214";
import Auto_Narative from "../Pages/Auto_Narative/Auto_Narative";
import Veteran_Information from "../Pages/Vatern_info/Veteran_Information";
import IssueDetailsForm from "../Pages/Selected_Issue/IssueDetailsFrom";
import GulfWarLocationsForm from "../Pages/War_location/GulfWarLocationsForm";
import AgentOrangeLocationsForm from "../Pages/AgentOrangeLocationsForm/AgentOrangeLocationsForm";
import ToxinExposureForm from "../Pages/ToxinExposureForm/ToxinExposureForm";
import GreatConfirmation from "../Pages/GreatConfirmation/GreatConfirmation";
import MentalHealthForm from "../Pages/MentalHealth/MentalHealthForm";
import MentalHealthSurvey from "../Pages/MentalHealth/MentalHealthSurvey";
import MentailHealthDetails from "../Pages/MentalHealth/MentailHealthDetails";
import DeathDetails from "../Pages/MentalHealth/DeathDetails";
import DisasterForm from "../Pages/MentalHealth/DisasterForm";
import AbuseAssaultDetails from "../Pages/MentalHealth/AbuseAssaultDetails";
import RiskDetails from "../Pages/MentalHealth/RiskDetails";
import MedicalPositionDetails from "../Pages/MentalHealth/MedicalPositionDetails";
import CrashAccidentDetails from "../Pages/MentalHealth/CrashAccidentDetails";
import MedicalTraumaDetails from "../Pages/MentalHealth/MedicalTraumaDetails";
import HazingDetails from "../Pages/MentalHealth/HazingDetails";
import AbuseOfPowerDetails from "../Pages/MentalHealth/AbuseOfPowerDetails";
import DangerousItemsDetails from "../Pages/MentalHealth/DangerousItemsDetails";
import FamilialIssuesDetails from "../Pages/MentalHealth/FamilialIssuesDetails";
import ConfirmMentalHealth from "../Pages/MentalHealth/ConfirmMentalHealth";
import MentalHealthSymptoms from "../Pages/MentalHealth/MentalHealthSymptoms";
import MentalHealthIndicators from "../Pages/MentalHealth/MentalHealthIndicators";
// import Issues from "../Pages/Selected_Issue/Issues";
import Migraine from "../Pages/BodyClaims/Migraine/Migraine";
import ServiceDetails from "../Pages/BodyClaims/Migraine/ServiceDetails";
import Shifts from "../Pages/BodyClaims/Migraine/Shifts";
import PhysicalTrainingDetails from "../Pages/BodyClaims/Migraine/PhysicalTrainingDetails";
import InjuriesDetails from "../Pages/BodyClaims/Migraine/InjuriesDetails";
import SickCallDetails from "../Pages/BodyClaims/Migraine/SickCallDetails";
import DischargeCondition from "../Pages/BodyClaims/Migraine/DischargeCondition";
import BodyHealthDetails from "../Pages/BodyClaims/Migraine/BodyHealthDetails";
import AiNarativeGen from "../Pages/BodyClaims/Migraine/AiNarativeGen";
import ProgressMessage from "../Pages/BodyClaims/Migraine/ProgressMessage";
import EvidenceForm from "../Pages/BodyClaims/Migraine/EvidenceForm";
import ESignature from "../Pages/BodyClaims/Migraine/ESignature";
import VAForm from "../Pages/FinalVAForm/VAForm";
import SinusitisForm from "../Pages/BodyClaims/SinusitisForm/SinusitisForm";
import GastrointestinalForm from "../Pages/BodyClaims/Gastrointestinal/GastrointestinalForm";
import TinnitusHearingLossForm from "../Pages/BodyClaims/TinnitusHearing/TinnitusHearingLossForm";
import OthersIssues from "../Pages/BodyClaims/OthersIssue";
import AdminLogin from "../Pages/AdminLogin/AdminLogin";
import Recovery from "../Pages/AdminLogin/Recovery";
import PasswordRecovery from "../Pages/AdminLogin/PasswordRecovery";

import Notification from "../Pages/AdminDashboard/Notification";
import PrivacyPolicy from "../Pages/AdminDashboard/PrivacyPolicy";
import TermsConditions from "../Pages/AdminDashboard/TermsConditions";
import Policy from "../Pages/PrivacyPolicy/Policy";
import Auto_Narative_Video from "../Pages/Auto_Narative/Auto_Narative_Video";
import VaSubcription from "../Pages/Auto_Narative/VaSubcription";
import Pricing_Plan from "../Pages/Home/Pricing_Plan";
import ContactForm from "../Pages/Home/ContactForm";
import Verify_OTP from "../Pages/AdminLogin/Verify_OTP";
import Payment_Success from "../Pages/PaymentStatus/Payment_Success";
import Payment_Error from "../Pages/PaymentStatus/Payment_Error";
import Final_Sub from "../Pages/FinalSubmissio/Final_Sub";
import UnauthorizedError from "../Pages/Private/UnauthorizedError";
import ProgressMessageForm from "../Pages/BodyClaims/Migraine/ProgressMessageForm";
import RouteSecure from "../hooks/RouteSecure";
import React, { Suspense } from "react";
import SuperAdminHome from "../Pages/AdminLogin/SuperAdminHome";
import AdminManagment from "../Pages/AdminDashboard/AdminManagment";
import PackageManagment from "../Pages/AdminDashboard/PackageManagment";
import Loading from "../Loading/Loading";
import ChatInterface from "../Pages/AdminDashboard/ChatInterface";

const Home = React.lazy(() => import("../Pages/Home/Home"));
const AboutUs = React.lazy(() => import("../Pages/AboutUs/AboutUs"));
const Calculator = React.lazy(() => import("../Pages/Calculator/Calculator"));
const Dashboard = React.lazy(() => import("../Pages/AdminDashboard/Dashboard"));
const Admin_home = React.lazy(
  () => import("../Pages/AdminDashboard/Admin_home")
);
const UserManagment = React.lazy(
  () => import("../Pages/AdminDashboard/UserManagment")
);
const FormView = React.lazy(() => import("../Pages/AdminDashboard/FormView"));
const Payment = React.lazy(() => import("../Pages/AdminDashboard/Payment"));
const Document = React.lazy(() => import("../Pages/AdminDashboard/Document"));
const LiveChat = React.lazy(() => import("../Pages/AdminDashboard/LiveChat"));
const Profile = React.lazy(() => import("../Pages/AdminDashboard/Profile"));
const Issues = React.lazy(() => import("../Pages/Selected_Issue/Issues"));
const PTSDDetails = React.lazy(
  () => import("../Pages/Selected_Issue/PTSDDetails/PTSDDetails")
);

const NoSubscription = React.lazy(
  () => import("../Pages/NoSubcription/NoSubscription")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/dd_214_info", element: <Dd_214 /> },
      { path: "/narrative", element: <Auto_Narative /> },
      { path: "/video", element: <Auto_Narative_Video /> },
      { path: "/subscription", element: <VaSubcription /> },
      { path: "/plan", element: <Pricing_Plan /> },
      {
        path: "/veteran_information",
        element: (
          <RouteSecure>
            <Veteran_Information />
          </RouteSecure>
        ),
      },
      {
        path: "/issues",
        element: (
          <RouteSecure>
            <Suspense fallback={<Loading />}>
              <Issues />
            </Suspense>
          </RouteSecure>
        ),
      },
      {
        path: "/ptsd_details",
        element: (
          <RouteSecure>
            <Suspense fallback={<Loading />}>
              <PTSDDetails />
            </Suspense>
          </RouteSecure>
        ),
      },
      {
        path: "/issue_details",
        element: (
          <RouteSecure>
            <IssueDetailsForm />
          </RouteSecure>
        ),
      },
      {
        path: "/gulf_war_location",
        element: (
          <RouteSecure>
            <GulfWarLocationsForm />
          </RouteSecure>
        ),
      },
      {
        path: "/agent_location",
        element: (
          <RouteSecure>
            <AgentOrangeLocationsForm />
          </RouteSecure>
        ),
      },
      {
        path: "/toxin_exposure",
        element: (
          <RouteSecure>
            <ToxinExposureForm />
          </RouteSecure>
        ),
      },
      {
        path: "/confirmation",
        element: (
          <RouteSecure>
            <GreatConfirmation />
          </RouteSecure>
        ),
      },
      { path: "/policy", element: <Policy /> },
      { path: "/calculator", element: <Calculator /> },
      { path: "/about_us", element: <AboutUs /> },
      { path: "/contact", element: <ContactForm /> },
      { path: "/va-form", element: <VAForm /> },

      //mental-health-info
      {
        path: "/mental_health_info",
        element: (
          <RouteSecure>
            <MentalHealthForm />
          </RouteSecure>
        ),
      },
      {
        path: "/mental_health_survey",
        element: (
          <RouteSecure>
            <MentalHealthSurvey />
          </RouteSecure>
        ),
      },
      {
        path: "/mental_health_details",
        element: (
          <RouteSecure>
            <MentailHealthDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/death_details",
        element: (
          <RouteSecure>
            <DeathDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/disaster_form",
        element: (
          <RouteSecure>
            <DisasterForm />
          </RouteSecure>
        ),
      },
      {
        path: "/abuse_assault_form",
        element: (
          <RouteSecure>
            <AbuseAssaultDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/risk_details",
        element: (
          <RouteSecure>
            <RiskDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/medical_position_details",
        element: (
          <RouteSecure>
            <MedicalPositionDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/crash_details",
        element: (
          <RouteSecure>
            <CrashAccidentDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/medical_trauma_details",
        element: (
          <RouteSecure>
            <MedicalTraumaDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/hazing_details",
        element: (
          <RouteSecure>
            <HazingDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/abuse_power_details",
        element: (
          <RouteSecure>
            {" "}
            <AbuseOfPowerDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/dangerous_items_details",
        element: (
          <RouteSecure>
            <DangerousItemsDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/familiar_issues",
        element: (
          <RouteSecure>
            <FamilialIssuesDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/comfirm_mental_health",
        element: (
          <RouteSecure>
            <ConfirmMentalHealth />
          </RouteSecure>
        ),
      },
      {
        path: "/mental_health_symptoms",
        element: (
          <RouteSecure>
            <MentalHealthSymptoms />
          </RouteSecure>
        ),
      },
      {
        path: "/mental_health_indicators",
        element: (
          <RouteSecure>
            <MentalHealthIndicators />
          </RouteSecure>
        ),
      },

      //2nd part

      {
        path: "/migraine",
        element: (
          <RouteSecure>
            <Migraine />
          </RouteSecure>
        ),
      },

      // bodyhealth

      {
        path: "/service_details",
        element: (
          <RouteSecure>
            <ServiceDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/shifts",
        element: (
          <RouteSecure>
            <Shifts />{" "}
          </RouteSecure>
        ),
      },
      {
        path: "/physical_training",
        element: (
          <RouteSecure>
            <PhysicalTrainingDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/injuries_details",
        element: (
          <RouteSecure>
            <InjuriesDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/sickcall_details",
        element: (
          <RouteSecure>
            <SickCallDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/discharge_condition",
        element: (
          <RouteSecure>
            <DischargeCondition />
          </RouteSecure>
        ),
      },
      {
        path: "/health_details",
        element: (
          <RouteSecure>
            <BodyHealthDetails />
          </RouteSecure>
        ),
      },
      {
        path: "/ai_narrative",
        element: (
          <RouteSecure>
            <AiNarativeGen />
          </RouteSecure>
        ),
      },
      {
        path: "/progress",
        element: (
          <RouteSecure>
            <ProgressMessageForm />
          </RouteSecure>
        ),
      },
      {
        path: "/evidence_form",
        element: (
          <RouteSecure>
            <EvidenceForm />
          </RouteSecure>
        ),
      },
      {
        path: "/progress_message",
        element: (
          <RouteSecure>
            <ProgressMessage />
          </RouteSecure>
        ),
      },
      {
        path: "/e_signature",
        element: (
          <RouteSecure>
            <ESignature />
          </RouteSecure>
        ),
      },
      {
        path: "/va_form",
        element: (
          <RouteSecure>
            <VAForm />
          </RouteSecure>
        ),
      },
      {
        path: "/submission",
        element: (
          <RouteSecure>
            <Final_Sub />
          </RouteSecure>
        ),
      },

      //SinusitisForm
      {
        path: "/sinusitis_form",
        element: (
          <RouteSecure>
            <SinusitisForm />
          </RouteSecure>
        ),
      },

      //GastrointestinalForm
      {
        path: "/gastrointestinal_form",
        element: (
          <RouteSecure>
            <GastrointestinalForm />
          </RouteSecure>
        ),
      },

      //TinnitusHearingLossForm
      {
        path: "/tinnitus_hearing_loss",
        element: (
          <RouteSecure>
            <TinnitusHearingLossForm />
          </RouteSecure>
        ),
      },

      //others
      {
        path: "/others",
        element: (
          <RouteSecure>
            <OthersIssues />
          </RouteSecure>
        ),
      },

      //payment success

      { path: "/payment_success", element: <Payment_Success /> },
      { path: "/payment_cancel", element: <Payment_Error /> },
    ],
  },

  { path: "/unauthorized", element: <UnauthorizedError /> },
  {
    path: "/active",
    element: (
      <Suspense fallback={<Loading />}>
        <NoSubscription />
      </Suspense>
    ),
  },

  //authentication
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign_up",
    element: <SignUp />,
  },
  {
    path: "/email_verification",
    element: <Forgot_Password />,
  },
  {
    path: "/verify",
    element: <OTPVerification />,
  },
  {
    path: "/reset_password",
    element: <ResetPassword />,
  },
  {
    path: "/success",
    element: <SuccessAuthentication />,
  },

  //admin login

  { path: "/admin_login", element: <AdminLogin /> },
  { path: "/recovery", element: <Recovery /> },
  {
    path: "/verify_otp",
    element: <Verify_OTP />,
  },
  { path: "/recovery_password", element: <PasswordRecovery /> },

  {
    path: "admin",
    element: <Dashboard />,
    children: [
      { index: true, element: <Admin_home /> },
      { path: "admin_home", element: <Admin_home /> },
      { path: "users", element: <UserManagment /> },
      { path: "forms", element: <FormView /> },
      { path: "payment", element: <Payment /> },
      { path: "document", element: <Document /> },
      {
        path: "livechat",
        element: <ChatInterface />,
        children: [
          {
            path: ":id",
            element: <LiveChat />,
          },
        ],
      },
      { path: "settings/privacy_policy", element: <PrivacyPolicy /> },
      { path: "settings/terms_conditions", element: <TermsConditions /> },
      { path: "notification", element: <Notification /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  //superadmin
  {
    path: "super_admin",
    element: <Dashboard />,
    children: [
      { index: true, element: <SuperAdminHome /> },
      { path: "super_admin_home", element: <SuperAdminHome /> },
      { path: "admin_management", element: <AdminManagment /> },
      { path: "package_management", element: <PackageManagment /> },
    ],
  },
]);
