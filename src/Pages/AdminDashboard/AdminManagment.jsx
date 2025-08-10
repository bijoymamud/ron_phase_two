import { useState } from "react";
import { LuUserMinus, LuUserRoundCog } from "react-icons/lu";

const initialUsers = [
  {
    id: "21526-001",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "User",
    isBlocked: false,
  },
  {
    id: "21526-002",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "Admin",
    isBlocked: false,
  },
  {
    id: "21526-003",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "User",
    isBlocked: false,
  },
  {
    id: "21526-004",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "User",
    isBlocked: false,
  },
  {
    id: "21526-005",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "Admin",
    isBlocked: false,
  },
  {
    id: "21526-006",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "User",
    isBlocked: false,
  },
  {
    id: "21526-007",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "User",
    isBlocked: false,
  },
  {
    id: "21526-008",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "Admin",
    isBlocked: false,
  },
  {
    id: "21526-009",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "User",
    isBlocked: false,
  },
  {
    id: "21526-010",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "User",
    isBlocked: false,
  },
  {
    id: "21526-011",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "Admin",
    isBlocked: false,
  },
  {
    id: "21526-012",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "User",
    isBlocked: false,
  },
  {
    id: "21526-013",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "User",
    isBlocked: false,
  },
  {
    id: "21526-014",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "Admin",
    isBlocked: false,
  },
  {
    id: "21526-015",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "User",
    isBlocked: false,
  },
  {
    id: "21526-016",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "User",
    isBlocked: false,
  },
  {
    id: "21526-017",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "Admin",
    isBlocked: false,
  },
  {
    id: "21526-018",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "User",
    isBlocked: false,
  },
  {
    id: "21526-019",
    name: "Pappu Roy",
    email: "pappu.roy@gmail.com",
    role: "User",
    isBlocked: false,
  },
];

export default function AdminManagment() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRoleChange = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, role: user.role === "User" ? "Admin" : "User" }
          : user
      )
    );
  };

  const handleBlockToggle = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" min-h-screen">
      <div className=" mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b w-[350px] border-gray-200 flex items-center justify-end">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-[#0A3161] text-white">
                <th className="py-3 px-4 text-sm font-semibold">ID</th>
                <th className="py-3 px-4 text-sm font-semibold">Name</th>
                <th className="py-3 px-4 text-sm font-semibold">Role</th>
                <th className="py-3 px-4 text-sm font-semibold">Make Admin</th>
                <th className="py-3 px-4 text-sm font-semibold">Block</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="cursor-pointer">
                  <td className="py-3 px-4 text-sm text-gray-700">{user.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`badge ${
                        user.role === "User" ? "badge-info" : "badge-success"
                      } text-xs font-medium`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {user.role === "User" ? (
                      <button
                        className="btn btn-sm btn-outline bg-[#0A3161] text-white hover:bg-[#0A3161]/90 hover:text-white"
                        onClick={() => handleRoleChange(user.id)}
                      >
                        <LuUserRoundCog size={16} /> Make Admin
                      </button>
                    ) : (
                      <button
                        className="btn btn-md btn-ghost text-gray-600"
                        onClick={() => handleRoleChange(user.id)}
                      >
                        <LuUserMinus size={16} /> Remove Admin
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      className="toggle toggle-error"
                      checked={user.isBlocked}
                      onChange={() => handleBlockToggle(user.id)}
                    />
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
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
