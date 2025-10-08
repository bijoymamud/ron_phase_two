// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { useLoggedInUserMutation } from "../../redux/features/baseApi";
// import { toast, Toaster } from "sonner";

// const AdminLogin = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [loggedInUser, { isLoading }] = useLoggedInUserMutation();
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loginError, setLoginError] = useState(null);

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     setLoginError(null);
//     const { email, password } = data;
//     const userData = { email, password };

//     try {
//       const response = await loggedInUser(userData).unwrap();
//       console.log(response, "admin");
//       localStorage.setItem("access_token", response?.access_token);
//       localStorage.setItem("refresh_token", response?.refresh_token);
//       localStorage.setItem("role", response?.role);

//       toast.success("Login successful!");

//       setTimeout(() => {
//         setIsSubmitting(false);
//         navigate("/admin");
//       }, 1000);
//     } catch (error) {
//       console.error("Admin login error", error);
//       setIsSubmitting(false);

//       const message =
//         error?.data?.non_field_errors?.[0] || "Login failed. Please try again.";
//       toast.error(message);
//     }
//   };

//   return (
//     <section className="min-h-screen">
//       <Toaster />
//       <div className="flex items-center">
//         <div className="basis-6/12 bg-[#0A3161] h-screen flex flex-col items-center justify-center">
//           <img
//             src="https://i.ibb.co.com/RZzJHnG/Group-2147225243.png"
//             alt="logo"
//           />
//         </div>

//         <div className="basis-8/12 h-screen flex flex-col justify-center items-center bg-white">
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="text-[#0A3161] md:p-8 rounded-lg w-full md:max-w-lg"
//           >
//             <h2 className="md:text-4xl text-3xl font-bold mb-10 text-start uppercase">
//               Login
//             </h2>

//             {loginError && (
//               <p className="text-red-500 text-sm mb-4">{loginError}</p>
//             )}

//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-semibold">
//                 Your Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full p-3 border bg-white border-gray-300 rounded-lg mt-2"
//                 placeholder="Enter Email"
//                 {...register("email", {
//                   required: "Email is required",
//                 })}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs">{errors.email.message}</p>
//               )}
//             </div>

//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-semibold">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full p-3 border bg-white border-gray-300 rounded-lg mt-2"
//                 placeholder="Enter Password"
//                 {...register("password", {
//                   required: "Password is required",
//                 })}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-xs">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             <input type="hidden" {...register("role")} value="admin" />

//             <div className="flex justify-end hover:underline items-center mb-4">
//               <Link
//                 to="/recovery"
//                 className="text-sm text-[#B31942] font-medium"
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               className="w-full p-3 bg-[#B31942] uppercase text-white rounded-lg font-semibold hover:bg-[#af2a4d] transition flex items-center justify-center"
//               disabled={isSubmitting || isLoading}
//             >
//               {isSubmitting || isLoading ? (
//                 <span className="loading loading-bars loading-md"></span>
//               ) : (
//                 "Login"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AdminLogin;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  useLoggedInUserMutation,
  useGetLoggedUserQuery,
} from "../../redux/features/baseApi";
import { useDispatch } from "react-redux";
import { baseApi } from "../../redux/features/baseApi";
import { toast, Toaster } from "sonner";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const { refetch } = useGetLoggedUserQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loggedInUser, { isLoading }] = useLoggedInUserMutation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setLoginError(null);
    const { email, password } = data;
    const userData = { email, password };

    try {
      const response = await loggedInUser(userData).unwrap();
      console.log("Login response:", response); // Debug response
      localStorage.setItem("access_token", response?.access_token);
      localStorage.setItem("refresh_token", response?.refresh_token);
      localStorage.setItem("role", response?.role);

      // Invalidate cache and refetch user data
      dispatch(baseApi.util.invalidateTags(["user"]));
      await refetch();

      toast.success("Login successful!");

      setIsSubmitting(false);
      navigate("/admin");
    } catch (error) {
      console.error("Admin login error", error);
      setIsSubmitting(false);
      const message =
        error?.data?.non_field_errors?.[0] || "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <section className="min-h-screen">
      <Toaster />
      <div className="flex items-center">
        <div className="basis-6/12 bg-[#0A3161] h-screen flex flex-col items-center justify-center">
          <img
            src="https://i.ibb.co.com/RZzJHnG/Group-2147225243.png"
            alt="logo"
          />
        </div>

        <div className="basis-8/12 h-screen flex flex-col justify-center items-center bg-white">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-[#0A3161] md:p-8 rounded-lg w-full md:max-w-lg"
          >
            <h2 className="md:text-4xl text-3xl font-bold mb-10 text-start uppercase">
              Login
            </h2>

            {loginError && (
              <p className="text-red-500 text-sm mb-4">{loginError}</p>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border bg-white border-gray-300 rounded-lg mt-2"
                placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border bg-white border-gray-300 rounded-lg mt-2"
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <input type="hidden" {...register("role")} value="admin" />

            <div className="flex justify-end hover:underline items-center mb-4">
              <Link
                to="/recovery"
                className="text-sm text-[#B31942] font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-[#B31942] uppercase text-white rounded-lg font-semibold hover:bg-[#af2a4d] transition flex items-center justify-center"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? (
                <span className="loading loading-bars loading-md"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
