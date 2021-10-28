import axios from "../../axios";

const initialState = {
  product: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      (async () => {
        const data = await axios.post("/api/product/add", action.product, {
          "Content-type": "application/json",
        });
        return {
          product: action.product,
        };
      })();
      return {
        product: action.product,
      };
      break;
    case "SEND_PRODUCT":
      return {
        product: action.product,
      };
      break;
    case "UPDATE_PRODUCT":
      (async () => {
        const data = await axios.put(
          `/api/product/update/${action.product._id}`,
          action.product,
          {
            "Content-type": "application/json",
          }
        );
      })();
      return{
          product:action.product
      }
      break;
    case "DELETE_PRODUCT":
      (async () => {
        const deleted = await axios.delete(
          `/api/product/delete/${action.product._id}`,
          { "Content-type": "application/json" }
        );
      })();
      break;
     
      case "CLEAR_PRODUCT":
          return{
              product:''
          }
    default:
      return state;
  }
};
