import React, { useState, useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_UER_BEGIN,
  REGISTER_UER_SUCCESS,
  REGISTER_UER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_ALL_PRODUCTS_BEGIN,
  GET_ALL_PRODUCTS_SUCCESS,
  SET_EDIT_PRODUCT,
  EDIT_PRODUCT_BEGIN,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  DELETE_PRODUCT_BEGIN,
  ADD_TO_CART_BEGIN,
  ADD_TO_CART_ERROR,
  ADD_TO_CART_SUCCESS,
  GET_ALL_CART_SUCCESS,
  GET_ALL_CART_BEGIN,
  CLEAR_CART,
  CREATE_PROJECT_BEGIN,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  GET_ALL_PROJECTS_BEGIN,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_USERS_BEGIN,
  GET_ALL_USERS_SUCCESS,
  DELETE_PROJECT_BEGIN,
  EDIT_PROJECT_BEGIN,
  EDIT_PROJECT_ERROR,
  EDIT_PROJECT_SUCCESS,
  SET_EDIT_PROJECT,
  GET_ALL_SUPP_ORDERS_SUCCESS,
  GET_ALL_ORDERS_ABOVE_ONE_LAKH_BEGIN,
  GET_ALL_ORDERS_ABOVE_ONE_LAKH_SUCCESS,
  SET_EDIT_APPROVE_ORDER,
  EDIT_APPROVE_ORDER_ERROR,
  EDIT_APPROVE_ORDER_SUCCESS,
  EDIT_APPROVE_ORDER_BEGIN,
  SET_EDIT_DELIVER_ORDER
} from "./actions";
//set as default
const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

