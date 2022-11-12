import React, { useEffect } from "react";
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

const SelectedOrder = ({
  createdAt,
  total,
  qty,
  _id,
  createdBy,
  status,
  SiteManager,
}) => {
  const { setEditApproveOrder, getAllUsers, users, projects, getAllProjects } =
    useAppContext();

  let siteManagers = users.filter((user) => {
    return user.type === "Site Manager" && user._id === createdBy;
  });
  let project = projects.find(
    (project) => project.projectManager === siteManagers[0].email
  );

  SiteManager = siteManagers[0];

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  const cost = project.projectEstimatedCost
    ? project.projectEstimatedCost.toString()
    : null;
  return (
    <Wrapper>
      <header>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/002/292/445/small_2x/illustration-of-box-icon-symbol-free-vector.jpg"
          alt="product"
          width={250}
          height={250}
        />
      </header>
      <div className="content">
        {/* content center later */}
        <div className="content-center">
          {/* <ProductInfo icon={<FaLocationArrow />} text={total} /> */}
          <ProductInfo icon={<FaLocationArrow />} text={status} />
          <ProductInfo icon={<FaLocationArrow />} text={date} />
          <ProductInfo icon={<FaLocationArrow />} text={SiteManager.name} />
          <ProductInfo icon={<FaLocationArrow />} text={cost} />
          <ProductInfo
            icon={<FaLocationArrow />}
            text={SiteManager.allocatedProject}
          />
          <ProductInfo
            icon={<FaLocationArrow />}
            text={project.projectLocation}
          />
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/approve-order"
              onClick={() => setEditApproveOrder(_id)}
              className="btn edit-btn"
            >
              Edit
            </Link>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default SelectedOrder;
