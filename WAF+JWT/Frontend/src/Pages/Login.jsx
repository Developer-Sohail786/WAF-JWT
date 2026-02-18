import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axiosPrivate from "../utils/axiosPrivate";
import { endpoints } from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [serverError, setserverError] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setserverError("");
    try {
      const response = await axiosPrivate.post(endpoints.login, {
        email: data.email,
        password: data.password,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error.response?.data);
      if (error.response?.status === 404) {
        setserverError("User Not found. Registr first.");
      } else if (error.response?.status === 401) {
        setserverError("Incorrect password. Try again");
      } else {
        setserverError("Internal server error");
      }
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen w-full bg-slate-700 px-4 py-6">
      <div className="form flex flex-col rounded-lg text-white w-full max-w-md sm:max-w-lg md:max-w-xl">
        <div className="text-2xl sm:text-[2.2rem] font-bold mt-6 sm:mt-10 flex justify-center text-center">
          <h1>Login Here</h1>
        </div>

        <div className="create mt-3 sm:mt-4 text-base sm:text-[1.2rem] flex justify-center text-gray-400 text-center">
          <p>You can login to your account</p>
        </div>

        {/* Display server-side error */}
        {serverError && (
          <div className="text-red-400 text-center mt-4 text-sm sm:text-lg font-semibold px-2">
            {serverError}
          </div>
        )}

        <div className="inputsFields text-base sm:text-[1.2rem] flex flex-col items-center mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <label className="block text-gray-500 mb-1">Email</label>

            <input
              className="border-2 h-12 w-full text-black border-black rounded-lg mt-1 pl-4"
              type="text"
              placeholder="Enter your email"
              {...register("email", {
                required: { value: true, message: "Field can't be empty" },
              })}
            />

            {errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </div>
            )}

            <label className="block text-gray-500 mt-5 mb-1">Password</label>

            <input
              className="border-2 h-12 w-full text-black border-black rounded-lg mt-1 pl-4"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: { value: false, message: "Field can't be empty" },
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
                {isSubmitting ? "Submitting..." : "Login"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-blue-500 flex justify-center mt-5 cursor-pointer text-center">
          <Link to="/register">New user? Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


