// Email validation
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};

// Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
};

// Name validation (letters, spaces, hyphens, 2-50 chars)
const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s-]{2,50}$/;
    return nameRegex.test(name);
};

// Prompt validation (prevent XSS, SQL injection, etc.)
const isValidPrompt = (prompt) => {
    // Allow letters, numbers, basic punctuation, spaces
    const promptRegex = /^[a-zA-Z0-9\s.,!?-]{2,500}$/;
    return promptRegex.test(prompt);
};

export { isValidEmail, isValidPassword, isValidName, isValidPrompt };
