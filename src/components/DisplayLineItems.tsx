import React from "react";
import { Link } from "react-router-dom";
import {
  formatBangladeshiCurrency,
  getBDFormattedNumber,
  getFormattedQuantity,
} from "../utils/formatNumber";

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
          {`${formatBangladeshiCurrency(item.rate)} * ${getFormattedQuantity(
            item.quantity
          )} = ${formatBangladeshiCurrency(item.subtotal)}`}
        </p>
      ))}
    </div>
  );
}

export default DisplayLineItems;
