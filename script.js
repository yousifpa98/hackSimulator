// Required dependencies
const readline = require("readline-sync");
const clear = require("clear");
const chalk = require("chalk");
const systemScanLogs = require("./systemScanLogs.js");
const bruteForceChallenges = require("./bruteForceChallenges.js");
const passwordList = require("./passwordList.js");

const LOGIN_DELAY = 1000;
const CLI_PROMPT = chalk.cyan("[kali@VenturoCorp]$ ");
const LOG_MESSAGE_DELAY = 200;
const DIALOGUE_DELAY = 2000;
const CHALLENGE_LOG_INTERVAL = 17;
const PASSWORD_LOG_DELAY = 150;

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

clear();

console.log(chalk.red.bold("=== Hack Simulator ==="));

// Predefined log messages
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

// Function to simulate typing after a static prompt
function typeAfterPrompt(prompt, text, callback) {
  process.stdout.write(prompt);
  let index = 0;
  const typingInterval = setInterval(() => {
    if (index < text.length) {
      process.stdout.write(text[index]);
      index++;
    } else {
      clearInterval(typingInterval);
      console.log();
      callback();
    }
  }, 100);
}

// Function to simulate shuffled logs appearing one by one
function displayShuffledLogs(logs, callback) {
  const shuffledLogs = shuffle([...logs]);
  displayLogs(shuffledLogs, callback);
}

// Shuffle function for logs
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
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
            startGame();
          }, LOGIN_DELAY);
        });
      }, LOGIN_DELAY);
    });
  });
}

// Function to display logs without shuffling
function displayLogs(logs, callback) {
  let logIndex = 0;
  const logInterval = setInterval(() => {
    if (logIndex < logs.length) {
      console.log(chalk.green(logs[logIndex]));
      logIndex++;
    } else {
      clearInterval(logInterval);
      callback();
    }
  }, LOG_MESSAGE_DELAY);
}

// Function to display dialogue with a delay between messages
function showDialogue(messages, delayBetween, callback) {
  let currentDelay = 0;
  messages.forEach((message, index) => {
    setTimeout(() => {
      console.log(chalk.yellow(message));
      if (index === messages.length - 1 && callback) {
        setTimeout(callback, delayBetween);
      }
    }, currentDelay);
    currentDelay += delayBetween;
  });
}

// Function to dynamically adjust delays
function dynamicDelay(baseDelay, numSteps) {
  return Math.max(100, baseDelay / numSteps);
}

// Function to start the game
function startGame() {
  console.log(chalk.bold("Welcome to the Hack Simulator."));

  const introMessages = [
    "> Cipher, you're in.",
    "> Welcome to VenturoCorp's external network.",
    "> This is the first step to infiltrating their systems.",
    "> We need to be careful—they have security layers all over the place.\n\n",
  ];

  showDialogue(introMessages, DIALOGUE_DELAY, () => {
    startVulnerabilityAssessment();
  });
}

// Function to start vulnerability assessment
function startVulnerabilityAssessment() {
  let input = readline.question(
    chalk.yellow("> Type 'scan_network' to begin vulnerability assessment...\n") +
      CLI_PROMPT
  );
  while (input.trim() !== "scan_network") {
    input = readline.question(
      chalk.red("> Invalid command. Please type 'scan_network' to begin.\n") + CLI_PROMPT
    );
  }
  console.clear();
  console.log(chalk.blueBright("Scan starting..."));
  displayLogs(systemScanLogs, () => {
    setTimeout(() => {
      console.clear();
      levelOne();
    }, LOGIN_DELAY);
  });
}

// Function for level one
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
        chalk.yellow("> Type 'brute_force' to begin the attack...\n") + CLI_PROMPT
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
      runBruteForce(passwordList.slice(-10), passwordList[Math.floor(Math.random() * 10)]);
    }, dynamicDelay(DIALOGUE_DELAY, lvlOneIntroMsgs.length));
  });
}

// Function to run brute force
function runBruteForce(passwords, actualPassword) {
  let attemptCounter = 0;
  const challenges = shuffle([...bruteForceChallenges]).slice(0, 5); // Select 5 random challenges

  function bruteForceAttempt() {
    if (attemptCounter < 5) {
      console.log(chalk.blue(`Testing password: ${passwords[attemptCounter]}...`));
      console.log(chalk.red("Password failed..."));
      attemptCounter++;
      setTimeout(bruteForceAttempt, PASSWORD_LOG_DELAY);
    } else if (challenges.length > 0) {
      handleChallenge(challenges, bruteForceAttempt, passwords);
    } else {
      finalizeBruteForce(actualPassword);
    }
  }

  bruteForceAttempt();
}

// Function to handle challenges during brute force
function handleChallenge(challenges, callback, passwords) {
  const challengeIndex = Math.floor(Math.random() * challenges.length);
  const challenge = challenges.splice(challengeIndex, 1)[0];

  console.log(chalk.yellow(`\nChallenge: ${challenge.question}`));
  console.log(chalk.yellow(`Code: ${challenge.questionCode}`));

  let input = readline.question(chalk.yellow("Fix the code: \n") + CLI_PROMPT);
  if (input.trim() === challenge.answer.trim()) {
    console.log(chalk.green("Challenge completed!"));
  } else {
    console.log(chalk.red("Incorrect. Try again."));
    challenges.push(challenge);
  }

  setTimeout(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < CHALLENGE_LOG_INTERVAL) {
        console.log(chalk.blue(`Testing password: ${passwords[logIndex % passwords.length]}...`));
        console.log(chalk.red("Password failed..."));
        logIndex++;
      } else {
        clearInterval(logInterval);
        callback();
      }
    }, PASSWORD_LOG_DELAY);
  }, PASSWORD_LOG_DELAY);
}

// Function to finalize brute force
function finalizeBruteForce(actualPassword) {
  console.log(chalk.green(`Password cracked: ${actualPassword}`));
  setTimeout(() => {
    console.clear();
    console.log(chalk.green("Access granted."));
    levelTwo();
  }, LOGIN_DELAY);
}

// Function for Level Two
function levelTwo() {
  console.log(chalk.blue("Level Two coming soon..."));
  // Implement Level Two logic here...
}

simulateLogin();
