import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../components/ui/utils/cn";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const combineNames = (firstName, lastName) => {
    if (firstName || lastName) {
      const combinedName = `${firstName.trim()} ${lastName.trim()}`.trim();
      setFormData((prev) => ({
        ...prev,
        username: combinedName,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="rounded-2xl max-w-md w-full mx-auto p-8 shadow-[0_2px_10px_rgba(0,0,0,0.08)] bg-white border border-gray-100">
        <h2 className="font-bold text-xl text-neutral-800">
          Welcome to Stock Price Tracker
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2">
          Sign up to start tracking real-time stock prices
        </p>

        <form onSubmit={handleSubmit} className="my-8">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstName">First name</Label>
              <Input
                type="text"
                placeholder="John"
                id="firstName"
                onChange={(e) => {
                  handleChange(e);
                  combineNames(e.target.value, formData.lastName || "");
                }}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                type="text"
                onChange={(e) => {
                  handleChange(e);
                  combineNames(formData.firstName || "", e.target.value);
                }}
                required
              />
            </LabelInputContainer>
          </div>

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

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password (8+ characters)</Label>
            <Input
              type="password"
              placeholder="••••••••"
              id="password"
              onChange={handleChange}
              pattern=".{8,}"
              title="Must be at least 8 characters"
              required
            />
          </LabelInputContainer>

          <button
            disabled={loading}
            className="bg-linear-to-br relative group/btn from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          >
            {loading ? "Loading..." : "Sign Up"}
            <BottomGradient />
          </button>
        </form>

        <div className="flex gap-2 mt-5">
          <p className="text-neutral-600 text-sm max-w-sm mt-2">
            Have an account?
            <Link to={"/sign-in"}>
              <span className="text-blue-700 ml-2 hover:underline">
                Sign in
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
