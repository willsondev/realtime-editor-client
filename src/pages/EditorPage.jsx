import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';

const socket = io(import.meta.env.VITE_BACKEND_URL);

function EditorPage() {
  const [code, setCode] = useState('');
  const [users, setUsers] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    socket.emit('join-room', roomId);

    const handleCodeUpdate = (newCode) => {
      setCode(newCode);
    };
    socket.on('code-update', handleCodeUpdate);

    const handleUsersUpdate = (userList) => {
      setUsers(userList);
    };
    socket.on('room-users-update', handleUsersUpdate);

    return () => {
      socket.off('code-update', handleCodeUpdate);
      socket.off('room-users-update', handleUsersUpdate);
    };
  }, [roomId]);

  const handleCodeMirrorChange = (value) => {
    setCode(value);
    socket.emit('code-change', { roomId, code: value });
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      <aside className="w-64 bg-gray-950 p-4 flex flex-col">
        <h2 className="text-lg font-bold text-cyan-400 mb-4">Participantes ({users.length})</h2>
        <ul className="space-y-2">
          {users.map((userId) => (
            <li
              key={userId}
              className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-md truncate"
              title={userId}
            >
              {userId.substring(0, 5)}...
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex-1 flex flex-col p-8">
        <header className="mb-8 w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-cyan-400">Editor Colaborativo</h1>
          <p className="text-gray-400">
            Estás en la sala: <span className="font-mono bg-gray-700 px-2 py-1 rounded">{roomId}</span>
          </p>
        </header>
        <main className="w-full max-w-4xl flex-1 overflow-auto min-h-[500px]">
          <div className="bg-[#272822] rounded-xl p-2 shadow-xl h-full">
            <CodeMirror
              value={code}
              height="100%"
              theme={okaidia}
              extensions={[javascript({ jsx: true })]}
              onChange={handleCodeMirrorChange}
              className="text-base"
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditorPage;
