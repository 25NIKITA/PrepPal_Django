"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", user);
      console.log("Signup success", response.data);
  
      // Assuming signup response includes profileComplete
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("profileComplete", "false"); // New users' profile is incomplete
  
      router.push("/profile"); // Redirect to the profile details page after signup
    } catch (error: any) {
      console.error("Signup error:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl transform transition hover:scale-105 hover:shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-purple-900">{loading ? "Processing..." : "Sign Up"}</h1>
          <p className="mt-2 text-sm text-gray-500">Join the coolest community now!</p>
        </div>
        <hr className="mt-6 border-t-2 border-gray-300" />

        <div className="space-y-4">
          <label htmlFor="email" className="block text-sm font-medium text-purple-700">
            Email
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="you@example.com"
          />

          <label htmlFor="username" className="block text-sm font-medium text-purple-700">
            Username
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Choose a fun username"
          />

          <label htmlFor="password" className="block text-sm font-medium text-purple-700">
            Password
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Create a strong password"
          />
        </div>

        <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className={`w-full px-4 py-3 mt-6 text-white bg-purple-700 rounded-lg font-bold hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition transform hover:scale-105 ${
            buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm font-semibold text-purple-700 hover:text-purple-600">
            Already a member? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
