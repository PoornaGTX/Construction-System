import React from "react";
import moment from "moment";
import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaBarcode,
} from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import ProductInfo from "./ProductInfo";

const SupplierOrder = ({
  name,
  createdAt,
  total,
  qty,
  _id,
  status,
  siteManagers,
}) => {
  const {
    setEditProduct,
    deleteProduct,
    user,
    addItemToCart,
    setEditApproveOrder,
    setEditDeliverOrder
  } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  const imageSelector = () => {
    if (name === "Sand") {
      return "/products/sand.jpg";
    } else if (name === "Bricks") {
      return "/products/bricks.webp";
    } else if (name === "Cement") {
      return "/products/cement.webp";
    } else {
      return "/products/sand.jpg";
    }
  };
  return (
    <Wrapper>
      <header>
        <img src={imageSelector()} alt="product" width={250} height={250} />
      </header>
      <div className="content">
        {/* content center later */}
        <div className="content-center">
          <ProductInfo icon={<FaLocationArrow />} text={total} />
          <ProductInfo icon={<FaLocationArrow />} text={status} />
          <ProductInfo icon={<FaLocationArrow />} text={date} />
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/order-delivery-notice"
              onClick={() => setEditDeliverOrder(_id)}
              className="btn edit-btn"
            >
              Edit
            </Link>
          </div>
          {/* {user.type !== "Customer" && (
          )}
          {user.type === "Customer" && (
            <div className="actions">
              <Link
                to={`/add-to-cart`}
                onClick={() => addItemToCart({ name, price, qty, _id })}
                className="btn edit-btn"
              >
                Add to cart
              </Link>
            </div>
          )} */}
        </footer>
      </div>
    </Wrapper>
  );
};

export default SupplierOrder;
