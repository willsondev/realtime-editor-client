import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState(''); 
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    
    if (roomId.trim() !== '' && username.trim() !== '') {
     
      navigate(`/editor/${roomId}`, {
        state: { username },
      });
    } else {
      alert("Por favor, ingresa un nombre de usuario y un ID de sala.");
    }
  };

  return (
    <div className="min-h-screen bg-[url('/fondo.png')] bg-cover  text-white flex flex-col items-center justify-center font-sans">
      <h1 className="titulo-combinado"  >Editor Colaborativo</h1>
      <p className="text-gray-400 mb-8">Crea o únete a una sala para empezar a codificar.</p>
      
  
      <div className="flex flex-col space-y-4">
      <input
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  placeholder="Ingresa tu nombre de usuario"
  className="w-full max-w-sm px-10 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-center"
/>

        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Ingresa el ID de la sala"
          className="px-4 py-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-center"
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