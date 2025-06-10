import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';

const socket = io(import.meta.env.VITE_BACKEND_URL);

function EditorPage() {
  const [code, setCode] = useState('');
  const [users, setUsers] = useState([]);
  const [copyButtonText, setCopyButtonText] = useState('Copiar Enlace');

  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const username = location.state?.username || 'Anónimo';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopyButtonText('¡Copiado!');
      setTimeout(() => setCopyButtonText('Copiar Enlace'), 2000);
    }).catch(err => {
      console.error('Error al copiar el enlace: ', err);
      alert("No se pudo copiar el enlace.");
    });
  };

  const handleLeaveRoom = () => {
    socket.disconnect();
    navigate('/');
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('join-room', { roomId, username });

    const handleCodeUpdate = (newCode) => setCode(newCode);
    socket.on('code-update', handleCodeUpdate);

    const handleUsersUpdate = (userList) => setUsers(userList);
    socket.on('room-users-update', handleUsersUpdate);

    return () => {
      socket.off('code-update', handleCodeUpdate);
      socket.off('room-users-update', handleUsersUpdate);
    };
  }, [roomId, username]);

  const handleCodeMirrorChange = (value) => {
    setCode(value);
    socket.emit('code-change', { roomId, code: value });
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Barra lateral */}
      <aside className="w-64 bg-gray-950 p-4 flex flex-col">
        <h2 className="text-lg font-bold text-cyan-400 mb-4">
          Participantes ({users.length})
        </h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-md truncate"
              title={user.username}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </aside>

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden h-full">
        {/* Encabezado */}
        <header className="mb-4 w-full max-w-6xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-cyan-400">Editor Colaborativo</h1>
              <p className="text-gray-400">
                Estás en la sala:{' '}
                <span className="font-mono bg-gray-700 px-2 py-1 rounded">
                  {roomId}
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all w-36"
              >
                {copyButtonText}
              </button>
              <button
                onClick={handleLeaveRoom}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all"
              >
                Salir
              </button>
            </div>
          </div>
        </header>

        {/* Editor de código */}
        <main className="w-full max-w-6xl flex-1 min-h-0 overflow-auto">
          <div className="h-full">
            <CodeMirror
              value={code}
              height="100%"
              theme={okaidia}
              extensions={[javascript({ jsx: true })]}
              onChange={handleCodeMirrorChange}
              className="text-lg "
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditorPage;
