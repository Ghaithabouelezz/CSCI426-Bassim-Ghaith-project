import React, { useMemo } from "react";
import Navbar from "../Components/NavBar";
import '../Styles/Home.css';

export default function HomePage() {
  
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


const addToCart = (book) => {
  try {
    const savedCart = localStorage.getItem('bookStoreCart');
    const currentCart = savedCart ? JSON.parse(savedCart) : [];
    
    console.log('Current cart before add:', currentCart);
    console.log('Adding book:', book);
    
    
    const existingItemIndex = currentCart.findIndex(item => item.id === book.id);
    
    if (existingItemIndex > -1) {
      
      currentCart[existingItemIndex].quantity += 1;
      console.log('Updated existing item quantity');
    } else {
      
      currentCart.push({ 
        ...book, 
        quantity: 1 
      });
      console.log('Added new item to cart');
    }
    
    localStorage.setItem('bookStoreCart', JSON.stringify(currentCart));
    console.log('Cart after add:', currentCart);
    alert(`Added "${book.title}" to cart!`);
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('Error adding book to cart. Please try again.');
  }
};


const quickCheckout = (book) => {
  try {
    console.log('Quick checkout for book:', book);
    
   
    const quickCart = [{ 
      ...book, 
      quantity: 1 
    }];
    
    localStorage.setItem('bookStoreCart', JSON.stringify(quickCart));
    localStorage.setItem('isQuickCheckout', 'true');
    
    console.log('Quick cart set:', quickCart);
    
  
    window.location.href = '/cart';
  } catch (error) {
    console.error('Error in quick checkout:', error);
    alert('Error during quick checkout. Please try again.');
  }
};

  const popularCategories = useMemo(() => {
    const genreCounts = {};
    
    initialBooks.forEach(book => {
      genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
    });

    
    return Object.entries(genreCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([genre]) => genre);
  }, [initialBooks]);

 
  const categoryBooks = useMemo(() => {
    const result = {};
    
    popularCategories.forEach(genre => {
      const booksInGenre = initialBooks
        .filter(book => book.genre === genre)
        .slice(0, 5); 
      
      result[genre] = booksInGenre;
    });
    
    return result;
  }, [popularCategories, initialBooks]);

  return (
    <>
      <Navbar />
      <div className="home-container">
        
        <div className="hero-section">
          <div className="hero-content">
            <h1>Welcome to the Online Book Store</h1>
            <p>Discover your next favorite book from our curated collection</p>
          </div>
        </div>

 
        <div className="categories-section">
          <div className="container">
            <h2 className="section-title">Popular Categories</h2>
            
            {popularCategories.map(category => (
              <div key={category} className="category-row">
                <h3 className="category-title">{category}</h3>
                <div className="books-row">
                  {categoryBooks[category]?.map(book => (
                    <div 
                      key={book.id} 
                      className="book-card"
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
                        <h4 className="book-title">{book.title}</h4>
                        <p className="book-author">by {book.author}</p>
                        <div className="book-meta">
                          <span className="book-rating">⭐ {book.rating}</span>
                        </div>
                        <p className="book-price">${book.price}</p>
                      </div>

                      
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
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="cta-section">
          <div className="container">
            <h2>Ready to Explore More?</h2>
            <p>Discover our complete collection with hundreds of books across all genres</p>
            <button 
              className="browse-all-btn"
              onClick={() => window.location.href = '/library'}
            >
              Browse Full Library
            </button>
          </div>
        </div>
      </div>
    </>
  );
}