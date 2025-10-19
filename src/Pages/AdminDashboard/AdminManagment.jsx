import { useState, useEffect } from "react";
import { LuUserRoundCog } from "react-icons/lu";
import {
  useBlockUserMutation,
  useGetUserManagementQuery,
  useMakeAdminMutation,
} from "../../redux/features/baseApi";
import { toast, Toaster } from "sonner";

export default function AdminManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [blockingUserId, setBlockingUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: adminManagement, isLoading } = useGetUserManagementQuery({
    page: currentPage,
  });
  console.log(adminManagement, "admin");
  const [makeAdmin] = useMakeAdminMutation();
  const [blockUser] = useBlockUserMutation();

  useEffect(() => {
    if (adminManagement?.results) {
      setUsers(adminManagement.results);
    }
  }, [adminManagement]);

  // 🔹 local search filter (frontend filtering)
  const filteredUsers = users?.filter((user) => {
    const name = user?.user_profile?.name?.toLowerCase() || "";
    const email = user?.email?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return name.includes(term) || email.includes(term);
  });

  // 🔹 make or remove admin
  const handleRoleChange = async (id) => {
    setLoadingUserId(id);
    try {
      const response = await makeAdmin({ user_id: id }).unwrap();
      toast.success(response?.message);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? { ...user, role: user.role === "admin" ? "user" : "admin" }
            : user
        )
      );
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setLoadingUserId(null);
    }
  };

  // 🔹 block or unblock user
  const handleUserActive = async (id) => {
    setBlockingUserId(id);
    try {
      const response = await blockUser({ user_id: id }).unwrap();
      toast.success(response?.message);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, is_blocked: !user.is_blocked } : user
        )
      );
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setBlockingUserId(null);
    }
  };

  // 🔹 pagination logic
  const handlePageChange = (page) => {
    if (page >= 1 && page <= (adminManagement?.total_pages || 1)) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const totalPages = adminManagement?.total_pages || 1;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            currentPage === i
              ? "bg-[#0A3161] text-white"
              : "bg-white text-[#0A3161] border border-[#0A3161] hover:bg-[#0A3161] hover:text-white"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-bars loading-xl"></span>
          <p className="text-gray-600 font-medium">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <div className="mx-auto bg-white rounded-xl border overflow-hidden">
        {/* 🔍 Search Bar */}
        <div className="p-6 border-b border-gray-200 flex justify-end">
          <input
            type="text"
            placeholder="Search by Name or Email"
            className="w-full max-w-md px-4 py-2 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0A3161] focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 📋 Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0A3161] text-white">
                <th className="py-4 px-6 text-sm font-semibold text-left">
                  ID
                </th>
                <th className="py-4 px-6 text-sm font-semibold text-left">
                  Name
                </th>
                <th className="py-4 px-6 text-sm font-semibold text-left">
                  Role
                </th>
                <th className="py-4 px-6 text-sm font-semibold text-left">
                  Make Admin
                </th>
                <th className="py-4 px-6 text-sm font-semibold text-left">
                  Block
                </th>
              </tr>
            </thead>
            <tbody className="[&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(even)]:bg-gray-50">
              {filteredUsers?.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-100 transition-colors duration-150"
                  >
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {user.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <p className="font-medium text-gray-900">
                          {user?.user_profile?.name}
                        </p>
                        <span className="text-gray-500 text-sm">
                          {user?.email}
                        </span>
                        <p className="text-xs text-gray-400">
                          {user.joined_date}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.role.toLowerCase() === "user"
                            ? "bg-[#0A3161] text-white"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {loadingUserId === user.id ? (
                        <span className="loading loading-spinner loading-sm text-[#0A3161]"></span>
                      ) : (
                        <button
                          onClick={() => handleRoleChange(user.id)}
                          disabled={loadingUserId === user.id}
                          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            user.role === "admin"
                              ? "bg-red-600 text-white hover:bg-red-700"
                              : "bg-[#0A3161] text-white hover:bg-[#0A3161]/90"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <LuUserRoundCog size={16} className="mr-2" />
                          {user.role === "admin"
                            ? "Demote to User"
                            : "Make Admin"}
                        </button>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {blockingUserId === user.id ? (
                        <span className="loading loading-spinner loading-sm text-[#0A3161]"></span>
                      ) : (
                        <button
                          onClick={() => handleUserActive(user.id)}
                          disabled={blockingUserId === user.id}
                          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            user.is_blocked
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-red-600 text-white hover:bg-red-700"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {user.is_blocked ? "Unblock" : "Block"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-12">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 🔢 Pagination */}
        {!isLoading && (
          <div className="p-6 flex justify-center items-center space-x-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!adminManagement?.previous}
              className="px-4 py-2 bg-[#0A3161] text-white rounded-lg hover:bg-[#0A3161]/90 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!adminManagement?.next}
              className="px-4 py-2 bg-[#0A3161] text-white rounded-lg hover:bg-[#0A3161]/90 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <span className="text-sm text-gray-600">
              Page {adminManagement?.current_page || 1} of{" "}
              {adminManagement?.total_pages || 1} (Total:{" "}
              {adminManagement?.count || 0} users)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
