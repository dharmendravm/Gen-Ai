import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { interviewController } from "../controller/interview.controller.js";
import upload from "../middlewares/file.middleware.js";

const router = express.Router();

router.post("/", authUser, upload.single("resume"), interviewController);

export default router;
