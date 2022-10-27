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

const Project = ({
  projectName,
  projectLocation,
  projectEstimatedCost,
  projectDeadLine,
  projectManager,
  createdAt,
  _id,
}) => {
  const { deleteProject, setEditProduct, deleteProduct, user, addItemToCart } =
    useAppContext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  let dueDate = moment(projectDeadLine);
  dueDate = dueDate.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header></header>
      <div className="content">
        {/* content center later */}
        <div className="content-center">
          <ProductInfo icon={<RiMoneyDollarCircleFill />} text={projectName} />
          <ProductInfo icon={<BsCart4 />} text={projectLocation} />
          <ProductInfo icon={<BsCart4 />} text={projectEstimatedCost} />
          <ProductInfo icon={<BsCart4 />} text={projectManager} />
          <ProductInfo icon={<BsCart4 />} text={date} />
          <ProductInfo icon={<BsCart4 />} text={dueDate} />
        </div>
        <footer>
          <div className="actions">
            {/* <Link
              to="/add-product"
              onClick={() => setEditProduct(_id)}
              className="btn edit-btn"
            >
              Edit
            </Link> */}
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteProject(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Project;
