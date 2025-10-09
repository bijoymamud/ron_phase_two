// import { useState, useEffect } from "react";
// import { LuUserRoundCog } from "react-icons/lu";
// import {
//   useBlockUserMutation,
//   useGetUserManagementQuery,
//   useMakeAdminMutation,
// } from "../../redux/features/baseApi";
// import { toast, Toaster } from "sonner";

// export default function AdminManagement() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);
//   const [loadingUserId, setLoadingUserId] = useState(null);
//   const { data: adminManagement, isLoading } = useGetUserManagementQuery();
//   const [blockUser] = useBlockUserMutation();
//   const [makeAdmin] = useMakeAdminMutation();

//   useEffect(() => {
//     if (adminManagement?.total_users) setUsers(adminManagement.total_users);
//   }, [adminManagement]);

//   const handleRoleChange = async (id) => {
//     setLoadingUserId(id);
//     try {
//       const response = await makeAdmin({ user_id: id }).unwrap();
//       toast.success(response?.message);
//       setUsers((prev) =>
//         prev.map((user) =>
//           user.id === id
//             ? { ...user, role: user.role === "admin" ? "user" : "admin" }
//             : user
//         )
//       );
//     } catch (error) {
//       toast.error(error?.data?.message || "Something went wrong");
//     } finally {
//       setLoadingUserId(null);
//     }
//   };

//   const handleUserActive = async (id) => {
//     console.log(id, "block user");

//     try {
//       const response = await blockUser({ user_id: id }).unwrap();
//       toast.success(response?.message);
//       setUsers((prev) =>
//         prev.map((user) =>
//           user.id === id ? { ...user, is_active: !user.is_active } : user
//         )
//       );
//     } catch (error) {}
//   };

