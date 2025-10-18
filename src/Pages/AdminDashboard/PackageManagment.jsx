import { useState } from "react";
import { Check, X } from "lucide-react";
import { BiSolidEditAlt } from "react-icons/bi";
import {
  useGetPlansQuery,
  useEditSubscriptionMutation,
} from "../../redux/features/baseApi";
import { toast, Toaster } from "sonner";

const PackageManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    duration_type: "",
    price_id: "",
    price: "",
    description: [],
  });
  const [descriptionInput, setDescriptionInput] = useState("");

  const { data: packages, isLoading, isError } = useGetPlansQuery();
  console.log(packages, "packages");
  const [editSubscription, { isLoading: isEditing }] =
    useEditSubscriptionMutation();

  const handleOpenModal = (pkg) => {
    setSelectedPackage(pkg);
    setFormData({
      name: pkg.name,
      amount: pkg.amount,
      duration_type: pkg.duration_type,
      price_id: pkg.price_id || "",
      price: pkg.price || pkg.amount,
      description: pkg.descriptions || pkg.description || [],
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    setFormData({
      name: "",
      amount: "",
      duration_type: "",
      price_id: "",
      price: "",
      description: [],
    });
    setDescriptionInput("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "amount" || name === "price" ? parseFloat(value) || "" : value,
    }));
  };

  const handleAddDescription = () => {
    if (descriptionInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        description: [...prev.description, { text: descriptionInput.trim() }],
      }));
      setDescriptionInput("");
    }
  };

  const handleRemoveDescription = (index) => {
    setFormData((prev) => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await editSubscription({
        id: selectedPackage.id,
        data: formData,
      }).unwrap();
      toast.success(response?.message || "Package updated successfully");
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update package:", error);
      toast.error(
        error?.data?.message || "Failed to update package. Please try again."
      );
    }
  };

  return (
    <section>
      <div className="border-b pb-5">
        <Toaster />
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
                    onClick={() => handleOpenModal(pkg)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold w-[40px] h-[40px] rounded-full transition-colors"
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
                    ${pkg.price}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">
                    {pkg.duration_type}
                  </span>
                </div>
                <ul className="space-y-3 mb-6">
                  {(pkg.descriptions || pkg.description || []).map(
                    (desc, index) => (
                      <li
                        key={desc.id || index}
                        className="flex items-start gap-2"
                      >
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">
                          {desc.text}
                        </span>
                      </li>
                    )
                  )}
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

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Edit Package
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Package Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border dark:bg-white bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-3 py-2 border dark:bg-white bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration Type
                  </label>
                  <select
                    name="duration_type"
                    value={formData.duration_type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border dark:bg-white bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select duration</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descriptions
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={descriptionInput}
                      onChange={(e) => setDescriptionInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleAddDescription()
                      }
                      placeholder="Add description item"
                      className="flex-1 px-3 py-2 border dark:bg-white bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddDescription}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Add
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {formData.description.map((desc, index) => (
                      <li
                        key={index}
                        className="flex  items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span className="text-sm text-gray-700">
                          {desc.text}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveDescription(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isEditing}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
                >
                  {isEditing ? "Updating..." : "Update Package"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PackageManagement;
