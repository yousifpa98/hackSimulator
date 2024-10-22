// Required dependencies
const readline = require("readline-sync"); // Module to read user input from the console
const clear = require("clear"); // Module to clear the console screen
const chalk = require("chalk"); // Module to add colors to console output
const systemScanLogs = require("./systemScanLogs.js"); // Logs to be displayed during the system scan
const bruteForceChallenges = require("./bruteForceChallenges.js"); // Challenges to be solved during brute force attack
const passwordList = require("./passwordList.js"); // List of passwords to be used during brute force attack

// Constants for different delays in the game
const LOGIN_DELAY = 1000; // Delay between login actions in milliseconds
const LOG_MESSAGE_DELAY = 200; // Delay between displaying log messages in milliseconds
const DIALOGUE_DELAY = 2000; // Delay between displaying dialogue messages in milliseconds
const CHALLENGE_LOG_INTERVAL = 17; // Number of logs to show during a challenge
const PASSWORD_LOG_DELAY = 100; // Delay between testing passwords during brute force attack

const CLI_PROMPT = chalk.cyan("[kali@VenturoCorp]$ "); // The prompt symbol used for user commands

// Object to track the progress of each level in the game
const progress = {
  ...Object.fromEntries(
    Array.from({ length: 5 }, (_, i) => [`level${i + 1}`, false])
  ),
  isHacked: function () {
    return Object.values(this).every(
      (level) => typeof level === "boolean" && level
    );
  },
};

// Clear the console at the start of the game
clear();

// Display the title of the game
console.log(chalk.red.bold("=== Hack Simulator ==="));

// Predefined log messages that will be shown during login
const logMessages = [
  "Initializing secure connection...",
  "Establishing encrypted tunnel...",
  "Accessing remote server...",
  "Authenticating user credentials...",
  "Loading user environment...",
  "Verifying access level...",
  "Fetching secure assets...",
  "Decrypting files...",
  "Checking system integrity...",
  "Access granted.",
];

// Function to simulate typing after a prompt symbol, character by character
function typeAfterPrompt(prompt, text, callback) {
  process.stdout.write(prompt); // Display the initial prompt (e.g., "username: ")
  let index = 0;
  const typingInterval = setInterval(() => {
    if (index < text.length) {
      process.stdout.write(text[index]); // Display each character of the text one by one
      index++;
    } else {
      clearInterval(typingInterval); // Stop typing when all characters are displayed
      console.log(); // Add a new line after typing is complete
      callback(); // Call the callback function to continue the flow
    }
  }, 100); // Delay between each character typed
}

// Function to display logs in a shuffled order, one by one
function displayShuffledLogs(logs, callback) {
  const shuffledLogs = shuffle([...logs]); // Shuffle the log messages
  displayLogs(shuffledLogs, callback); // Display the shuffled log messages
}

// Function to shuffle the order of items in an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements randomly
  }
  return array;
}

// Function to simulate the login process
function simulateLogin() {
  console.clear();
  typeAfterPrompt(`${chalk.blue("username: ")}`, "cipher", () => {
    typeAfterPrompt(`${chalk.blue("password: ")}`, "**************", () => {
      setTimeout(() => {
        displayShuffledLogs(logMessages, () => {
          setTimeout(() => {
            console.clear();
            startGame(); // Start the game after successful login
          }, LOGIN_DELAY);
        });
      }, LOGIN_DELAY);
    });
  });
}

// Function to display logs without shuffling, one by one
function displayLogs(logs, callback) {
  let logIndex = 0;
  const logInterval = setInterval(() => {
    if (logIndex < logs.length) {
      console.log(chalk.green(logs[logIndex])); // Display each log message
      logIndex++;
    } else {
      clearInterval(logInterval); // Stop displaying logs when finished
      callback(); // Call the callback function to continue
    }
  }, LOG_MESSAGE_DELAY); // Delay between each log message
}

// Function to display dialogue messages with a delay between each message
function showDialogue(messages, delayBetween, callback) {
  let currentDelay = 0;
  messages.forEach((message, index) => {
    setTimeout(() => {
      console.log(chalk.yellow(message)); // Display each dialogue message in yellow
      if (index === messages.length - 1 && callback) {
        setTimeout(callback, delayBetween); // Call the callback function after the last message
      }
    }, currentDelay);
    currentDelay += delayBetween; // Increase the delay for each message
  });
}

// Function to dynamically adjust delays based on the number of steps
function dynamicDelay(baseDelay, numSteps) {
  return Math.max(100, baseDelay / numSteps); // Ensure a minimum delay of 100ms
}

// Function to start the main game sequence
function startGame() {
  console.log(chalk.bold("Welcome to the Hack Simulator."));

  const introMessages = [
    "> Cipher, you're in.",
    "> Welcome to VenturoCorp's external network.",
    "> This is the first step to infiltrating their systems.",
    "> We need to be careful—they have security layers all over the place.\n\n",
  ];

  showDialogue(introMessages, DIALOGUE_DELAY, () => {
    startVulnerabilityAssessment(); // Start vulnerability assessment after introduction
  });
}

