import { initialState } from "./appContext";
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
  GET_ALL_CART_BEGIN,
  GET_ALL_CART_SUCCESS,
  CLEAR_CART,
  CREATE_PROJECT_BEGIN,
  CREATE_PROJECT_ERROR,
  CREATE_PROJECT_SUCCESS,
  GET_ALL_PROJECTS_BEGIN,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_USERS_BEGIN,
  GET_ALL_USERS_SUCCESS,
  DELETE_PROJECT_BEGIN,
  EDIT_PROJECT_BEGIN,
  EDIT_PROJECT_ERROR,
  EDIT_PROJECT_SUCCESS,
  SET_EDIT_PROJECT,
  GET_ALL_ORDERS_ABOVE_ONE_LAKH_BEGIN,
  GET_ALL_ORDERS_ABOVE_ONE_LAKH_SUCCESS,
  SET_EDIT_APPROVE_ORDER,
  EDIT_APPROVE_ORDER_ERROR,
  EDIT_APPROVE_ORDER_SUCCESS,
  EDIT_APPROVE_ORDER_BEGIN,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values.",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === REGISTER_UER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_UER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: "success",
      alertText: "User created Redirecting ...",
    };
  }
  if (action.type === REGISTER_UER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  //login user
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful Redirecting ...",
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
  //toggle side bar
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  //logout
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editProductId: "",
      pName: "",
      price: "",
      qty: 0,
      projectName: "",
      projectLocation: "",
      projectEstimatedCost: 0,
      projectDeadLine: "",
      projectManager: "",
      editProjectId: "",
      isEditingProject: false,
    };
    return { ...state, ...initialState };
  }
  if (action.type === CREATE_PRODUCT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Product added!",
    };
  }
  if (action.type === CREATE_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  //get all products
  if (action.type === GET_ALL_PRODUCTS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_ALL_PRODUCTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      products: action.payload.products,
      totalProducts: action.payload.totalProducts,
      numOfPages: action.payload.numOfPages,
    };
  }
  //set edit job
  if (action.type === SET_EDIT_PRODUCT) {
    const product = state.products.find(
      (product) => product._id === action.payload.id
    );
    const { name, qty, price, _id } = product;
    return {
      ...state,
      isLoading: true,
      isEditing: true,
      pName: name,
      qty,
      price,
      editProductId: _id,
    };
  }
  //edit product
  if (action.type === EDIT_PRODUCT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Product Updated!",
    };
  }
  if (action.type === EDIT_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  //delete job
  if (action.type === DELETE_PRODUCT_BEGIN) {
    return { ...state, isLoading: true };
  }
  //add to cart
  if (action.type === ADD_TO_CART_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === ADD_TO_CART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Item added to cart!",
    };
  }
  if (action.type === ADD_TO_CART_ERROR) {
    let err = action.payload.msg;
    console.log(err);
    if (action.payload.msg === "pid field has to be unique") {
      err = "Product is already in the cart";
    }
    if (action.payload.msg === "pid,createdBy field has to be unique") {
      err = "Product is already in the cart";
    }
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: err,
    };
  }
  //get all cart
  //get all products
  if (action.type === GET_ALL_CART_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_ALL_CART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      cart: action.payload.carts,
    };
  }
  //clear cart
  if (action.type === CLEAR_CART) {
    return { ...state, isLoading: true };
  }
  //create project
  if (action.type === CREATE_PROJECT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_PROJECT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Product added!",
    };
  }
  if (action.type === CREATE_PROJECT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  //get all projects
  if (action.type === GET_ALL_PROJECTS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_ALL_PROJECTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      projects: action.payload.projects,
    };
  }
  //get all users
  if (action.type === GET_ALL_USERS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_ALL_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload.users,
    };
  } //delete project
  if (action.type === DELETE_PROJECT_BEGIN) {
    return { ...state, isLoading: true };
  }
  //set edit project
  if (action.type === SET_EDIT_PROJECT) {
    const project = state.projects.find(
      (product) => product._id === action.payload.id
    );
    const {
      projectName,
      projectLocation,
      projectEstimatedCost,
      projectDeadLine,
      projectManager,
      _id,
    } = project;
    return {
      ...state,
      isLoading: true,
      isEditingProject: true,
      projectName,
      projectLocation,
      projectEstimatedCost,
      projectDeadLine,
      projectManager,
      editProjectId: _id,
    };
  }

  //edit product
  if (action.type === EDIT_PROJECT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_PROJECT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Project Updated!",
    };
  }
  if (action.type === EDIT_PROJECT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  //get all selected orders
  if (action.type === GET_ALL_ORDERS_ABOVE_ONE_LAKH_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_ALL_ORDERS_ABOVE_ONE_LAKH_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      selectedOrders: action.payload.orders,
    };
  }

  //set edit project
  if (action.type === SET_EDIT_APPROVE_ORDER) {
    const orders = state.selectedOrders.find(
      (orders) => orders._id === action.payload.id
    );
    const { status, _id } = orders;
    return {
      ...state,
      isLoading: true,
      isEditingOrderStatus: true,
      editOrderId: _id,
      OrderStatus: status,
    };
  }
  //edit product
  if (action.type === EDIT_APPROVE_ORDER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_APPROVE_ORDER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Order Updated!",
    };
  }
  if (action.type === EDIT_APPROVE_ORDER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  throw new Error(`no such action:${action.type}`);
};

export default reducer;
