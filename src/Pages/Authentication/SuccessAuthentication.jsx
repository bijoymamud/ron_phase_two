import { useNavigate } from "react-router-dom";

const SuccessAuthentication = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B2A52] text-white">
      <div className="text-6xl text-green-500 mb-4">✔</div>
      <h2 className="text-3xl font-bold mb-2">Password Changed!</h2>
      <p className="text-sm text-gray-300 mb-6 text-center">Your password has been changed successfully.</p>
      <button className="bg-[#B31942] py-2 px-6 rounded-md uppercase text-white font-semibold hover:opacity-90" onClick={() => navigate("/login")}>
        Back to Login
      </button>
    </div>
  );
};

export default SuccessAuthentication;
