'use client';

import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';
import { agentService } from '@/services/agentService';

export default function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connected = await agentService.checkConnection();
        setIsConnected(connected);
      } catch (error) {
        setIsConnected(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkConnection();
    
    // Verificar conexión cada 30 segundos
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isChecking) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Verificando conexión...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 text-sm ${
      isConnected ? 'text-green-600' : 'text-red-600'
    }`}>
      {isConnected ? (
        <>
          <Wifi className="w-4 h-4" />
          <span>Conectado al agente</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4" />
          <span>Desconectado del agente</span>
        </>
      )}
    </div>
  );
}
