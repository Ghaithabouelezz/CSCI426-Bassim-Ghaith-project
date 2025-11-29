import React, { useState, useEffect } from 'react';
import Navbar from '../Components/NavBar';
import '../Styles/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isQuickCheckout, setIsQuickCheckout] = useState(false);

 
  useEffect(() => {
    const savedCart = localStorage.getItem('bookStoreCart');
    const quickCheckout = localStorage.getItem('isQuickCheckout');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    if (quickCheckout) {
      setIsQuickCheckout(JSON.parse(quickCheckout));
      
      localStorage.removeItem('isQuickCheckout');
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('bookStoreCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };


  const removeFromCart = (bookId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
  };

 
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    alert(`Order confirmed! Total: $${calculateTotal()}\nThank you for your purchase!`);
    
  
    setCartItems([]);
    localStorage.removeItem('bookStoreCart');
  };

  
  const handleQuickCheckout = () => {
    if (isQuickCheckout && cartItems.length > 0) {
      handleCheckout();
    }
  };

  
  useEffect(() => {
    if (isQuickCheckout && cartItems.length > 0) {
      handleQuickCheckout();
    }
  }, [isQuickCheckout, cartItems]);

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="cart-container">
          <div className="cart-empty">
            <h2>Your Cart is Empty</h2>
            <p>Add some books to get started!</p>
            <button 
              className="browse-books-btn"
              onClick={() => window.location.href = '/library'}
            >
              Browse Books
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          {isQuickCheckout && (
            <div className="quick-checkout-banner">
              ⚡ Quick Checkout - Review your order below
            </div>
          )}
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-author">by {item.author}</p>
                  <p className="item-genre">{item.genre}</p>
                  <div className="item-rating">⭐ {item.rating}</div>
                </div>

                <div className="item-controls">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="item-price">
                  <div className="price-total">${(item.price * item.quantity).toFixed(2)}</div>
                  <div className="price-unit">${item.price} each</div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
              <span>${calculateTotal()}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            
            <div className="summary-row">
              <span>Tax:</span>
              <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(parseFloat(calculateTotal()) + parseFloat(calculateTotal() * 0.1)).toFixed(2)}</span>
            </div>

            {isQuickCheckout ? (
              <button 
                className="checkout-btn quick-checkout"
                onClick={handleCheckout}
              >
                ⚡ Complete Quick Checkout
              </button>
            ) : (
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            )}

            <button 
              className="continue-shopping-btn"
              onClick={() => window.location.href = '/library'}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;