//   const filteredUsers = users?.filter(
//     (user) =>
//       user.user_profile?.name
//         ?.toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       user.id.toString().includes(searchTerm)
//   );

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="loading loading-bars loading-xl"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <Toaster />
//       <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="p-4 border-b  border-gray-200 flex justify-end">
//           <input
//             type="text"
//             placeholder="Search by ID or Name"
//             className="input input-bordered flex items-center justify-end w-[350px] dark:bg-white focus:outline-none border-gray-300"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead>
//               <tr className="bg-[#0A3161] text-white">
//                 <th className="py-3 px-4 text-sm font-semibold">ID</th>
//                 <th className="py-3 px-4 text-sm font-semibold">Name</th>
//                 <th className="py-3 px-4 text-sm font-semibold">Role</th>
//                 <th className="py-3 px-4 text-sm font-semibold">Make Admin</th>
//                 <th className="py-3 px-4 text-sm font-semibold">Block</th>
//               </tr>
//             </thead>
//             <tbody className="[&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(even)]:bg-gray-100">
//               {filteredUsers?.map((user) => (
//                 <tr key={user.id} className="cursor-pointer">
//                   <td className="py-3 px-4 text-sm text-gray-700">{user.id}</td>
//                   <td className="py-3 px-4">
//                     <p className="font-medium text-gray-900">
//                       {user.user_profile?.name}
//                     </p>
//                     <p className="text-xs text-gray-500">{user.joined_date}</p>
//                   </td>
//                   <td className="py-3 px-4">
//                     <span
//                       className={`btn btn-sm border-none rounded-full ${
//                         user.role.toLowerCase() === "user"
//                           ? "bg-[#0A3161]"
//                           : "bg-green-600"
//                       } text-xs font-medium`}
//                     >
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     {loadingUserId === user.id ? (
//                       <span className="loading loading-bars loading-[5px] flex items-center justify-start "></span>
//                     ) : (
//                       <button
//                         onClick={() => handleRoleChange(user.id)}
//                         disabled={loadingUserId === user.id}
//                         className={`btn btn-sm rounded-full ${
//                           user.role === "admin"
//                             ? "btn-error text-white hover:bg-red-600"
//                             : "btn-outline border-none bg-[#0A3161] text-white hover:bg-[#0A3161]/90"
//                         }`}
//                       >
//                         <LuUserRoundCog size={16} className="mr-1" />
//                         {user.role === "admin"
//                           ? "Demote to User"
//                           : "Make Admin"}
//                       </button>
//                     )}
//                   </td>
//                   <td className="py-3 px-4">
//                     <input
//                       type="checkbox"
//                       className="toggle toggle-error dark:bg-gray-500 border-none"
//                       onClick={() => handleUserActive(user.id)}
//                     />
//                   </td>
//                 </tr>
//               ))}
//               {!filteredUsers?.length && (
//                 <tr>
//                   <td colSpan={5} className="text-center text-gray-500 py-8">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { LuUserRoundCog } from "react-icons/lu";
// import {
//   useBlockUserMutation,
//   useGetUserManagementQuery,
//   useMakeAdminMutation,
// } from "../../redux/features/baseApi";
// import { toast, Toaster } from "sonner";

// export default function AdminManagement() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);
//   const [loadingUserId, setLoadingUserId] = useState(null);
//   const [blockingUserId, setBlockingUserId] = useState(null);
//   const { data: adminManagement, isLoading } = useGetUserManagementQuery();
//   console.log(adminManagement, "adminManagement");
//   const [blockUser] = useBlockUserMutation();
//   const [makeAdmin] = useMakeAdminMutation();

//   useEffect(() => {
//     if (adminManagement?.total_users) setUsers(adminManagement.total_users);
//   }, [adminManagement]);

//   const handleRoleChange = async (id) => {
//     setLoadingUserId(id);
//     try {
//       const response = await makeAdmin({ user_id: id }).unwrap();
//       toast.success(response?.message);
//       setUsers((prev) =>
//         prev.map((user) =>
//           user.id === id
//             ? { ...user, role: user.role === "admin" ? "user" : "admin" }
//             : user
//         )
//       );
//     } catch (error) {
//       toast.error(error?.data?.message || "Something went wrong");
//     } finally {
//       setLoadingUserId(null);
//     }
//   };

//   const handleUserActive = async (id) => {
//     setBlockingUserId(id);
//     try {
//       const response = await blockUser({ user_id: id }).unwrap();
//       console.log(response, "block user response");
//       toast.success(response?.message);
//       setUsers((prev) =>
//         prev.map((user) =>
//           user.id === id ? { ...user, is_active: !user.is_active } : user
//         )
//       );
//     } catch (error) {
//       toast.error(error?.data?.message || "Something went wrong");
//     } finally {
//       setBlockingUserId(null);
//     }
//   };

//   const filteredUsers = users?.filter(
//     (user) =>
//       user.user_profile?.name
//         ?.toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       user.id.toString().includes(searchTerm)
//   );

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="loading loading-bars loading-xl"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <Toaster />
//       <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="p-4 border-b  border-gray-200 flex justify-end">
//           <input
//             type="text"
//             placeholder="Search by ID or Name"
//             className="input input-bordered flex items-center justify-end w-[350px] dark:bg-white focus:outline-none border-gray-300"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead>
//               <tr className="bg-[#0A3161] text-white">
//                 <th className="py-3 px-4 text-sm font-semibold">ID</th>
//                 <th className="py-3 px-4 text-sm font-semibold">Name</th>
//                 <th className="py-3 px-4 text-sm font-semibold">Role</th>
//                 <th className="py-3 px-4 text-sm font-semibold">Make Admin</th>
//                 <th className="py-3 px-4 text-sm font-semibold">Block</th>
//               </tr>
//             </thead>
//             <tbody className="[&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(even)]:bg-gray-100">
//               {filteredUsers?.map((user) => (
//                 <tr key={user.id} className="cursor-pointer">
//                   <td className="py-3 px-4 text-sm text-gray-700">{user.id}</td>
//                   <td className="py-3 px-4">
//                     <p className="font-medium text-gray-900">
//                       {user.user_profile?.name}
//                     </p>
//                     <p className="text-xs text-gray-500">{user.joined_date}</p>
//                   </td>
//                   <td className="py-3 px-4">
//                     <span
//                       className={`btn btn-sm border-none rounded-full ${
//                         user.role.toLowerCase() === "user"
//                           ? "bg-[#0A3161]"
//                           : "bg-green-600"
//                       } text-xs font-medium`}
//                     >
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     {loadingUserId === user.id ? (
//                       <span className="loading loading-bars loading-[5px] flex items-center justify-start "></span>
//                     ) : (
//                       <button
//                         onClick={() => handleRoleChange(user.id)}
//                         disabled={loadingUserId === user.id}
//                         className={`btn btn-sm rounded-full ${
//                           user.role === "admin"
//                             ? "btn-error text-white hover:bg-red-600"
//                             : "btn-outline border-none bg-[#0A3161] text-white hover:bg-[#0A3161]/90"
//                         }`}
//                       >
//                         <LuUserRoundCog size={16} className="mr-1" />
//                         {user.role === "admin"
//                           ? "Demote to User"
//                           : "Make Admin"}
//                       </button>
//                     )}
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex items-center gap-2">
//                       {blockingUserId === user.id ? (
//                         <span className="loading loading-spinner loading-sm"></span>
//                       ) : (
//                         <>
//                           <input
//                             type="checkbox"
//                             className="toggle toggle-error dark:bg-gray-500 border-none"
//                             checked={!user.is_active}
//                             onChange={() => handleUserActive(user.id)}
//                             disabled={blockingUserId === user.id}
//                           />
//                           <span className="text-xs font-medium text-gray-700">
//                             {user.is_active ? "Unblocked" : "Blocked"}
//                           </span>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {!filteredUsers?.length && (
//                 <tr>
//                   <td colSpan={5} className="text-center text-gray-500 py-8">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  const { data: adminManagement, isLoading } = useGetUserManagementQuery();
  const [blockUser] = useBlockUserMutation();
  const [makeAdmin] = useMakeAdminMutation();

  useEffect(() => {
    if (adminManagement?.total_users) setUsers(adminManagement.total_users);
  }, [adminManagement]);

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

  const handleUserActive = async (id) => {
    setBlockingUserId(id);
    try {
      const response = await blockUser({ user_id: id }).unwrap();
      toast.success(response?.message);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, is_active: !user.is_active } : user
        )
      );
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setBlockingUserId(null);
    }
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.user_profile?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.id.toString().includes(searchTerm)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Toaster />
      <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b  border-gray-200 flex justify-end">
          <input
            type="text"
            placeholder="Search by ID or Name"
            className="input input-bordered flex items-center justify-end w-[350px] dark:bg-white focus:outline-none border-gray-300"
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
                      className={`btn btn-sm border-none rounded-full ${
                        user.role.toLowerCase() === "user"
                          ? "bg-[#0A3161]"
                          : "bg-green-600"
                      } text-xs font-medium`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {loadingUserId === user.id ? (
                      <span className="loading loading-bars loading-[5px] flex items-center justify-start "></span>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(user.id)}
                        disabled={loadingUserId === user.id}
                        className={`btn btn-sm rounded-full ${
                          user.role === "admin"
                            ? "btn-error text-white hover:bg-red-600"
                            : "btn-outline border-none bg-[#0A3161] text-white hover:bg-[#0A3161]/90"
                        }`}
                      >
                        <LuUserRoundCog size={16} className="mr-1" />
                        {user.role === "admin"
                          ? "Demote to User"
                          : "Make Admin"}
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {blockingUserId === user.id ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <button
                        onClick={() => handleUserActive(user.id)}
                        disabled={blockingUserId === user.id}
                        className={`btn btn-sm rounded-full border-none ${
                          user.is_active
                            ? "btn-error text-white hover:bg-red-600"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {user.is_active ? "Block" : "Unblock"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {!filteredUsers?.length && (
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
