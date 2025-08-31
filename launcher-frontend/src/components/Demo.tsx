'use client';

import { useState, useEffect } from 'react';
import { Bot, User, Send, Loader2, Sparkles } from 'lucide-react';
import { agentService } from '@/services/agentService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

export default function Demo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "¡Hola! Soy Launcher, el arquitecto de economías autónomas. ¿En qué puedo ayudarte hoy?",
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const result = await agentService.sendMessage(inputText, 'Launcher');
      
      if (result.success) {
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: result.response,
          sender: 'agent',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, agentMessage]);
      } else {
        throw new Error('Error en la respuesta del agente');
      }
    } catch (error) {
      console.error('Error comunicándose con el agente:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Error: No se pudo conectar con el agente. Asegúrate de que esté ejecutándose en el puerto 3000.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    if (!mounted) return '';
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <section id="demo" className="py-24 bg-black border-t border-cyan-500/20">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Prueba el <span className="text-cyan-400">Launcher Agent</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Interactúa directamente con la IA en tiempo real
          </p>
        </div>
        
        <div className="mx-auto max-w-4xl">
          <div className="bg-black border border-cyan-500/30 rounded-lg overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-cyan-500/10 border-b border-cyan-500/30">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-cyan-400 text-sm font-mono">Launcher Agent Terminal</div>
            </div>
            
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto px-6 py-4 space-y-4 bg-gray-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-cyan-500 text-black'
                        : 'bg-gray-800 text-white border border-cyan-500/30'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'agent' && (
                        <Bot className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      )}
                      {message.sender === 'user' && (
                        <User className="w-5 h-5 text-cyan-900 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-cyan-900' : 'text-cyan-400'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg px-4 py-3 border border-cyan-500/30">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                      <span className="text-sm text-cyan-400">Launcher está pensando...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="px-6 py-4 bg-gray-900 border-t border-cyan-500/30">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje aquí..."
                  className="flex-1 px-4 py-3 bg-gray-800 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-200"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="px-6 py-3 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar</span>
                </button>
              </div>
              
              <p className="mt-3 text-xs text-cyan-400 text-center font-mono">
                Prueba preguntando sobre DeFi, tokenomics, smart contracts o cualquier tema relacionado con blockchain
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}