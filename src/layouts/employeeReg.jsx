import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const requiredFields = [
  "employeeId",
  "firstName",
  "lastName",
  "email",
  "phone",
  "department",
  "designation",
  "salary",
  "joiningDate",
];

function EmployeeRegistration() {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    requiredFields.forEach((field) => {
      const value = formData[field];

      if (value === "" || (typeof value === "string" && value.trim() === "")) {
        newErrors[field] = "This field is required";
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post("https://sf-employee-integration.onrender.com/api/employees", formData);

      console.log("Employee Data:", response.data);
      toast.success(response.data.message || "Employee registered successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setFormData({
        employeeId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        joiningDate: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1>Employee Registration Form</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            className={errors.employeeId ? "error-input" : ""}
            aria-invalid={errors.employeeId ? "true" : "false"}
            required
          />
          {errors.employeeId && <span className="error-message">{errors.employeeId}</span>}
        </div>

        <div className="field-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? "error-input" : ""}
            aria-invalid={errors.firstName ? "true" : "false"}
            required
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="field-group">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? "error-input" : ""}
            aria-invalid={errors.lastName ? "true" : "false"}
            required
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        <div className="field-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
            aria-invalid={errors.email ? "true" : "false"}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="field-group">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "error-input" : ""}
            aria-invalid={errors.phone ? "true" : "false"}
            required
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="field-group">
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={errors.department ? "error-input" : ""}
            aria-invalid={errors.department ? "true" : "false"}
            required
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
          </select>
          {errors.department && <span className="error-message">{errors.department}</span>}
        </div>

        <div className="field-group">
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            className={errors.designation ? "error-input" : ""}
            aria-invalid={errors.designation ? "true" : "false"}
            required
          />
          {errors.designation && <span className="error-message">{errors.designation}</span>}
        </div>

        <div className="field-group">
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className={errors.salary ? "error-input" : ""}
            aria-invalid={errors.salary ? "true" : "false"}
            required
          />
          {errors.salary && <span className="error-message">{errors.salary}</span>}
        </div>

        <div className="field-group">
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className={errors.joiningDate ? "error-input" : ""}
            aria-invalid={errors.joiningDate ? "true" : "false"}
            required
          />
          {errors.joiningDate && <span className="error-message">{errors.joiningDate}</span>}
        </div>

        <button type="submit">Register Employee</button>
      </form>
    </div>
  );
}

export default EmployeeRegistration;