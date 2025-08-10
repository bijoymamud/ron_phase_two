import animationData from "../../assets/unauthorized_ron.json"
import Lottie from "lottie-react";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";
export default function UnauthorizedError() {
  return (
    <div className="h-screen flex items-center justify-center px-6 py-12 bg-gray-100">
      <div className="max-w-6xl w-full  rounded-2xl p-10 text-center">
        {/* VA Logo/Header */}
     
            <div className="w-3/4 flex mx-auto">
      <Lottie animationData={animationData} loop={true} />
    </div>
         
   

        {/* Error Content */}
        <div className="">
          <h2 className="text-4xl font-semibold text-red-600 mb-10">
            Access Error
          </h2>

          <ul className="list-disc list-inside space-y-1 text-gray-800 text-left max-w-xl mx-auto mb-10">
            <li>Your session has expired</li>
            <li>You need to verify your identity</li>
            <li>You don’t have the required access level</li>
            <li>The form requires additional authentication</li>
          </ul>

          <div className="flex items-center justify-center gap-3 bg-blue-100 border border-blue-300 rounded-xl p-5 mb-10 text-blue-800 text-base max-w-xl mx-auto shadow-sm">
         <Info size={42} className="text-red-500 font-semibold"/>
            <span className="text-red-500 font-semibold">
              For assistance with VA benefits and forms, please contact VA
              support.
            </span>
          </div>

         <Link to="/">
           <button className="px-10 py-3 rounded-md text-white font-semibold bg-[#B31942] hover:bg-[#aa2b4d]">Back to Home</button>
         </Link>
        </div>
      </div>
    </div>
  );
}
