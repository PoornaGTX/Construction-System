import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  ADD_TOCART_BEGIN,
  ADD_TOCART_SUCCESS,
  ADD_TOCART_ERROR,
  GET_CART_BEGIN,
  GET_CART_SUCCESS,
  GET_CART_ERROR,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  DELETE_TOCART_BEGIN,
  DELETE_TOCART_SUCCESS,
  DELETE_TOCART_ERROR,
  GET_PROJECT_BEGIN,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_ERROR,
  CREATE_ORDER_BEGIN,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  GET_ORDER_BEGIN,
  GETE_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
} from "./action";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: "",
  token: "",
  isLogedIn: false,
  cart: [],
  products: [],
  projectDetails: "",
  order: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "http://10.0.2.2:5000/api",
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        // logoutUser();
      }
      return Promise.reject(error);
    }
  );

  //register user

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(
        "http://10.0.2.2:5000/api/v1/auth/register",
        currentUser
      );
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  //login

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post(
        "http://10.0.2.2:5000/api/auth/login",
        currentUser
      );

      const { user, token } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      AsyncStorage.setItem("user", JSON.stringify(user));
      AsyncStorage.setItem("token", token);
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  //ADD USER TO LOCAL STORAGE
  const addUserToLocalStorage = ({ user, token }) => {
    AsyncStorage.setItem("user", JSON.stringify(user));
    AsyncStorage.setItem("token", token);
  };
  //REMOVE USER FROM LOCAL STORAGE
  const removeUserFromLocalStorage = () => {
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("token");
  };
  //login user

  const addToCart = async ({
    supName,
    price,
    qty,
    pid,
    total,
    userQty,
    date,
    name,
  }) => {
    dispatch({ type: ADD_TOCART_BEGIN });

    const product = {
      supName,
      price,
      qty,
      createdBy: state.user._id,
      pid,
      total,
      userQty,
      date,
      type: name,
    };

    try {
      const response = await authFetch.post("/Customers/cart", product);
      dispatch({
        type: ADD_TOCART_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADD_TOCART_ERROR,
        // payload: { msg: error.response.data.msg },
      });
    }
  };

  //get cart
  const getCart = async () => {
    dispatch({ type: GET_CART_BEGIN });

    try {
      const response = await authFetch.get("/Customers/cart");
      const { carts } = response.data;

      dispatch({
        type: GET_CART_SUCCESS,
        payload: { carts },
      });
    } catch (error) {
      dispatch({
        type: GET_CART_ERROR,
        // payload: { msg: error.response.data.msg },
      });
    }
  };

  //get all products
  const getAllProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });

    try {
      const response = await axios.get(
        "http://10.0.2.2:5000/api/Customers/Products"
      );
      const { products } = response.data;

      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: { products },
      });
    } catch (error) {
      dispatch({
        type: GET_CART_ERROR,
        // payload: { msg: error.response.data.msg },
      });
    }
  };

  //deleteCartitem
  const deleteCartitem = async (cartItemID) => {
    dispatch({ type: DELETE_TOCART_BEGIN });
    try {
      const response = await authFetch.delete(`/Customers/cart/${cartItemID}`);

      dispatch({
        type: DELETE_TOCART_SUCCESS,
      });
      getCart();
    } catch (error) {
      dispatch({
        type: DELETE_TOCART_ERROR,
        // payload: { msg: error.response.data.msg },
      });
    }
  };

  //get all products
  const getAllProjectDetails = async () => {
    dispatch({ type: GET_PROJECT_BEGIN });

    const email = state.user.email;

    try {
      const response = await axios.get(
        `http://10.0.2.2:5000/api/Projects/${email}`
      );
      const { project } = response.data;

      dispatch({
        type: GET_PROJECT_SUCCESS,
        payload: { project },
      });
    } catch (error) {
      dispatch({
        type: GET_PROJECT_ERROR,
        // payload: { msg: error.response.data.msg },
      });
    }
  };

  const addToOrder = async (cart, totalCart) => {
    dispatch({ type: CREATE_ORDER_BEGIN });

    let status;
    try {
      if (totalCart >= 100000) {
        status = "pending";
      } else {
        status = "approved";
      }
      const response = await authFetch.post("/order", {
        createdBy: state.user._id,
        cartproducts: cart,
        total: totalCart,
        status,
      });
      dispatch({
        type: CREATE_ORDER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_ERROR,
        // payload: { msg: error.response.data.msg },
      });
    }
    getCart();
  };

  //get all products
  const getOrderSummery = async () => {
    dispatch({ type: GET_ORDER_BEGIN });

    try {
      const response = await authFetch.get("/order");
      const { Orders } = response.data;

      dispatch({
        type: GET_ORDER_SUCCESS,
        payload: { Orders },
      });
    } catch (error) {
      dispatch({
        type: GET_ORDER_ERROR,
        // payload: { msg: error.response.data.msg },
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        addToCart,
        getCart,
        getAllProducts,
        deleteCartitem,
        getAllProjectDetails,
        addToOrder,
        getOrderSummery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
