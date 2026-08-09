# Smart Debug Assistant

An AI-powered debugging assistant that helps developers analyze application
logs, protect sensitive information, understand errors, and generate useful
debugging insights.

---

## Features

- **Analyze Logs** – Upload `.log` or `.txt` files and identify errors,
  warnings, exceptions, stack traces, and important patterns.
- **Safe Log Masker** – Detect and mask sensitive information such as
  passwords, API keys, IP addresses, emails, phone numbers, database
  credentials, and file paths.
- **Explain Errors** – Get AI-powered explanations of errors and stack traces.
- **Generate Summary** – Generate concise summaries of application logs.
- **Interactive Debugging** – Ask questions about analyzed logs and receive
  AI-powered responses.

---

## Tech Stack

**Frontend**
- React
- Vite
- Axios
- React Markdown

**Backend**
- Java
- Spring Boot
- Maven

**AI**
- Groq API

---

## How It Works

```text
Upload Log
    ↓
Mask Sensitive Information
    ↓
Review Masked Log
    ↓
Approve
    ↓
AI Analysis
    ↓
Debugging Insights
```

---

## Requirements

- Java 17 or later
- Node.js and npm
- Git
- Groq API key

---

## API Key Setup

This project uses the Groq API for AI-powered analysis and chat.

You must provide **your own Groq API key**.

Set the key as an environment variable.

### Windows PowerShell

```powershell
$env:GROQ_API_KEY="your_groq_api_key"
```

The Spring Boot application reads the key using:

```properties
groq.api.key=${GROQ_API_KEY}
```

**Never commit your actual API key to GitHub.**

---

## Running the Application

### 1. Start Spring Boot Backend

```bash
cd smart-debug-server
./mvnw spring-boot:run
```

Backend:

```text
http://localhost:8080
```

### 2. Start React Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Project Structure

```text
Smart_Debug_Assistant/
├── client/              # React frontend
├── smart-debug-server/  # Spring Boot backend
├── .gitignore
└── README.md
```

---

## Security Note

The application masks sensitive information before sending logs for AI
analysis. However, automated masking cannot guarantee that every secret will
be detected.

**Always review the masked log before approving it for AI analysis.**

---
