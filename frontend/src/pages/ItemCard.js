import React from "react";
import { useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";
import { deleteItem, increaseQuantity, drecreaseQuantity } from "./orebiSlice";
import "../styles/ItemCard.css"; 

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="item-card-container">
      <div className="item-card-details">
        <ImCross
          onClick={() => dispatch(deleteItem(item._id))}
          className="item-card-delete"
        />
        <img
          className="item-card-image"
          src={item.image}
          alt="productImage"
        />
        <h1 className="item-card-name">{item.name}</h1>
      </div>

      <div className="item-card-actions">
        <div className="item-card-price">${item.price}</div>

        <div className="item-card-quantity">
          <span
            onClick={() => dispatch(drecreaseQuantity({ _id: item._id }))}
            className="quantity-btn"
          >
            -
          </span>
          <p className="item-quantity">{item.quantity}</p>
          <span
            onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
            className="quantity-btn"
          >
            +
          </span>
        </div>
        <div className="item-card-total">
          ${item.quantity * item.price}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
