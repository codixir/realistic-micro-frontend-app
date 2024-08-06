import React from 'react';
import useStore from 'appShell/store';

const Cart = () => {
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({ id: cart.length + 1, name: `Item ${cart.length + 1}` });
  };

  return (
    <div>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Cart;
