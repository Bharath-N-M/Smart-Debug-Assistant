export function maskPII(text) {
  return text

    // -------------------------
    // EMAILS
    // -------------------------
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/g, "[MASKED_EMAIL]")

    // -------------------------
    // IPV4 + IPV6 ADDRESSES
    // -------------------------
    .replace(/\b\d{1,3}(\.\d{1,3}){3}\b/g, "[MASKED_IP]")
    .replace(/([a-f0-9:]+:+)+[a-f0-9]+/gi, "[MASKED_IP]")

    // -------------------------
    // PHONE NUMBERS
    // -------------------------
    .replace(/(\+?\d[\d -]{8,}\d)/g, "[MASKED_PHONE]")

    // -------------------------
    // SSN (123-45-6789)
    // -------------------------
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[MASKED_SSN]")

    // -------------------------
    // CREDIT CARD NUMBERS
    // -------------------------
    .replace(/\b(?:\d[ -]*?){13,16}\b/g, "[MASKED_CARD]")

    // CVV
    .replace(/\b\d{3,4}\b/g, "[MASKED_CVV]")

    // -------------------------
    // JWT, OAuth, Bearer, API Keys
    // -------------------------
    .replace(/Bearer\s+[A-Za-z0-9\._-]+/g, "Bearer [MASKED_TOKEN]")
    .replace(/eyJ[A-Za-z0-9\._-]+/g, "[MASKED_JWT]")
    .replace(/api_key_[A-Za-z0-9_-]+/g, "[MASKED_API_KEY]")
    .replace(/pk_prod_[A-Za-z0-9_-]+/g, "[MASKED_API_KEY]")
    .replace(/auth_code_[A-Za-z0-9_-]+/g, "[MASKED_AUTH_CODE]")
    .replace(/access[_\-]token[_\-]?[A-Za-z0-9\._-]+/gi, "[MASKED_ACCESS_TOKEN]")

    // -------------------------
    // DATABASE CREDENTIALS + URLS
    // -------------------------
    .replace(/jdbc:[^\s]+/g, "[MASKED_DB_URL]")
    .replace(/password\s*=\s*['"]?.+?['"]?/gi, "password=[MASKED_PASSWORD]")
    .replace(/Password:\s*.+/gi, "Password: [MASKED_PASSWORD]")

    // -------------------------
    // USERNAMES, NAMES
    // (two-word: John Doe, Olivia Davis)
    // -------------------------
    .replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, "[MASKED_NAME]")

    // single name identifiers before @
    .replace(/[A-Za-z]+\.[A-Za-z]+(?=@)/g, "[MASKED_USERNAME]")

    // -------------------------
    // FILE PATHS (Windows + Linux)
    // -------------------------
    .replace(/[A-Za-z]:\\[A-Za-z0-9_\\\.\-]+/g, "[MASKED_PATH]")
    .replace(/\/[A-Za-z0-9_\/\.\-]+/g, "[MASKED_PATH]")

    // -------------------------
    // IDs: transactionId, sessionId, userId, orderId…
    // -------------------------
    .replace(/\b(TXN|ORD|user|session|cust|msg|req|INC|EMP|CUST)_[A-Za-z0-9\-_]+/gi, "[MASKED_ID]")

    // Generic long ids
    .replace(/[A-Za-z0-9\-_]{10,}/g, "[MASKED_ID]")

    // -------------------------
    // BIRTHDATES
    // -------------------------
    .replace(/\b\d{4}-\d{2}-\d{2}\b/g, "[MASKED_DATE]")

    // -------------------------
    // ADDRESSES
    // -------------------------
    .replace(/\b\d{1,5}\s+[A-Za-z0-9\s]+(Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Boulevard|Blvd|Lane|Ln|Way|Trail|Park)\b/gi,
             "[MASKED_ADDRESS]")

    // ZIP Codes
    .replace(/\b\d{5}(?:-\d{4})?\b/g, "[MASKED_ZIP]")

    // -------------------------
    // CREDIT CARD HOLDER NAME
    // -------------------------
    .replace(/Cardholder:\s*.+/g, "Cardholder: [MASKED_NAME]")

    // -------------------------
    // Authorization headers
    // -------------------------
    .replace(/Authorization:\s*.+/g, "Authorization: [MASKED_AUTH]")

    // -------------------------
    // SESSION ID
    // -------------------------
    .replace(/JSESSIONID[_=A-Za-z0-9]+/g, "JSESSIONID=[MASKED_SESSION]")

    // -------------------------
    // ANYTHING INSIDE A JSON FIELD LIKE: "email": "john..."
    // -------------------------
    .replace(/"email"\s*:\s*".+?"/g, `"email": "[MASKED_EMAIL]"`)
    .replace(/"password"\s*:\s*".+?"/g, `"password": "[MASKED_PASSWORD]"`)
    .replace(/"phoneNumber"\s*:\s*".+?"/g, `"phoneNumber": "[MASKED_PHONE]"`)
    .replace(/"ssn"\s*:\s*".+?"/g, `"ssn": "[MASKED_SSN]"`)
    .replace(/"firstName"\s*:\s*".+?"/g, `"firstName": "[MASKED_NAME]"`)
    .replace(/"lastName"\s*:\s*".+?"/g, `"lastName": "[MASKED_NAME]"`)
    .replace(/"address"\s*:\s*\{[\s\S]*?\}/g, `"address": "[MASKED_ADDRESS]"`)
}
