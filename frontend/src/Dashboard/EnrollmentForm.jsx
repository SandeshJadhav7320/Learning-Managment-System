import React, { useState } from "react";

const EnrollmentForm = ({ courseId, studentId, onSubmit, closeForm }) => {
  const [enrollmentDetails, setEnrollmentDetails] = useState({
    studentName: "",
    qualification: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnrollmentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(courseId, studentId, enrollmentDetails);
    closeForm();
  };

  return (
    <div className="enrollment-form">
      <h2>Enrollment Form</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="studentName"
            value={enrollmentDetails.studentName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Qualification:
          <input
            type="text"
            name="qualification"
            value={enrollmentDetails.qualification}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={enrollmentDetails.address}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={closeForm}>Close</button>
    </div>
  );
};

export default EnrollmentForm;
