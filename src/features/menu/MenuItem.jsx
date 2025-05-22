import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addToCart } from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  const handleClick = () => {
    const newItem = {
      id: pizza.id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
    }
    dispatch(addToCart(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Tükendi
            </p>
          )}

          {!soldOut && <Button type="small" onClick={handleClick}>Sepete Ekle</Button>}

        </div>
      </div>
    </li>
  );

}

export default MenuItem;
