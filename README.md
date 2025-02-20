# Text Processor App

## Introduction

The **Text Processor App** is a web-based application built using React and Vite. It allows users to input, process, and display text dynamically. The app features a real-time text translation, language detection and summarization (for English language) and supports different language settings.

## Features

- **Real-time text input processing**
- **Custom message area**
- **Sound notifications** for interactions
- **Responsive design** using Tailwind CSS
- **Supports multiple languages**

## Tech Stack

- **Frontend**: React (with Vite)
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **Build Tool**: Vite
- **AI model**: Chrome built-in AI

## Folder Structure

```
text-processor-hng3/
│── public/                   # Static assets
│   ├── doodles1.jpg
│   ├── doodles2.jpg
│   ├── vite.svg
│── src/
│   ├── assets/               # Images & Sounds
│   ├── components/           # Reusable components
│   │   ├── InputForm.jsx
│   │   ├── Message.jsx
│   │   ├── MessageArea.jsx
│   ├── context/              # Context API setup
│   │   ├── AppContext.jsx
│   ├── data/                 # Static data
│   │   ├── languages.js
│   ├── App.jsx               # Main component
│   ├── main.jsx              # Entry point
│── package.json              # Project dependencies
│── vite.config.js            # Vite configuration
│── tailwind.config.js        # Tailwind CSS configuration
```

## Installation & Setup

To run the project locally:

1. **Clone the repository**

```sh
  git clone https://github.com/OlaOluwalekan/text-processor-hng3.git
  cd text-processor-hng3
```

2. **Install dependencies**

```sh
  npm install
```

3. **Run the development server**

```sh
  npm run dev
```

4. **Build for production**

```sh
  npm run build
```

## Usage

- Open the app in your browser.
- Input text in the provided form.
- The text is displayed and processed in real-time.
- Sounds notify users of interactions.
- Select a language to translate to and then click the translate button
- For English text more than 150 characters, you also get access to the summarize API. Click the summarize button

## Contributing

Feel free to submit pull requests or report issues.

## License

This project is licensed under the MIT License.
