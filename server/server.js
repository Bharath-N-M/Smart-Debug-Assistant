import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import Groq from "groq-sdk";
import { maskPII } from "./redactor.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// For file upload
const upload = multer({ dest: "uploads/" });

// --------------------------------------------
// GROQ LLM CLIENT
// --------------------------------------------
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// --------------------------------------------
// ROUTE 1 — UPLOAD LOG → SANITIZE → RETURN MASKED VERSION
// --------------------------------------------
app.post("/upload-log", upload.single("file"), (req, res) => {
  try {
    console.log("UPLOAD RECEIVED:", req.file?.originalname);

    if (!req.file) {
      return res.status(400).json({ error: "No file received" });
    }

    // Read the uploaded log file
    const raw = fs.readFileSync(req.file.path, "utf8");

    // Run masking using redact-pii
    const masked = maskPII(raw); 

    return res.json({
      original: raw,
      masked,
    });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Failed to process file" });
  }
});

// --------------------------------------------
// ROUTE 2 — ANALYZE MASKED LOG USING GROQ LLM
// --------------------------------------------
app.post("/analyze-log", async (req, res) => {
  try {
    const { maskedText } = req.body;

    if (!maskedText) {
      return res.status(400).json({ error: "maskedText missing" });
    }

    console.log("🔥 Sending masked log to LLM for analysis...");

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are a senior production debugging engineer.

You will receive a sanitized LOG FILE for analysis.

Your tasks:
1. Identify main issues (DB failures, auth failures, API errors, timeouts, email issues, etc.)
2. Explain what each error means clearly
3. Identify ROOT CAUSES
4. Provide RECOMMENDED FIXES for developers
5. Include exact line numbers from the log where issues occur

**Provide the sanitized LOG FILE in your query.**

USE THIS EXACT FORMAT:

### 🔥 Issue Summary
**Line X:** [exact log line showing the issue]
**Explanation:** [clear description of what the error means]

### 🧠 Root Causes
- [Cause 1 with evidence from log]
- [Cause 2 with evidence from log]
- [Cause 3 with evidence from log]

### 🛠 Recommended Fixes
- [Fix 1: specific code/solution]
- [Fix 2: specific code/solution]
- [Fix 3: specific code/solution]

### 📌 Affected Components
- [Component 1]
- [Component 2]
- [Component 3]

Do NOT hallucinate data. Use masked tokens [MASKED] as-is. Reference exact line numbers.

`
        },
        { role: "user", content: maskedText }
      ]
    });

    const analysis = completion.choices[0].message.content;

    return res.json({ analysis });

  } catch (error) {
    console.error("❌ Error in /analyze-log:", error);
    return res.status(500).json({ error: "LLM analysis failed" });
  }
});

// --------------------------------------------
// ROUTE 3 — NORMAL CHAT (Optional)
// --------------------------------------------
app.post("/api/chat", async (req, res) => {
  try {
    const { history } = req.body;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: history,
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ error: "Chat API failed" });
  }
});

app.listen(5000, () => 
  console.log("🚀 Server running on http://localhost:5000")
);
