import "../App.css";
export default function ExplainErrors() {
    return (
        <div className="Analyze">

            <div className="analyzeHeader">
                <div className="analyzeIcon">
                    💡
                </div>

                <div>
                    <h3>Explain Errors</h3>

                    <p>
                        Understand errors, exceptions and stack traces
                        with clear AI-powered explanations.
                    </p>
                </div>
            </div>

            <div className="anlayzeBody">
                <p>
                    Paste an error message, exception or stack trace
                    and let the assistant explain what went wrong.
                </p>
            </div>

            <div className="analyze-Iden">
                <h4>What we can explain</h4>

                <div className="analyzeFeatures">

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Error Type</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Root Cause</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Where the Error Occurred</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Possible Solutions</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Recommended Code Changes</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Prevention Tips</p>
                    </div>

                </div>
            </div>

            <div className="analyzeFooter">
                <p>
                    Get simple explanations and practical suggestions
                    to understand and fix your errors faster.
                </p>
            </div>

        </div>
    );
}

