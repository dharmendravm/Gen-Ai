import { PDFParse } from "pdf-parse";
import InterviewReportModel from "../models/interviewReport.model.js";
import generateInterviewReport from "../services/ai.service.js";

export const interviewController = async (req, res) => {
  try {
    const resumeFile = req.file;
    if (!resumeFile) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const parser = new PDFParse({ data: resumeFile.buffer });
    const resumeContent = await parser.getText();
    const { jobDescription, selfDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
      jobDescription,
      selfDescription,
      resume: resumeContent.text,
    });

    const interviewReport = await InterviewReportModel.create({
      user: req.user.id,
      jobDescription,
      selfDescription,
      resume: resumeContent.text,
      ...interviewReportByAi,
    });

    return res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport,
    });
  } catch (error) {
    console.log("Error in interview controller: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
