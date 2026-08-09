

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ReactMarkdown from "react-markdown";
import Welcome from "./Components/Welcome";
import FileUpload from "./Components/FileUpload";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AnalyzeLogs from "./Components/AnalyzeLogs";
import SafeLogs from "./Components/SafeLogs";
import ExplainErrors from "./Components/ExplainErrors";
import GenerateSummary from "./Components/GenerateSummary";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [maskedText, setMaskedText] = useState("");
  const [showMasked, setShowMasked] = useState(false);
  const [loadingMasking, setLoadingMasking] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const chatEndRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    try {
      setLoadingMasking(true);

      const res = await axios.post("http://localhost:8080/upload-log", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      setMaskedText(res.data.masked);
      setShowMasked(true);

    } catch (err) {
      console.error(err);
      alert("Error uploading or masking log file.");
    } finally {
      setLoadingMasking(false);
    }
  };

  const analyzeMasked = async () => {
    try {
      setLoadingAnalysis(true);

      const res = await axios.post("http://localhost:8080/analyze-log", {
        maskedText,
      });
      console.log(res.data.analysis)
      const botMsg = { sender: "bot", text: res.data.analysis };
      setMessages((prev) => [...prev, botMsg]);
      setShowMasked(false);

    } catch (err) {
      console.error("ANALYSIS ERROR:", err);
      alert("Error analyzing masked log file.");
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "you", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const history = [
      ...messages.map((m) => ({
        role: m.sender === "you" ? "user" : "assistant",
        content: m.text,
      })),
      { role: "user", content: input },
    ];

    setInput("");

    try {
      const res = await axios.post("http://localhost:8080/api/chat", { history });
      const botMsg = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("CHAT ERROR:", err);
      alert("Chat request failed.");
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  
  return (
    <div className="wrapper">
      <div className="chat-container">

        {/* TOP BAR */}
        <div className="top-bar">
          <span className="dot green"></span>
          <span className="dot yellow"></span>
          <span className="dot red"></span>
          <h3 className="header">SMART DEBUG ASSISTANT (SAFE LOG MASKER)</h3>
        </div>

        {showMasked ? (
          <div className="mask-preview">
            <h3>Masked Error Log Preview</h3>

            <pre>{maskedText}</pre>

            <button onClick={analyzeMasked} disabled={loadingAnalysis}>
              {loadingAnalysis ? "Analyzing..." : "✔ Approve & Analyze"}
            </button>

            <button onClick={() => setShowMasked(false)}>✖ Cancel</button>
          </div>
        ) : loadingMasking ? (
          <div className="mask-preview">
            <h3>Masking your log file...</h3>
            <p>Please wait…</p>
          </div>
        ) : (
          <>
            <div className="chat-box">
              {/* <FileUpload/> */}
              <Welcome/>
              {messages.map((msg, i) => (
                <div key={i} className={`bubble ${msg.sender}`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>

            <div className="input-area">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />

              <button onClick={sendMessage}>➤</button>

              <input
                type="file"
                accept=".log,.txt"
                onChange={handleFileUpload}
                style={{ marginLeft: "8px" }}
              />
              {/* <div className="drag-file" style={{marginLeft:"500px" }}>
                <input type="file" onChange={handleFileUpload}  />
                <p>Drag and drop a log file here, or click to select a file.</p>
                
            </div> */}
            </div>
            
          </>
        )}

      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/analyze-logs",
    element: <AnalyzeLogs />
  },
  {
    path: "/safe-logs",
    element: <SafeLogs />
  },
  {
    path: "/explain-errors",
    element: <ExplainErrors />
  },
  {
    path: "/generate-summary",
    element: <GenerateSummary />
  }
]);
function Root() {
    return (
        <RouterProvider router={router} />
    );
}

export default Root;