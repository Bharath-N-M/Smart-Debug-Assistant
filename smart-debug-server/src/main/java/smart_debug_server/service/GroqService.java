package smart_debug_server.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import smart_debug_server.controller.ChatRequest;

import java.util.List;
import java.util.Map;

@Service
public class GroqService {

    private final RestClient restClient;

    @Value("${groq.api.key}")
    private String groqApiKey;


    private final String systemPrompt = """
            You are a senior production debugging engineer.

            You will receive a sanitized LOG FILE for analysis.

            Your tasks:

            1. Identify main issues (DB failures, auth failures,
               API errors, timeouts, email issues, etc.)

            2. Explain what each error means clearly.

            3. Identify ROOT CAUSES.

            4. Provide RECOMMENDED FIXES for developers.

            5. Include exact line numbers from the log where issues occur.

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

            Do NOT hallucinate data.
            Use masked tokens [MASKED] as-is.
            Reference exact line numbers.
            """;


    public GroqService() {

        restClient = RestClient.builder()
                .baseUrl(
                        "https://api.groq.com/openai/v1"
                )
                .build();
    }


    public String analyzeLog(String maskedText) {

        Map<String, Object> requestBody = Map.of(

                "model",
                "llama-3.3-70b-versatile",

                "messages",
                new Object[]{

                        Map.of(
                                "role",
                                "system",

                                "content",
                                systemPrompt
                        ),

                        Map.of(
                                "role",
                                "user",

                                "content",
                                maskedText
                        )
                }
        );


        Map response = restClient.post()

                .uri("/chat/completions")

                .header(
                        "Authorization",
                        "Bearer " + groqApiKey
                )

                .header(
                        "Content-Type",
                        "application/json"
                )

                .body(requestBody)

                .retrieve()

                .body(Map.class);


        List<Map<String, Object>> choices =
                (List<Map<String, Object>>)
                        response.get("choices");


        Map<String, Object> firstChoice =
                choices.get(0);


        Map<String, Object> message =
                (Map<String, Object>)
                        firstChoice.get("message");


        return (String) message.get("content");
    }


    public String chat(List<ChatRequest.Message> history) {

    Map<String, Object> requestBody = Map.of(

            "model",
            "llama-3.3-70b-versatile",

            "messages",
            history
    );

    Map response = restClient.post()

            .uri("/chat/completions")

            .header(
                    "Authorization",
                    "Bearer " + groqApiKey
            )

            .header(
                    "Content-Type",
                    "application/json"
            )

            .body(requestBody)

            .retrieve()

            .body(Map.class);

    List<Map<String, Object>> choices =
            (List<Map<String, Object>>)
                    response.get("choices");

    Map<String, Object> firstChoice =
            choices.get(0);

    Map<String, Object> message =
            (Map<String, Object>)
                    firstChoice.get("message");

    return (String) message.get("content");
}

}