import { useState } from "react";
import { useGetFilteredActivityTestDataQuery } from "../../redux/features/baseApi";

const ActivityTest = () => {
  const [activeTab, setActiveTab] = useState("All");
  const { data: activitiesData } = useGetFilteredActivityTestDataQuery();
  console.log(activitiesData);

  const filteredActivities = activitiesData
    ?.filter((activity) => {
      if (activeTab === "All") {
        return true;
      } else if (activeTab === "Recent Registrations") {
        return activity.action_type === "user_registration";
      } else if (activeTab === "Recent Package purchases") {
        return activity.action_type === "purchase";
      }
      return false;
    }); 

  return (
    <div className="flex justify-center items-start">
      <div className="w-full rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-100 p-2 rounded-t-lg w-[560px]">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md mr-2 uppercase  ${
              activeTab === "All"
                ? "bg-[#0A3161] text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("All")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md mr-2 uppercase  ${
              activeTab === "Recent Registrations"
                ? "bg-[#0A3161] text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("Recent Registrations")}
          >
            Recent Registrations
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md uppercase  ${
              activeTab === "Recent Package purchases"
                ? "bg-[#0A3161] text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("Recent Package purchases")}
          >
            Recent Package purchases
          </button>
        </div>
        <div className="pt-5 space-y-4">
          {filteredActivities?.slice(0, 5).map((activity) => (
            <div
              key={activity.id}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-1 ">
                <div>
                  {activity?.name}
                  <sup
                    className={`ms-2 px-[4px] py-[1px] mb-2 rounded-full text-gray-900
                      ${
                        activity?.action_type === "purchase"
                          ? "bg-green-400"
                          : activity?.action_type === "user_registration"
                            ? "bg-purple-400"
                            : activity?.action_type === "form_submission"
                              ? "bg-blue-400"
                              : "bg-gray-300"
                      }`}
                  >
                    <span className="text-xs">{activity?.action_type}</span>
                  </sup>

                  <h1 className="text-sm lowercase text-gray-500 font-medium">
                    {activity?.gmail}
                  </h1>
                </div>

                <span className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{activity.details}</p>
            </div>
          ))}
          {filteredActivities?.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No activities to display for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityTest;
