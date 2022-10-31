import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Project from "./Project";
import User from "./User";

const AllSiteManagersContainer = () => {
  const { getAllUsers, users, isLoading } = useAppContext();
  let siteManagers = users.filter((user) => {
    return user.type === "Site Manager";
  });
  useEffect(() => {
    getAllUsers();
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  if (siteManagers.length === 0) {
    return (
      <Wrapper>
        <h2>No Projects to display....</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {siteManagers.length} site manager{siteManagers.length > 1 && "s"}
      </h5>
      <div className="jobs">
        {siteManagers.map((user) => {
          return <User key={user._id} {...user} />;
        })}
      </div>
    </Wrapper>
  );
};

export default AllSiteManagersContainer;
