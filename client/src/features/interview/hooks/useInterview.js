import { useContext } from "react";
import InterviewContext from "../context/interview.context.jsx";
import { generateReportApi } from "../services/interview.api.js";

const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } = context;

  const generateReport = async (formData) => {
    try {
      setLoading(true);
      const data = await generateReportApi(formData);
      setReport(data.interviewReport);
      setReports((prev) => [data.interviewReport, ...prev]);
      setLoading(false);
      return data.interviewReport;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return {
    loading,
    report,
    reports,
    generateReport,
    setReport,
    setReports,
  };
};

export default useInterview;
