package smart_debug_server.controller;

public class AnalyzeRequest {

    private String maskedText;

    public AnalyzeRequest() {
    }

    public String getMaskedText() {
        return maskedText;
    }

    public void setMaskedText(String maskedText) {
        this.maskedText = maskedText;
    }
}