import express, { Express } from 'express';
import cors from 'cors';
import { tokenIntegration } from './blockchain/tokenIntegration.js';

// Función para llamar a OpenAI directamente
async function callOpenAI(prompt: string, apiKey: string): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Eres un asistente útil y amigable.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No se pudo obtener respuesta de OpenAI';
  } catch (error) {
    console.error('Error llamando a OpenAI:', error);
    throw error;
  }
}

export function createHTTPServer(agentRuntime: any): Express {
  const app = express();
  const PORT = process.env.SERVER_PORT || 3002;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Endpoint de estado
  app.get('/', (req, res) => {
    const blockchainStatus = tokenIntegration.getServiceInfo();
    const agentInfo = agentRuntime ? {
      name: agentRuntime.character?.name || 'Unknown',
      hasToken: !!agentRuntime.token,
      tokenPrefix: agentRuntime.token ? agentRuntime.token.substring(0, 10) + '...' : 'No token',
      modelProvider: agentRuntime.character?.modelProvider || 'Unknown'
    } : { error: 'AgentRuntime no disponible' };
    
    res.json({
      status: 'running',
      agent: 'Launcher',
      version: '2.0',
      blockchain: blockchainStatus,
      agentRuntime: agentInfo
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

      // Usar el agente real si está disponible
      if (agentRuntime && agentRuntime.character && agentRuntime.character.name === character) {
        // Aquí podrías integrar con el agente real
        const response = await processMessageWithAgent(text, character, agentRuntime);
        res.json([{
          text: response,
          timestamp: new Date().toISOString(),
          sender: 'agent'
        }]);
      } else {
        // Fallback a procesamiento local
        const response = await processMessage(text, character);
        res.json([{
          text: response,
          timestamp: new Date().toISOString(),
          sender: 'agent'
        }]);
      }
    } catch (error: any) {
      console.error('Error procesando mensaje:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Endpoint para obtener estado del agente
  app.get('/status', (req, res) => {
    const blockchainStatus = tokenIntegration.getServiceInfo();
    res.json({
      status: 'running',
      timestamp: new Date().toISOString(),
      blockchain: blockchainStatus
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

// Placeholder functions for message processing and command execution
async function processMessageWithAgent(text: string, character: string, agentRuntime: any): Promise<string> {
  try {
    // Usar el agente real con OpenAI
    if (agentRuntime && agentRuntime.character && agentRuntime.character.system) {
      // Construir el prompt completo para OpenAI
      const systemPrompt = agentRuntime.character.system;
      const characterName = agentRuntime.character.name;
      const characterBio = agentRuntime.character.bio ? agentRuntime.character.bio.join('\n') : '';
      
      // Crear el prompt completo
      const fullPrompt = `${systemPrompt}

${characterBio}

Usuario: ${text}

${characterName} (respondiendo como ${characterName}):`;

      // Intentar usar OpenAI real si tenemos el token
      if (agentRuntime.token && agentRuntime.token.startsWith('sk-')) {
        try {
          console.log(`[DEBUG] Llamando a OpenAI con token: ${agentRuntime.token.substring(0, 10)}...`);
          const openaiResponse = await callOpenAI(fullPrompt, agentRuntime.token);
          console.log(`[DEBUG] Respuesta de OpenAI: ${openaiResponse.substring(0, 100)}...`);
          return openaiResponse;
        } catch (openaiError) {
          console.error('[ERROR] Fallback a procesamiento local por error de OpenAI:', openaiError);
          return await processMessage(text, character);
        }
      } else {
        console.log(`[DEBUG] No hay token de OpenAI válido, usando fallback`);
        return await processMessage(text, character);
      }
    } else {
      // Fallback a procesamiento local
      return await processMessage(text, character);
    }
  } catch (error) {
    console.error('Error procesando mensaje con agente:', error);
    return `Error procesando mensaje: ${error}`;
  }
}

async function processMessage(text: string, character: string): Promise<string> {
  // Aquí puedes integrar con el agente real
  if (text.toLowerCase().includes('hola') || text.toLowerCase().includes('hello')) {
    return `¡Hola! Soy el agente Launcher. ¿En qué puedo ayudarte hoy?`;
  }

  if (text.toLowerCase().includes('token') || text.toLowerCase().includes('lanzar')) {
    return `¡Perfecto! Puedo ayudarte a lanzar tokens. Usa el comando 'createToken' para empezar.`;
  }

  return `Entiendo tu mensaje: "${text}". Soy un agente especializado en lanzamiento de tokens con AI agents. ¿Quieres que te ayude a crear un token o configurar AI agents?`;
}

async function executeCommand(command: string, params: string[], character: string): Promise<string> {
  // Aquí puedes integrar con los comandos reales del agente
  switch (command.toLowerCase()) {
    case 'createtoken':
      return `Comando para crear token ejecutado. Parámetros: ${params.join(', ')}`;
    case 'configureai':
      return `Configurando AI agents con parámetros: ${params.join(', ')}`;
    case 'help':
      return `Comandos disponibles: createToken, configureAI, getTokenInfo, getUserTokens`;
    default:
      return `Comando ${command} no reconocido. Usa 'help' para ver comandos disponibles.`;
  }
}
