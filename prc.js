import { useDispatch, useSelector } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { title, price, description, id } = props;

  const addToCartHandler = () => {
    const newTotalQuantity = cart.totalQuantity + 1;

    const updatedItems = cart.items.slice();

    const existingItem = updatedItems.find((item) => item.id === id);
    if (existingItem) {
      const updatedItem = { ...existingItem };
      updatedItem.newQuantity++;
      updatedItem.totalPrice = updatedItem.totalPrice + price;
      const existingItemIndex = updatedItems.findIndex(
        (item) => item.id === id
      )
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        id,
        price,
        quantity: 1,
        totalPrice: price,
        name: title
      })
    }

    const newCart = {
      totalQuantity: newTotalQuantity,
      items: updatedItems
    }

    dispatch(cartActions.replaceCart(newCart))
  };
}