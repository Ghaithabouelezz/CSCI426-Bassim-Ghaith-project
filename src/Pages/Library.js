import React, { useState, useMemo } from 'react';
import '../Styles/Library.css';
import Navbar from '../Components/NavBar';
const Library = () => {
  
 
  const generateBooks = () => {
    const genres = ['Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Romance', 'Thriller', 'Horror', 'Biography', 'History', 'Science', 'Technology', 'Business', 'Self-Help', 'Cooking', 'Travel', 'Art', 'Philosophy', 'Poetry', 'Drama', 'Comedy'];
    const authors = [
      'James Patterson', 'Stephen King', 'J.K. Rowling', 'George R.R. Martin', 'Agatha Christie',
      'Dan Brown', 'John Grisham', 'Michael Crichton', 'Isaac Asimov', 'Arthur C. Clarke',
      'Frank Herbert', 'Ray Bradbury', 'Margaret Atwood', 'Toni Morrison', 'Ernest Hemingway',
      'F. Scott Fitzgerald', 'Jane Austen', 'Charles Dickens', 'Mark Twain', 'Leo Tolstoy',
      'Fyodor Dostoevsky', 'Haruki Murakami', 'Gabriel Garcia Marquez', 'Chimamanda Ngozi',
      'Yuval Noah Harari', 'Malcolm Gladwell', 'Brene Brown', 'Eckhart Tolle', 'Ryan Holiday'
    ];
    
    const bookTitles = [
      'The Silent Forest', 'Echoes of Tomorrow', 'Whispers in the Dark', 'The Last Emperor',
      'Beyond the Horizon', 'Digital Dreams', 'Quantum Legacy', 'The Forgotten Kingdom',
      'Shadows of the Past', 'The Golden Compass', 'Midnight Sun', 'Eternal Flame',
      'The Crystal Key', 'Ocean\'s Depth', 'Mountain Peak', 'Desert Winds', 'Urban Legends',
      'The Secret Garden', 'Lost Civilization', 'Time Traveler', 'Space Odyssey',
      'Artificial Intelligence', 'Virtual Reality', 'Cyber Dreams', 'Neural Networks',
      'The Art of War', 'Peaceful Mind', 'Mindful Living', 'Digital Nomad', 'Startup Dreams',
      'Business Mastery', 'Financial Freedom', 'Wealth Building', 'Health Revolution',
      'Fitness Journey', 'Culinary Arts', 'World Cuisine', 'Travel Diaries', 'Adventure Awaits',
      'Mystery Island', 'Hidden Treasure', 'Ancient Secrets', 'Modern Problems',
      'Future World', 'Past Lives', 'Present Moment', 'Digital Age', 'Information Era',
      'Knowledge Quest', 'Learning Path', 'Education Revolution', 'Creative Mind'
    ];

    const books = [];
    
    for (let i = 1; i <= 120; i++) {
      const genre = genres[Math.floor(Math.random() * genres.length)];
      const author = authors[Math.floor(Math.random() * authors.length)];
      const title = bookTitles[Math.floor(Math.random() * bookTitles.length)] + ` ${Math.floor(Math.random() * 1000)}`;
      
      books.push({
        id: i,
        title: title,
        author: author,
        price: parseFloat((Math.random() * 50 + 5).toFixed(2)),
        image: `https://picsum.photos/300/400?random=${i}`,
        description: `A captivating ${genre.toLowerCase()} novel that will keep you on the edge of your seat. This masterpiece by ${author} explores deep themes and takes readers on an unforgettable journey through imagination and reality.`,
        genre: genre,
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
        pages: Math.floor(Math.random() * 500 + 100),
        year: Math.floor(Math.random() * 50 + 1970)
      });
    }
    
    return books;
  };

  const initialBooks = generateBooks();
  const [books, setBooks] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const [filterGenre, setFilterGenre] = useState('all');
  const [hoveredBook, setHoveredBook] = useState(null);

  
  const genres = ['all', ...new Set(initialBooks.map(book => book.genre))];


  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterGenre !== 'all') {
      filtered = filtered.filter(book => book.genre === filterGenre);
    }

    return filtered.sort((a, b) => {
      switch (sortOption) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        default:
          return 0;
      }
    });
  }, [books, searchTerm, sortOption, filterGenre]);
  
const addToCart = (book) => {
  const savedCart = localStorage.getItem('bookStoreCart');
  const currentCart = savedCart ? JSON.parse(savedCart) : [];
  
  
  const existingItem = currentCart.find(item => item.id === book.id);
  
  if (existingItem) {
    
    existingItem.quantity += 1;
  } else {
    
    currentCart.push({ ...book, quantity: 1 });
  }
  
  localStorage.setItem('bookStoreCart', JSON.stringify(currentCart));
  alert(`Added "${book.title}" to cart!`);
};

const quickCheckout = (book) => {
  const savedCart = localStorage.getItem('bookStoreCart');
  const currentCart = savedCart ? JSON.parse(savedCart) : [];
  
  
  const quickCart = [{ ...book, quantity: 1 }];
  
  localStorage.setItem('bookStoreCart', JSON.stringify(quickCart));
  localStorage.setItem('isQuickCheckout', 'true');
  
 
  window.location.href = '/cart';
};

  return (
       <>
          <Navbar />
    <div className="library-container">
    
      <div className="animated-background"></div>
      
     
      <div className="controls-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search books, authors, or genres..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-sort-container">
          <select 
            value={filterGenre} 
            onChange={(e) => setFilterGenre(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Genres</option>
            {genres.filter(genre => genre !== 'all').map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="title">Sort by Title</option>
            <option value="author">Sort by Author</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Sort by Rating</option>
            <option value="year">Sort by Year</option>
          </select>
        </div>
      </div>

      <div className="results-count">
        Showing {filteredAndSortedBooks.length} of {books.length} books
      </div>

      
      <div className="library-content">
        <div className="books-grid-container">
          <div className="books-grid">
            {filteredAndSortedBooks.map(book => (
              <div 
                key={book.id} 
                className="book-card"
                onMouseEnter={() => setHoveredBook(book)}
                onMouseLeave={() => setHoveredBook(null)}
              >
                <div className="book-image-container">
                  <img src={book.image} alt={book.title} className="book-image" />
                  <div className="book-overlay">
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(book)}
                    >
                      🛒 Add to Cart
                    </button>
                    <button 
                      className="quick-checkout-btn"
                      onClick={() => quickCheckout(book)}
                    >
                      ⚡ Quick Checkout
                    </button>
                  </div>
                </div>
                
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <div className="book-meta">
                    <span className="book-genre">{book.genre}</span>
                    <span className="book-rating">⭐ {book.rating}</span>
                  </div>
                  <div className="book-details">
                    <span className="book-year">{book.year}</span>
                    <span className="book-pages">{book.pages} pages</span>
                  </div>
                  <p className="book-price">${book.price}</p>
                </div>

                
                {hoveredBook?.id === book.id && (
                  <div className="book-description">
                    <h4>About this book:</h4>
                    <p>{book.description}</p>
                    <div className="description-actions">
                      <button 
                        className="description-add-cart"
                        onClick={() => addToCart(book)}
                      >
                        Add to Cart
                      </button>
                      <button 
                        className="description-checkout"
                        onClick={() => quickCheckout(book)}
                      >
                        Quick Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>


 
    </div>
   </>
  );
};

export default Library;