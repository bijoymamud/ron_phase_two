import { useState } from "react";
import { Search } from "lucide-react";
import {
  useApprovedFormMutation,
  useGetFormsQuery,
  useRejectFormMutation,
} from "../../redux/features/baseApi";
import { FaRegEye } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import { LiaFaxSolid } from "react-icons/lia";

export default function FormView() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const { data: forms, isLoading } = useGetFormsQuery();
  const [approve, { isLoading: approving }] = useApprovedFormMutation();
  const [reject, { isLoading: rejecting }] = useRejectFormMutation();

  const baseURL = "https://backend.valrpro.com";
  const perPage = 15;

  const filtered =
    forms?.filter(
      (f) =>
        f?.user?.user_profile?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        f?.user?.email?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const openDialog = (submission) => {
    setSelected(submission);
    document.getElementById("modal")?.showModal();
  };

  const closeDialog = () => {
    setSelected(null);
    document.getElementById("modal")?.close();
  };

  const handleApprove = async (id) => {
    try {
      await approve({ status: "approved", id }).unwrap();
      toast.success("Approved");
      setSelected((prev) => ({ ...prev, status: "approved" }));
    } catch {
      toast.error("Failed to approve");
    }
  };

  const handleReject = async (id) => {
    try {
      await reject({ status: "rejected", id }).unwrap();
      toast.success("Rejected");
      setSelected((prev) => ({ ...prev, status: "rejected" }));
    } catch {
      toast.error("Failed to reject");
    }
  };

  const getFileName = (path) =>
    path
      ?.split("/")
      .pop()
      ?.replace(/^\d{8}_\d{6}_/, "")
      .replace(/\.pdf$/, "") || "Unknown";

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";

  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    let start = Math.max(1, page - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start + 1 < maxButtons) start = Math.max(1, end - maxButtons + 1);

    if (start > 1)
      buttons.push(
        <span key="ellipsis-start" className="px-2 text-gray-400">
          ...
        </span>
      );

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`w-10 h-10 rounded-lg font-medium transition-all ${
            page === i
              ? "bg-[#0A3161] text-white shadow-md"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages)
      buttons.push(
        <span key="ellipsis-end" className="px-2 text-gray-400">
          ...
        </span>
      );
    return buttons;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-right" richColors />
      <div className="flex justify-end mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search name or email..."
            className="input input-bordered pl-10 w-64 dark:bg-gray-200 dark:text-gray-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : !filtered.length ? (
        <div className="text-center text-gray-500 py-8">
          No submissions found
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-[#0A3161] text-white">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((sub) => (
                  <tr key={sub.id} className="border-b dark:text-gray-900">
                    <td>{sub?.user?.user_profile?.name || "N/A"}</td>
                    <td>{sub?.user?.email || "N/A"}</td>
                    <td>
                      <span
                        className={`badge border-gray-100 shadow-md ${
                          sub?.status === "approved"
                            ? "bg-green-500 text-white"
                            : sub?.status === "rejected"
                              ? "bg-red-500 text-white"
                              : "bg-yellow-500 text-white"
                        }`}
                      >
                        {sub?.status || "pending"}
                      </span>
                    </td>
                    <td>{formatDate(sub?.submission_date)}</td>
                    <td>
                      <button
                        onClick={() => openDialog(sub)}
                        className="dark:bg-white"
                      >
                        <FaRegEye className="h-5 w-5 text-[#0A3161]" />
                      </button>
                      <button>
                        <LiaFaxSolid className="h-5 w-5 text-[#0A3161]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                ← Previous
              </button>
              <div className="flex items-center gap-1">
                {getPaginationButtons()}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      <dialog id="modal" className="modal">
        <div className="modal-box bg-[#002b5c] text-white max-w-2xl">
          <h3 className="text-2xl font-bold mb-6">Submission Details</h3>
          {selected ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm">ID</p>
                  <p>{selected?.id || "N/A"}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Name</p>
                  <p>{selected?.user?.user_profile?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p>{selected?.user?.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Status</p>
                  <span
                    className={`badge ${
                      selected?.status === "approved"
                        ? "bg-green-500"
                        : selected?.status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    } text-white`}
                  >
                    {selected?.status || "pending"}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-white/60 text-sm">Submitted</p>
                  <p>
                    {selected?.submission_date
                      ? new Date(selected.submission_date).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-2">Documents</p>
                {selected?.documents?.length ? (
                  <ul className="space-y-1">
                    {selected.documents.map((doc) => (
                      <li key={doc.id}>
                        <span className="font-medium">
                          {doc.document_type.toUpperCase()}:
                        </span>{" "}
                        <a
                          href={`${baseURL}${doc.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-300 hover:underline"
                        >
                          {getFileName(doc.file)}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/60">No documents</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center">No data</p>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <button className="btn btn-ghost" onClick={closeDialog}>
              Close
            </button>
            <button
              onClick={() => handleApprove(selected?.id)}
              className="btn bg-green-500 hover:bg-green-600 text-white border-0"
              disabled={
                selected?.status !== "pending" || approving || rejecting
              }
            >
              {approving ? "..." : "Accept"}
            </button>
            <button
              onClick={() => handleReject(selected?.id)}
              className="btn bg-red-500 hover:bg-red-600 text-white border-0"
              disabled={
                selected?.status !== "pending" || approving || rejecting
              }
            >
              {rejecting ? "..." : "Reject"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
