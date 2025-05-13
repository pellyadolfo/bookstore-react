import React, { useEffect, useState } from 'react';
import BookList from './components/BookList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [processing, setProcessing] = useState(false);
  const [books, setBooks] = useState({});
  const [cart, setCart] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

	useEffect(() => {
    fetch('http://localhost:8080/api/books')
      .then(r => r.json())
      .then(data => {
				const books = {};
				data.forEach(item => {
					books[item.id] = item;
				});
				setBooks(books)

				updateQuantity(1, 0)
    	});
	}, []);

  const updateQuantity = (bookId, increment) => {

		// update cart in server
		const authHeader = 'Basic ' + btoa('testuser' + ':' + 'testpassword');
		const body = { "bookId" : bookId, "quantity" : increment }
		console.log("body: ", body)
		setProcessing(true);
    fetch('http://localhost:8080/api/carts/user/1/items', {
				method: 'post',
				headers: {
					'Authorization': authHeader,
					'Content-Type': 'application/json' // if sending JSON data
				},
				body: JSON.stringify(body)
			})
      .then(r => r.json())
      .then(data => {
				setProcessing(false);

				let newCart = {}
				data.items.forEach((item) => {
					newCart[item.bookId] = item.quantity;
				})

				setCart(newCart);
				setCartCount(Object.values(newCart).reduce((a, b) => a + b, 0));

	    });

  };

  const removeFromCart = (id) => {

		// update cart in server
		setProcessing(true)
		const authHeader = 'Basic ' + btoa('testuser' + ':' + 'testpassword');
		fetch('http://localhost:8080/api/carts/user/1/items/' + id, {
				method: 'delete',
				headers: {
					'Authorization': authHeader,
					'Content-Type': 'application/json' // if sending JSON data
				},
			})
			.then(i => {
				setProcessing(false);
				updateQuantity(1, 0)
			});
  };

	const checkout = (event) => {
		event.preventDefault(); 

		setProcessing(true)
		const authHeader = 'Basic ' + btoa('testuser' + ':' + 'testpassword');
		fetch('http://localhost:8080/api/orders/user/1/checkout', {
				method: 'post',
				headers: {
					'Authorization': authHeader,
					'Content-Type': 'application/json' // if sending JSON data
				},
			})
			.then(i => {
				setProcessing(false);

				updateQuantity(1, 0)

				returnToStore();
			});

			return false;
	};

  const proceedToCheckout = () => {
    setIsCheckoutVisible(true);
    setIsCartVisible(false);
  };

  const returnToStore = () => {
    setIsCheckoutVisible(false);
    setIsCartVisible(false);
  };

  return (
    <div className="app">

			<h1 hidden={!processing} >Processing</h1>

      <Navbar 
        cartCount={cartCount} 
        showCart={() => setIsCartVisible(!isCartVisible)} 
        isCartVisible={isCartVisible}
				processing={processing}
			/>
      
      {isCheckoutVisible ? (
        <Checkout
					books={books}
					cart={cart}
          total={cartCount} 
          returnToStore={returnToStore}
					checkout={checkout}
					processing={processing}
				/>
      ) : (
        <>
          <BookList
						books={Object.values(books)}
						updateQuantity={updateQuantity}
						processing={processing}
						/>

          {isCartVisible && (
            <Cart
							books={books}
							cart={cart}
              updateQuantity={updateQuantity} 
              removeFromCart={removeFromCart} 
              proceedToCheckout={proceedToCheckout}
							processing={processing}
							/>
          )}

        </>
      )}
    </div>
  );
}

export default App;