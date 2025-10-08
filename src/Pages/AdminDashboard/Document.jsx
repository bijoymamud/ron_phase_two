import { useState } from "react";
import { Search } from "lucide-react";
import { VscFilePdf } from "react-icons/vsc";
import { Toaster } from "sonner";
import { useGetDocumentsQuery } from "../../redux/features/baseApi";
import { FaRegEye } from "react-icons/fa";

export default function Document() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActionTaken, setIsActionTaken] = useState(false);
  const { data: allDocuments, isLoading } = useGetDocumentsQuery();

  const baseURL = "http://10.10.13.73:2000";

  console.log("documents", allDocuments);

  const filteredDocuments = allDocuments?.filter(
    (doc) =>
      doc.document_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.user_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (doc) => {
    setSelectedDocument(doc);
    setIsActionTaken(doc?.status === "Approved" || doc?.status === "Rejected");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
    setIsActionTaken(false);
  };

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
              placeholder="Search"
              className="input input-bordered pl-10 w-64 dark:bg-white dark:border dark:border-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64 z-50">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        ) : !allDocuments || allDocuments.length === 0 ? (
          <div className="text-center text-gray-500">No documents found.</div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr className="bg-[#0A3161] text-white">
                <th className="py-3 px-4">Document</th>
                <th className="py-3 px-4">Uploaded By</th>
                <th className="py-3 px-4">Upload Date</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="border-b dark:text-gray-900">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <VscFilePdf size={20} />
                    {doc.document_name || "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{doc.user_name || "N/A"}</p>
                      <p className="text-sm text-gray-500">
                        {doc.user_email || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {doc?.created_at
                      ? new Date(doc.created_at).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className=" dark:bg-white"
                      onClick={() => openModal(doc)}
                    >
                      <FaRegEye className="h-5 w-5 text-[#0A3161] " />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedDocument && (
        <div className="modal modal-open backdrop-blur-[2px]">
          <div className="modal-box bg-[#002b5c] text-white max-w-2xl p-8 rounded-xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Document Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="font-semibold text-white/80">
                  Document ID:
                </span>
                <span>{selectedDocument.id || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white/80">
                  Uploaded By:
                </span>
                <span>{selectedDocument.user_name || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white/80">Email:</span>
                <span>{selectedDocument.user_email || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white/80">
                  Document Name:
                </span>
                <span>{selectedDocument.document_name || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white/80">
                  Document Type:
                </span>
                <span>{selectedDocument.document_type || "N/A"}</span>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="font-semibold text-white/80">Document:</span>
                {selectedDocument?.file_url ? (
                  <a
                    href={`${baseURL}${selectedDocument.file_url}`}
                    target="_blank"
                    // rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {getFileName(selectedDocument.file_url)}
                  </a>
                ) : (
                  <span className="text-white/80">No document available.</span>
                )}
              </div>
            </div>
            <div className="modal-action mt-6 w-full flex justify-end gap-4">
              <button
                className="btn btn-outline text-white hover:bg-white/10 px-6 py-2"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
