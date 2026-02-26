import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../components/ui/utils/cn";

export default function SignIn() {
  // function and vars to keep the data we are typing
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Submitting the form and saving user in a DB
  const handleSubmit = async (e) => {
    // preventing the page from refreshing (to avoid user data loss)
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/home");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="rounded-2xl max-w-md w-full mx-auto p-8 shadow-[0_2px_10px_rgba(0,0,0,0.08)] bg-white border border-gray-100">
        <h2 className="font-bold text-xl text-neutral-800">Sign In</h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2">Welcome Back!</p>

        <form onSubmit={handleSubmit} className="my-8">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              placeholder="john.doe@example.com"
              id="email"
              onChange={handleChange}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              id="password"
              onChange={handleChange}
              required
            />
          </LabelInputContainer>

          <button
            disabled={loading}
            className="bg-linear-to-br relative group/btn from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          >
            {loading ? "Loading..." : "Sign In"}
            <BottomGradient />
          </button>
        </form>

        <div className="flex gap-2 mt-5">
          <p className="text-neutral-600 text-sm max-w-sm mt-2">
            Don't have an account?
            <Link to={"/sign-up"}>
              <span className="text-blue-700 ml-2 hover:underline">
                Sign up
              </span>
            </Link>
          </p>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm font-medium"> {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-linear-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
