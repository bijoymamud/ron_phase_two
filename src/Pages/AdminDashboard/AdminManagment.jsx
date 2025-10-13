// import { useState, useEffect, useCallback } from "react";
// import { LuUserRoundCog } from "react-icons/lu";
// import {
//   useBlockUserMutation,
//   useGetUserManagementQuery,
//   useMakeAdminMutation,
// } from "../../redux/features/baseApi";
// import { toast, Toaster } from "sonner";
// import debounce from "lodash/debounce";

// export default function AdminManagement() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);
//   const [loadingUserId, setLoadingUserId] = useState(null);
//   const [blockingUserId, setBlockingUserId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

//   const {
//     data: adminManagement,
//     isLoading,
//     isFetching,
//     refetch,
//   } = useGetUserManagementQuery({
//     page: currentPage,
//     search: debouncedSearchTerm,
//   });

//   const debouncedSetSearch = useCallback(
//     debounce((value) => {
//       setDebouncedSearchTerm(value);
//       setCurrentPage(1);
//     }, 500),
//     []
//   );

//   useEffect(() => {
//     debouncedSetSearch(searchTerm);
//   }, [searchTerm, debouncedSetSearch]);

//   useEffect(() => {
//     if (adminManagement?.results) setUsers(adminManagement.results);
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

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= (adminManagement?.total_pages || 1)) {
//       setCurrentPage(page);
//       refetch({ page, search: debouncedSearchTerm });
//     }
//   };

//   const renderPageNumbers = () => {
//     const totalPages = adminManagement?.total_pages || 1;
//     const pages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`btn btn-sm ${
//             currentPage === i
//               ? "bg-[#0A3161] text-white"
//               : "bg-white text-[#0A3161] border-[#0A3161] hover:bg-[#0A3161] hover:text-white"
//           }`}
//         >
//           {i}
//         </button>
//       );
//     }
//     return pages;
//   };

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
//         <div className="p-4 border-b border-gray-200 flex justify-end">
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
//               {users?.map((user) => (
//                 <tr key={user.id} className="cursor-pointer">
//                   <td className="py-3 px-4 text-sm text-gray-700">{user.id}</td>
//                   <td className="py-3 px-4">
//                     <div className="flex flex-col">
//                       <p className="font-medium text-gray-900">
//                         {user?.user_profile?.name}
//                       </p>
//                       <span className="text-gray-400">{user?.email}</span>
//                     </div>
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
//                       <span className="loading loading-bars loading-[5px] flex items-center justify-start"></span>
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
//                     {blockingUserId === user.id ? (
//                       <span className="loading loading-spinner loading-sm"></span>
//                     ) : (
//                       <button
//                         onClick={() => handleUserActive(user.id)}
//                         disabled={blockingUserId === user.id}
//                         className={`btn btn-sm rounded-full border-none ${
//                           user.is_active
//                             ? "btn-error text-white hover:bg-red-600"
//                             : "bg-green-600 text-white hover:bg-green-700"
//                         }`}
//                       >
//                         {user.is_active ? "Block" : "Unblock"}
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//               {!users?.length && (
//                 <tr>
//                   <td colSpan={5} className="text-center text-gray-500 py-8">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//         {/* Pagination Controls */}
//       </div>
//       <div className="p-4 flex justify-center items-center space-x-2 relative">
//         {isFetching && (
//           <span className="loading loading-bars loading-xl"></span>
//         )}
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={!adminManagement?.previous || isFetching}
//           className="btn btn-sm bg-[#0A3161] text-white hover:bg-[#0A3161]/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
//         >
//           Previous
//         </button>
//         {renderPageNumbers()}
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={!adminManagement?.next || isFetching}
//           className="btn btn-sm bg-[#0A3161] text-white hover:bg-[#0A3161]/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
//         >
//           Next
//         </button>
//         <span className="text-sm ml-4">
//           Page {adminManagement?.current_page || 1} of{" "}
//           {adminManagement?.total_pages || 1} (Total:{" "}
//           {adminManagement?.count || 0} users)
//         </span>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useCallback } from "react";
import { LuUserRoundCog } from "react-icons/lu";
import {
  useBlockUserMutation,
  useGetUserManagementQuery,
  useMakeAdminMutation,
} from "../../redux/features/baseApi";
import { toast, Toaster } from "sonner";
import debounce from "lodash/debounce";

export default function AdminManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [blockingUserId, setBlockingUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const {
    data: adminManagement,
    isLoading,
    isFetching,
    refetch,
  } = useGetUserManagementQuery({
    page: currentPage,
    search: debouncedSearchTerm,
  });

  const [makeAdmin] = useMakeAdminMutation();
  const [blockUser] = useBlockUserMutation();

  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setDebouncedSearchTerm(value);
      setCurrentPage(1);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSetSearch(searchTerm);
  }, [searchTerm, debouncedSetSearch]);

  useEffect(() => {
    if (adminManagement?.results) setUsers(adminManagement.results);
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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= (adminManagement?.total_pages || 1)) {
      setCurrentPage(page);
      refetch({ page, search: debouncedSearchTerm });
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

          <p className="text-gray-600 font-medium">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Toaster position="top-right" richColors />
      <div className=" mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
        {isFetching && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        )}
        <div className="p-6 border-b border-gray-200 flex justify-end">
          <input
            type="text"
            placeholder="Search by ID or Name"
            className="w-full max-w-md px-4 py-2 bg-white dark:bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0A3161] focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
              {users?.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 transition-colors duration-150"
                >
                  <td className="py-4 px-6 text-sm text-gray-700">{user.id}</td>
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
                          user.is_active
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-green-600 text-white hover:bg-green-700"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {user.is_active ? "Block" : "Unblock"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {!users?.length && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-12">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {!isLoading && !isFetching && (
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
