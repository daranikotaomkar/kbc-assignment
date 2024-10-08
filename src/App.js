import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardHeader, CardContent } from './components/Card';
import { Alert, AlertTitle, AlertDescription } from './components/Alert';


const questions = [
  {
    question: "Which of these is the name of the Hindi adaptation of 'Who Wants to Be a Millionaire?'",
    options: ["Kaun Banega Lakhpati", "Kaun Banega Crorepati", "Kaun Jeetega Crore", "Kaun Banega Arabpati"],
    correctAnswer: "Kaun Banega Crorepati"
  },
  {
    question: "In the game of cricket, what is the term for a ball bowled without a single bounce?",
    options: ["Yorker", "Full Toss", "Bouncer", "Googly"],
    correctAnswer: "Full Toss"
  },
  // Add more KBC-style questions here
];

const App = () => {
  const [currentView, setCurrentView] = useState('computer');
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [gameStatus, setGameStatus] = useState('waiting');
  const [congratsMessage, setCongratsMessage] = useState('');

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setCurrentView(isMobile ? 'mobile' : 'computer');
  }, []);

  const handleJoinGame = () => {
    if (playerName.trim()) {
      setPlayers([...players, playerName]);
      setGameStatus('playing');
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setCongratsMessage(`Congratulations, ${playerName}!`);
      setGameStatus('correct');
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setGameStatus('playing');
        setCongratsMessage('');
      }, 3000);
    } else {
      setGameStatus('incorrect');
    }
  };

  const ComputerView = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-blue-600 p-4 text-white">
      <h1 className="text-4xl font-bold mb-8">KBC Quiz Game</h1>
      {gameStatus === 'waiting' && (
        <Card className="w-96 bg-white text-black">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Join the Game</h2>
          </CardHeader>
          <CardContent>
            <QRCodeSVG value={window.location.href} size={256} />
            <p className="mt-4 text-center">Scan the QR code to join the game</p>
          </CardContent>
        </Card>
      )}
      {(gameStatus === 'playing' || gameStatus === 'correct') && (
        <Card className="w-full max-w-2xl bg-white text-black">
          <CardHeader>
            <h2 className="text-2xl font-semibold">{questions[currentQuestion].question}</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <li key={index} className="p-2 bg-gray-100 rounded">{option}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      {gameStatus === 'correct' && (
        <Alert variant="default" className="mt-4 bg-green-500 text-white">
          ✅
          <AlertTitle className="text-xl">{congratsMessage}</AlertTitle>
          <AlertDescription>
            Moving to the next question...
          </AlertDescription>
        </Alert>
      )}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-2">Players:</h3>
        <ul className="list-disc pl-5">
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const MobileView = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-blue-600 p-4 text-white">
      {gameStatus === 'waiting' ? (
        <Card className="w-full max-w-md bg-white text-black">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Join the Game</h2>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border p-2 mb-2 rounded"
            />
            <button 
              onClick={handleJoinGame} 
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Join Game
            </button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md bg-white text-black">
          <CardHeader>
            <h2 className="text-2xl font-semibold">{questions[currentQuestion].question}</h2>
          </CardHeader>
          <CardContent>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(option)}
                className={`w-full p-2 mb-2 rounded transition ${
                  selectedAnswer === option ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
            <button
              onClick={handleAnswerSubmit}
              className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600 transition"
              disabled={!selectedAnswer}
            >
              Lock Answer
            </button>
            {gameStatus === 'incorrect' && (
              <Alert variant="destructive" className="mt-4">
                ⚠️
                
                <AlertTitle>Incorrect</AlertTitle>
                <AlertDescription>
                  Sorry, that's not the right answer.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );

  return currentView === 'computer' ? <ComputerView /> : <MobileView />;
};

export default App;