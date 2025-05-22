import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import store from '../../store'
import { clearCart, getCart, selectCartTotal } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
import EmptyCart from "../cart/EmptyCart";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );



function CreateOrder() {
  const { userName, status: adressStatus, position, address, error: errorAddress } = useSelector((state) => state.user)
  const navigation = useNavigation();

  const formErrors = useActionData();

  // const isIdle = navigation.state === 'idle';
  const isLoadingAddress = adressStatus === 'loading';
  const isSubmiting = navigation.state === 'submitting';
  const [withPriority, setWithPriority] = useState(false);

  const totalCartPrice = useSelector(selectCartTotal)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice
  const dispatch = useDispatch()
  const cart = useSelector(getCart);

  const handleGetAddress = (e) => {
    e.preventDefault();
    dispatch(fetchAddress())
  }

  if (!cart.length) return <EmptyCart />
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Siparişe hazır mısınız? Hadi başlayalım!</h2>

      <Form method="POST" >
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Adınız</label>
          <input className="input grow" type="text" name="customer" required defaultValue={userName} />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Telefon numarası</label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phone"
              required
              pattern="^(05\d{9}|\+905\d{9})$"
              inputMode="numeric"
              onKeyDown={(e) => {
                if (!/[0-9+]/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder="05XXXXXXXXX veya +905XXXXXXXXX"
            />

          </div>
          {formErrors?.phone && <p className="text-sm text-red-600" >{formErrors.phone}</p>}
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Adres</label>
          <div className="grow">
            <div className="relative">
              <input className="input w-full" type="text" name="address" required disabled={isLoadingAddress} defaultValue={address} />
              {!position?.latitude && !position?.longitude && (
                <span className="absolute right-1 top-0 flex h-full items-center z-10">
                  <Button type={'small'} disabled={isLoadingAddress || isSubmiting} onClick={(e) => handleGetAddress(e)}>
                    Adres Al
                  </Button>
                </span>
              )}
            </div>

            {adressStatus === 'error' && <p className="text-sm text-red-600 mt-2"  >{errorAddress}</p>}
          </div>


        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Siparişinize öncelik vermek ister misiniz?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position?.longitude && position?.latitude ? `${position?.latitude} ${position?.longitude}` : ''} />
          <Button type="primary" disabled={isSubmiting}>{isSubmiting ? 'Siparişiniz alınıyor' : `Şimdi sipariş ver(${formatCurrency(totalPrice)})`}</Button>
        </div>
      </Form>
    </div>
  );

}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const order = {
    ...data,
    cart: JSON.parse(data.cart).map(({ id, ...rest }) => ({
      ...rest,
      pizzaId: id,
    })),
    priority: Boolean(data.priority),
  };


  const errors = {}
  if (!isValidPhone(data.phone)) {
    errors.phone = 'Telefon numarası geçersiz';
  }
  if (Object.keys(errors).length) {
    return errors;
  }
  const newOrder = await createOrder(order);

  //TODO: Replace after
  store.dispatch(clearCart())
  return redirect(`/siparis/${newOrder.id}`);
}

export default CreateOrder;
