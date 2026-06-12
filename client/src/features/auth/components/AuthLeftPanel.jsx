export default function AuthLeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex-col justify-between p-12 border-slate-900 rounded-br-3xl rounded-tr-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">InterviewAI</h1>
      </div>

      <div className="max-w-md">
        <h2 className="text-2xl font-bold leading-tight tracking-tight">
          AI-Powered Interview Preparation
        </h2>

        <p className="mt-5 text-slate-300 text-md leading-relaxed">
          Build resumes, practice interviews, and improve your chances of
          landing your dream job.
        </p>

        {/* Features */}
        <div className="mt-10 space-y-4">
          {/* <div className="flex items-center gap-3 text-slate-300">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                ✓
              </span>
              AI Mock Interviews
            </div> */}

          <div className="flex items-center gap-3 text-slate-300">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
              ✓
            </span>
            Resume Analysis
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
              ✓
            </span>
            Personalized Feedback
          </div>
        </div>
      </div>

      <div className="text-sm text-slate-500">
        © 2026 InterviewAI. All rights reserved.
      </div>
    </div>
  );
}
