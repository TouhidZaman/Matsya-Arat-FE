import apiSlice from "../api/apiSlice";

const customersAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (customer) => ({
        url: "customers",
        method: "POST",
        body: customer,
      }),
      invalidatesTags: ["buyers", "sellers"],
    }),
    updateCustomer: builder.mutation({
      query: ({ updatedCustomer, customerId }) => ({
        url: "customers/" + customerId,
        method: "PATCH",
        body: updatedCustomer,
      }),
      invalidatesTags: ["buyers", "sellers"],
    }),
    getBuyerCustomers: builder.query({
      query: (filterQuery) => `customers?type=buyer` + filterQuery,
      providesTags: ["buyers"],
    }),
    getSellerCustomers: builder.query({
      query: () => `customers?type=seller`,
      providesTags: ["sellers"],
    }),
    getCustomerById: builder.query({
      query: (customerId: string) => `customers/${customerId}`,
      providesTags: ["customer"],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useGetBuyerCustomersQuery,
  useGetSellerCustomersQuery,
  useGetCustomerByIdQuery,
} = customersAPI;
