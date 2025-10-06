import { useState, useCallback, memo } from "react";
import { useGetPdfsQuery } from "../../redux/features/baseApi";
import { FaRegEye } from "react-icons/fa";
import PropTypes from "prop-types";

const ITEMS_PER_PAGE = 10;
const BASE_URL = "https://backend.valrpro.com";

const VAForm = memo(() => {
  const { data: pdfs, isLoading } = useGetPdfsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState({
    isOpen: false,
    selectedPdf: null,
  });

  const handlePageChange = useCallback(
    (newPage) => {
      if (
        newPage >= 1 &&
        newPage <= Math.ceil((pdfs?.length || 0) / ITEMS_PER_PAGE)
      ) {
        setCurrentPage(newPage);
      }
    },
    [pdfs]
  );

  const openModal = useCallback((pdf) => {
    setModalState({ isOpen: true, selectedPdf: pdf });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, selectedPdf: null });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 flex flex-col items-center justify-center px-4 dark:bg-white bg-white dark:text-black text-black">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
          Loading...
        </h2>
      </div>
    );
  }

  if (!pdfs?.length) {
    return (
      <div className="min-h-screen py-20 flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
          No Data Found
        </h2>
        <p className="text-gray-500 mt-2 text-center">
          No PDF records available.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(pdfs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = pdfs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen py-20 pt-24 md:pt-32 px-4 flex flex-col items-center w-full bg-white mt-20 ">
      <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800">
        VA Form PDFs
      </h2>

      <div className="w-full max-w-full md:max-w-7xl overflow-x-auto">
        <table className="w-full shadow-sm rounded-lg border border-gray-200 text-sm md:text-base">
          <thead className="bg-[#0B2A52] text-white">
            <tr>
              <th className="py-3 px-2 md:px-4 text-left font-semibold hidden md:table-cell">
                #
              </th>
              <th className="py-3 px-2 md:px-4 text-left font-semibold">
                Submitted By
              </th>
              <th className="py-3 px-2 md:px-4 text-left font-semibold hidden md:table-cell">
                Date
              </th>
              <th className="py-3 px-2 md:px-4 text-left font-semibold">
                Status
              </th>
              <th className="py-3 px-2 md:px-4 text-left font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((pdf, index) => (
              <tr
                key={pdf.id || index}
                className="hover:bg-indigo-50 cursor-pointer transition-colors"
              >
                <td className="py-3 px-2 md:px-4 hidden md:table-cell text-black">
                  {startIndex + index + 1}
                </td>
                <td className="py-3 px-2 md:px-4 text-black">
                  <div className="md:hidden text-xs">
                    #{startIndex + index + 1} •{" "}
                    {new Date(pdf.submission_date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  {pdf?.user?.user_profile?.name || "Unnamed"}
                </td>
                <td className="py-3 px-2 md:px-4 hidden md:table-cell text-black">
                  {new Date(pdf.submission_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 px-2 md:px-4 capitalize text-black">
                  {pdf.status}
                </td>
                <td className="py-3 px-2 md:px-4 flex items-center gap-2 text-indigo-600">
                  <FaRegEye className="text-base md:text-lg" />
                  <span
                    className="text-sm md:text-base cursor-pointer"
                    onClick={() => openModal(pdf)}
                  >
                    View
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mt-6">
          <button
            className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg py-1 px-3 md:px-4 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            « Prev
          </button>
          <span className="text-sm md:text-lg text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg py-1 px-3 md:px-4 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next »
          </button>
        </div>
      </div>

      {modalState.isOpen && modalState.selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="w-full max-w-[95%] sm:max-w-lg md:max-w-3xl bg-white p-4 md:p-5 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
              PDF Details
            </h3>
            <table className="w-full mb-4 text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr className="text-gray-800 dark:text-gray-800">
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">VA Form</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {modalState.selectedPdf.documents?.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-gray-50 cursor-pointer text-gray-800 dark:text-gray-800"
                  >
                    <td className="p-2">{doc.document_type}</td>
                    <td className="p-2">
                      {doc.file
                        .split("/")
                        .pop()
                        ?.replace(/^\d+_\d+_/, "")
                        .replace(/\.[^/.]+$/, "")}
                    </td>
                    <td className="p-2">
                      <a
                        href={`${BASE_URL}${doc.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm bg-blue-600 dark:border-none text-white hover:bg-blue-700"
                      >
                        View PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                className="btn btn-sm bg-red-600 dark:border-none text-white hover:bg-red-700"
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
});

VAForm.propTypes = {
  pdfs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      user: PropTypes.shape({
        user_profile: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
      submission_date: PropTypes.string,
      status: PropTypes.string,
      documents: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          document_type: PropTypes.string,
          va_form: PropTypes.string,
          file: PropTypes.string,
        })
      ),
    })
  ),
};

export default VAForm;