export const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  showSidebar: false,
  isEditing: false,
  editProductId: "",
  editProjectId: "",
  isEditingProject: false,
  pName: "",
  price: "",
  qty: 0,
  products: [],
  totalProducts: 0,
  numOfPages: 1,
  page: 1,
  cart: [],
  projects: [],
  users: [],
  projectName: "",
  projectLocation: "",
  projectEstimatedCost: "",
  projectDeadLine: "",
  projectManager: "",
  supOrders:[],
  selectedOrders: [],
  OrderStatus: "",
  isEditingOrderStatus: false,
  editOrderId: "",
  selectedOrder: {},
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const authFetch = axios.create({
    baseURL: "/api",
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
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  //display alert
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  //clear the alert
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2000);
  };
  //Register user
  const registerUser = async (currentUser) => {
    // console.log(currentUser);
    dispatch({ type: REGISTER_UER_BEGIN });
    try {
      const response = await axios.post("/api/auth/register", currentUser);
      const { user, token } = response.data;
      // console.log({ user, token });
      dispatch({ type: REGISTER_UER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ token, user });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: REGISTER_UER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    // clearAlert();
  };
  //ADD USER TO LOCAL STORAGE
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  //REMOVE USER FROM LOCAL STORAGE
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  //login user
  const loginUser = async (currentUser) => {
    // console.log(currentUser);
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post("/api/auth/login", currentUser);
      const { user, token } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //toggle side bar
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  //logout user
  const logoutUser = () => {
    dispatch({
      type: LOGOUT_USER,
    });
    removeUserFromLocalStorage();
  };
  //update user
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, token } = data;
      // console.log(data);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };
  //handle change
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
  //clear values
  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
    });
  };
  //create product
  const createProduct = async () => {
    dispatch({
      type: CREATE_PRODUCT_BEGIN,
    });
    try {
      const { pName, price, qty, supplierName, user } = state;
      await authFetch.post("/createProduct", {
        name: pName,
        price,
        qty,
        supplierName: user.name,
      });
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //get all Products
  const getAllProducts = async () => {
    let url = "";
    if (state.user.type === "Customer") {
      url = "/Customers/Products";
    } else {
      url = "/getProducts";
    }
    dispatch({ type: GET_ALL_PRODUCTS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      // console.log(data);
      const { products, numOfPages, totalProducts } = data;
      // console.log(products);
      dispatch({
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: {
          products,
          numOfPages,
          totalProducts,
        },
      });
      // console.log(state.products);
    } catch (error) {
      console.log(error);
      logoutUser();
    }
    clearAlert();
  };
  //delete job
  const deleteProduct = async (id) => {
    dispatch({ type: DELETE_PRODUCT_BEGIN });
    try {
      await authFetch.delete(`/deleteProducts/${id}`);
      getAllProducts();
    } catch (error) {
      logoutUser();
    }
  };
  //set edit job
  const setEditProduct = (id) => {
    // console.log(`set edit job:${id}`);
    dispatch({ type: SET_EDIT_PRODUCT, payload: { id } });
  };
  //edit job
  const editProduct = async () => {
    dispatch({ type: EDIT_PRODUCT_BEGIN });
    try {
      const { pName, qty, price, supplierName, user } = state;
      await authFetch.patch(`/updateProducts/${state.editProductId}`, {
        name: pName,
        qty,
        price,
        supplierName: user.name,
      });
      dispatch({
        type: EDIT_PRODUCT_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }
      dispatch({
        type: EDIT_PRODUCT_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  //const add to cart
  const addItemToCart = async ({ name, price, qty, _id }) => {
    dispatch({ type: ADD_TO_CART_BEGIN });
    try {
      const cartItem = {
        name,
        qty,
        price,
        pid: _id,
        createdBy: state.user._id,
      };
      const response = await authFetch.post("/Customers/cart", cartItem);
      // console.log(response.data);
      dispatch({ type: ADD_TO_CART_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ADD_TO_CART_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  //get cart
  const getCart = async () => {
    let uri = "Customers/cart";
    dispatch({ type: GET_ALL_CART_BEGIN });
    try {
      const { data } = await authFetch.get(uri);

      const { carts } = data;
      console.log(carts);
      dispatch({
        type: GET_ALL_CART_SUCCESS,
        payload: {
          carts,
        },
      });
      // console.log(state.products);
    } catch (error) {
      console.log(error);
      logoutUser();
    }
    clearAlert();
  };
  //clear cart
  const clearCart = async () => {
    dispatch({ type: CLEAR_CART });
    try {
      console.log("clear cart");
      const response = await authFetch.delete("Customers/cart");
      getCart();
    } catch (error) {
      console.log(error);
      logoutUser();
    }
  };

  //create product
  const createProject = async () => {
    dispatch({
      type: CREATE_PROJECT_BEGIN,
    });
    try {
      const {
        projectName,
        projectLocation,
        projectEstimatedCost,
        projectDeadLine,
        projectManager,
      } = state;
      await authFetch.post("/Projects/", {
        projectName,
        projectLocation,
        projectEstimatedCost,
        projectDeadLine: new Date(projectDeadLine),
        projectManager,
      });
      dispatch({
        type: CREATE_PROJECT_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_PROJECT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //get all projects
  const getAllProjects = async () => {
    dispatch({ type: GET_ALL_PROJECTS_BEGIN });
    try {
      const { data } = await authFetch.get("/Projects/");
      // console.log(data);
      const { projects } = data;
      // console.log(products);
      dispatch({
        type: GET_ALL_PROJECTS_SUCCESS,
        payload: {
          projects,
        },
      });
      // console.log(state.products);
    } catch (error) {
      console.log(error);
      logoutUser();
    }
    clearAlert();
  };
  //get all projects
  const getAllUsers = async () => {
    dispatch({ type: GET_ALL_USERS_BEGIN });
    try {
      const { data } = await axios.get("/api/auth/");
      // console.log(data);
      const { users } = data;
      // console.log(products);
      dispatch({
        type: GET_ALL_USERS_SUCCESS,
        payload: {
          users,
        },
      });
      // console.log(state.products);
    } catch (error) {
      console.log(error);
      logoutUser();
    }
    clearAlert();
  }; //delete project
  const deleteProject = async (id) => {
    dispatch({ type: DELETE_PROJECT_BEGIN });
    try {
      await authFetch.delete(`/Projects/${id}`);
      getAllProjects();
    } catch (error) {
      logoutUser();
    }
  };
  //set edit project
  const setEditProject = (id) => {
    dispatch({ type: SET_EDIT_PROJECT, payload: { id } });
  };

  //edit job
  const editProject = async () => {
    dispatch({ type: EDIT_PROJECT_BEGIN });
    try {
      const {
        projectName,
        projectLocation,
        projectEstimatedCost,
        projectDeadLine,
        projectManager,
      } = state;
      await authFetch.patch(`/Projects/${state.editProjectId}`, {
        projectName,
        projectLocation,
        projectEstimatedCost,
        projectDeadLine,
        projectManager,
      });
      dispatch({
        type: EDIT_PROJECT_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }
      dispatch({
        type: EDIT_PROJECT_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  //get all projects
  const getAllSelectedProducts = async () => {
    dispatch({ type: GET_ALL_ORDERS_ABOVE_ONE_LAKH_BEGIN });
    try {
      const { data } = await axios.get("/api/Projects/order");
      // console.log(data);
      const { orders } = data;
      // console.log(products);
      dispatch({
        type: GET_ALL_ORDERS_ABOVE_ONE_LAKH_SUCCESS,
        payload: {
          orders,
        },
      });
      // console.log(state.products);
    } catch (error) {
      console.log(error);
      logoutUser();
    }
    clearAlert();
  };
  //set edit project
  const setEditApproveOrder = (id) => {
    dispatch({ type: SET_EDIT_APPROVE_ORDER, payload: { id } });
  };

  const setEditDeliverOrder = (id) => {
    dispatch({ type: SET_EDIT_DELIVER_ORDER, payload: { id } });
  };

  //edit job
  const editOrderStatus = async () => {
    dispatch({ type: EDIT_APPROVE_ORDER_BEGIN });
    try {
      const { OrderStatus, editOrderId } = state;
      console.log("#########################");
      console.log(OrderStatus);
      console.log("######################");
      await authFetch.patch(`/Projects/order/${editOrderId}`, { OrderStatus });
      dispatch({
        type: EDIT_APPROVE_ORDER_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }
      dispatch({
        type: EDIT_APPROVE_ORDER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  const getAllSupplierOrders = async () => {
    dispatch({ type: GET_ALL_PRODUCTS_BEGIN });
    try {
      const { data } = await authFetch.post('/getMyOrders/', { name:"Dilupa12",
      status:["approved","delivered"]});

      const { orders, numOfPages, totalProducts } = data;

      dispatch({
        type: GET_ALL_SUPP_ORDERS_SUCCESS,
        payload: {
          orders,
          numOfPages,
          totalProducts,
        },
      });
    } catch (error) {
      console.log(error);
      logoutUser();
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createProduct,
        getAllProducts,
        setEditProduct,
        deleteProduct,
        editProduct,
        addItemToCart,
        getCart,
        clearCart,
        createProject,
        getAllProjects,
        getAllProjects,
        getAllUsers,
        deleteProject,
        setEditProject,
        editProject,
        getAllSupplierOrders,
        getAllSelectedProducts,
        setEditApproveOrder,
        editOrderStatus,
        setEditDeliverOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };

console.log();
