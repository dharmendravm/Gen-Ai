import { Link } from "react-router-dom";
import AuthLeftPanel from "@/features/auth/components/AuthLeftPanel";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side */}
      <AuthLeftPanel/>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-slate-50">
        <div className="w-full max-w-md bg-white lg:bg-transparent lg:shadow-none shadow-xl rounded-xl lg:rounded-none p-6 lg:p-0">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create an account</h2>

            <p className="mt-2 text-slate-500">Sign up to get started</p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
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

            <button
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
              Create account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-slate-900 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