// Function to start vulnerability assessment in the game
function startVulnerabilityAssessment() {
  let input = readline.question(
    chalk.yellow(
      "> Type 'scan_network' to begin vulnerability assessment...\n"
    ) + CLI_PROMPT
  );
  while (input.trim() !== "scan_network") {
    input = readline.question(
      chalk.red("> Invalid command. Please type 'scan_network' to begin.\n") +
        CLI_PROMPT
    );
  }
  console.clear();
  console.log(chalk.blueBright("Scan starting..."));
  displayLogs(systemScanLogs, () => {
    setTimeout(() => {
      console.clear();
      levelOne(); // Start level one after vulnerability assessment
    }, LOGIN_DELAY);
  });
}

// Function for Level One of the game
function levelOne() {
  const lvlOneIntroMsgs = [
    "> System ready for next steps.",
    "> Control: 'Cipher, we’ve found an entry point in VenturoCorp's database system,\n> but it’s locked behind a password-protected gateway. The only way in now is through brute force.'",
    "> We’ll need you to hammer this system until it gives up the password.",
    "> Control: 'You know the drill.\n> I’ll feed you the code; fix the flaws to keep the attack going. \n> Be sharp, and don’t waste time. \n> VenturoCorp's system is old, but it’ll still shut us out if we’re sloppy.'\n\n",
  ];

  showDialogue(lvlOneIntroMsgs, DIALOGUE_DELAY, () => {
    setTimeout(() => {
      let input = readline.question(
        chalk.yellow("> Type 'brute_force' to begin the attack...\n") +
          CLI_PROMPT
      );
      while (input.trim() !== "brute_force") {
        input = readline.question(
          chalk.red(
            "> Invalid command. Please type 'brute_force' to begin the attack.\n"
          ) + CLI_PROMPT
        );
      }
      console.clear();
      console.log(chalk.blueBright("Brute force attack starting..."));
      runBruteForce(
        passwordList.slice(-10), // Select the last 10 passwords from the list
        passwordList[Math.floor(Math.random() * 10)] // Pick a random password to be the correct one
      );
    }, dynamicDelay(DIALOGUE_DELAY, lvlOneIntroMsgs.length));
  });
}

// Function to run brute force attack
function runBruteForce(passwords, actualPassword) {
  let attemptCounter = 0;
  const challenges = shuffle([...bruteForceChallenges]).slice(0, 5); // Select 5 random challenges

  function bruteForceAttempt() {
    if (attemptCounter < 5) {
      console.log(
        chalk.blue(`Testing password: ${passwords[attemptCounter]}...`)
      );
      console.log(chalk.red("Password failed..."));
      attemptCounter++;
      setTimeout(bruteForceAttempt, PASSWORD_LOG_DELAY); // Attempt the next password
    } else if (challenges.length > 0) {
      handleChallenge(challenges, bruteForceAttempt, passwords); // If attempts fail, handle a challenge
    } else {
      finalizeBruteForce(actualPassword); // Finalize if all attempts and challenges are done
    }
  }

  bruteForceAttempt(); // Start the brute force attempts
}

// Function to handle challenges during brute force attack
function handleChallenge(challenges, callback, passwords) {
  const challengeIndex = Math.floor(Math.random() * challenges.length);
  const challenge = challenges.splice(challengeIndex, 1)[0];

  console.log(chalk.yellow(`\nChallenge: ${challenge.question}`));
  console.log(chalk.yellow(`Code: ${challenge.questionCode}`));

  let input = readline.question(chalk.yellow("Fix the code: \n") + CLI_PROMPT);
  if (input.trim() === challenge.answer.trim()) {
    console.log(chalk.green("Challenge completed!")); // Correct answer
  } else {
    console.log(chalk.red("Incorrect. Try again.")); // Incorrect answer, challenge remains
    challenges.push(challenge); // Add the challenge back to the list to retry later
  }

  setTimeout(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < CHALLENGE_LOG_INTERVAL) {
        console.log(
          chalk.blue(
            `Testing password: ${passwords[logIndex % passwords.length]}...`
          )
        );
        console.log(chalk.red("Password failed..."));
        logIndex++;
      } else {
        clearInterval(logInterval);
        callback(); // Continue after challenge
      }
    }, PASSWORD_LOG_DELAY);
  }, PASSWORD_LOG_DELAY);
}

// Function to finalize the brute force attack
function finalizeBruteForce(actualPassword) {
  console.log(chalk.green(`Password cracked: ${actualPassword}`)); // Correct password found
  progress.level1 = true; // Mark level one as complete
  setTimeout(() => {
    console.clear();
    console.log(chalk.green("Access granted."));
    levelTwo(); // Proceed to level two
  }, LOGIN_DELAY);
}

// Placeholder function for Level Two of the game
function levelTwo() {
  console.log(chalk.blue("Level Two coming soon..."));
  // Implement Level Two logic here...
}

// Start the login simulation to begin the game
simulateLogin();