import axios from "axios";

export const createSubject = async (subjectdata) => {
  await axios.post("http://10.0.2.2:5000/api/v1/subjects/", subjectdata);
};

export const getAllSubject = async () => {
  const response = await axios.get("http://10.0.2.2:5000/api/v1/subjects/");

  const allSubject = response.data.AllSubjects;

  return allSubject;
};

export const updateSubject = async (subjectID, subData) => {
  return await axios.patch(
    `http://10.0.2.2:5000/api/v1/subjects/${subjectID}`,
    subData
  );
};

export const deleteSubjecthttp = async (subjectID) => {
  console.log(subjectID);
  return await axios.delete(
    `http://10.0.2.2:5000/api/v1/subjects/${subjectID}`
  );
};
