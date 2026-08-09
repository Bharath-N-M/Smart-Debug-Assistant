package smart_debug_server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import smart_debug_server.service.LogMaskingService;
import smart_debug_server.service.GroqService;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LogController {

    private final LogMaskingService maskingService;
    private final GroqService groqService;

    public LogController(
            LogMaskingService maskingService,
            GroqService groqService) {

        this.maskingService = maskingService;
        this.groqService = groqService;
    }

    // -----------------------------------------
    // UPLOAD + MASK
    // -----------------------------------------

    @PostMapping("/upload-log")
    public ResponseEntity<?> uploadLog(
            @RequestParam("file") MultipartFile file) {

        try {

            if (file.isEmpty()) {

                return ResponseEntity.badRequest()
                        .body("No file received");
            }

            String original = new String(
                    file.getBytes(),
                    StandardCharsets.UTF_8
            );

            System.out.println(
                    "UPLOAD RECEIVED: "
                            + file.getOriginalFilename()
            );

            String masked =
                    maskingService.maskPII(original);

            return ResponseEntity.ok(
                    new UploadResponse(
                            original,
                            masked
                    )
            );

        } catch (IOException e) {

            e.printStackTrace();

            return ResponseEntity.internalServerError()
                    .body("Failed to read file");
        }
    }


    // -----------------------------------------
    // ANALYZE MASKED LOG USING GROQ
    // -----------------------------------------

    @PostMapping("/analyze-log")
    public ResponseEntity<?> analyzeLog(
            @RequestBody AnalyzeRequest request) {

        try {

            if (request.getMaskedText() == null ||
                    request.getMaskedText().isBlank()) {

                return ResponseEntity.badRequest()
                        .body("maskedText missing");
            }

            System.out.println(
                    "🔥 Sending masked log to Groq..."
            );

            String analysis =
                    groqService.analyzeLog(
                            request.getMaskedText()
                    );

            return ResponseEntity.ok(
                    new AnalysisResponse(analysis)
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.internalServerError()
                    .body("LLM analysis failed");
        }
    }
}


// -----------------------------------------
// UPLOAD RESPONSE
// -----------------------------------------

class UploadResponse {

    private String original;
    private String masked;

    public UploadResponse(
            String original,
            String masked) {

        this.original = original;
        this.masked = masked;
    }

    public String getOriginal() {
        return original;
    }

    public String getMasked() {
        return masked;
    }
}