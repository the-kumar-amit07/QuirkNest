/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { Button, Input } from "./index";
import Logo  from "../assets/Logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  {/*
    // Manually trigger a toast for debugging
  const triggerManualToast = () => {
    toast.success("This is a manual test notification!");
  };
  */}

  const login = async (data) => {
    setError("");
    {/* 
      try {
      const session = await authService.logIn(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message); 
    } 
    */}

    toast.promise(
      authService.logIn(data),
      {
      pending: "Logging in...",
      success: "Logged in successfully!",
      error: "Failed to login. Please check your credentials."
      }
    ).then(async (session) => {
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(authLogin(userData))
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    }).catch((error) => {
      setError(error.message)
    })
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border rounded-lg p-8 shadow-xl">
          <div className="mb-2 flex justify-center">
            <img src={Logo} alt="logo" className="rounded-sm h-24 w-48" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
          {error && <p className="text-red-600 text-center">{error}</p>}
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <div >
                <Input
                  label="Email address"
                  placeholder="Enter your email address"
                  type="email"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPatern: (value) =>
                        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                          value
                        ) || "Enter a valid email address",
                    },
                  })}
                />
              </div>
              <div>
                    <Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    {...register("password",{
                        required: true,
                    })}
                    />
              </div>
              <div>
                <Button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-purple-800 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-purple-900"
                >
                  Get started <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
        {/* Manually trigger toast for debugging 
        <Button
        onClick={triggerManualToast}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Trigger Test Toast
      </Button>
        */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </section>
  );
}

export default Login;
