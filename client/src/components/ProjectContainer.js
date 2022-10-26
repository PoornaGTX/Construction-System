import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Product from "./Product";
import Loading from "./Loading";
import Project from "./Project";

const ProjectContainer = () => {
  const { getAllProjects, projects, isLoading } = useAppContext();
  useEffect(() => {
    getAllProjects();
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  if (projects.length === 0) {
    return (
      <Wrapper>
        <h2>No Projects to display....</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {projects.length} project{projects.length > 1 && "s"}
      </h5>
      <div className="jobs">
        {projects.map((project) => {
          return <Project key={project._id} {...project} />;
        })}
      </div>
    </Wrapper>
  );
};

export default ProjectContainer;
