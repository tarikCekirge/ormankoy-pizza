import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCurrentQuantityById, removeFromCart } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import DeleteItem from './DeleteItem';

const UpdateItemQuantity = ({ pizza }) => {
    console.log(pizza)
    const dispatch = useDispatch();


    const currentQuantity = useSelector(getCurrentQuantityById(pizza.id));
    const handleIncrease = () => {
        const newItem = {
            id: pizza.id,
            name: pizza.name,
            quantity: 1,
            unitPrice: pizza.unitPrice,
        }
        dispatch(addToCart(newItem));
    }
    const handleDecrease = () => {
        dispatch(removeFromCart(pizza.id,));
    }
    return (
        <>
            <div className="flex items-center gap-4">
                <span className="mr-3 font-bold">{formatCurrency(currentQuantity * pizza.unitPrice)}</span>
                <div className="space-x-2">
                    <Button type="round" onClick={handleDecrease}>-</Button>
                    <span className="text-sm  text-right font-bold inline-block w-[2ch]">{currentQuantity}</span>
                    <Button type="round" onClick={handleIncrease}>+</Button>
                </div>
                <DeleteItem id={pizza.id} />
            </div>
        </>
    )
}

export default UpdateItemQuantity