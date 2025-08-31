import { LauncherService } from './launcherService.js';
import { TokenCommands } from '../commands/tokenCommands.js';
import { elizaLogger } from '@elizaos/core';

export class TokenIntegration {
  private launcherService: LauncherService | null = null;
  private tokenCommands: TokenCommands | null = null;

  constructor() {
    this.initializeBlockchain();
  }

  private initializeBlockchain() {
    try {
      const privateKey = process.env.PRIVATE_KEY;
      const rpcUrl = process.env.RPC_URL;

      if (!privateKey || !rpcUrl) {
        elizaLogger.warn('Blockchain no inicializado: faltan PRIVATE_KEY o RPC_URL en .env');
        return;
      }

      this.launcherService = new LauncherService(privateKey, rpcUrl);
      this.tokenCommands = new TokenCommands(this.launcherService);
      
      elizaLogger.success('Blockchain inicializado correctamente');
    } catch (error) {
      elizaLogger.error(`Error inicializando blockchain: ${error}`);
    }
  }

  // Método para registrar comandos en el agente
  registerCommands(character: any) {
    if (!this.tokenCommands) {
      elizaLogger.warn('No se pueden registrar comandos: blockchain no inicializado');
      return;
    }

    // Agregar comandos al character
    if (!character.commands) {
      character.commands = {};
    }

    // Registrar todos los comandos de tokens
    character.commands.createToken = this.tokenCommands.createToken.bind(this.tokenCommands);
    character.commands.configureAI = this.tokenCommands.configureAI.bind(this.tokenCommands);
    character.commands.createAIAgent = this.tokenCommands.createAIAgent.bind(this.tokenCommands);
    character.commands.getTokenInfo = this.tokenCommands.getTokenInfo.bind(this.tokenCommands);
    character.commands.getUserTokens = this.tokenCommands.getUserTokens.bind(this.tokenCommands);
    character.commands.getAllTokens = this.tokenCommands.getAllTokens.bind(this.tokenCommands);
    character.commands.getTokenAgents = this.tokenCommands.getTokenAgents.bind(this.tokenCommands);
    character.commands.tokenHelp = this.tokenCommands.help.bind(this.tokenCommands);

    elizaLogger.success('Comandos de tokens registrados en el agente');
  }

  // Método para verificar el estado de la conexión blockchain
  async checkBlockchainStatus(): Promise<boolean> {
    if (!this.launcherService) {
      return false;
    }

    try {
      // Intentar obtener información básica para verificar conexión
      const result = await this.launcherService.getAllTokens();
      return result.success;
    } catch (error) {
      elizaLogger.error(`Error verificando estado blockchain: ${error}`);
      return false;
    }
  }

  // Método para obtener información del servicio
  getServiceInfo() {
    if (!this.launcherService) {
      return {
        status: 'disconnected',
        message: 'Blockchain no inicializado'
      };
    }

    return {
      status: 'connected',
      message: 'Blockchain conectado y funcionando',
      commands: [
        'createToken',
        'configureAI', 
        'createAIAgent',
        'getTokenInfo',
        'getUserTokens',
        'getAllTokens',
        'getTokenAgents',
        'tokenHelp'
      ]
    };
  }
}

// Instancia global para usar en el agente
export const tokenIntegration = new TokenIntegration();
