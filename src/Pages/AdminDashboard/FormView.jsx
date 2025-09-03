import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import {
  useApprovedFormMutation,
  useGetFormsQuery,
  useRejectFormMutation,
} from "../../redux/features/baseApi";
import { FaRegEye } from "react-icons/fa";
import { toast, Toaster } from "sonner";

export default function FormView() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: formData, isLoading } = useGetFormsQuery();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [approvedForm, { isLoading: isApproving }] = useApprovedFormMutation();
  const [rejectForm, { isLoading: isRejecting }] = useRejectFormMutation();
  const [isActionTaken, setIsActionTaken] = useState(false);

  const baseURL = "http://10.10.13.73:4000";

  console.log("formData", formData);

  const openModal = (submission) => {
    setSelectedSubmission(submission);
    setIsActionTaken(
      submission?.status === "approved" || submission?.status === "rejected"
    );
    document.getElementById("submission_modal")?.showModal();
  };

  const closeModal = () => {
    setSelectedSubmission(null);
    setIsActionTaken(false);
    document.getElementById("submission_modal")?.close();
  };

  const handleApproved = async (id) => {
    try {
      await approvedForm({ status: "approved", id }).unwrap();
      toast.success("Form approved successfully!");
      setIsActionTaken(true);
    } catch (error) {
      console.error("Failed to approve form:", error);
      toast.error(
        `Failed to approve form: ${error.message || "An error occurred"}`
      );
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectForm({ status: "rejected", id }).unwrap();
      toast.success("Form rejected successfully!");
      setIsActionTaken(true);
    } catch (error) {
      console.error("Failed to reject form:", error);
      toast.error(
        `Failed to reject form: ${error.message || "An error occurred"}`
      );
    }
  };

  const filteredSubmissions = formData?.filter(
    (submission) =>
      submission?.user?.user_profile?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      submission?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileName = (filePath) => {
    if (!filePath) return "Unknown File";
    const fileName = filePath.split("/").pop();
    const nameWithoutTimestamp = fileName.replace(/^\d{8}_\d{6}_/, "");
    return nameWithoutTimestamp.replace(/\.pdf$/, "");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-right" richColors className="z-[1000]" />
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email"
              className="input input-bordered pl-10 w-64 dark:bg-gray-200 dark:text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <button className="btn btn-outline">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        ) : formData?.length === 0 ? (
          <div className="text-center text-gray-500">No submissions found.</div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr className="bg-[#0A3161] text-white">
                <th className="py-3 px-4">Submitted By</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Submitted Date</th>
                <th className="py-3 px-4">View</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions?.map((submission) => (
                <tr key={submission.id} className="border-b dark:text-gray-900">
                  <td className="py-3 px-4">
                    {submission?.user?.user_profile?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    {submission?.user?.email || "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`badge ${
                        submission?.status === "approved"
                          ? "bg-green-500 text-white"
                          : submission?.status === "rejected"
                            ? "bg-red-500 text-white"
                            : "bg-yellow-500 text-white"
                      } px-2 py-1 rounded-full`}
                    >
                      {submission?.status || "pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {submission?.submission_date
                      ? new Date(submission.submission_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="dark:bg-white"
                      onClick={() => openModal(submission)}
                      aria-label={`View submission ${submission?.id}`}
                    >
                      <FaRegEye className="h-5 w-5 text-[#0A3161]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <dialog id="submission_modal" className="modal ">
        <div className="modal-box bg-[#002b5c] text-white max-w-2xl p-8 rounded-xl shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Submission Details
          </h3>

          {selectedSubmission ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="font-semibold text-white/80">
                  Submission ID:
                </span>
                <span>{selectedSubmission?.id || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white/80">
                  Submitted By:
                </span>
                <span>
                  {selectedSubmission?.user?.user_profile?.name || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white/80">Email:</span>
                <span>{selectedSubmission?.user?.email || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white/80">Status:</span>
                <span
                  className={`badge ${
                    selectedSubmission?.status === "approved"
                      ? "bg-green-500 text-white"
                      : selectedSubmission?.status === "rejected"
                        ? "bg-red-500 text-white"
                        : "bg-yellow-500 text-white"
                  } px-2 py-1 rounded-full`}
                >
                  {selectedSubmission?.status || "pending"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white/80">
                  Submission Date:
                </span>
                <span>
                  {selectedSubmission?.submission_date
                    ? new Date(
                        selectedSubmission.submission_date
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </span>
              </div>

              <div className="flex flex-col col-span-2">
                <span className="font-semibold text-white/80">Documents:</span>
                {selectedSubmission?.documents?.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {selectedSubmission.documents.map((doc) => (
                      <li key={doc.id} className="text-white/90">
                        <span className="font-medium">
                          {doc.document_type.toUpperCase()}:
                        </span>{" "}
                        <a
                          href={`${baseURL}${doc.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {getFileName(doc.file)}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-white/80">No documents available.</span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-white/80 text-center text-lg">
              No submission data available.
            </p>
          )}

          <div className="modal-action mt-6 w-full flex justify-end gap-4">
            <button
              className="btn btn-outline text-white hover:bg-white/10 px-6 py-2"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              onClick={() => handleApproved(selectedSubmission?.id)}
              className="btn btn-outline text-white hover:bg-green-600 bg-green-500 px-6 py-2"
              disabled={isActionTaken || isApproving || isRejecting}
            >
              {isApproving ? "Approving..." : "Accept"}
            </button>
            <button
              onClick={() => handleReject(selectedSubmission?.id)}
              className="btn btn-outline text-white hover:bg-red-700 bg-red-500 px-6 py-2"
              disabled={isActionTaken || isApproving || isRejecting}
            >
              {isRejecting ? "Rejecting..." : "Reject"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
