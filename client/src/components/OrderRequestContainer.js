import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import SelectedOrder from "./SelectedOrder";

const OrderRequestContainer = () => {
  const { getAllSelectedProducts, selectedOrders, isLoading, getAllUsers } =
    useAppContext();
  useEffect(() => {
    getAllSelectedProducts();
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  if (selectedOrders.length === 0) {
    return (
      <Wrapper>
        <h2>No Orders to display....</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {selectedOrders.length} order{selectedOrders.length > 1 && "s"}
      </h5>
      <div className="jobs">
        {selectedOrders.map((order) => {
          return <SelectedOrder key={order._id} {...order} />;
        })}
      </div>
    </Wrapper>
  );
};

export default OrderRequestContainer;
