# Hack Simulator

**Hack Simulator** is a console-based game that immerses the player in a hacker-like environment, simulating the infiltration of a fictional company's system. Built in **Node.js**, it delivers a fully terminal-based experience with interactive hacking challenges.

## Overview

In **Hack Simulator**, you play as "Cipher," a skilled hacker attempting to breach the systems of "VenturoCorp." The game consists of multiple levels with increasing difficulty, covering **simulated logins, brute force attacks, firewall analysis, and decryption challenges**. Each level requires problem-solving and strategic thinking to advance.

## Features

- **Immersive Hacking Simulation** – Realistic typing effects, command inputs, and system responses create an authentic hacking feel.
- **Brute Force & Puzzle Challenges** – Solve code-based puzzles and simulate brute-force attacks to crack passwords.
- **Firewall & Decryption Mechanics** – Overcome advanced security systems with logic-based decryption challenges.
- **Modular Code Structure** – Easily expand or customize the game by adding new levels and challenges.

## Dependencies

To play **Hack Simulator**, install the following npm packages:

```bash
npm install readline-sync clear chalk
```

- **`readline-sync`** – Reads user input from the console.
- **`clear`** – Clears the console for a seamless experience.
- **`chalk`** – Adds color to console output for better readability.

## Getting Started

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yousifpa98/hackSimulator
    ```
2. **Navigate to the project directory**:
    ```bash
    cd hack-simulator
    ```
3. **Install dependencies**:
    ```bash
    npm install
    ```
4. **Run the game**:
    ```bash
    node hackSimulator.js
    ```

## Code Structure

- **`hackSimulator.js`** – Main game logic and progression.
- **`systemScanLogs.js`** – Displays system scan logs.
- **`bruteForceChallenges.js`** – Houses brute-force attack challenges.
- **`passwordList.js`** – Stores passwords for brute-force attempts.
- **`firewallDecryptionKeys.js`** – Contains decryption puzzles for firewall challenges.

## How to Play

1. Start the game with:
    ```bash
    node hackSimulator.js
    ```
2. Follow the instructions on screen. Each level requires different inputs and logic to progress.
3. Solve puzzles, decrypt data, and simulate hacking techniques to advance through the game.

## Project Background

This project was created as part of a **Programming Basics module** in class. The task was to develop a **Node.js** application using only terminal-based output. Inspired by classic hacking tropes, I built a **hack simulator** to make the learning process interactive and fun.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

Enjoy hacking!
