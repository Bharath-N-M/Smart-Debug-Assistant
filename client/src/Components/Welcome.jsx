import {useNavigate} from "react-router-dom";
import {
FaBug,
FaLock,
FaSearch,
FaChartBar,
} from "react-icons/fa";
import "../App.css";
export default function Welcome() {

    const navigate = useNavigate();

    return (
        <div className="Welcome">
            <h2>Welcome to Smart Debug Assistant</h2>

            <p>
                Upload log files, mask sensitive information and
                let AI explain errors and possible fixes.
            </p>

            {/* HERO */}
            <div className="hero">
                <div className="how-it-works">
                    <h2>From Upload to Insight : </h2>
                </div>
                <div className="steps">
                    <div className="step">
                        <div className="step">
                            <h3>1. Upload your Log</h3>
                            <p>Upload a <strong>.log</strong> or <strong> .txt </strong>
                        file containing your application logs.</p>
                        </div>
                        
                    </div>
                    <div className="arrow">
                            →
                        </div>
                    <div className="step">
                        <div className="step">
                            <h3>2. Protect Sensitive Data</h3>
                            <p>Passwords, tokens, IP addresses and all
                    sensitive information are masked automatically.</p>
                        </div>
                        
                    </div>
                    <div className="arrow">
                            →
                        </div>
                    <div className="step">
                        <div className="step">
                            <h3>3. Understand your Logs</h3>
                            <p>AI identifies errors, explains failures and
                    provides useful debugging insights.</p>
                        </div>
                    </div>
                </div>
            </div> 


            {/* FEATURES */}

            <div className="feature-grid">
                <div className="feature-card">
                    <button onClick={() => navigate("/analyze-logs")}>
                        <div className="container">
                            <FaSearch className="icon blues" />
                            <div className="feature-content">
                                <h3>Analyze Logs</h3>
                            </div>
                        </div>
                        <div className="brief">
                            <p>Find errors and important insights. </p>
                        </div>
                    </button>
                </div>

                <div className="feature-card">
                    <button onClick={() => navigate("/safe-logs")}>
                        <div className="container">
                            <FaLock className="icon greens" />
                            <div className="feature-content">
                                <h3>Safe Log Masker</h3>
                            </div>
                        </div>
                        <div className="brief">
                            <p>Protect passwords, API keys and tokens.</p>
                        </div>
                    </button>
                </div>



                <div className="feature-card">
                    <button onClick={() => navigate("/explain-errors")}>
                        <div className="container">
                            <FaBug className="icon reds" />
                            <div className="feature-content">
                                <h3>Explain Errors</h3>
                            </div>
                        </div>
                        <div className="brief">
                            <p> Understand stack traces instantly.</p>
                        </div>
                    </button>
                </div>
                

                <div className="feature-card">
                    <button onClick={() => navigate("/generate-summary")}>
                        <div className="container">
                            <FaChartBar className="icon oranges" />
                            <div className="feature-content">
                                <h3>Generate Summary</h3>
                            </div>
                        </div>
                        <div className="brief">
                            <p>Get an AI summary of your log.</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}