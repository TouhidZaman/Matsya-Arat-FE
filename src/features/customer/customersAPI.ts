import apiSlice from "../api/apiSlice";

const customersAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (customer) => ({
        url: "customers",
        method: "POST",
        body: customer,
      }),
      invalidatesTags: ["customers"],
    }),
    updateCustomer: builder.mutation({
      query: ({ updatedCustomer, customerId }) => ({
        url: "customers/" + customerId,
        method: "PATCH",
        body: updatedCustomer,
      }),
      invalidatesTags: ["customers"],
    }),
    getCustomers: builder.query({
      query: () => `customers`,
      providesTags: ["customers"],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
} = customersAPI;
