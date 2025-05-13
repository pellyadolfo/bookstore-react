import React from 'react';

const Checkout = ({ books, cart, total, returnToStore, checkout, processing }) => {



  return (
    <div className="checkout">
      <h2>Order Summary</h2>
      <div className="order-items">
        {Object.keys(cart).map(cartItemId => (
          <div key={cartItemId} className="order-item">
            <h3>{books[cartItemId].title}</h3>
            <p>{cart[cartItemId]} x ${books[cartItemId].price.toFixed(2)}</p>
            <p>${(books[cartItemId].price * cart[cartItemId]).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="order-total">
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
      <div className="checkout-form">
        <h3>Shipping Information</h3>
        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Credit Card Number</label>
            <input type="text" required />
          </div>
          <button type="button" onClick={checkout} disabled={processing} >Place Order</button>
        </form>
      </div>
      <button onClick={returnToStore}>Return to Store</button>
    </div>
  );
};

export default Checkout;