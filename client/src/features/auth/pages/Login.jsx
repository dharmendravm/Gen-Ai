import { Link, useNavigate } from "react-router-dom";
import AuthLeftPanel from "@/features/auth/components/AuthLeftPanel";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const { handleLogin, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Email and password are required.");
      return;
    }

    try {
      await handleLogin({ email, password });
      navigate("/");
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || err.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-200">
      {/* Left Side */}
      <AuthLeftPanel />

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-slate-200">
        <div className="w-full max-w-md bg-white lg:bg-transparent lg:shadow-none shadow-xl rounded-xl lg:rounded-none p-6 lg:p-0">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back
            </h2>

            <p className="mt-2 text-slate-500 mb-6">
              Sign in to continue to your account
            </p>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border-l-4 border-rose-500 text-rose-700 text-sm rounded-r-md transition-all duration-300">
                {errorMsg}
              </div>
            )}
          </div>

          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="you@example.com"
                className="
                  w-full h-12 px-4
                  rounded-md
                  border border-slate-300
                  bg-slate-50
                  focus:bg-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-600
                  focus:border-transparent
                  transition-all
                "
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter your password"
                className="
                  w-full h-12 px-4
                  rounded-md
                  border border-slate-300
                  bg-slate-50
                  focus:bg-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-600
                  focus:border-transparent
                  transition-all
                "
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded-md border-slate-300"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-slate-900 font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              onClick={(e) => handleSubmit(e)}
              disabled={loading}
              type="submit"
              className="
                w-full h-12
                bg-indigo-600
                disabled:bg-indigo-400
                text-white
                rounded-md
                font-medium
                shadow-lg shadow-indigo-600/20
                hover:bg-indigo-700
                hover:scale-[1.01]
                active:scale-[0.99]
                transition-all
                cursor-pointer
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-slate-900 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
