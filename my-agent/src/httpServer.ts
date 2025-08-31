import express from 'express';
import cors from 'cors';
import { tokenIntegration } from './blockchain/tokenIntegration.js';

export function createHTTPServer(agentRuntime: any) {
  const app = express();
  const PORT = process.env.SERVER_PORT || 3001;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Endpoint de estado
  app.get('/', (req, res) => {
    res.json({
      status: 'running',
      agent: 'Launcher',
      version: '2.0',
      blockchain: tokenIntegration.getServiceInfo()
    });
  });

  // Endpoint para enviar mensajes al agente
  app.post('/:character/message', async (req, res) => {
    try {
      const { character } = req.params;
      const { text, userId, userName } = req.body;

      if (!text) {
        return res.status(400).json({ error: 'Mensaje requerido' });
      }

      // Simular respuesta del agente
      const response = await processMessage(text, character);
      
      res.json([{
        text: response,
        timestamp: new Date().toISOString(),
        sender: 'agent'
      }]);
    } catch (error: any) {
      console.error('Error procesando mensaje:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Endpoint para obtener estado del agente
  app.get('/status', (req, res) => {
    res.json({
      status: 'running',
      timestamp: new Date().toISOString(),
      blockchain: tokenIntegration.getServiceInfo()
    });
  });

  // Endpoint para comandos de blockchain
  app.post('/:character/command', async (req, res) => {
    try {
      const { character } = req.params;
      const { command, params } = req.body;

      if (!command) {
        return res.status(400).json({ error: 'Comando requerido' });
      }

      // Ejecutar comando del agente
      const response = await executeCommand(command, params, character);
      
      res.json({
        success: true,
        response,
        command,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('Error ejecutando comando:', error);
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  });

  return app;
}

// Función para procesar mensajes
async function processMessage(text: string, character: string): Promise<string> {
  // Aquí puedes implementar la lógica del agente
  // Por ahora, devolvemos una respuesta simple
  
  if (text.toLowerCase().includes('hola') || text.toLowerCase().includes('hello')) {
    return `¡Hola! Soy ${character}, el agente de lanzamiento de tokens. ¿En qué puedo ayudarte hoy?`;
  }
  
  if (text.toLowerCase().includes('token') || text.toLowerCase().includes('crear')) {
    return `Para crear un token, usa el comando: createToken <nombre> <símbolo> <supply> [enableAI]`;
  }
  
  if (text.toLowerCase().includes('ayuda') || text.toLowerCase().includes('help')) {
    return `Comandos disponibles: createToken, configureAI, createAIAgent, getTokenInfo, getUserTokens, getAllTokens, getTokenAgents, tokenHelp`;
  }
  
  return `Entiendo tu mensaje: "${text}". Soy un agente especializado en lanzamiento de tokens con AI agents. ¿Quieres que te ayude a crear un token o configurar AI agents?`;
}

// Función para ejecutar comandos
async function executeCommand(command: string, params: string[], character: string): Promise<string> {
  // Aquí puedes implementar la ejecución real de comandos
  // Por ahora, devolvemos respuestas simuladas
  
  switch (command) {
    case 'createToken':
      return `Comando createToken ejecutado con parámetros: ${params.join(', ')}`;
    case 'configureAI':
      return `Comando configureAI ejecutado con parámetros: ${params.join(', ')}`;
    case 'createAIAgent':
      return `Comando createAIAgent ejecutado con parámetros: ${params.join(', ')}`;
    case 'getTokenInfo':
      return `Comando getTokenInfo ejecutado con parámetros: ${params.join(', ')}`;
    default:
      return `Comando ${command} no reconocido. Usa 'tokenHelp' para ver comandos disponibles.`;
  }
}
