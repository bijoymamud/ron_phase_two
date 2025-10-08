import { useState, useEffect } from "react";
import { LuUserMinus, LuUserRoundCog } from "react-icons/lu";
import { useGetUserManagementQuery } from "../../redux/features/baseApi";

export default function AdminManagment() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: adminManagement, isLoading } = useGetUserManagementQuery();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (adminManagement?.total_users) {
      setUsers(adminManagement.total_users);
    }
  }, [adminManagement]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  const filteredUsers = users?.filter(
    (user) =>
      user.user_profile?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.id.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b w-[350px] border-gray-200 flex items-center justify-end">
          <input
            type="text"
            placeholder="Search by ID or Name"
            className="input input-bordered dark:bg-white dark:border dark:border-gray-900 w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-[#0A3161] text-white">
                <th className="py-3 px-4 text-sm font-semibold">ID</th>
                <th className="py-3 px-4 text-sm font-semibold">Name</th>
                <th className="py-3 px-4 text-sm font-semibold">Role</th>
                <th className="py-3 px-4 text-sm font-semibold">Make Admin</th>
                <th className="py-3 px-4 text-sm font-semibold">Block</th>
              </tr>
            </thead>
            <tbody className="[&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(even)]:bg-gray-100">
              {filteredUsers?.map((user) => (
                <tr key={user.id} className="cursor-pointer">
                  <td className="py-3 px-4 text-sm text-gray-700">{user.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">
                      {user.user_profile?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.joined_date}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`badge ${
                        user.role.toLowerCase() === "user"
                          ? "bg-[#0A3161]"
                          : "badge-success"
                      } text-xs font-medium`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="btn btn-sm btn-outline bg-[#0A3161] text-white hover:bg-[#0A3161]/90 hover:text-white"
                      onClick={() => handleRoleChange(user.id)}
                    >
                      <LuUserRoundCog size={16} /> Make Admin
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      className="toggle toggle-error dark:bg-gray-500 border-none"
                      checked={user.isBlocked}
                      onChange={() => handleBlockToggle(user.id)}
                    />
                  </td>
                </tr>
              ))}
              {filteredUsers?.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-8">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
