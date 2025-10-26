import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "firebase/database";
export const baseUrlToBackend = "https://backend.valrpro.com/"
export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://backend.valrpro.com/",



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
	tagTypes: ["user", "forms", "documents", "userManagement", "plans", "loggedIn", "Support", "requestedChats", "admin"],
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
			providesTags: (result) =>
				result
					? [
						...result.map(({ id }) => ({ type: 'plans', id })),
						{ type: 'plans', id: 'LIST' }
					]
					: [{ type: 'plans', id: 'LIST' }],
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

		//startchat
		startChat: builder.mutation({
			query: (body) => ({
				url: "api/support/start/",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Support"],
		}),

		// send a message to a support chat
		sendMessage: builder.mutation({
			query: ({ chatId, message, type = "text" }) => ({
				url: `api/support/send-message/${chatId}/`,
				method: "POST",
				body: { message, type },
			}),
			invalidatesTags: ["Support"],
		}),



		// optional: fetch active chats for admin/chat list (used by some chat UI)
		getActiveChats: builder.query({
			query: () => "api/support/admin/chat/list/",
			providesTags: ["requestedChats"]
		}),

		//get requested chat
		approveChat: builder.mutation({
			query: (chatId) => ({
				url: `api/support/admin/chat/approve/`,
				method: "POST",
				body: { chat_id: chatId },
			}),
			invalidatesTags: ["requestedChats"],
		}),

		closeChat: builder.mutation({
			query: (chat_id) => ({
				url: "api/support/admin/chat/close/",
				method: "POST",
				body: { chat_id },
			}),
			invalidatesTags: ["Support"],
		}),

		//end chat


		//getchat history
		getHistory: builder.query({
			query: (id) => `api/support/message/list/${id}/`,
			providesTags: ["Support"],
		}),

		getUsers: builder.query({
			query: () => "api/payment/get_all/subscribtions/",
			providesTags: ["loggedIn"],
		}),
		getDashboardInfo: builder.query({
			query: () => "api/dashboard/superadmin/dashboard_view/",
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


		getUserManagement: builder.query({
			query: ({ page = 1, search = '', page_size = 15 }) => ({
				url: "api/dashboard/superadmin/management-users/",
				params: { page, search, page_size }
			}),
			providesTags: ["userManagement"]
		}),

		//admin login 
		adminLogin: builder.mutation({
			query: (adminData) => ({
				url: "api/auth/admin/login/",
				method: "POST",
				body: adminData,

			}),
			invalidatesTags: ["admin"],
		}),


		//filter admin home data

		getFilteredReviewData: builder.query({
			query: (year) => `api/payment/get_all/calculate_yearly_revenue/?year=${year}`,
		}),

		getFilteredSubmissionData: builder.query({
			query: (year) => `api/payment/get_all/calculate_yearly_submissions/?year=${year}`,
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
				url: `api/payment/plan/update/${id}/`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: (result, error, { id }) => [
				{ type: 'plans', id },
				{ type: 'plans', id: 'LIST' }
			],
		}),

		//activity test
		getFilteredActivityTestData: builder.query({
			query: () => "api/dashboard/superadmin/activity-log/",
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



	//admin login
	useAdminLoginMutation,
	//superadmin
	useGetUserManagementQuery,

	//makeAdmin
	useMakeAdminMutation,
	useBlockUserMutation,

	//supcription management
	useEditSubscriptionMutation,
	useGetFilteredReviewDataQuery,
	useGetFilteredSubmissionDataQuery,

	//activity test
	useGetFilteredActivityTestDataQuery,

	//chat
	useStartChatMutation,
	useSendMessageMutation,
	// useGetMessagesQuery,
	useGetActiveChatsQuery,
	useCloseChatMutation,

	//get requested chat
	useApproveChatMutation,
	useGetHistoryQuery,

	

} = baseApi;