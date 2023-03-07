import { useGetPaymentsQuery } from "../features/payment/paymentsAPI";
import Payments from "../components/payments/Payments";

const AllPayments = () => {
  const { data: payments = [], isLoading } = useGetPaymentsQuery(true);

  return (
    <Payments
      payments={payments}
      isLoading={isLoading}
      title="All Buyer Credit Payments"
    />
  );
};

export default AllPayments;
