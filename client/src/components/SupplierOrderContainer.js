import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import SupplierOrder from "./SupplierOrder";

const SupplierOrderContainer = () => {
    const { getAllSupplierOrders , supOrders, isLoading, user } =
    useAppContext();
  useEffect(() => {
    getAllSupplierOrders();
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <Wrapper>
      <div className="jobs">
        {supOrders.map((order) => {
          return <SupplierOrder key={order._id} {...order} />;
        })}
      </div>
    </Wrapper>
  );
};

export default SupplierOrderContainer
