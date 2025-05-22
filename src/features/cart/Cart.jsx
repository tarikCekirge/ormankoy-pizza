import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';



function Cart() {
  const userName = useSelector((state) => state.user.userName)
  const dispatch = useDispatch();
  const cart = useSelector(getCart);

  const handleClearCart = () => {
    if (window.confirm("Sepeti temizlemek istediğinize emin misiniz?")) {
      dispatch(clearCart());
    }
  }


  if (!cart.length) return <EmptyCart />
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Menüyü Görüntüle</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Sepetiniz, {userName}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>


      <div className="mt-6 space-x-2">
        <Button to="/siparis/yeni" type="primary">
          Sipariş Ver
        </Button>

        <Button type="secondary" onClick={handleClearCart}>Sepeti Temizle</Button>
      </div>
    </div>
  );

}

export default Cart;
