// Test ID: IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

const order = {
  id: "ABCDEF",
  customer: "Jonas",
  phone: "123456789",
  address: "Arroios, Lisbon , Portugal",
  priority: true,
  estimatedDelivery: "2027-04-25T10:00:00",
  cart: [
    {
      pizzaId: 7,
      name: "Napoli",
      quantity: 3,
      unitPrice: 16,
      totalPrice: 48,
    },
    {
      pizzaId: 5,
      name: "Diavola",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
    {
      pizzaId: 3,
      name: "Romana",
      quantity: 1,
      unitPrice: 15,
      totalPrice: 15,
    },
  ],
  position: "-9.000,38.000",
  orderPrice: 95,
  priorityPrice: 19,
};

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
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

export default Order;
