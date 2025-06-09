import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (roomId.trim() !== '') {
      // Navegamos a la sala con el ID proporcionado
      navigate(`/editor/${roomId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center font-sans">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">Editor Colaborativo</h1>
      <p className="text-gray-400 mb-8">Crea o únete a una sala para empezar a codificar.</p>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Ingresa el ID de la sala"
          className="px-4 py-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={handleJoinRoom}
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-colors"
        >
          Unirse
        </button>
      </div>
    </div>
  );
}

export default HomePage;