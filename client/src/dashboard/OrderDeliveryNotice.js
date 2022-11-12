import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { FormRow, Alert } from "../components/index";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import moment from "moment";
const OrderDeliveryNotice = () => {

  const {
    showAlert,
    displayAlert,
    pName,
    handleChange,
    clearValues,
    OrderStatus,
    isEditingOrderStatus,
    editOrderStatus,
    selectedOrder,
    user,
    orderedCementQty,
    orderedBricksQty,
    orderedSandQty,
    reduceDeliveredQty
  } = useAppContext();
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!OrderStatus) {
      displayAlert();
      return;
    }
    if (isEditingOrderStatus) {
      editOrderStatus();
      reduceDeliveredQty(orderQty);
      return;
    }
  };
  //handle inputs
  const handleProductInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  
  let date = moment(selectedOrder.createdAt);
  date = date.format("MMM Do, YYYY");

  const [cid, setCid] = useState(0);
  const [cementOrder, seCementOrderState] = useState(0);

  const [bid, setBid] = useState(0);
  const [bricksOrder, setBricksOrderState] = useState(0);

  const [sid, setSid] = useState(0);
  const [sandOrder, setSandOrderState] = useState(0);

  function setCementOrder() {
    const cQty = selectedOrder.cartproducts.filter((item)=>item.supName===user.name&&item.type==='Cement')
    const orderCement = cQty[0]?.userQty ? cQty[0]?.userQty : 0
    seCementOrderState(orderCement)
    const cid = cQty[0]?.pid
    setCid(cid)
  }

  function setBricksOrder() {
    const bQty = selectedOrder.cartproducts.filter((item)=>item.supName===user.name&&item.type==='Bricks')
    const orderBricks = bQty[0]?.userQty?bQty[0]?.userQty:0
    setBricksOrderState(orderBricks)
    const bid = bQty[0]?.pid
    setBid(bid)
  }

  function setSandOrder() {
    const sQty = selectedOrder.cartproducts.filter((item)=>item.supName===user.name&&item.type==='Sand')
    const orderSand = (sQty[0]?.userQty)?sQty[0]?.userQty:0
    setSandOrderState(orderSand)
    const sid = sQty[0]?.pid
    setSid(sid)
  }

  const orderQty = [
    {
      name: 'cement',
      pid: cid,
      qty: cementOrder
    },
    {
      name: 'Sand',
      pid: sid,
      qty: sandOrder
    },
    {
      name: 'Bricks',
      pid: bid,
      qty: bricksOrder
    },
  ]

  useEffect(() => {
    setCementOrder()
  }, [orderedCementQty]);
  
  useEffect(() => {
    setBricksOrder()
  }, [orderedBricksQty]);

  useEffect(() => {
    setSandOrder()
  }, [orderedSandQty]);

  return (
    <>
      <Wrapper>
        <form className="form">
          <h3>Order Delivery Notice</h3>
          {showAlert && <Alert />}
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
                <option value="delivered">Delivered</option>
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
              {selectedOrder.cartproducts.filter((item)=>item.supName===user.name).map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.type}</td>
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

export default OrderDeliveryNotice;
