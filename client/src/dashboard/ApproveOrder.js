import React from "react";
import { useAppContext } from "../context/appContext";
import { FormRow, Alert } from "../components/index";
import Wrapper from "../assets/wrappers/DashboardFormPage";
const ApproveOrder = () => {
  const {
    showAlert,
    displayAlert,
    editProductId,
    pName,
    price,
    qty,
    handleChange,
    clearValues,
    createProduct,
    editProduct,
    OrderStatus,
    isEditingOrderStatus,
    editOrderId,
    editOrderStatus,
  } = useAppContext();
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(pName, price, qty);
    if (!OrderStatus) {
      displayAlert();
      return;
    }
    if (isEditingOrderStatus) {
      //edit function
      editOrderStatus();
      return;
    }
  };
  //handle inputs
  const handleProductInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  const imageSelector = () => {
    if (pName === "Sand") {
      return "/products/sand.jpg";
    } else if (pName === "Bricks") {
      return "/products/bricks.webp";
    } else if (pName === "Cement") {
      return "/products/cement.webp";
    } else {
      return "/products/sand.jpg";
    }
  };
  return (
    <Wrapper>
      <form className="form">
        <h3>Edit Order</h3>
        {showAlert && <Alert />}
        {pName && (
          <img src={imageSelector()} alt="product" width={250} height={250} />
        )}
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="type" className="form-label">
              Product
            </label>
            <select
              name="OrderStatus"
              labelText="Order Status"
              value={OrderStatus}
              onChange={handleProductInput}
              className="form-input"
            >
              <option value="">select</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>
          <FormRow
            type="text"
            labelText="Quantity"
            name="qty"
            value={qty}
            handleChange={handleProductInput}
          />
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default ApproveOrder;
