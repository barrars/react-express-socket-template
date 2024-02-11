import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const emitEvent = (eventName, data) => {
    if (!socket) return;

    socket.emit(eventName, data);
  };

  const addSocketOnEvent = (eventName, func) => {
    if (!socket) return;

    socket.on(eventName, func);

    // Return a cleanup function to allow consumers to easily remove the listener
    return () => socket.off(eventName, func);
  };

  // Example method to remove a specific listener
  const removeEventListener = (eventName, func) => {
    if (!socket) return;

    socket.off(eventName, func);
  };

  // Provide methods and socket state through context
  const value = {
    emitEvent,
    addSocketOnEvent,
    removeEventListener,
    isConnected: !!socket,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
