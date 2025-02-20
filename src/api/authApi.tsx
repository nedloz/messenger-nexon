import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/auth" }),
  endpoints: (builder) => ({
    register: builder.mutation<{ user_id: string }, { username: string; email: string; password: string }>(
      {
        query: (userData) => ({
          url: "/register",
          method: "POST",
          body: userData,
        }),
      }
    ),
    login: builder.mutation<{ user_id: string; accessToken: string; refreshToken: string }, { username: string; password: string }>(
      {
        query: (credentials) => ({
          url: "/login",
          method: "POST",
          body: credentials,
        }),
      }
    ),
    refreshToken: builder.mutation<{ accessToken: string }, { refreshToken: string }>(
      {
        query: (refreshToken) => ({
          url: "/refresh",
          method: "POST",
          body: refreshToken,
        }),
      }
    ),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>(
      {
        query: (emailData) => ({
          url: "/forgot-password",
          method: "POST",
          body: emailData,
        }),
      }
    ),
    resetPassword: builder.mutation<{ message: string }, { token: string; newPassword: string }>(
      {
        query: (resetData) => ({
          url: "/reset-password",
          method: "POST",
          body: resetData,
        }),
      }
    ),
    logout: builder.mutation<{ message: string }, void>(
      {
        query: () => ({
          url: "/logout",
          method: "POST",
        }),
      }
    ),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApi;