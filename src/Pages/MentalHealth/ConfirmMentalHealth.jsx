import { Link } from "react-router-dom";

function ConfirmMentalHealth() {
  return (
    <div className="flex justify-center items-center min-h-[85vh]  md:min-h-screen bg-gray-100 pt-10 pb-10 mt-20 md:pt-0">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-[#B31942] mb-6">GREAT!</h1>
        <p className="text-blue-800 dark:text-gray-900 md:text-lg text-md mb-8 w-11/12 md:w-full mx-auto">
          Now we need some additional information on these conditions. In the
          next step please provide as much detail as you can recall for each
          condition. This will help make your claim stronger and add verifiable
          evidenc Save & Proceed
        </p>
        <button>
          <Link
            to="/mental_health_symptoms"
            className="bg-[#0A3161] uppercase text-white py-3 px-20 rounded-md hover:bg-[#104381] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold"
          >
            Save & Proceed
          </Link>
        </button>
      </div>
    </div>
  );
}

export default ConfirmMentalHealth;
