
import { useState } from "react";

export default function DisabilityCalculator() {
  const [disabilities, setDisabilities] = useState([]);
  const [dependents, setDependents] = useState({
    under18: "10",
    between1823: "4",
    parents: "1",
    maritalStatus: "Wifey",
    smcr: "NONE",
  });
  const [viewType, setViewType] = useState("MONTHLY");

  const addDisability = (percentage) => {
    const newDisability = `${percentage}% ${disabilities.length === 0 ? "Left Arm" : "Right Arm"}`;
    setDisabilities([...disabilities, newDisability]);
  };

  const removeDisability = (index) => {
    setDisabilities(disabilities.filter((_, i) => i !== index));
  };

  const calculateCombinedDisability = () => {
    return disabilities.length ? 60 : 0; // Simplified calculation for demo
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDependents((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto md:py-20 py-10 px-5 md:px-0">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">DISABILITY CALCULATOR</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          A Disability Calculator Estimates Disability Levels, Helping Determine Eligibility For Benefits Or Support By
          Evaluating Condition Severity And Impact On Daily Life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Percentage Buttons */}
        <div className="space-y-4">
          <h2 className="font-semibold mb-4 text-lg">Step 1 - Add Disabilities</h2>
          <div className="grid grid-cols-2 gap-4">
            {[10, 30, 50, 70, 90].map((percentage) => (
              <div key={percentage} className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => addDisability(percentage)}
                  className="bg-[#2B3B4E] text-white py-3 px-4 rounded hover:bg-[#374B61] transition-colors"
                >
                  {percentage}%
                </button>
                <button
                  onClick={() => addDisability(percentage)}
                  className="bg-[#2B3B4E] text-white py-3 px-4 rounded hover:bg-[#374B61] transition-colors"
                >
                  {percentage}%
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column - Selected Disabilities */}
        <div className="bg-white rounded-lg p-4 shadow">
          {disabilities.map((disability, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 mb-2 rounded">
              <span>{disability}</span>
              <button onClick={() => removeDisability(index)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Right Column - Results */}
        <div className="bg-[#0B2559] text-white rounded-lg p-6">
          <div className="relative w-48 h-48 mx-auto mb-6">
            <div className="w-full h-full rounded-full border-8 border-gray-700 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">{calculateCombinedDisability()}%</div>
                  <div className="text-sm">
                    Combined
                    <br />
                    Disability
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-xl font-bold mb-1">64% Disability Rating</div>
            <div className="text-red-500 text-sm mb-4">7.62 Bilateral Factor Has Been Applied</div>

            <div className="inline-flex rounded-md mb-4">
              <button
                className={`px-4 py-2 ${viewType === "MONTHLY" ? "bg-red-600" : "bg-gray-700"}`}
                onClick={() => setViewType("MONTHLY")}
              >
                MONTHLY
              </button>
              <button
                className={`px-4 py-2 ${viewType === "ANNUALLY" ? "bg-red-600" : "bg-gray-700"}`}
                onClick={() => setViewType("ANNUALLY")}
              >
                ANNUALLY
              </button>
            </div>

            <div className="text-sm mb-2">COMPENSATION</div>
            <div className="text-4xl font-bold text-red-500 mb-4">$4,928.91</div>

            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors">
              VIEW CALCULATIONS
            </button>
          </div>
        </div>
      </div>

      {/* Step 2 - Additional Information */}
      <div className="mt-8 md:w-2/3">
        <h2 className="font-semibold mb-4 text-lg">Step 2 - Add Additional Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          
          {/* Dependent Children Under 18 */}
          <div className="flex flex-col justify-between">
            <h1 className="capitalize mb-1 text-sm">Dependent children under 18</h1>
            <select name="under18" className="bg-[#2B3B4E] text-white p-2 rounded w-full" value={dependents.under18} onChange={handleChange}>
              {[...Array(11).keys()].map((num) => <option key={num} value={num}>{num}</option>)}
            </select>
          </div>

          {/* Dependent Children Between 18-23 */}
          <div className="flex flex-col justify-between">
            <h1 className="capitalize mb-1 text-sm">Dependent children (18-23)</h1>
            <select name="between1823" className="bg-[#2B3B4E] text-white p-2 rounded w-full" value={dependents.between1823} onChange={handleChange}>
              {[...Array(6).keys()].map((num) => <option key={num} value={num}>{num}</option>)}
            </select>
          </div>

          {/* Number of Dependent Parents */}
          <div className="flex flex-col justify-between">
            <h1 className="capitalize mb-1 text-sm">Number of dependent parents</h1>
            <select name="parents" className="bg-[#2B3B4E] text-white p-2 rounded w-full" value={dependents.parents} onChange={handleChange}>
              {[0, 1, 2].map((num) => <option key={num} value={num}>{num}</option>)}
            </select>
          </div>

          {/* Marital Status */}
          <div className="flex flex-col justify-between">
            <h1 className="capitalize mb-1 text-sm">Your marital status</h1>
            <select name="maritalStatus" className="bg-[#2B3B4E] text-white p-2 rounded w-full" value={dependents.maritalStatus} onChange={handleChange}>
              {["Single", "Married", "Divorced", "Widowed"].map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
        </div>
        <h1 className="mt-5 text-[#434343]">Disclaimer- Please note that this calculation tool is to be used as an estimated evaluation and for informational purposes only. Many factors are considered with Veteran Affair calculations, ratings, and monetary amounts. Please contact Veteran Advocate Center for additional questions or assistance with VA.</h1>
      </div>
    </div>
  );
}
