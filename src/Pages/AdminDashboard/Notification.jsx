import React from "react";

const notificationsData = [
  {
    group: "Today",
    count: 2,
    items: [
      {
        title: "New Form Submission",
        description: "John Smith submitted a new disability claim form",
        time: "5 min ago",
        hasDot: true,
      },
      {
        title: "New Session booked by Joseph Rust",
        description:
          "Please confirm this appointment and let us know if you have preferences or special requirements. Looking forward to our session together!",
        time: "2 min ago",
        hasDot: false,
      },
      {
        title: "Payment Not Added",
        description:
          "Trying to inform you that your recent payment has not been successfully processed. Please review the payment method and ensure that sufficient funds are available or the provided details are accurate.",
        time: "2 min ago",
        hasDot: false,
      },
    ],
  },
  {
    group: "Yesterday",
    count: 5,
    items: [
      {
        title: "Password change email sent",
        avatar: "https://via.placeholder.com/40", // Placeholder avatar
        description:
          "This is to inform you that your password has been successfully changed for your account.",
        time: "5 min ago",
        hasDot: false,
      },
      {
        title: "Meeting at 07:45 PM",
        avatar: "https://via.placeholder.com/40", // Placeholder avatar
        description:
          "Reminder: Just a quick heads-up about your meeting tonight at 07:45 PM. Don’t forget to prep any necessary materials and jot down any topics you’d like to discuss.",
        time: "2 min ago",
        hasDot: false,
      },
    ],
  },
];

export default function Notification() {
  return (
    <div className=" bg-gray-50 min-h-screen">
      {notificationsData.map((group, index) => (
        <div key={index} className="mb-6">
          {/* Group Header */}
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {group.group}
            </h2>
            <span className="badge badge-primary ml-2">{group.count}</span>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {group.items.map((notification, idx) => (
              <div
                key={idx}
                className="card bg-base-100 shadow-md p-4 flex items-start space-x-4"
              >
                {/* Avatar (if present) */}
                {notification.avatar && (
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={notification.avatar} alt="User avatar" />
                    </div>
                  </div>
                )}

                {/* Notification Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">
                      {notification.title}
                    </h3>
                    {notification.hasDot && (
                      <span className="badge badge-error w-3 h-3 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {notification.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">
                      {notification.time}
                    </span>
                    <button className="btn btn-sm btn-outline">View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}