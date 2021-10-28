import React, { useState, useEffect } from "react";

import style from "./style.module.css";
import axios from "../../axios";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../store/actions/product";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Add = () => {
  const data = useSelector((state) => state.product);

  const [value, setValue] = useState({
    SKU: uuidv4(),
    category: "",
    name: "",
    description: "",
    price: "",
    availableQty: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (data) {
      setValue(data);
    }
  }, [data]);

  const [send, setSend] = useState(false);

  const dispatch = useDispatch();
  const handleUpdate = (e) => {
    e.preventDefault();
    if (
      value.SKU === " " ||
      value.availableQty === " " ||
      value.category === " " ||
      value.name===" " ||
      value.price===" " ||
      value.description === " "
    ) {
      return alert("fill all the input field");
    }
    dispatch(updateProduct(value));
    setSend(true);
  };

  const handleAdd = (e) => {
    if (
      value.SKU === " " ||
      value.availableQty === " " ||
      value.category === " " ||
      value.name===" " ||
      value.price===" " ||
      value.description === " "
    ) {
      return alert("fill all the input field");
    }
    e.preventDefault();
    dispatch(addProduct(value))
    setSend(true);
  };

  return (
    <div className={style.bgColor}>
      <div className={style.mainForm}>
        <h1>Add Products</h1>
        <div>
          <label>SKU:</label>
          <br />
          <input onChange={handleChange} name="SKU" value={value.SKU} />
        </div>
        <div>
          <label>Category:</label>
          <br />
          <input
            onChange={handleChange}
            name="category"
            value={value.category}
          />
        </div>
        <div>
          <label>Name:</label>
          <br />
          <input onChange={handleChange} name="name" value={value.name} />
        </div>
        <div>
          <label>Description:</label>
          <br />
          <textarea
            onChange={handleChange}
            name="description"
            value={value.description}
          ></textarea>
        </div>
        <div>
          <label>Price:</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            name="price"
            value={value.price}
          />
        </div>
        <div>
          <label>Available-Quantity:</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            name="availableQty"
            value={value.availableQty}
          />
        </div>
        
        {data ? (
          <Link to="/">
            {" "}
            <input
              type="submit"
              value="UPDATE PRODUCT"
              name="update"
              onClick={handleUpdate}
            />
          </Link>
        ) : (
          <Link to="/">
            {" "}
            <input
              type="submit"
              value="ADD PRODUCT"
              name="add"
              onClick={handleAdd}
            />
          </Link>
         
        )}
      </div>
    </div>
  );
};

export default Add;
