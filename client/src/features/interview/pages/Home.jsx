import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  Sparkles,
  UploadCloud,
  FileText,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User,
  Briefcase,
  Layers,
  FileQuestion,
  X,
  Star,
  Info,
  RefreshCw,
} from "lucide-react";
import useAuth from "@/features/auth/hooks/useAuth.js";
import useInterview from "@/features/interview/hooks/useInterview.js";

const HomePage = () => {
  const { user, handleLogout } = useAuth();
  const { loading, report, generateReport, setReport } = useInterview();
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setErrorMsg("");
      } else {
        setErrorMsg("Please upload a PDF file only.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setErrorMsg("");
      } else {
        setErrorMsg("Please upload a PDF file only.");
      }
    }
  };

  const removeFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(null);
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!file && !selfDescription.trim()) {
      setErrorMsg("Either a Resume or a Self Description is required.");
      return;
    }
    if (!jobDescription.trim()) {
      setErrorMsg("Please enter a job description.");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("resume", file);
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);

    try {
      const generated = await generateReport(formData);
      if (generated && generated._id) {
        navigate(`/interview/${generated._id}`);
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || err.message || "Something went wrong.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 font-sans antialiased flex flex-col">
      {/* Header */}
      <header className="bg-[#060913] border-b border-slate-900 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-indigo-400 tracking-wide">
              InterviewAI
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            {user && (
              <span className="text-slate-400">
                {user.username || user.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="text-slate-450 hover:text-white transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex flex-col justify-center">
        {loading ? (
          /* Loading State */
          <div className="max-w-xl w-full mx-auto bg-[#0a0f1d] border border-slate-900 p-8 rounded-2xl shadow-2xl flex flex-col justify-center items-center gap-4 py-16">
            <div className="w-10 h-10 rounded-full border-2 border-indigo-500/10 border-t-indigo-500 animate-spin"></div>
            <h3 className="text-sm font-semibold text-slate-205">
              Generating Interview Strategy
            </h3>
            <p className="text-xs text-slate-500 max-w-xs text-center leading-relaxed">
              Our AI is analyzing the job requirements and your background
              profile to construct your plan. Please wait...
            </p>
          </div>
        ) : report ? (
          /* Result Details Screen */
          <div className="max-w-4xl w-full mx-auto space-y-8">
            {/* Result Header */}
            <div className="flex justify-between items-start pb-4 border-b border-slate-900">
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-slate-100">
                  {report.title || "Report Details"}
                </h3>
                <p className="text-xs text-slate-550">Analysis complete</p>
              </div>
              <div className="text-center px-4 py-2 bg-indigo-950/40 text-indigo-400 font-bold text-xs rounded-lg border border-indigo-500/20 shadow-sm">
                {report.matchScore}% Match
              </div>
            </div>

            {/* Skill Gaps */}
            {report.skillGaps && report.skillGaps.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-slate-450">
                  SKILL GAPS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {report.skillGaps.map((gap, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-xs rounded-lg border font-medium ${
                        gap.severity === "high"
                          ? "bg-rose-500/10 text-rose-450 border-rose-500/25"
                          : gap.severity === "medium"
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/25"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/25"
                      }`}
                    >
                      {gap.skill} ({gap.severity})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Preparation Plan */}
            {report.preparationPlan && report.preparationPlan.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-slate-455">
                  PREPARATION PLAN
                </h4>
                <div className="space-y-3">
                  {report.preparationPlan.map((step, i) => (
                    <div
                      key={i}
                      className="p-4 bg-[#0a0f1d]/30 border border-slate-900 rounded-xl space-y-2 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-indigo-400">
                          Day {step.day}:
                        </span>
                        <span className="text-slate-200 font-bold">
                          {step.focus}
                        </span>
                      </div>
                      {step.tasks && step.tasks.length > 0 && (
                        <ul className="list-disc pl-4 space-y-1 text-slate-400 text-xs leading-relaxed">
                          {step.tasks.map((task, tIdx) => (
                            <li key={tIdx}>{task}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Q&A list */}
            {((report.technicalQuestions &&
              report.technicalQuestions.length > 0) ||
              (report.behavioralQuestions &&
                report.behavioralQuestions.length > 0)) && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-slate-455">
                  INTERVIEW QUESTIONS
                </h4>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {/* Technical */}
                  {report.technicalQuestions &&
                    report.technicalQuestions.map((q, i) => (
                      <div
                        key={`tech-${i}`}
                        className="space-y-2.5 p-4 bg-transparent rounded-xl border border-slate-900 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] px-2 py-0.5 bg-indigo-500/10 text-indigo-400 font-bold uppercase rounded border border-indigo-500/10">
                            Technical
                          </span>
                        </div>
                        <p className="font-bold text-slate-200 leading-relaxed">
                          {q.question}
                        </p>
                        <div className="space-y-2 pt-2.5 border-t border-slate-900 text-xs leading-relaxed">
                          {q.intention && (
                            <div>
                              <span className="font-bold text-slate-500 block uppercase text-[8px] tracking-wider">
                                Intention:
                              </span>
                              <p className="text-slate-400 italic">
                                "{q.intention}"
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                  {/* Behavioral */}
                  {report.behavioralQuestions &&
                    report.behavioralQuestions.map((q, i) => (
                      <div
                        key={`beh-${i}`}
                        className="space-y-2.5 p-4 bg-transparent rounded-xl border border-slate-900 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] px-2 py-0.5 bg-violet-500/10 text-violet-400 font-bold uppercase rounded border border-violet-500/10">
                            Behavioral
                          </span>
                        </div>
                        <p className="font-bold text-slate-200 leading-relaxed">
                          {q.question}
                        </p>
                        <div className="space-y-2 pt-2.5 border-t border-slate-900 text-xs leading-relaxed">
                          {q.intention && (
                            <div>
                              <span className="font-bold text-slate-500 block uppercase text-[8px] tracking-wider">
                                Intention:
                              </span>
                              <p className="text-slate-400 italic">
                                "{q.intention}"
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-slate-900 flex justify-end">
              <button
                onClick={() => setReport(null)}
                className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Start New Strategy Analysis
              </button>
            </div>
          </div>
        ) : (
          /* Form Configuration Screen matching the layout in the user screenshot */
          <div className="max-w-4xl w-full mx-auto space-y-8">
            {/* Header titles */}
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Create Your Custom{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">
                  Interview Plan
                </span>
              </h1>
              <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                Let our AI analyze the job requirements and your unique profile
                to build a winning strategy.
              </p>
            </div>

            {/* Card form */}
            <div className="bg-[#090d16] border border-slate-900/80 rounded-2xl p-6 md:p-8 shadow-2xl relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 2 Column Form body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Job Description */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-200">
                        <Briefcase className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Target Job Description
                        </span>
                      </div>
                      <span className="text-[8px] px-1.5 py-0.5 bg-rose-500/10 text-rose-400 font-bold uppercase rounded border border-rose-500/20">
                        REQUIRED
                      </span>
                    </div>

                    <div className="relative">
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                        maxLength={5000}
                        className="w-full min-h-[300px] p-4 bg-[#05070e] border border-slate-800 rounded-xl text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-100 resize-none leading-relaxed transition-all"
                      />
                      <div className="absolute bottom-3 right-3 text-[10px] text-slate-500">
                        {jobDescription.length} / 5000 chars
                      </div>
                    </div>
                  </div>

                  {/* Right Column: User Profile details */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 text-slate-200">
                      <User className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Your Profile
                      </span>
                    </div>

                    {/* Upload Resume sub-section */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">
                          Upload Resume
                        </span>
                        <span className="text-[8px] px-1.5 py-0.5 bg-indigo-500/10 text-indigo-400 font-bold uppercase rounded border border-indigo-550/20">
                          BEST RESULTS
                        </span>
                      </div>

                      {/* Dropzone container */}
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                          file
                            ? "border-emerald-500/40 bg-emerald-500/[0.02]"
                            : dragActive
                              ? "border-indigo-500 bg-indigo-500/[0.02]"
                              : "border-slate-800 hover:border-slate-700 bg-[#05070e]"
                        }`}
                      >
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          id="resume-file"
                        />

                        {file ? (
                          <div className="text-center space-y-2">
                            <FileText className="w-6 h-6 text-emerald-400 mx-auto" />
                            <p className="text-xs font-semibold text-slate-200 truncate max-w-[180px]">
                              {file.name}
                            </p>
                            <p className="text-[10px] text-slate-550">
                              {formatBytes(file.size)}
                            </p>
                            <button
                              type="button"
                              onClick={removeFile}
                              className="text-[10px] text-rose-400 font-semibold hover:underline block mx-auto mt-1 cursor-pointer"
                            >
                              Remove file
                            </button>
                          </div>
                        ) : (
                          <div className="text-center space-y-2">
                            <UploadCloud className="w-6 h-6 text-indigo-455 mx-auto" />
                            <p className="text-xs font-semibold text-slate-300">
                              Click to upload or drag & drop
                            </p>
                            <p className="text-[10px] text-slate-550">
                              PDF format only (Max 5MB)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* OR divider */}
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-px bg-slate-900 flex-1"></div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                        OR
                      </span>
                      <div className="h-px bg-slate-900 flex-1"></div>
                    </div>

                    {/* Self description sub-section */}
                    <div className="space-y-2.5">
                      <span className="text-xs font-semibold text-slate-400 block">
                        Quick Self-Description
                      </span>
                      <textarea
                        value={selfDescription}
                        onChange={(e) => setSelfDescription(e.target.value)}
                        placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                        rows="4"
                        className="w-full p-4 bg-[#05070e] border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-xs focus:outline-none text-slate-100 resize-none leading-relaxed transition-all"
                      />
                    </div>

                    {/* Profile validation alert banner */}
                    <div className="p-3 bg-indigo-950/15 border border-indigo-900/30 rounded-xl flex items-start gap-2.5 text-[11px] leading-relaxed text-indigo-300">
                      <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>
                        Either a <b>Resume</b> or a <b>Self Description</b> is
                        required to generate a personalized plan.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="flex items-start gap-2 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Bottom line divider and actions */}
                <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[10px] text-slate-500 font-medium">
                    AI-Powered Strategy Generation • Approx 30s
                  </span>

                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] disabled:bg-slate-900 disabled:text-slate-500 text-white font-semibold text-xs rounded-xl transition-all border border-transparent disabled:border-slate-850 shadow-md shadow-indigo-600/10 cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5 fill-indigo-300 text-indigo-300" />
                      <span>Generate My Interview Strategy</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer links */}
            <div className="flex justify-center items-center gap-6 text-[10px] text-slate-500 font-medium pt-4">
              <a href="#" className="hover:text-slate-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-300 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-slate-300 transition-colors">
                Help Center
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
