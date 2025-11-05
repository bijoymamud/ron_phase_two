import { useState, useEffect } from "react";
import { CheckCircle, ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentSuccess({
  initialTransactionId = "",
  initialAmount = "",
}) {
  const [amount, setAmount] = useState(initialAmount);
  const [date, setDate] = useState("");

  useEffect(() => {
    // Set current date in a readable format
    const currentDate = new Date();
    setDate(
      currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [initialTransactionId, initialAmount]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <div className="flex flex-col items-center">
              <div className="mb-6 mt-2">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle
                    className="h-12 w-12 text-green-600"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-500 text-center">
                Thank you for your payment. Your transaction has been completed
                successfully.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 mt-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-medium dark:text-gray-900 text-gray-900">
                  {date || "Loading..."}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <hr className="border-gray-200" />
            </div>
          </div>

          <div className="p-6 pt-0 flex flex-col space-y-3">
            <Link to="/" className="w-full">
              <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center">
                Continue to Next Phase
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
