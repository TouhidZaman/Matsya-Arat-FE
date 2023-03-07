import { useParams } from "react-router-dom";
import { useGetPaymentsByBuyerIdQuery } from "../../features/payment/paymentsAPI";
import Payments from "../../components/payments/Payments";

const BuyerPayments = () => {
  const { buyerId } = useParams();
  const { data: payments = [], isLoading } = useGetPaymentsByBuyerIdQuery(buyerId);

  return (
    <Payments
      payments={payments}
      isLoading={isLoading}
      title="Buyer Credit Payments"
    />
  );
};

export default BuyerPayments;
