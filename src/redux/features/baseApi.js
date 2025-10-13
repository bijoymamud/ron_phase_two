import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://10.10.13.73:2000/",
		prepareHeaders: (headers, { endpoint }) => {
			const authEndpoints = [
				"createUser",
				"loggedInUser",
				"forgetPassword",
				"otpVerification",
				"resetPassword",
			];

			if (!authEndpoints.includes(endpoint)) {
				const token = localStorage.getItem("access_token");
				if (token) {
					headers.set("Authorization", `Bearer ${token}`);
				}
			}
			return headers;
		},
	}),
	tagTypes: ["user", "forms", "documents", "userManagement"],
	endpoints: (builder) => ({
		createUser: builder.mutation({
			query: (userData) => ({
				url: "api/auth/register/",
				method: "POST",
				body: userData,
			}),
		}),
		loggedInUser: builder.mutation({
			query: (userData) => ({
				url: "api/auth/login/",
				method: "POST",
				body: userData,
				provideTags: ["user"],
			}),
		}),
		getLoggedUser: builder.query({
			query: () => "api/auth/profile/",
		}),
		forgetPassword: builder.mutation({
			query: (email) => ({
				url: "api/auth/otp/create/",
				method: "POST",
				body: email,
			}),
		}),
		otpVerification: builder.mutation({
			query: ({ email, otp }) => ({
				url: "api/auth/otp/verify/",
				method: "POST",
				body: { email, otp },
			}),
		}),
		resetPassword: builder.mutation({
			query: (payload) => ({
				url: "api/auth/password-reset/request/",
				method: "POST",
				body: payload,
			}),
		}),
		changePassword: builder.mutation({
			query: (payload) => ({
				url: "api/auth/password-reset/confirm/",
				method: "POST",
				body: payload
			})
		}),
		getPlans: builder.query({
			query: () => "api/payment/get_all/subscribtions-plan/",
		}),
		contactForm: builder.mutation({
			query: (formData) => ({
				url: "api/va/email/get_in_touch_today/",
				method: "POST",
				body: formData,
			}),
		}),
		paymentCheckout: builder.mutation({
			query: (payload) => ({
				url: "api/payment/create-checkout-session/",
				method: "POST",
				body: payload,
			}),
		}),
		generateNarration: builder.mutation({
			query: (narratioData) => ({
				url: "api/va/narration/narration_genarate/",
				method: "POST",
				body: narratioData,
			}),
		}),
		getIntouchToday: builder.mutation({
			query: (payload) => ({
				url: "api/va/email/get_in_touch_today/",
				method: "POST",
				body: payload,
			}),
		}),
		startChat: builder.mutation({
			query: (subject) => ({
				url: "api/support/start-chat/",
				method: "POST",
				body: { subject },
			}),
		}),
		sendMessage: builder.mutation({
			query: ({ chatId, message, type = "text" }) => ({
				url: `api/support/send-message/${chatId}/`,
				method: "POST",
				body: { message, type },
			}),
		}),
		getMessages: builder.query({
			query: (chatId) => `api/support/get-messages/${chatId}/`,
		}),
		getActiveChats: builder.query({
			query: () => "/api/support/admin/active-chats/",
		}),
		getUsers: builder.query({
			query: () => "api/payment/get_all/subscribtions/",
			providesTags: ["loggedIn"],
		}),
		getDashboardInfo: builder.query({
			query: () => "api/payment/get_all/calculate_for_dashboard/",
		}),
		monthlyRevenue: builder.query({
			query: () => "api/payment/get_all/calculate_yearly_revenue/",
		}),
		getPdfs: builder.query({
			query: () => "api/va/vaform/generated/list/",
		}),
		getPaymentList: builder.query({
			query: () => "api/dashboard/payments/list/",
		}),
		uploadDDOneFour: builder.mutation({
			query: (data) => ({
				url: "api/vaform/submit/",
				method: "POST",
				body: data,
			}),
		}),
		updateUserProfile: builder.mutation({
			query: ({ data, id }) => ({
				url: `api/auth/profile/`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["loggedIn"],
		}),
		getForms: builder.query({
			query: () => "api/dashboard/forms/review/",
			providesTags: ["forms"],
		}),
		approvedForm: builder.mutation({
			query: ({ status, id }) => ({
				url: `api/dashboard/forms/${id}/status/`,
				method: "PUT",
				body: { status },
			}),
			invalidatesTags: ["forms"],
		}),
		rejectForm: builder.mutation({
			query: ({ status, id }) => ({
				url: `api/dashboard/forms/${id}/status/`,
				method: "PUT",
				body: { status },
			}),
			invalidatesTags: ["forms"],
		}),
		getDocuments: builder.query({
			query: () => "api/dashboard/documents/list/",
			providesTags: ["documents"],
		}),
		closeChat: builder.mutation({
			query: ({ chatId }) => ({
				url: `/api/support/close-chat/${chatId}/`,
				method: "POST",
			})
		}),

		// //superadmin
		// getUserManagement: builder.query({
		// 	query: () => "api/dashboard/superadmin/management-users/",
		// 	providesTags: ["userManagement"]
		// }),

		getUserManagement: builder.query({
			query: ({ page = 1, search = '', page_size = 15 }) => ({
				url: "api/dashboard/superadmin/management-users/",
				params: { page, search, page_size }
			}),
			providesTags: ["userManagement"]
		}),

		//admin management
		makeAdmin: builder.mutation({
			query: (id) => ({
				url: "api/dashboard/superadmin/role-change/",
				method: "PUT",
				body: id
			}),
			invalidatesTags: ["userManagement"]
		}),

		blockUser: builder.mutation({
			query: (id) => ({
				url: "api/dashboard/superadmin/block-unblock-user/",
				method: "PUT",
				body: id
			}),
			invalidatesTags: ["userManagement"]
		}),

		//subcription management
		editSubscription: builder.mutation({
			query: ({ id, data }) => ({
				url: `payment/plan/update/${id}/`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["plans"]
		}),
	}),
});

export const {
	useCreateUserMutation,
	useLoggedInUserMutation,
	useGetLoggedUserQuery,
	useForgetPasswordMutation,
	useOtpVerificationMutation,
	useChangePasswordMutation,
	useResetPasswordMutation,
	useGetPlansQuery,
	useGetIntouchTodayMutation,
	useContactFormMutation,
	usePaymentCheckoutMutation,
	useGenerateNarrationMutation,
	useSendMessageMutation,
	useStartChatMutation,
	useGetMessagesQuery,
	useGetActiveChatsQuery,
	useGetUsersQuery,
	useGetDashboardInfoQuery,
	useMonthlyRevenueQuery,
	useGetPdfsQuery,
	useGetPaymentListQuery,
	useUploadDDOneFourMutation,
	useUpdateUserProfileMutation,
	useGetFormsQuery,
	useApprovedFormMutation,
	useRejectFormMutation,
	useGetDocumentsQuery,
	useCloseChatMutation,

	//superadmin
	useGetUserManagementQuery,

	//makeAdmin
	useMakeAdminMutation,
	useBlockUserMutation
} = baseApi;