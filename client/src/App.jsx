import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const socket = io(backendURL);

function App() {

  const [data, setData] = useState({
    temperature: '--',
    humidity: '--',
    timestamp: '--'
  });


  useEffect(() => {
    socket.on('sensorData', newData => {
      setData(newData);
    });

    return () => socket.off('sensorData');
  }, [])

  return (
    <div className="container">
      <div className="card">
        <h1>Real-Time IoT Dashboard</h1>
        <p>🌡️ Temperature: {data.temperature} °C</p>
        <p>💧 Humidity: {data.humidity} %</p>
        <p>⏱️ Last Updated: {data.timestamp}</p>
      </div>
    </div>
  )
}

export default App
