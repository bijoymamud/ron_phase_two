import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Ellipsis,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGetUsersQuery } from "../../redux/features/baseApi";
import UserModal from "./Modal/UserModal";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const { data: allUsers = [], isLoading, isError } = useGetUsersQuery();
  console.log("allUsers", allUsers);

  // Search and filter users
  const filteredUsers = useMemo(() => {
    if (!allUsers) return [];
    return allUsers.filter((user) => {
      const name = user.user?.user_profile?.name?.toLowerCase() || "";
      const email = user.user?.email?.toLowerCase() || "";
      return (
        name.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase())
      );
    });
  }, [allUsers, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
    document.body.classList.add("overflow-hidden");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("overflow-hidden");
    setTimeout(() => {
      setSelectedUserId(null);
    }, 300);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isError) {
    return (
      <div className="text-red-500 text-center py-8">Error loading users</div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>

      {/* Header with Search, Filter */}
      <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto ">
          <div className="relative w-full sm:w-64 ">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full px-4 py-2 pl-10 border bg-white border-gray-300 rounded-lg transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0A3161] text-white">
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Account Status</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Join Date</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, index) => (
                  <tr
                    key={user.id || index}
                    className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-800">
                          {user.user?.user_profile?.name || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {user.user?.email || "N/A"}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === "Active" || user.status === "premium"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.status || "N/A"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {user.user?.role || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {user.user?.user_profile?.joined_date
                        ? new Date(
                            user.user.user_profile.joined_date
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        onClick={() => openModal(user.id)}
                        aria-label={`View details for ${user.user?.user_profile?.name || "user"}`}
                      >
                        <Ellipsis className="h-5 w-5 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No users found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * usersPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * usersPerPage, filteredUsers.length)}
                </span>{" "}
                of <span className="font-medium">{filteredUsers.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft />
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={page + 1}
                    onClick={() => handlePageChange(page + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page + 1 ? "bg-blue-600 text-white" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"} focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
                  >
                    {page + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* User Modal */}
      <UserModal
        userInfo={allUsers}
        selectedUserId={selectedUserId}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
}
