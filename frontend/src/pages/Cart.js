import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { resetCart } from "./orebiSlice";
import emptyCart from "../assets/emptyCart.png";
import ItemCard from "./ItemCard";
import LayoutPages from "../components/Layouts/LayoutPages";
import "../styles/Cart.css";
import axios from "axios";  // Add axios for HTTP requests
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QQTS0IMplfXhjvwyK3cw0tbfaM6621kjc3pDOA6nUVdD6JQgZHjlsjjavMC9yw2C92JF85iw4qIrxmdlBHWSaV100eXvZYS4W'); 

const Cart = () => {
  const formatPrice = (price) => {
    return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");

  // Fetch user token from cookies, localStorage or Redux
  const token = localStorage.getItem('token'); // Or get it from Redux

  useEffect(() => {
    let price = 0;
    products.forEach((item) => {
      price += item.price * item.quantity;
    });

    setTotalAmt(price);
  }, [products]);

  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/checkout',
        {
          cartItems: products.map((item) => ({
            name: item.brand, 
            image: item.image,
            price: item.price,
            quantity: item.quantity
          })),
          totalAmount: totalAmt + shippingCharge
        },
        {
          headers: {
            Authorization: `Bearer ${token}`  // Include the token in the headers
          }
        }
      );

      // Redirect to Stripe Checkout page
      const { sessionId } = response.data;
      if (!sessionId) {
        console.error('Session ID is missing');
        return;
      }

      const stripe = await stripePromise;
      stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <LayoutPages>
      <div className="cart-container">
        {products.length > 0 ? (
          <div>
            <div className="cart-header visible">
              <h2 className="col-span-2">Product</h2>
              <h2>Quantity</h2>
              <h2>Price</h2>
              <h2>Sub Total</h2>
            </div>
            <div className="cart-products">
              {products.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
            <button
              onClick={() => dispatch(resetCart())}
              className="cart-reset-btn"
            >
              Reset cart
            </button>
            <div className="coupon-section">
              <div>
                <input
                  className="coupon-input"
                  type="text"
                  placeholder="Coupon Number"
                />
                <p className="coupon-text">Apply Coupon</p>
              </div>
              <p className="coupon-text">Update Cart</p>
            </div>
            <div className="cart-totals">
              <div className="cart-total-section">
                <h1 className="cart-totals-header">Cart totals</h1>
                <div>
                  <p className="cart-total-item">
                    Subtotal <span>${formatPrice(totalAmt)}</span>
                  </p>
                  <p className="cart-total-item">
                    Shipping Charge <span>${formatPrice(shippingCharge)}</span>
                  </p>
                  <p className="cart-total-item">
                    Total <span>${formatPrice(totalAmt + shippingCharge)}</span>
                  </p>
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="empty-cart-container"
          >
            <div>
              <img
                className="empty-cart-image"
                src={emptyCart}
                alt="emptyCart"
              />
            </div>
            <div className="empty-cart-info">
              <h1 className="empty-cart-header">Your Cart feels lonely.</h1>
              <p className="empty-cart-text">
                Your Shopping cart lives to serve. Give it purpose - fill it
                with clothes, shoes, rackets, etc. and make it happy.
              </p>
              <Link to="/shop">
                <button className="continue-shopping-btn">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </LayoutPages>
  );
};

export default Cart;
