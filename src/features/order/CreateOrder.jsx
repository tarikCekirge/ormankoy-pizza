import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {

  const navigation = useNavigation();

  const isSubmiting = navigation.state === 'submitting';
  const formErrors = useActionData();
  // const isIdle = navigation.state === 'idle';
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Siparişe hazır mısınız? Hadi başlayalım!</h2>

      <Form method="POST" >
        <div>
          <label>Adınız</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Telefon numarası</label>
          <div>
            <input
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
          {formErrors?.phone && <p style={{ color: 'red' }}>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Adres</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
          // value={withPriority}
          // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Siparişinize öncelik vermek ister misiniz?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button disabled={isSubmiting}>{isSubmiting ? 'Siparişiniz alınıyor' : 'Şimdi sipariş ver'}</button>
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
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',

  }
  const errors = {}
  if (!isValidPhone(data.phone)) {
    errors.phone = 'Telefon numarası geçersiz';
  }
  if (Object.keys(errors).length) {
    return errors;
  }
  const newOrder = await createOrder(order)
  return redirect(`/siparis/${newOrder.id}`);
}

export default CreateOrder;
