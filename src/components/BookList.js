//import { books } from '../data';

const BookList = ({ books, updateQuantity, processing }) => {

	console.log(books);

  return (
    <div className="book-list">
      <h2>Available Books</h2>
      <div className="books">

        {books.map(book => (
          <div key={book.id} className="book">
            <img src={book.isbn} alt={book.title} />
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <p>${book.price.toFixed(2)}</p>
            <button onClick={() => updateQuantity(book.id, 1)} disabled={processing}>Add to Cart</button>
          </div>
        ))}
				
      </div>
    </div>
  );
};

export default BookList;