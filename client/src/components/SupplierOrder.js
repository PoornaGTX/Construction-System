import React from "react";
import moment from "moment";
import {
  FaLocationArrow,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import ProductInfo from "./ProductInfo";

const SupplierOrder = ({
  createdAt,
  total,
  _id,
  status,
}) => {
  const {
    setEditDeliverOrder
  } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <img src="https://media.karousell.com/media/photos/products/2022/8/5/bulk_order_construction_items_1659676584_ff62cf11_progressive.jpg" alt="product" width={250} height={250} />
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
              View Order
            </Link>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default SupplierOrder;
