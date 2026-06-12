import { Link } from "react-router-dom";
import AuthLeftPanel from "../components/AuthLeftPanel";

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
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

            <p className="mt-2 text-slate-500">
              Sign in to continue to your account
            </p>
          </div>

          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <input
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
              type="submit"
              className="
                w-full h-12
                bg-indigo-600
                text-white
                rounded-md
                font-medium
                shadow-lg shadow-indigo-600/20
                hover:bg-indigo-700
                hover:scale-[1.01]
                active:scale-[0.99]
                transition-all
              "
            >
              Sign In
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
