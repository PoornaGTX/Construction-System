import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import SupplierOrder from "./SupplierOrder";

const SupplierOrderContainer = () => {
    const { getAllSupplierOrders , supOrders, isLoading } =
    useAppContext();
  useEffect(() => {
    getAllSupplierOrders();
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  //set method get all products for customers
console.log(supOrders);
  return (
    <Wrapper>
      <div className="jobs">
        {/* {supOrders.map((order) => {
          return <SupplierOrder key={order._id} {...order} />;
        })} */}
        asda
      </div>
    </Wrapper>
  );
};

export default SupplierOrderContainer
