import React from "react";
import { useAppContext } from "../context/appContext";
import { FormRow, Alert } from "../components/index";
import Wrapper from "../assets/wrappers/DashboardFormPage";
const AddProduct = () => {
  const {
    isEditing,
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
    user
  } = useAppContext();
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(pName, price, qty);
    if (!qty || !pName || !price ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      //edit function
      editProduct();
      return;
    }
    createProduct();
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
        <h3>{isEditing ? "Edit Product" : "Add Product"}</h3>
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
              name="pName"
              labelText="Product Name"
              value={pName}
              onChange={handleProductInput}
              className="form-input"
            >
              <option value="">select</option>
              <option value="Sand">Sand</option>
              <option value="Cement">Cement</option>
              <option value="Bricks">Bricks</option>
            </select>
          </div>
          <FormRow
            type="text"
            labelText="Quantity"
            name="qty"
            value={qty}
            handleChange={handleProductInput}
          />
          <FormRow
            type="text"
            labelText="Price"
            name="price"
            value={price}
            handleChange={handleProductInput}
          />
          <FormRow
            type="text"
            labelText="Supplier"
            name="supplierName"
            value={user.name}
            handleChange={handleProductInput}
            isDisabled= {true}
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

export default AddProduct;
