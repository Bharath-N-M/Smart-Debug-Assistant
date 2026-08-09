#  Smart Debug Assistant

An AI-powered debugging assistant that helps developers analyze application
logs, protect sensitive information, understand errors, and generate useful
debugging insights.

---

##  Features

###  Analyze Logs

Upload `.log` or `.txt` files and identify:

- Errors and exceptions
- Warnings and critical messages
- Frequently occurring errors
- Stack traces
- Important events and patterns
- Possible causes of failures

###  Safe Log Masker
Protect sensitive information before sending logs for AI analysis.

The application can detect and mask information such as:

- Passwords
- API keys and access tokens
- IP addresses
- Email addresses
- Phone numbers
- Database credentials

###  Explain Errors
Understand application errors and stack traces with AI-powered explanations.

###  Generate Summary
Generate a concise AI-powered summary of the important information contained
in an application log.

###  Interactive Debugging
Ask questions about the analyzed log and receive AI-powered responses.

---

##  How It Works

```text
Upload Log
    ↓
Protect Sensitive Data
    ↓
Review Masked Log
    ↓
AI Analysis
    ↓
Error Explanation & Insights
    ↓
Interactive Debugging


to run client:: npm run dev
to run server:: npm start;
to run smart-debug-server:: 
enter.