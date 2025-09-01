const AGENT_API_URL = 'http://localhost:3001';

export interface ChatMessage {
  message: string;
  character: string;
}

export interface ChatResponse {
  response: string;
  success: boolean;
}

export const agentService = {
  async sendMessage(message: string, character: string = 'Launcher'): Promise<ChatResponse> {
    try {
      const response = await fetch(`${AGENT_API_URL}/${character}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: message,
          userId: 'user',
          userName: 'User'
        })
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta del agente: ${response.status}`);
      }

      const data = await response.json();
      // El agente devuelve un array con la respuesta
      if (Array.isArray(data) && data.length > 0) {
        return {
          response: data[0].text || 'No se pudo obtener respuesta del agente',
          success: true
        };
      }
      return {
        response: 'No se pudo obtener respuesta del agente',
        success: false
      };
    } catch (error) {
      console.error('Error comunicándose con el agente:', error);
      throw error;
    }
  },

  async getAgentStatus(): Promise<{ status: string; connected: boolean }> {
    try {
      const response = await fetch(`${AGENT_API_URL}/`);
      if (response.ok) {
        return { status: 'Conectado', connected: true };
      }
      return { status: 'No disponible', connected: false };
    } catch (error) {
      return { status: 'Error de conexión', connected: false };
    }
  },

  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${AGENT_API_URL}/`, {
        method: 'HEAD'
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};
