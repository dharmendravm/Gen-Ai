import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ChevronRight,
  Code2,
  Briefcase,
  HelpCircle,
  Lightbulb,
  Compass,
  ArrowUpRight
} from "lucide-react";
import useInterview from "../hooks/useInterview";

const InterviewReportPage = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { getReportById, loading, report } = useInterview();
  const [activeTab, setActiveTab] = useState("technical");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setError(null);
        await getReportById(interviewId);
      } catch (err) {
        console.error("Failed to load interview report:", err);
        setError("Failed to load interview report. Please try again or return home.");
      }
    };
    if (interviewId) {
      fetchReport();
    }
  }, [interviewId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060913] text-slate-100 font-sans antialiased flex flex-col justify-center items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500/10 border-t-indigo-500 animate-spin"></div>
        <h3 className="text-sm font-semibold text-slate-200">Loading Interview Report</h3>
        <p className="text-xs text-slate-500 max-w-xs text-center leading-relaxed">
          Retrieving your personalized interview prep strategy...
        </p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-[#060913] text-slate-100 font-sans antialiased flex flex-col justify-center items-center gap-6 p-6">
        <div className="max-w-md w-full bg-[#0a0f1d] border border-slate-900 p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center gap-4">
          <AlertCircle className="w-12 h-12 text-rose-500" />
          <h3 className="text-lg font-bold text-slate-200">Something went wrong</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {error || "We couldn't find the requested interview report. It might not exist or you may not have permission to view it."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-2 flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back Home</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 font-sans antialiased flex flex-col">
      {/* Header */}
      <header className="bg-[#060913]/80 backdrop-blur-md border-b border-slate-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-lg transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-indigo-400 tracking-wide">
                InterviewAI
              </span>
              <span className="text-slate-700">|</span>
              <span className="text-xs text-slate-400 truncate max-w-[200px] md:max-w-sm font-medium">
                {report.title || "Interview Strategy Report"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Candidate Score</span>
              <span className="text-xs text-slate-300 font-semibold">Ready for interview</span>
            </div>
            <div className="px-4 py-2 bg-indigo-950/40 text-indigo-400 font-bold text-xs rounded-lg border border-indigo-500/20 shadow-sm">
              {report.matchScore}% Match
            </div>
          </div>
        </div>
      </header>

      {/* Outer container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col">
        {/* Main 3-Column Layout Grid */}
        <div className="bg-[#090d16] border border-slate-900/80 rounded-2xl shadow-2xl flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden min-h-[600px]">
          
          {/* LEFT COLUMN: Sidebar Navigation (Col span 3) */}
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-slate-900 p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">Sections</h2>
              
              <button
                onClick={() => setActiveTab("technical")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-xl transition-all text-left cursor-pointer ${
                  activeTab === "technical"
                    ? "bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500 font-bold"
                    : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                }`}
              >
                <Code2 className="w-4 h-4 shrink-0" />
                <span>Technical questions</span>
              </button>

              <button
                onClick={() => setActiveTab("behavioral")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-xl transition-all text-left cursor-pointer ${
                  activeTab === "behavioral"
                    ? "bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500 font-bold"
                    : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                }`}
              >
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>Behavioral questions</span>
              </button>

              <button
                onClick={() => setActiveTab("roadmap")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-xl transition-all text-left cursor-pointer ${
                  activeTab === "roadmap"
                    ? "bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500 font-bold"
                    : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                }`}
              >
                <Compass className="w-4 h-4 shrink-0" />
                <span>Road Map</span>
              </button>
            </div>
            
            {/* Quick Stats Box */}
            <div className="mt-auto hidden md:block p-4 bg-[#05070e] border border-slate-900 rounded-xl">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Job Information</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-600 block">Date Generated</span>
                  <span className="text-slate-400 font-medium">
                    {report.createdAt ? new Date(report.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    }) : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: Main Content Area (Col span 6) */}
          <div className="md:col-span-6 p-6 md:p-8 flex flex-col min-h-[500px] overflow-y-auto max-h-[80vh]">
            
            {/* Active Content rendering */}
            {activeTab === "technical" && (
              <div className="space-y-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-slate-200">Technical Preparation</h3>
                  <p className="text-xs text-slate-500">Core technical topics & focus points for your resume profile.</p>
                </div>

                {report.technicalQuestions && report.technicalQuestions.length > 0 ? (
                  <div className="space-y-4">
                    {report.technicalQuestions.map((q, idx) => (
                      <div key={idx} className="p-5 bg-[#05070e] border border-slate-900 rounded-xl space-y-4 hover:border-slate-850 transition-all">
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-[9px] px-2 py-0.5 bg-indigo-500/10 text-indigo-400 font-bold uppercase rounded border border-indigo-500/15">
                            Q{idx + 1} • Technical
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200 leading-relaxed">
                          {q.question}
                        </h4>
                        
                        <div className="space-y-3 pt-3 border-t border-slate-900">
                          {q.intention && (
                            <div className="flex gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                              <div className="text-xs">
                                <span className="font-bold text-slate-500 block uppercase text-[9px] tracking-wider mb-0.5">Interviewer Intention:</span>
                                <p className="text-slate-400 italic">"{q.intention}"</p>
                              </div>
                            </div>
                          )}
                          
                          {q.answer && (
                            <div className="flex gap-2 bg-indigo-950/10 border border-indigo-950/20 p-3.5 rounded-lg">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                              <div className="text-xs leading-relaxed text-slate-300">
                                <span className="font-bold text-amber-500 block uppercase text-[9px] tracking-wider mb-1">Key Points & Suggested Answer:</span>
                                <p>{q.answer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 border border-dashed border-slate-900 rounded-xl text-center text-xs text-slate-500">
                    No technical questions generated for this profile.
                  </div>
                )}
              </div>
            )}

            {activeTab === "behavioral" && (
              <div className="space-y-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-slate-200">Behavioral Strategy</h3>
                  <p className="text-xs text-slate-500">Situational questions customized to match your experience details.</p>
                </div>

                {report.behavioralQuestions && report.behavioralQuestions.length > 0 ? (
                  <div className="space-y-4">
                    {report.behavioralQuestions.map((q, idx) => (
                      <div key={idx} className="p-5 bg-[#05070e] border border-slate-900 rounded-xl space-y-4 hover:border-slate-850 transition-all">
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-[9px] px-2 py-0.5 bg-violet-500/10 text-violet-400 font-bold uppercase rounded border border-violet-500/15">
                            Q{idx + 1} • Behavioral
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200 leading-relaxed">
                          {q.question}
                        </h4>
                        
                        <div className="space-y-3 pt-3 border-t border-slate-900">
                          {q.intention && (
                            <div className="flex gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                              <div className="text-xs">
                                <span className="font-bold text-slate-500 block uppercase text-[9px] tracking-wider mb-0.5">Interviewer Intention:</span>
                                <p className="text-slate-400 italic">"{q.intention}"</p>
                              </div>
                            </div>
                          )}
                          
                          {q.answer && (
                            <div className="flex gap-2 bg-violet-950/10 border border-violet-950/20 p-3.5 rounded-lg">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                              <div className="text-xs leading-relaxed text-slate-300">
                                <span className="font-bold text-amber-500 block uppercase text-[9px] tracking-wider mb-1">Suggested Approach (STAR):</span>
                                <p>{q.answer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 border border-dashed border-slate-900 rounded-xl text-center text-xs text-slate-500">
                    No behavioral questions generated for this profile.
                  </div>
                )}
              </div>
            )}

            {activeTab === "roadmap" && (
              <div className="space-y-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-slate-200">Preparation Road Map</h3>
                  <p className="text-xs text-slate-500">Your step-by-step action plan to master your interview.</p>
                </div>

                {report.preparationPlan && report.preparationPlan.length > 0 ? (
                  <div className="relative pl-6 border-l border-slate-900 space-y-8 py-2">
                    {report.preparationPlan.map((step, idx) => (
                      <div key={idx} className="relative space-y-3">
                        {/* Timeline Node Dot */}
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#060913] border-2 border-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        </div>
                        
                        <div className="p-5 bg-[#05070e] border border-slate-900 rounded-xl space-y-3 hover:border-slate-850 transition-all">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-indigo-600/10 text-indigo-400 font-extrabold text-[9px] rounded border border-indigo-500/10 uppercase">
                              Day {step.day}
                            </span>
                            <span className="text-xs font-bold text-slate-200">
                              {step.focus}
                            </span>
                          </div>
                          
                          {step.tasks && step.tasks.length > 0 && (
                            <ul className="space-y-2 pt-2 border-t border-slate-900/60">
                              {step.tasks.map((task, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 border border-dashed border-slate-900 rounded-xl text-center text-xs text-slate-500">
                    No road map steps generated for this profile.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Skill Gaps (Col span 3) */}
          <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-slate-900 p-6 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Skill Gaps</h3>
              <p className="text-[10px] text-slate-600 px-1 leading-relaxed">Areas to address in your profile before the interview.</p>
            </div>

            {report.skillGaps && report.skillGaps.length > 0 ? (
              <div className="flex flex-wrap md:flex-col gap-3">
                {report.skillGaps.map((gap, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all shrink-0 ${
                      gap.severity === "high"
                        ? "bg-rose-500/[0.02] border-rose-500/20 hover:border-rose-500/35 hover:bg-rose-500/[0.04]"
                        : gap.severity === "medium"
                          ? "bg-amber-500/[0.02] border-amber-500/20 hover:border-amber-500/35 hover:bg-amber-500/[0.04]"
                          : "bg-blue-500/[0.02] border-blue-500/20 hover:border-blue-500/35 hover:bg-blue-500/[0.04]"
                    }`}
                  >
                    <span className="text-xs font-semibold text-slate-200 truncate">
                      {gap.skill}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[8px] font-extrabold uppercase rounded border ${
                        gap.severity === "high"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : gap.severity === "medium"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}
                    >
                      {gap.severity}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 border border-dashed border-slate-900 rounded-xl text-center text-xs text-slate-600">
                Excellent! No skill gaps identified for this profile.
              </div>
            )}
            
            {/* Quick Tips Box */}
            <div className="mt-auto p-4 bg-[#05070e] border border-slate-900 rounded-xl text-xs space-y-2 hidden md:block">
              <div className="flex items-center gap-1.5 text-indigo-400 font-bold uppercase text-[9px] tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Recommendation</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Focus on high-severity skill gaps first by reviewing corresponding topics in your day-by-day roadmap.
              </p>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default InterviewReportPage;