import React from "react";
import { X, FileText } from "lucide-react";

export default function DocumentsModal({ documents, isOpen, onClose }) {
  const baseApi = "http://10.10.13.73:5000";

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

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
          <h2 className="text-xl font-bold text-gray-800">All Documents</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Documents Content */}
        <div className="p-4 space-y-6">
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div
                key={doc.va_form_id || index}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  VA Form #{doc.va_form_id}
                </h3>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">VA Form ID</p>
                  <p className="font-medium text-gray-800">
                    {doc.va_form_id || "N/A"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Associated Documents
                  </h4>
                  {doc.documents?.length > 0 ? (
                    <div className="space-y-3">
                      {doc.documents.map((subDoc) => (
                        <div
                          key={subDoc.id}
                          className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {subDoc.file?.split("/").pop() ||
                                  "Unnamed Document"}
                              </p>
                              <p className="text-xs text-gray-500">
                                Type: {subDoc.document_type || "N/A"}
                              </p>
                            </div>
                          </div>
                          {subDoc.file && (
                            // <a
                            //   href={subDoc.file}
                            //   target="_blank"
                            //   rel="noopener noreferrer"
                            //   className="text-blue-600 text-sm hover:underline"
                            // >
                            //   View
                            // </a>

                            <a
                              href={`${baseApi}${subDoc.file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 text-sm hover:underline"
                            >
                              View
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No associated documents available
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="h-12 w-12 text-gray-300 mb-2" />
              <p className="text-gray-500">No documents available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
