import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { endpoints } from "../utils/api";
import axiosPrivate from "../utils/axiosPrivate";

const Register = () => {
  const navigate = useNavigate();

  const {
    register: registerField,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Raw register data (send to WAF):", data);
      const response = await axiosPrivate.post(endpoints.register, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.log("Error response:", error.response?.data);
      alert(error.response?.data?.message || "Internal server error");
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen bg-slate-700 px-4 py-6">
      <div className="form flex flex-col rounded-lg text-white w-full max-w-md sm:max-w-lg md:max-w-xl">
        <div className="text-2xl sm:text-[2.2rem] font-bold mt-6 sm:mt-10 flex justify-center text-center">
          <h1>Register Here</h1>
        </div>

        <div className="create mt-3 sm:mt-4 text-base sm:text-[1.2rem] flex justify-center text-gray-400 text-center">
          <p>Create your new account here</p>
        </div>

        <div className="inputsFields text-base sm:text-[1.2rem] flex flex-col items-center mt-8 sm:mt-10">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <label className="block text-gray-500 mb-1">Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              className="border-2 h-12 w-full text-black border-black rounded-lg mt-1 pl-4"
              {...registerField("name", {
                required: { value: true, message: "Field can't be empty" },
                minLength: { value: 3, message: "Minimum length is 3 characters" },
                maxLength: { value: 20, message: "Maximum length is 20 characters" },
              })}
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </div>
            )}

            <label className="block text-gray-500 mt-4 mb-1">Email</label>

            <input
              type="text"
              placeholder="Enter your email"
              className="border-2 h-12 w-full text-black border-black rounded-lg mt-1 pl-4"
              {...registerField("email", {
                required: { value: true, message: "Field can't be empty" },
                minLength: { value: 6, message: "Minimum length is 6 characters" },
                maxLength: { value: 24, message: "Maximum length is 24 characters" },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email Invalid",
                },
              })}
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </div>
            )}

            <label className="block text-gray-500 mt-5 mb-1">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="border-2 h-12 w-full text-black border-black rounded-lg mt-1 pl-4"
              {...registerField("password", {
                required: { value: true, message: "Field can't be empty" },
                minLength: { value: 8, message: "Minimum length is 8 characters" },
                maxLength: { value: 16, message: "Maximum length is 16 characters" },
                validate: (value) => {
                  if (!/[a-z]/.test(value)) return "Lowercase character is required";
                  if (!/[A-Z]/.test(value)) return "Uppercase character is required";
                  if (!/\d/.test(value)) return "Number is required";
                  if (!/[@$!%*?&]/.test(value))
                    return "Special character is required (@$!%*?&)";
                  return true;
                },
              })}
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </div>
            )}

            <div className="btn flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`h-12 w-full sm:w-[70%] md:w-[50%] rounded-lg mt-5 font-bold text-base sm:text-[1.2rem] ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-blue-500 hover:bg-blue-800 text-white"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-gray-400 flex justify-center mt-5 text-center px-2">
          Already had an account?
          <Link
            to="/login"
            className="text-blue-500 ml-2 hover:underline cursor-pointer"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

