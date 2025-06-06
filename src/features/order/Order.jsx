// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";



function Order() {
  const order = useLoaderData()

  const fetcher = useFetcher()
  console.log(fetcher)
  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load(`/menu`)
    }
  }, [fetcher])


  const {
    id,
    // status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">#{id} no.lu Siparişinizin Durumu</h2>

        <div className="space-x-2">
          {priority && <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">Öncelikli</span>}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50"> sipariş</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Tahmini ${calcMinutesLeft(estimatedDelivery)} dakika içinde teslim edilecek 😃`
            : "Sipariş teslim edilmiş olmalı"}
        </p>
        <p className="text-xs text-stone-500">(Tahmini teslimat: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading' || !fetcher.data}
            ingredients={
              fetcher.data?.find(el => el.id === item.pizzaId)?.ingredients || []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">Pizza ücreti: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Öncelik ücreti: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">Kapıda ödenecek toplam: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );

}


export const loader = async ({ params }) => {
  const order = await getOrder(params.orderId);
  return order
}

export default Order;
