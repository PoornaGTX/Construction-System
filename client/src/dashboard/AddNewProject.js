import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import { FormRow, Alert } from "../components/index";
import Wrapper from "../assets/wrappers/DashboardFormPage";
const AddNewProject = () => {
  const [startDate, setStartDate] = useState(new Date());
  const {
    isEditingProject,
    showAlert,
    displayAlert,
    handleChange,
    clearValues,
    projectName,
    projectLocation,
    projectEstimatedCost,
    projectDeadLine,
    projectManager,
    createProject,
  } = useAppContext();
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(pName, price, qty);
    if (!projectName || !projectLocation || !projectEstimatedCost) {
      displayAlert();
      return;
    }
    if (isEditingProject) {
      //edit function
      //   editProduct();
      return;
    }
    createProject();
  };
  //handle inputs
  const handleProductInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditingProject ? "Edit Project" : "Add Project"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Project Name"
            name="projectName"
            value={projectName}
            handleChange={handleProductInput}
          />
          <FormRow
            type="text"
            labelText="Project Location"
            name="projectLocation"
            value={projectLocation}
            handleChange={handleProductInput}
          />
          <FormRow
            type="text"
            labelText="Project Estimated Cost"
            name="projectEstimatedCost"
            value={projectEstimatedCost}
            handleChange={handleProductInput}
          />
          <FormRow
            type="date"
            labelText="Project Deadline"
            name="projectDeadLine"
            value={projectDeadLine}
            handleChange={handleProductInput}
          />
          <FormRow
            type="text"
            labelText="Project Manager"
            name="projectManager"
            value={projectManager}
            handleChange={handleProductInput}
          />

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddNewProject;
