import { useParams } from "react-router-dom";
import Sales from "../../components/sales/Sales";
import { useGetSalesByBuyerIdQuery } from "../../features/saleInvoice/saleInvoicesAPI";

const BuyerSales = () => {
  const { buyerId } = useParams();

  const { data: sales = [], isLoading } = useGetSalesByBuyerIdQuery(buyerId);
  return <Sales sales={sales} isLoading={isLoading} title={`Buyer Sales`} />;
};

export default BuyerSales;
