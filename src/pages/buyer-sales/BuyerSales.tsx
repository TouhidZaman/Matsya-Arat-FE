import { useNavigate, useParams } from "react-router-dom";
import Sales from "../../components/sales/Sales";
import classes from "./BuyerSales.module.css";
import { useGetSalesByBuyerIdQuery } from "../../features/saleInvoice/saleInvoicesAPI";
import CustomerTopView from "../../components/customers/CustomerTopView";

const BuyerSales = () => {
  const { buyerId } = useParams();

  const { data: sales = [], isLoading } = useGetSalesByBuyerIdQuery(buyerId);
  return (
    <section className={classes.buyerView}>
      <CustomerTopView customerType="buyer" />
      <Sales sales={sales} isLoading={isLoading} title={`Buyer Sales`} />;
    </section>
  );
};

export default BuyerSales;
