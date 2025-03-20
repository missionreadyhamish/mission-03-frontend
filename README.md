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
### Frontend
- React.js
- Axios for API calls
- React Icons
- CSS Modules for styling
- Responsive Design

### Backend
- Node.js
- Express.js
- Google Gemini AI API
- CORS for cross-origin requests

## Installation

### Frontend Setup
```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to frontend directory
cd mission-03-frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Backend Setup
```bash
# Navigate to backend directory
cd mission-03-backend

# Install dependencies
npm install

# Create .env file and add your Google Gemini API key
echo "GOOGLE_API_KEY=your_api_key_here" > .env

# Start the server
npm start
```

## Environment Variables
Frontend:
- `REACT_APP_SERVER_PORT`: Backend server port (default: 4000)

Backend:
- `GOOGLE_API_KEY`: Your Google Gemini AI API key

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

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
