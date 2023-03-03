import { useGetSalesQuery } from "../../features/saleInvoice/saleInvoicesAPI";
import Sales from "../../components/sales/Sales";

const AllSales = () => {
  const { data: sales = [], isLoading } = useGetSalesQuery(true);

  return <Sales sales={sales} isLoading={isLoading} title="All Sales of Buyers" />;
};

export default AllSales;
