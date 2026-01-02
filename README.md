# KeyMotion

**KeyMotion** is a lightweight and interactive typing speed test application designed to help users improve their typing efficiency with a smooth, modern user experience.

<p align="center">
  <img src="public/demo.png" alt="KeyMotion Screenshot" width="800">
</p>

## Live Demo

The game is deployed on Vercel. Try it out here: [https://key-motion.vercel.app/](https://key-motion.vercel.app/)


## Features

1.  **Flexible Test Duration**: Choose between **30s, 60s, or 90s** test modes. The game starts instantly upon your first keystroke.
2.  **Real-time Visual Feedback**:
    *   **Smooth Caret Motion**: Features a fluid, animated caret using `framer-motion` that glides as you type.
    *   **Accuracy Highlighting**: Correct characters are marked clearly, while errors are highlighted to provide immediate feedback.
3.  **Dynamic Word Generation**: Never run out of practice material—new words are automatically generated as you complete each set.
4.  **Comprehensive Results**: At the end of each session, view detailed statistics including:
    *   **WPM** (Words Per Minute)
    *   **Accuracy Percentage**
    *   **Total Errors**
    *   **Total Characters Typed**
5.  **Interactive Elements**:
    *   **Sound Effects**: Satisfying feedback sounds for keystrokes, errors, and UI interactions (with sound toggle).
    *   **Theme Support**: Toggle between Light and Dark modes to suit your preference.
    *   **Quick Restart**: Instantly reset the test at any time with the dedicated restart button.

## Tech Stack

*   **React** - UI Library
*   **TypeScript** - Type Safety
*   **Tailwind CSS** - Styling
*   **Framer Motion** - Animations
*   **Vite** - Build Tool

## Getting Started

To run KeyMotion locally on your machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/LuvsicptZ/KeyMotion.git
    cd KeyMotion
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in browser:**
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

## How to Play

1.  **Select Time**: Click on 30s, 60s, or 90s to set your timer.
2.  **Start Typing**: The timer begins automatically when you type the first character.
3.  **Keep Going**: Type the words shown on screen. If you finish the current set, a new set will appear.
4.  **View Results**: When time runs out, check your WPM and accuracy!

## License

This project is open source and available under the [MIT License](LICENSE).
