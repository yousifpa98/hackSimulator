const bruteForceChallenges = [
  {
    question: "Fix the database connection string.",
    questionCode: `let connectionString = 'venturodb:password@localhost'; consolelog(connectionString);`,
    answer: `let connectionString = 'venturodb:password@localhost'; console.log(connectionString);`,
    completed: false,
  },
  {
    question: "The system timeout needs correction.",
    questionCode: `setTimout(() => { console.log("Attack continues..."); }, 1000);`,
    answer: `setTimeout(() => { console.log("Attack continues..."); }, 1000);`,
    completed: false,
  },
  {
    question: "Correct the function for hashing the password attempt.",
    questionCode: `function hashPassword(attempt) { return SHA256attempt; }`,
    answer: `function hashPassword(attempt) { return SHA256(attempt); }`,
    completed: false,
  },
  {
    question: "Fix the password logging mechanism.",
    questionCode: `let passwordAttempt = "Venturo2024"; console.lo(passwordAttempt);`,
    answer: `let passwordAttempt = "Venturo2024"; console.log(passwordAttempt);`,
    completed: false,
  },
  {
    question: "The loop handling password attempts is flawed.",
    questionCode: `for (let i = 0; i < 5 i++) { attemptBruteForce(i); }`,
    answer: `for (let i = 0; i < 5; i++) { attemptBruteForce(i); }`,
    completed: false,
  },
  {
    question: "Fix the encryption key generator.",
    questionCode: `let encryptionKey = generateKey(256;`,
    answer: `let encryptionKey = generateKey(256);`,
    completed: false,
  },
  {
    question: "Correct the security alert suppression code.",
    questionCode: `function suppressAlert() { if (alert === true) { alert=false; }`,
    answer: `function suppressAlert() { if (alert === true) { alert=false; } }`,
    completed: false,
  },
  {
    question: "There’s an error in the brute force retry logic.",
    questionCode: `while(attempts < maxAttempts { retryBruteForce(); }`,
    answer: `while(attempts < maxAttempts) { retryBruteForce(); }`,
    completed: false,
  },
  {
    question: "Fix the attempt counter increment.",
    questionCode: `attemptCounter++`,
    answer: `attemptCounter++;`,
    completed: false,
  },
  {
    question: "The firewall bypass flag isn't being set properly.",
    questionCode: `let bypassFirewall = false; if(attempt === 10) { bypassFirewall == true; }`,
    answer: `let bypassFirewall = false; if(attempt === 10) { bypassFirewall = true; }`,
    completed: false,
  },
];

module.exports = bruteForceChallenges;
