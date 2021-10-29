import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { Link, Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axios";

import {
  sendProduct,
  deleteProduct,
  clearAddProduct,
  searchProducts,
} from "../../store/actions/product";

const Home = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await axios.get("/api/product/get", {
        "Content-type": "application/json",
      });
      setState(data);
    })();
  }, []);

  const [edit, setEdit] = useState("");

  const dispatch = useDispatch();

  const handleEdit = (i) => {
    setEdit(state.data[i]);
    dispatch(sendProduct(state.data[i]));
  };

  const handleDelete = (i) => {
    dispatch(deleteProduct(state.data[i]));
  };

  const clearAddData = () => {
    dispatch(clearAddProduct(""));
  };

  const [search, setSearch] = useState("");

  const handleEdits = (e) => {
    setSearch(e.target.value);
  };
  const [searched, setSearched] = useState("");
  const handleSearch = () => {
    if (search == " ") {
      return alert("please type in the field");
    }
    (async () => {
      const searchResult = await axios.get(`api/product/${search}`, {
        "Content-type": "application/json",
      });

      setState(searchResult);
    })();
  };
  const [filtered, setFiltered] = useState("");
  const handleFilter = () => {
    (async () => {
      const filter = await axios.get("/api/product/filter", {
        "Content-type": "application/json",
      });
      setState(filter);
    })();
  };

  const handleSort = () => {
    (async () => {
      const sort = await axios.get("/api/product/sort", {
        "Content-type": "application/json",
      });
      setState(sort);
    })();
  };

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: "",
    category: "",
  });

  const handleRange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlePriceRange = () => {
    (async () => {
      const range = await axios.get(
        `/api/product/aggregate/${priceRange.category}/${priceRange.min}-${priceRange.max}`
      );
      setState(range);
    })();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "white" }}>The Product List</h1>
      <div>
        <button className={style.add}>
          <Link to="/add" onClick={clearAddData}>
            ADD PRODUCT
          </Link>
        </button>
      </div>
      <div className={style.textCenter}>
        <div className={style.searchContainer}>
          <input
            className={style.input}
            type="text"
            name="search"
            value={search}
            onChange={handleEdits}
            placeholder="enter the product name"
          />
          <button className={style.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <button className={style.filter} onClick={handleFilter}>
        FILTER
      </button>
      <button className={style.sort} onClick={handleSort}>
        SORT
      </button>
      <div>
        <div className={style.priceRange}>
          <h5>Price Range Sort</h5>
          <input
            type="number"
            name="min"
            placeholder="enter min price"
            value={priceRange.min}
            onChange={handleRange}
          />
          to
          <input
            type="number"
            name="max"
            placeholder="enter max price"
            value={priceRange.max}
            onChange={handleRange}
          />{" "}
          in
          <input
            type="text"
            name="category"
            placeholder="enter category"
            value={priceRange.category}
            onChange={handleRange}
          />
          <button
            onClick={handlePriceRange}
            style={{
              background: "pink",
              border: "none",
              outline: "none",
              boxShadow: "1px 1px 2px grey",
              cursor: "pointer",
              padding: "5px",
              marginLeft:'5px'
            }}
          >
            Submit
          </button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SI.NO</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Available_Quantity</th>
            </tr>
          </thead>
          <tbody>
            {state
              ? state.data.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.SKU}</td>
                      <td>{item.category}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.availableQty}</td>
                      <td>
                        <Link to="/add">
                          <button
                            className={style.edit}
                            onClick={() => handleEdit(i)}
                          >
                            EDIT
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className={style.delete}
                          onClick={() => handleDelete(i)}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
