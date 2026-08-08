import "../App.css";
export default function GenerateSummary() {
    return (
        <div className="Analyze">

            <div className="analyzeHeader">
                <div className="analyzeIcon">
                    📋
                </div>

                <div>
                    <h3>Generate Log Summary</h3>

                    <p>
                        Turn thousands of log lines into a short,
                        clear summary of what happened in your application.
                    </p>
                </div>
            </div>

            <div className="anlayzeBody">
                <p>
                    Upload your <strong>.log</strong> or <strong>.txt</strong>
                    file and get an AI-powered overview of your application's activity.
                </p>
            </div>

            <div className="analyze-Iden">
                <h4>What the summary includes</h4>

                <div className="analyzeFeatures">

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Overall System Status</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Number of Errors</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Number of Warnings</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Most Frequent Errors</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Possible Root Causes</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Recommended Actions</p>
                    </div>

                </div>
            </div>

            <div className="analyzeFooter">
                <p>
                    Get a quick understanding of your application's health
                    without manually reading thousands of log lines.
                </p>
            </div>

        </div>
    );
}

