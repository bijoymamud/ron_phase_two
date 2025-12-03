import { X, FileText } from "lucide-react";

export default function SubmissionsModal({ submissions, isOpen, onClose }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const baseApi = "http://10.10.13.73:5000";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60] transition-opacity"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">All Submissions</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Submissions Content */}
        <div className="p-4 space-y-6">
          {submissions.length > 0 ? (
            submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Submission #{submission.id}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Submission Date
                    </p>
                    <p className="font-medium text-gray-800">
                      {submission.submission_date
                        ? new Date(
                            submission.submission_date
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        submission.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : submission.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {submission.status || "N/A"}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Fax Status</p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        submission.fax_status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : submission.fax_status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {submission.fax_status || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Documents List */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Documents
                  </h4>
                  {submission.documents?.length > 0 ? (
                    <div className="space-y-3">
                      {submission.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {doc.file.split("/").pop() ||
                                  "Unnamed Document"}
                              </p>
                              <p className="text-xs text-gray-500">
                                Type: {doc.document_type || "N/A"}
                              </p>
                            </div>
                          </div>
                          {/* <a
                            href={doc.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm hover:underline"
                          >
                            View
                          </a> */}

                          <a
                            href={`${baseApi}${doc.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm hover:underline"
                          >
                            View
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No documents available
                    </p>
                  )}
                </div>

                {/* Extra Data */}
                {submission.extra_data &&
                  Object.keys(submission.extra_data).length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Additional Information
                      </h4>
                      <pre className="text-sm text-gray-600 bg-white p-3 rounded-md border border-gray-200">
                        {JSON.stringify(submission.extra_data, null, 2)}
                      </pre>
                    </div>
                  )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="h-12 w-12 text-gray-300 mb-2" />
              <p className="text-gray-500">No submissions available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
