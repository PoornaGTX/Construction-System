import React from "react";
import { useAppContext } from "../context/appContext";
import { FormRow, Alert } from "../components/index";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import moment from "moment";
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
    selectedOrder,
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
  let date = moment(selectedOrder.createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <>
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
                Order Status
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
              labelText="Total"
              name="Total"
              value={selectedOrder.total}
              handleChange={handleProductInput}
              isDisabled={true}
            />
            <FormRow
              type="text"
              labelText="Date"
              name="Date"
              value={date}
              handleChange={handleProductInput}
              isDisabled={true}
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
      <Wrapper>
        <style>
          {`table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
`}
        </style>
        <form>
          <h3>Order Details</h3>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.cartproducts.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.userQty}</td>
                    <td>{item.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
        <br />
      </Wrapper>
    </>
  );
};

export default ApproveOrder;
