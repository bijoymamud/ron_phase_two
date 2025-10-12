

import { useState } from "react";
import { Check } from "lucide-react";
import { BiSolidEditAlt } from "react-icons/bi";
import { useGetPlansQuery } from "../../redux/features/baseApi";

const PackageManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: packages, isLoading, isError } = useGetPlansQuery();
  console.log(packages);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleEditPackage = (packageId) => {
    console.log("Edit package with ID:", packageId);
  };

  return (
    <section>
      <div className="border-b pb-5">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h1 className="text-[#0A112F] text-[24px] font-semibold">
              Package Management
            </h1>
            <p className="text-[#585860] text-[16px] font-medium">
              All packages are shown as cards. Create or edit anytime.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-600 text-lg">Loading packages...</div>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-red-600 text-lg">Error loading packages</div>
          </div>
        ) : packages && packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleEditPackage(pkg?.id)}
                    className=" bg-red-600 hover:bg-red-700 text-white font-semibold w-[40px] h-[40px] rounded-full transition-colors"
                  >
                    <BiSolidEditAlt size={20} className="mx-auto" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                  {pkg.name}
                </h2>

                <p className="text-sm text-gray-500 text-center mb-6">
                  For the individual and small teams
                </p>

                <div className="text-center mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    ${pkg.amount}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">
                    {pkg.duration_type}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.descriptions?.map((desc) => (
                    <li key={desc.id} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{desc.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500 text-lg">No packages available</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackageManagement;
