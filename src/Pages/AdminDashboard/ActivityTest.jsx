import { useState } from "react";

const activitiesData = [
  {
    id: 1,
    type: "registration",
    title: "John Doe",
    badgeText: "Registered",
    badgeBg: "bg-green-100",
    badgeTextClass: "text-green-800",
    timestamp: "2h ago",
    details: "janecooper@gmail.com",
  },
  {
    id: 2,
    type: "package_purchase",
    title: "Package purchased",
    badgeText: "Purchase",
    badgeBg: "bg-blue-100",
    badgeTextClass: "text-blue-800",
    timestamp: "2h ago",
    details: "Payment: **** 4242 · $49.00",
  },
  {
    id: 3,
    type: "role_update",
    title: "Role updated",
    badgeText: "Admin",
    badgeBg: "bg-purple-100",
    badgeTextClass: "text-purple-800",
    timestamp: "2h ago",
    details: "Admin set Manager role for Dario",
  },
  {
    id: 4,
    type: "registration",
    title: "Jane Smith",
    badgeText: "Registered",
    badgeBg: "bg-green-100",
    badgeTextClass: "text-green-800",
    timestamp: "5h ago",
    details: "janesmith@example.com",
  },
  {
    id: 5,
    type: "package_purchase",
    title: "Package purchased",
    badgeText: "Purchase",
    badgeBg: "bg-blue-100",
    badgeTextClass: "text-blue-800",
    timestamp: "1d ago",
    details: "Payment: **** 1234 · $99.00",
  },
];

const ActivityTest = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredActivities = activitiesData.filter((activity) => {
    if (activeTab === "All") {
      return true;
    } else if (activeTab === "Recent Registrations") {
      return activity.type === "registration";
    } else if (activeTab === "Recent Package purchases") {
      return activity.type === "package_purchase";
    }
    return false;
  });

  return (
    <div className="bg-gray-50 flex justify-center items-start">
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
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:cursor-pointer hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-1 ">
                <div className="flex items-center">
                  <p className="font-semibold text-gray-900 text-lg">
                    {activity.title}
                  </p>
                  <span
                    className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${activity.badgeBg} ${activity.badgeTextClass}`}
                  >
                    {activity.badgeText}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {activity.timestamp}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{activity.details}</p>
            </div>
          ))}
          {filteredActivities.length === 0 && (
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
