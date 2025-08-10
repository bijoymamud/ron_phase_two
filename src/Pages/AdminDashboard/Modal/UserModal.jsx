import React, { useState, useEffect } from "react";
import { X, User, FileText, Send } from "lucide-react";
import DocumentsModal from "./DocumentsModal";
import SubmissionsModal from "./SubmissionDetails";

export default function UserModal({
  userInfo,
  selectedUserId,
  isModalOpen,
  closeModal,
}) {
  const [activeTab, setActiveTab] = useState("userDetails");
  const [userStatus, setUserStatus] = useState(null);
  const [isSubmissionsModalOpen, setIsSubmissionsModalOpen] = useState(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);

  // Find the selected user based on ID
  const selectedUser =
    userInfo?.find((user) => user.id === selectedUserId) || null;

  useEffect(() => {
    if (selectedUser) {
      setUserStatus(selectedUser.status === "premium" ? "Active" : selectedUser.status);
    }
  }, [selectedUser]);

  const toggleStatus = () => {
    if (selectedUser) {
      const newStatus = userStatus === "Active" ? "Inactive" : "Active";
      setUserStatus(newStatus);
      // In a real app, dispatch an action to update the user status in the backend
      console.log("Updated user status:", { ...selectedUser, status: newStatus });
    }
  };

  // Handle click outside modal to close it
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isModalOpen && !isSubmissionsModalOpen && !isDocumentsModalOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen, isSubmissionsModalOpen, isDocumentsModalOpen, closeModal]);

  const openSubmissionsModal = () => {
    setIsSubmissionsModalOpen(true);
    document.body.classList.add("overflow-hidden");
  };

  const closeSubmissionsModal = () => {
    setIsSubmissionsModalOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  const openDocumentsModal = () => {
    setIsDocumentsModalOpen(true);
    document.body.classList.add("overflow-hidden");
  };

  const closeDocumentsModal = () => {
    setIsDocumentsModalOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  if (!isModalOpen || !selectedUser) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity"
        onClick={handleModalBackdropClick}
        aria-modal="true"
        role="dialog"
      >
        <div
          className={`bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden transform transition-all ${isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center space-x-4">
              <div className="bg-[#0A3161] text-white rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-xl font-bold">
                  {selectedUser.user?.user_profile?.name?.charAt(0) || "N/A"}
                </span>
              </div>
              <div>
                <p className="font-bold text-lg text-gray-800">
                  {selectedUser.user?.user_profile?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedUser.user?.email || "N/A"}
                </p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          

          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "userDetails"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("userDetails")}
            >
              <User className="h-4 w-4 mr-2" />
              User Details
            </button>
           
            <button
              className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "submissions"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("submissions")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Submissions
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 overflow-y-auto max-h-[50vh]">
            {/* User Details Tab Content */}
            {activeTab === "userDetails" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-800">
                      {selectedUser.user?.email || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Join Date</p>
                    <p className="font-medium text-gray-800">
                      {selectedUser.user?.user_profile?.joined_date
                        ? new Date(
                            selectedUser.user.user_profile.joined_date
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Address</p>
                  <p className="font-medium text-gray-800">
                    {selectedUser.user?.user_profile?.address || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Service History</p>
                  <p className="font-medium text-gray-800">
                    {selectedUser.user?.user_profile?.services_history || "N/A"}
                  </p>
                </div>
              </div>
            )}

            {/* Documents Tab Content */}
            {activeTab === "documents" && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-gray-500 mb-2">
                  Documents: {selectedUser.documents?.length || "0"}
                </p>
                {selectedUser.documents?.length > 0 && (
                  <button
                    onClick={openDocumentsModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Documents
                  </button>
                )}
              </div>
            )}

            {/* Submissions Tab Content */}
            {activeTab === "submissions" && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Send className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-gray-500 mb-2">
                  Submissions: {selectedUser.submission_data?.length || "0"}
                </p>
                {selectedUser.submission_data?.length > 0 && (
                  <button
                    onClick={openSubmissionsModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Submissions
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submissions Modal */}
      {isSubmissionsModalOpen && (
        <SubmissionsModal
          submissions={selectedUser.submission_data || []}
          isOpen={isSubmissionsModalOpen}
          onClose={closeSubmissionsModal}
        />
      )}

      {/* Documents Modal */}
      {isDocumentsModalOpen && (
        <DocumentsModal
          documents={selectedUser.documents || []}
          isOpen={isDocumentsModalOpen}
          onClose={closeDocumentsModal}
        />
      )}
    </>
  );
}