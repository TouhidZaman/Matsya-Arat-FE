import apiSlice from "../api/apiSlice";

const paymentsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (payment) => ({
        url: "payments",
        method: "POST",
        body: payment,
      }),
      invalidatesTags: [
        "buyers",
        "customer",
        "paymentsByBuyerId",
        "payments",
        "paymentsByDateGroup",
      ],
    }),
    getPayments: builder.query({
      query: () => `payments`,
      providesTags: ["payments"],
    }),
    getPaymentsByDateGroup: builder.query({
      query: (filter) => `payments/date?` + filter,
      providesTags: ["paymentsByDateGroup"],
    }),
    getPaymentsByBuyerId: builder.query({
      query: (buyerId) => `/payments/buyer/${buyerId}`,
      providesTags: ["paymentsByBuyerId"],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetPaymentsQuery,
  useGetPaymentsByBuyerIdQuery,
  useGetPaymentsByDateGroupQuery,
} = paymentsAPI;
