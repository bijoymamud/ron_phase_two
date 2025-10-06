("use client");
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

const SubscriptionModal = ({ isOpen, onClose }) => {
  const [features, setFeatures] = useState("");
  const [newFeature, setNewFeature] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: 19,
      duration: 1,
      discount: 35,
    },
  });

  const onSubmit = (data) => {
    console.log({ ...data, features });
    // onClose();
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[550px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <RxCross2 size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-[#0A112F] ">
          Add Package
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (USD)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: "Price is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-white"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (Months)
              </label>
              <input
                type="number"
                {...register("duration", {
                  required: "Duration is required",
                  min: 1,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-white"
              />
              {errors.duration && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount % (Optional)
            </label>
            <input
              type="number"
              {...register("discount", { min: 0, max: 100 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-white"
            />
            {errors.discount && (
              <p className="text-red-500 text-xs mt-1">
                {errors.discount.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add Features"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md dark:bg-white"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addFeature())
                }
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 uppercase flex items-center gap-2 bg-[#0A3161] hover:cursor-pointer text-white pe-8 rounded-full"
              >
                <LuPlus className="dark:text-white text-white" />
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end  pt-4">
            <button
              type="submit"
              className="px-6 uppercase py-2 w-full rounded-md text-white bg-[#0A3161] hover:cursor-pointer"
            >
              Save Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionModal;
