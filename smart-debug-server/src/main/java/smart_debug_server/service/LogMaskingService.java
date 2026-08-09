package smart_debug_server.service;

import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class LogMaskingService {

    // -------------------------
    // EMAILS
    // -------------------------
    private static final Pattern EMAIL =
            Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+");

    // -------------------------
    // IPV4 + IPV6 ADDRESSES
    // -------------------------
    private static final Pattern IPV4 =
            Pattern.compile("\\b\\d{1,3}(\\.\\d{1,3}){3}\\b");

    private static final Pattern IPV6 =
            Pattern.compile("([a-f0-9:]+:+)+[a-f0-9]+", Pattern.CASE_INSENSITIVE);

    // -------------------------
    // PHONE NUMBERS
    // -------------------------
    private static final Pattern PHONE =
            Pattern.compile("(\\+?\\d[\\d -]{8,}\\d)");

    // -------------------------
    // SSN
    // -------------------------
    private static final Pattern SSN =
            Pattern.compile("\\b\\d{3}-\\d{2}-\\d{4}\\b");

    // -------------------------
    // CREDIT CARD NUMBERS
    // -------------------------
    private static final Pattern CREDIT_CARD =
            Pattern.compile("\\b(?:\\d[ -]*?){13,16}\\b");

    // CVV
    private static final Pattern CVV =
            Pattern.compile("\\b\\d{3,4}\\b");

    // -------------------------
    // JWT, OAuth, Bearer, API Keys
    // -------------------------
    private static final Pattern BEARER =
            Pattern.compile("Bearer\\s+[A-Za-z0-9._-]+");

    private static final Pattern JWT =
            Pattern.compile("eyJ[A-Za-z0-9._-]+");

    private static final Pattern API_KEY =
            Pattern.compile("api_key_[A-Za-z0-9_-]+");

    private static final Pattern PROD_API_KEY =
            Pattern.compile("pk_prod_[A-Za-z0-9_-]+");

    private static final Pattern AUTH_CODE =
            Pattern.compile("auth_code_[A-Za-z0-9_-]+");

    private static final Pattern ACCESS_TOKEN =
            Pattern.compile(
                    "access[_\\-]token[_\\-]?[A-Za-z0-9._-]+",
                    Pattern.CASE_INSENSITIVE
            );

    // -------------------------
    // DATABASE CREDENTIALS + URLS
    // -------------------------
    private static final Pattern JDBC =
            Pattern.compile("jdbc:[^\\s]+");

    private static final Pattern PASSWORD =
            Pattern.compile(
                    "password\\s*=\\s*['\"]?.+?['\"]?",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern PASSWORD_COLON =
            Pattern.compile(
                    "Password:\\s*.+",
                    Pattern.CASE_INSENSITIVE
            );

    // -------------------------
    // USERNAMES, NAMES
    // -------------------------
    private static final Pattern FULL_NAME =
            Pattern.compile("\\b[A-Z][a-z]+ [A-Z][a-z]+\\b");

    private static final Pattern USERNAME =
            Pattern.compile("[A-Za-z]+\\.[A-Za-z]+(?=@)");

    // -------------------------
    // FILE PATHS
    // -------------------------
    private static final Pattern WINDOWS_PATH =
            Pattern.compile("[A-Za-z]:\\\\[A-Za-z0-9_\\\\.\\-]+");

    private static final Pattern UNIX_PATH =
            Pattern.compile("/[A-Za-z0-9_/\\.\\-]+");

    // -------------------------
    // IDs
    // -------------------------
    private static final Pattern SPECIFIC_ID =
            Pattern.compile(
                    "\\b(TXN|ORD|user|session|cust|msg|req|INC|EMP|CUST)_[A-Za-z0-9\\-_]+",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern GENERIC_ID =
            Pattern.compile("[A-Za-z0-9\\-_]{10,}");

    // -------------------------
    // BIRTHDATES
    // -------------------------
    private static final Pattern DATE =
            Pattern.compile("\\b\\d{4}-\\d{2}-\\d{2}\\b");

    // -------------------------
    // ADDRESSES
    // -------------------------
    private static final Pattern ADDRESS =
            Pattern.compile(
                    "\\b\\d{1,5}\\s+[A-Za-z0-9\\s]+"
                    + "(Street|St|Avenue|Ave|Road|Rd|Drive|Dr|"
                    + "Boulevard|Blvd|Lane|Ln|Way|Trail|Park)\\b",
                    Pattern.CASE_INSENSITIVE
            );

    // ZIP CODES
    private static final Pattern ZIP =
            Pattern.compile("\\b\\d{5}(?:-\\d{4})?\\b");

    // -------------------------
    // CREDIT CARD HOLDER
    // -------------------------
    private static final Pattern CARDHOLDER =
            Pattern.compile("Cardholder:\\s*.+");

    // -------------------------
    // AUTHORIZATION
    // -------------------------
    private static final Pattern AUTHORIZATION =
            Pattern.compile("Authorization:\\s*.+");

    // -------------------------
    // SESSION ID
    // -------------------------
    private static final Pattern JSESSIONID =
            Pattern.compile("JSESSIONID[_=A-Za-z0-9]+");

    // -------------------------
    // JSON FIELDS
    // -------------------------
    private static final Pattern JSON_EMAIL =
            Pattern.compile("\"email\"\\s*:\\s*\".+?\"");

    private static final Pattern JSON_PASSWORD =
            Pattern.compile("\"password\"\\s*:\\s*\".+?\"");

    private static final Pattern JSON_PHONE =
            Pattern.compile("\"phoneNumber\"\\s*:\\s*\".+?\"");

    private static final Pattern JSON_SSN =
            Pattern.compile("\"ssn\"\\s*:\\s*\".+?\"");

    private static final Pattern JSON_FIRST_NAME =
            Pattern.compile("\"firstName\"\\s*:\\s*\".+?\"");

    private static final Pattern JSON_LAST_NAME =
            Pattern.compile("\"lastName\"\\s*:\\s*\".+?\"");

    private static final Pattern JSON_ADDRESS =
            Pattern.compile(
                    "\"address\"\\s*:\\s*\\{[\\s\\S]*?\\}"
            );


    public String maskPII(String text) {

        if (text == null || text.isEmpty()) {
            return text;
        }

        String masked = text;

        // -------------------------
        // EMAILS
        // -------------------------
        masked = EMAIL.matcher(masked)
                .replaceAll("[MASKED_EMAIL]");

        // -------------------------
        // IP ADDRESSES
        // -------------------------
        masked = IPV4.matcher(masked)
                .replaceAll("[MASKED_IP]");

        masked = IPV6.matcher(masked)
                .replaceAll("[MASKED_IP]");

        // -------------------------
        // PHONE NUMBERS
        // -------------------------
        masked = PHONE.matcher(masked)
                .replaceAll("[MASKED_PHONE]");

        // -------------------------
        // SSN
        // -------------------------
        masked = SSN.matcher(masked)
                .replaceAll("[MASKED_SSN]");

        // -------------------------
        // CREDIT CARD
        // -------------------------
        masked = CREDIT_CARD.matcher(masked)
                .replaceAll("[MASKED_CARD]");

        // CVV
        masked = CVV.matcher(masked)
                .replaceAll("[MASKED_CVV]");

        // -------------------------
        // TOKENS / API KEYS
        // -------------------------
        masked = BEARER.matcher(masked)
                .replaceAll("Bearer [MASKED_TOKEN]");

        masked = JWT.matcher(masked)
                .replaceAll("[MASKED_JWT]");

        masked = API_KEY.matcher(masked)
                .replaceAll("[MASKED_API_KEY]");

        masked = PROD_API_KEY.matcher(masked)
                .replaceAll("[MASKED_API_KEY]");

        masked = AUTH_CODE.matcher(masked)
                .replaceAll("[MASKED_AUTH_CODE]");

        masked = ACCESS_TOKEN.matcher(masked)
                .replaceAll("[MASKED_ACCESS_TOKEN]");

        // -------------------------
        // DATABASE
        // -------------------------
        masked = JDBC.matcher(masked)
                .replaceAll("[MASKED_DB_URL]");

        masked = PASSWORD.matcher(masked)
                .replaceAll("password=[MASKED_PASSWORD]");

        masked = PASSWORD_COLON.matcher(masked)
                .replaceAll("Password: [MASKED_PASSWORD]");

        // -------------------------
        // NAMES
        // -------------------------
        masked = FULL_NAME.matcher(masked)
                .replaceAll("[MASKED_NAME]");

        masked = USERNAME.matcher(masked)
                .replaceAll("[MASKED_USERNAME]");

        // -------------------------
        // FILE PATHS
        // -------------------------
        masked = WINDOWS_PATH.matcher(masked)
                .replaceAll("[MASKED_PATH]");

        masked = UNIX_PATH.matcher(masked)
                .replaceAll("[MASKED_PATH]");

        // -------------------------
        // IDS
        // -------------------------
        masked = SPECIFIC_ID.matcher(masked)
                .replaceAll("[MASKED_ID]");

        masked = GENERIC_ID.matcher(masked)
                .replaceAll("[MASKED_ID]");

        // -------------------------
        // DATE
        // -------------------------
        masked = DATE.matcher(masked)
                .replaceAll("[MASKED_DATE]");

        // -------------------------
        // ADDRESS
        // -------------------------
        masked = ADDRESS.matcher(masked)
                .replaceAll("[MASKED_ADDRESS]");

        // ZIP
        masked = ZIP.matcher(masked)
                .replaceAll("[MASKED_ZIP]");

        // -------------------------
        // CARDHOLDER
        // -------------------------
        masked = CARDHOLDER.matcher(masked)
                .replaceAll("Cardholder: [MASKED_NAME]");

        // -------------------------
        // AUTHORIZATION
        // -------------------------
        masked = AUTHORIZATION.matcher(masked)
                .replaceAll("Authorization: [MASKED_AUTH]");

        // -------------------------
        // SESSION
        // -------------------------
        masked = JSESSIONID.matcher(masked)
                .replaceAll("JSESSIONID=[MASKED_SESSION]");

        // -------------------------
        // JSON FIELDS
        // -------------------------
        masked = JSON_EMAIL.matcher(masked)
                .replaceAll("\"email\": \"[MASKED_EMAIL]\"");

        masked = JSON_PASSWORD.matcher(masked)
                .replaceAll("\"password\": \"[MASKED_PASSWORD]\"");

        masked = JSON_PHONE.matcher(masked)
                .replaceAll("\"phoneNumber\": \"[MASKED_PHONE]\"");

        masked = JSON_SSN.matcher(masked)
                .replaceAll("\"ssn\": \"[MASKED_SSN]\"");

        masked = JSON_FIRST_NAME.matcher(masked)
                .replaceAll("\"firstName\": \"[MASKED_NAME]\"");

        masked = JSON_LAST_NAME.matcher(masked)
                .replaceAll("\"lastName\": \"[MASKED_NAME]\"");

        masked = JSON_ADDRESS.matcher(masked)
                .replaceAll("\"address\": \"[MASKED_ADDRESS]\"");

        return masked;
    }
}