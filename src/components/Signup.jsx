/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth.js";
import { login } from "../store/authSlice";
import { Button, Input } from "./index";
import Logo  from "../assets/Logo.jpg";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const createAcc = async (data) => {
    console.log("this is user data:",data);
    
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border rounded-lg p-8 shadow-xl">
          <div className="mb-2 flex justify-center">
            <img src={Logo} alt="logo" className="rounded-md h-24 w-48" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form onSubmit={handleSubmit(createAcc)} className="mt-8">
            <div className="space-y-5 ">
            
                <Input
                  label="Full Name"
                  placeholder="Enter Your Full Name"
                  {...register("name", {
                    required: true,
                  })}
                />
              
            
                <Input
                  label="Email"
                  placeholder="Enter Your Email Address"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                          value
                        ) || "Enter a valid email address",
                    },
                  })}
                />
              
            
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter Your Password"
                  {...register("password", {
                    required: true,
                  })}
                />
              
            
                <Button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-purple-800 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-purple-900"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </Button>
              
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
