// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";



function Order() {
  const order = useLoaderData()
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  console.log(order)
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Durum</h2>

        <div>
          {priority && <span>Öncelikli</span>}
          <span>{status} siparişi</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Tahmini ${calcMinutesLeft(estimatedDelivery)} dakika içinde teslim edilecek 😃`
            : "Sipariş teslim edilmiş olmalı"}
        </p>
        <p>(Tahmini teslimat: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Pizza ücreti: {formatCurrency(orderPrice)}</p>
        {priority && <p>Öncelik ücreti: {formatCurrency(priorityPrice)}</p>}
        <p>Kapıda ödenecek toplam: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );

}


export const loader = async ({ params }) => {
  const order = await getOrder(params.orderId);
  return order
}

export default Order;
