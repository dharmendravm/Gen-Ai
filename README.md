# InterviewAI 🤖💼

InterviewAI is an AI-powered interview preparation platform designed to help candidates prepare for interviews by generating customized strategies. By uploading a PDF resume and pasting a target job description, users receive structured, actionable, and personalized preparation dashboards.

---

## 🚀 Key Features

*   **Resume Parsing:** Upload candidate resumes in PDF format to extract profile details, skills, and experience automatically.
*   **Structured AI Analysis:** Leverages Google's `gemini-2.5-flash` model to analyze the resume against the target job requirements.
*   **Match Score Calculation:** Computes a compatibility score (0-100%) indicating how well the candidate fits the role.
*   **Custom Technical & Behavioral Q&As:** Generates potential interview questions, interviewer intent explanations, and suggested STAR-based answers tailored to the profile.
*   **Skill Gap Assessment:** Identifies missing skills with severity classifications (`low`, `medium`, `high`) to guide targeted preparation.
*   **Day-by-Day Preparation Roadmap:** Generates an actionable day-by-day learning schedule with target topics and checklists.
*   **Persistent Dashboards:** All generated interview reports are securely saved to MongoDB and mapped to individual users for ongoing review.
*   **Secure Authentication:** Session-based user sign-up and login utilizing JSON Web Tokens (JWT) and cookies.

---

## 🛠️ Architecture & Tech Stack

### Frontend (SPA)
*   **Framework:** React 19
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS v4
*   **Routing:** React Router v7
*   **Icons:** Lucide React
*   **HTTP Client:** Axios (configured with credentials for secure cookie management)

### Backend (REST API)
*   **Runtime:** Node.js
*   **Framework:** Express.js (v5)
*   **Database:** MongoDB Atlas with Mongoose ODM
*   **Authentication:** JSON Web Tokens (JWT), BcryptJS, Cookie-Parser
*   **File Handling:** Multer (in-memory file uploads)
*   **PDF Parsing:** PDF-parse
*   **GenAI SDK:** Official Google GenAI SDK (`@google/genai` v2)

---

## 📡 API Endpoints

### 🔐 Authentication Routes (`/api/auth`)
*   `POST /register` - Register a new candidate account
*   `POST /login` - Log in and obtain session cookies
*   `GET /logout` - Invalidate user session and clear cookies
*   `GET /get-me` - Retrieve profile info for the currently logged-in candidate

### 🧠 Interview Report Routes (`/api/interview`)
*   `POST /` - Upload resume (file), send job description & self-description to generate a report (Authenticated)
*   `GET /:interviewId` - Fetch details of a specific generated report by ID (Authenticated)

---

## 🗃️ MongoDB Data Schemas
The reports are validated using standard schemas:
*   `user`: Refers to the `users` collection.
*   `jobDescription`: String
*   `resume`: String (parsed text)
*   `selfDescription`: String
*   `matchScore`: Number (0-100)
*   `technicalQuestions`: Array of `{ question, intention, answer }`
*   `behavioralQuestions`: Array of `{ question, intention, answer }`
*   `skillGaps`: Array of `{ skill, severity: "low"|"medium"|"high" }`
*   `preparationPlan`: Array of `{ day, focus, tasks: [String] }`

---

## 🚦 Getting Started

### Prerequisites
*   Node.js installed (v18+ recommended)
*   MongoDB Instance / Connection URI
*   Google Gemini API Key

### Environment Variables
Configure the environment files before running the project:

#### Server `.env` (`/server/.env`):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/interview-ai
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### Installation & Running

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/ankurdotio/interview-ai-yt.git
    cd interview-ai-yt
    ```

2.  **Run the Server:**
    ```bash
    cd server
    npm install
    npm run dev
    ```

3.  **Run the Client:**
    ```bash
    cd ../client
    npm install
    npm run dev
    ```
