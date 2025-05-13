import React from 'react';

const Cart = ({ books, cart, updateQuantity, removeFromCart, proceedToCheckout, processing }) => {
	
	const total = Object.keys(cart).reduce((sum, item) => sum + (books[item].price * cart[item]), 0);

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      {Object.keys(cart).length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">

						{Object.keys(cart).map(cartItemid => (
              <div key={cartItemid} className="cart-item">
                <h3>{books[cartItemid].title}</h3>
                <p>${books[cartItemid].price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(books[cartItemid].id, -1)} disabled={cart[cartItemid] <= 1 || processing}>
                    -
                  </button>
                  <span>{cart[cartItemid]}</span>
                  <button onClick={() => updateQuantity(cartItemid, 1)} disabled={processing}>
                    +
                  </button>
                </div>
                <p>${(books[cartItemid].price * cart[cartItemid]).toFixed(2)}</p>
                <button onClick={() => removeFromCart(books[cartItemid].id)} disabled={processing}>Remove</button>
              </div>
            ))}

          </div>
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={proceedToCheckout} disabled={processing}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;