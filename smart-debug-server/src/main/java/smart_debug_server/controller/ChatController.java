package smart_debug_server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import smart_debug_server.service.GroqService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    private final GroqService groqService;

    public ChatController(GroqService groqService) {
        this.groqService = groqService;
    }

    @PostMapping("/chat")
    public ResponseEntity<?> chat(
            @RequestBody ChatRequest request) {

        try {

            if (request.getHistory() == null ||
                    request.getHistory().isEmpty()) {

                return ResponseEntity.badRequest()
                        .body("Chat history is empty");
            }

            System.out.println("🔥 Sending chat request to Groq...");

            String reply = groqService.chat(
                    request.getHistory()
            );

            System.out.println("✅ Groq response received");

            return ResponseEntity.ok(
                    new ChatResponse(reply)
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.internalServerError()
                    .body("Chat request failed");
        }
    }
}
