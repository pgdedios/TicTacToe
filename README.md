# 🎮 Tic Tac Toe

A classic, interactive Tic Tac Toe game built with Vanilla JavaScript, HTML5, and CSS3. Features a dynamic start screen, score tracking, and a unique move-history replay system that allows players to step through the game after it ends.

🔗 **[Play the Live Demo Here!](https://tic-tac-toe-three-iota-79.vercel.app)**


## ✨ Features

- **Player Selection:** Choose whether 'X' or 'O' makes the first move via an interactive start screen overlay.
- **Score Tracking:** Keeps track of wins for both Player X and Player O across multiple rounds.
- **Move History Replay:** Once a game ends (Win or Tie), use the **Previous** and **Next** buttons to step backward and forward through every move of the match.
- **Win/Draw Detection:** Automatically detects 3-in-a-row (horizontal, vertical, diagonal) or a full board tie.
- **Responsive UI:** Clean, centered layout that works well on desktop and mobile browsers.
- **State Management:** Uses 2D array matrices to track board state and maintain a deep-cloned history stack for the replay feature.


## 🚀 Live Demo

Check out the deployed version hosted on Vercel:
👉 **[https://tic-tac-toe-three-iota-79.vercel.app](https://tic-tac-toe-three-iota-79.vercel.app)**


## 🎲 How to Play

1. **Start the Game:** When the page loads, an overlay will prompt you to choose who goes first by clicking **X** or **O**.
2. **Take Turns:** Click on any empty grid cell to place your mark. The turn indicator at the top will update to show whose turn it is.
3. **Win or Draw:** Get 3 of your marks in a row to win. If all 9 cells are filled without a winner, the game ends in a tie.
4. **Review History:** After the game concludes, the board locks. Use the **Previous** and **Next** buttons to review the sequence of moves.
5. **Play Again:** Click **Reset** to clear the board and start a new round (scores are preserved).


## 🛠️ Tech Stack

- **HTML5:** Semantic structure and DOM layout.
- **CSS3:** Flexbox/Grid for layout, custom styling, transitions, and hover effects.
- **Vanilla JavaScript (ES6+):** Game logic, DOM manipulation, event handling, and state management (no external frameworks or libraries).
- **Vercel:** For fast, seamless static site hosting and deployment.


## 📄 License

This project is open-source and available for personal, educational, or commercial use. Feel free to fork, modify, and learn from the code!


## 👥 Developed By

- Paolo de Dios ([pgdedios](https://github.com/pgdedios))

