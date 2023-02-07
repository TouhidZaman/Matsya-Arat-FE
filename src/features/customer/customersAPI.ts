import apiSlice from "../api/apiSlice";

const customersAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCustomer: builder.mutation({
      query: (customer) => ({
        url: "customers",
        method: "POST",
        body: customer,
      }),
      invalidatesTags: ["customers"],
    }),
    getCustomers: builder.query({
      query: () => `customers`,
      providesTags: ["customers"],
    }),
  }),
});

export const { useAddCustomerMutation, useGetCustomersQuery } = customersAPI;
