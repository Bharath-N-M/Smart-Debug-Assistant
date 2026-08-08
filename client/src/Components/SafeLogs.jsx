import "../App.css";
export default function SafeLogs() {
    return (
        <div className="Analyze">

            <div className="analyzeHeader">
                <div className="analyzeIcon">
                    🛡️
                </div>

                <div>
                    <h3>Safe Log Masker (With Regex)</h3>

                    <p>
                        Protect sensitive information in your logs
                        before sending them for AI analysis.
                    </p>
                </div>
            </div>

            <div className="anlayzeBody">
                <p>
                    Application logs may contain sensitive information
                    that should not be exposed during analysis.
                </p>
            </div>

            <div className="analyze-Iden">
                <h4>What we can protect</h4>

                <div className="analyzeFeatures">

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Passwords</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Access Tokens</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>IP Addresses</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Email Addresses</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Phone Numbers</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Database Credentials</p>
                    </div>

                </div>
            </div>

            <div className="analyzeFooter">
                <p>
                    Sensitive information is automatically detected and
                    replaced before the log is sent for analysis.
                </p>
            </div>

        </div>
    );
}
