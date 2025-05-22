import React from 'react';

const Navbar = ({ cartCount, showCart, processing}) => {
  return (
    <nav className="navbar">
      <h1>Online Bookstore</h1>
      <button className="cart-toggle" onClick={showCart} disabled={processing}>
        Cart ({cartCount})
      </button>
    </nav>
  );
};

export default Navbar;