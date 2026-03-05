import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate,Link } from "react-router-dom";
import { endpoints } from "../utils/api";
import axiosPrivate from "../utils/axiosPrivate";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const {
    register: registerField, // rename to avoid conflict
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
   const [serverError, setserverError] = useState("");

  const onSubmit = async (data) => {
    try {
      setserverError("");
      const response = await axiosPrivate.post(endpoints.register, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      
      navigate("/login");
    } catch (error) {
      
      setserverError(error.response?.data?.message || "Internal server error");
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-slate-200 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800">Register</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Create your new account here
        </p>
      </div>
      {/* Server error */}
      {serverError && (
        <div className="bg-red-100 text-red-600 text-sm p-3 rounded-md mt-4 text-center">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">

        <div>
          <label className="text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="mt-1 w-full h-11 border border-gray-300 rounded-lg px-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...registerField("name", {
              required: { value: true, message: "Field can't be empty" },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="mt-1 w-full h-11 border border-gray-300 rounded-lg px-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...registerField("email", {
              required: { value: true, message: "Field can't be empty" },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="mt-1 w-full h-11 border border-gray-300 rounded-lg px-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...registerField("password", {
              required: { value: true, message: "Field can't be empty" },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full h-11 rounded-lg font-semibold transition ${
            isSubmitting
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>

      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already had an account?
        <Link
          to="/login"
          className="text-blue-600 ml-2 font-medium hover:underline"
        >
          Login here
        </Link>
      </p>

    </div>
  </div>
);
};

export default Register;

