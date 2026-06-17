import { useContext } from "react";
import InterviewContext from "../context/interview.context.jsx";
import { generateReportApi, getReportByIdApi } from "../services/interview.api.js";

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

  const getReportById = async (interviewId) => {
    try {
      setLoading(true);
      const data = await getReportByIdApi(interviewId);
      setReport(data.interviewReport);
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
    getReportById,
    setReport,
    setReports,
  };
};

export default useInterview;
