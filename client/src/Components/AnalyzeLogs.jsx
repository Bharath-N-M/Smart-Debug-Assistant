import "../App.css";
export default function AnalyzeLogs(){
    return(
    <div className="Analyze">
        <div className="analyzeHeader">
            <div className="analyzeTitle">
                <div className="analyzeIcon">
                        🔍
                    </div>

                    <div>
                        <h3>Analyze Your File</h3>

                        <p>
                            Discover errors, warnings and important
                            patterns in your application logs.
                        </p>
                    </div>
            </div>
        </div>
        <div className="anlayzeBody">

                <p>
                    Upload a <strong>.log</strong> or <strong>.txt</strong>
                    file and let the assistant analyze your application's log.
                </p>

            </div>
        <div className="analyze-Iden"> 
            <h4>What we can identify</h4>

                <div className="analyzeFeatures">

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Errors and Exceptions</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Stack Traces</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Warnings and Critical Messages</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Important Events and Patterns</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Frequently Occurring Errors</p>
                    </div>

                    <div className="analyzeFeature">
                        <span>✓</span>
                        <p>Possible Causes of Failures</p>
                    </div>

                </div>

        </div>
        <div className="analyzeFooter">
            <p>You can then ask questions about the analyzed log and get AI-powered explanations.</p>
        </div>
    </div>
    );
}