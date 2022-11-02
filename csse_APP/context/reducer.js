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
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
} from "./action";

const reducer = (state, action) => {
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User Created! Redirecting",
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      isLogedIn: true,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting",
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === ADD_TOCART_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === ADD_TOCART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User Created! Redirecting",
    };
  }

  if (action.type === ADD_TOCART_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "hello",
    };
  }

  //get cart
  if (action.type === GET_CART_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_CART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      cart: action.payload.carts,
      alertType: "success",
      alertText: "User Created! Redirecting",
    };
  }

  if (action.type === GET_CART_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "hello",
    };
  }

  //get all products
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      products: action.payload.products,
      alertType: "success",
      alertText: "User Created! Redirecting",
    };
  }

  if (action.type === GET_PRODUCTS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "hello",
    };
  }

  //delete cart item
  if (action.type === DELETE_TOCART_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === DELETE_TOCART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User Created! Redirecting",
    };
  }

  if (action.type === DELETE_TOCART_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "hello",
    };
  }

  //get project
  if (action.type === GET_PROJECT_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_PROJECT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      projectDetails: action.payload.project,
      alertType: "success",
      alertText: "User Created! Redirecting",
    };
  }

  if (action.type === GET_PROJECT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "hello",
    };
  }

  if (action.type === CREATE_ORDER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_ORDER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User Created! Redirecting",
    };
  }

  if (action.type === CREATE_ORDER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "hello",
    };
  }

  //get all order summery
  if (action.type === GET_ORDER_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_ORDER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      order: action.payload.Orders,
      alertType: "success",
      alertText: "User Created! Redirecting",
    };
  }

  if (action.type === GET_ORDER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "hello",
    };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
