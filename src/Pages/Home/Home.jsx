import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { Link, Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axios";


import {sendProduct,deleteProduct,clearAddProduct} from '../../store/actions/product'

const Home = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await axios.get("/api/product/get", {
        "Content-type": "application/json",
      });
      setState(data);
    })();
  }, [state]);

  const [edit, setEdit] = useState("");

  const dispatch=useDispatch()

  const handleEdit = (i) => {
    setEdit(state.data[i]);
    dispatch(sendProduct(state.data[i]))
  };


  const handleDelete = (i)=>{
    dispatch(deleteProduct(state.data[i]))
  }

  const clearAddData=()=>{
    dispatch(clearAddProduct(''))
  }
  return (
    <div>
      <h1>The Product List</h1>
      <div>
        <button>
          <Link to="/add" onClick={clearAddData}>ADD</Link>
        </button>
      </div>
      <div>
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
                    <tr>
                      <td>{i+1}</td>
                      <td>{item.SKU}</td>
                      <td>{item.category}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.availableQty}</td>
                      <td>
                        <button onClick={() => handleEdit(i)}>
                          <Link to="/add">EDIT</Link>{" "}
                        </button>
                      </td>
                      <td>
                        <button onClick={()=>handleDelete(i)}>DELETE</button>
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
