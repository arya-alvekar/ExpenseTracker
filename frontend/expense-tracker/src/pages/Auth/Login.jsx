import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import {Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { updateUser } = useContext(UserContext);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Please enter the password";
    if (form.password && form.password.length < 8)
      newErrors.password = "Min 8 characters";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit clicked"); // add this
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
          email: form.email,
          password: form.password,
        });
      
        const { token, user } = response.data;
      
        if (token) {
          localStorage.setItem("token", token);
          updateUser(user); 
          navigate("/dashboard");
        }
      
      } catch (error) {
        if (error.response && error.response.data.message) {
          setErrors({ api: error.response.data.message });
        } else {
          setErrors({ api: "Something went wrong. Please try again." });
        }
      }

    } 
  };

  return (
    <AuthLayout>
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Welcome Back
          </h2>

          <p className="text-sm font-semibold text-gray-500 mb-6">
            Please enter your details to log in
          </p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="arya@thebest.com"
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Min 8 Characters"
            error={errors.password}
          />

          <button
            type="submit"
            className="w-full mt-2 py-2 text-sm font-medium text-white rounded-md
            bg-gradient-to-r from-purple-600 to-pink-500
            hover:opacity-90 transition"
          >
            LOGIN
          </button>

          {errors.api && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.api}</p>
          )}
        </form>

        <p className="text-xs  font-semibold text-gray-500 mt-5">
          Don’t have an account?{" "}
          <Link 
          to="/signup" 
          className="text-purple-600 font-medium cursor-pointer">
            SignUp
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;