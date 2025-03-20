# Tuners Car Interview Practice Platform

## Overview
An interactive interview practice platform built with React and Node.js, featuring an AI-powered chatbot that conducts mock interviews for Tuners Car positions. The application helps candidates prepare for job interviews by providing personalized questions and feedback based on specific job roles.

## Features
- AI-powered interview simulation
- Real-time chat interface
- Dynamic conversation flow
- Position-specific questions
- Responsive design
- Interactive typing indicators
- Minimizable chat window

## Tech Stack
- React.js
- Axios for API calls
- React Icons
- CSS Modules for styling
- Responsive Design

## Installation & Setup
```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to frontend directory
cd mission-03-frontend

# Install dependencies
npm install

# Start development server
npm run start
```

## Environment Variables
- `REACT_APP_SERVER_PORT`: Backend server port (default: 4000)

## Usage
1. Open the application in your browser
2. Click the chat icon to open the interview interface
3. Enter your desired job position
4. Start the interview and respond to the AI interviewer's questions
5. Receive real-time feedback and follow-up questions

## Features in Detail
- **Dynamic Chat Interface**: Minimizable and expandable chat window
- **Real-time Typing Indicators**: Visual feedback when AI is "typing"
- **Responsive Design**: Works on both desktop and mobile devices
- **Position-specific Questions**: Tailored interview experience based on job role
- **Interactive Elements**: Buttons, icons, and smooth animations

## API Endpoints
- POST `/api/interview`: Main endpoint for interview conversation
  - Requires: `jobTitle`, `message`, `messageHistory`
  - Returns: AI-generated interview response

