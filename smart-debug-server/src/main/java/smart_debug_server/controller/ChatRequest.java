package smart_debug_server.controller;

import java.util.List;

public class ChatRequest {

    private List<Message> history;

    public ChatRequest() {
    }

    public List<Message> getHistory() {
        return history;
    }

    public void setHistory(List<Message> history) {
        this.history = history;
    }

    public static class Message {

        private String role;
        private String content;

        public Message() {
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }
}