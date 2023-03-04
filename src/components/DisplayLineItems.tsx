import React from "react";
import { Link } from "react-router-dom";
import { formatBangladeshiCurrency } from "../utils/formatNumber";

type DLIProps = { lineItems: any; isSeller?: boolean };

function DisplayLineItems({ lineItems, isSeller }: DLIProps) {
  return (
    <div>
      {lineItems.map((item: any, index: number) => (
        <p key={item.id}>
          {isSeller ? null : (
            <>
              <Link to={`/sellers/${item.sellerId}`}>{item.sellerName} </Link>
              {" : "}
            </>
          )}
          {`${formatBangladeshiCurrency(item.rate)} * ${
            item.quantity
          } Kg = ${formatBangladeshiCurrency(item.subtotal)}`}
        </p>
      ))}
    </div>
  );
}

export default DisplayLineItems;
