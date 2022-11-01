import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import SelectedOrder from "./SelectedOrder";

const OrderRequestContainer = () => {
  const {
    getAllSelectedProducts,
    selectedOrders,
    isLoading,
    getAllUsers,
    users,
    projects,
    getAllProjects,
  } = useAppContext();
  useEffect(() => {
    getAllSelectedProducts();
    getAllUsers();
    getAllProjects();
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
          let siteManagers = users.filter((user) => {
            return user.type === "Site Manager" && user._id === order.createdBy;
          });
          let project = projects.find(
            (project) => project.projectManager === siteManagers[0].email
          );
          console.log(project);
          return (
            <SelectedOrder
              key={order._id}
              {...order}
              SiteManager={siteManagers[0]}
              project={project}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default OrderRequestContainer;
