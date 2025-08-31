import { LauncherService } from '../blockchain/launcherService.js';
import { TokenCreationData, AIAgentConfig } from '../blockchain/blockchain.js';
import { ethers } from 'ethers';

export class TokenCommands {
  constructor(private launcherService: LauncherService) {}

  async createToken(params: string[]): Promise<string> {
    if (params.length < 3) {
      return "❌ **Uso:** `createToken <nombre> <símbolo> <supply> [enableAI]`\n" +
             "📝 **Ejemplo:** `createToken MiToken MT 1000000 true`\n" +
             "💡 **Parámetros:**\n" +
             "   • nombre: Nombre completo del token (mín 3 caracteres)\n" +
             "   • símbolo: Símbolo del token (mín 2 caracteres)\n" +
             "   • supply: Cantidad total de tokens\n" +
             "   • enableAI: true/false para habilitar AI agents";
    }

    const [name, symbol, supplyStr, enableAI] = params;
    const supply = parseInt(supplyStr);
    const enableAIAgents = enableAI === 'true';

    // Validaciones
    if (isNaN(supply) || supply <= 0) {
      return "❌ **Error:** El supply debe ser un número mayor a 0";
    }

    if (name.length < 3) {
      return "❌ **Error:** El nombre debe tener al menos 3 caracteres";
    }

    if (symbol.length < 2) {
      return "❌ **Error:** El símbolo debe tener al menos 2 caracteres";
    }

    try {
      const result = await this.launcherService.createToken({
        name,
        symbol,
        totalSupply: supply,
        enableAIAgents
      });

      if (result.success) {
        return `✅ **Token Creado Exitosamente!**

🏷️ **Nombre:** ${name}
💎 **Símbolo:** ${symbol}
💰 **Supply:** ${supply.toLocaleString()}
🤖 **AI Agents:** ${enableAIAgents ? '✅ Habilitados' : '❌ Deshabilitados'}
📍 **TX Hash:** \`${result.transactionHash}\`
🏗️ **Dirección:** ${result.tokenAddress ? `\`${result.tokenAddress}\`` : 'Pendiente de confirmación'}

🚀 Tu token está listo para ser lanzado!`;
      } else {
        return `❌ **Error Creando Token:** ${result.error}`;
      }
    } catch (error: any) {
      return `❌ **Error Inesperado:** ${error.message}`;
    }
  }

  async configureAI(params: string[]): Promise<string> {
    if (params.length < 5) {
      return "❌ **Uso:** `configureAI <tokenAddress> <community> <marketing> <data> <trading>`\n" +
             "📝 **Ejemplo:** `configureAI 0x123... true false true false`\n" +
             "💡 **Parámetros:**\n" +
             "   • tokenAddress: Dirección del contrato del token\n" +
             "   • community: true/false para Community Manager\n" +
             "   • marketing: true/false para Marketing AI\n" +
             "   • data: true/false para Data Analyst\n" +
             "   • trading: true/false para Trading Assistant";
    }

    const [tokenAddress, community, marketing, data, trading] = params;
    
    // Validar dirección del token
    if (!tokenAddress.startsWith('0x') || tokenAddress.length !== 42) {
      return "❌ **Error:** Dirección de token inválida";
    }
    
    const config: AIAgentConfig = {
      communityManager: community === 'true',
      marketingAI: marketing === 'true',
      dataAnalyst: data === 'true',
      tradingAssistant: trading === 'true'
    };

    try {
      const result = await this.launcherService.configureAIAgents(tokenAddress, config);

      if (result.success) {
        return `✅ **AI Agents Configurados Exitosamente!**

🤖 **Configuración Aplicada:**
   • Community Manager: ${config.communityManager ? '✅' : '❌'}
   • Marketing AI: ${config.marketingAI ? '✅' : '❌'}
   • Data Analyst: ${config.dataAnalyst ? '✅' : '❌'}
   • Trading Assistant: ${config.tradingAssistant ? '✅' : '❌'}

📍 **TX Hash:** \`${result.transactionHash}\`
🎯 **Token:** \`${tokenAddress}\``;
      } else {
        return `❌ **Error Configurando AI:** ${result.error}`;
      }
    } catch (error: any) {
      return `❌ **Error Inesperado:** ${error.message}`;
    }
  }

  async createAIAgent(params: string[]): Promise<string> {
    if (params.length < 4) {
      return "❌ **Uso:** `createAIAgent <tokenAddress> <tipo> <budget> <config>`\n" +
             "📝 **Ejemplo:** `createAIAgent 0x123... community 0.1 Configuración del agente`\n" +
             "💡 **Parámetros:**\n" +
             "   • tokenAddress: Dirección del contrato del token\n" +
             "   • tipo: community, marketing, data, trading\n" +
             "   • budget: Presupuesto en ETH\n" +
             "   • config: Configuración del agente (texto)";
    }

    const [tokenAddress, agentType, budgetStr, ...configParts] = params;
    const budget = parseFloat(budgetStr);
    const configuration = configParts.join(' ');

    // Validaciones
    if (!tokenAddress.startsWith('0x') || tokenAddress.length !== 42) {
      return "❌ **Error:** Dirección de token inválida";
    }

    if (isNaN(budget) || budget <= 0) {
      return "❌ **Error:** El budget debe ser un número mayor a 0";
    }

    const validTypes = ['community', 'marketing', 'data', 'trading'];
    if (!validTypes.includes(agentType)) {
      return `❌ **Error:** Tipo de agente inválido. Tipos válidos: ${validTypes.join(', ')}`;
    }

    if (configuration.length < 10) {
      return "❌ **Error:** La configuración debe tener al menos 10 caracteres";
    }

    try {
      const result = await this.launcherService.createAIAgent({
        tokenAddress,
        agentType,
        budget,
        configuration
      });

      if (result.success) {
        return `✅ **AI Agent Creado Exitosamente!**

🤖 **Tipo:** ${agentType}
💰 **Budget:** ${budget} ETH
⚙️ **Configuración:** ${configuration.substring(0, 100)}${configuration.length > 100 ? '...' : ''}
🆔 **Agent ID:** \`${result.agentId}\`
📍 **TX Hash:** \`${result.transactionHash}\`
🎯 **Token:** \`${tokenAddress}\``;
      } else {
        return `❌ **Error Creando AI Agent:** ${result.error}`;
      }
    } catch (error: any) {
      return `❌ **Error Inesperado:** ${error.message}`;
    }
  }

  async getTokenInfo(params: string[]): Promise<string> {
    if (params.length < 1) {
      return "❌ **Uso:** `getTokenInfo <tokenAddress>`\n" +
             "📝 **Ejemplo:** `getTokenInfo 0x123...`";
    }

    const [tokenAddress] = params;

    if (!tokenAddress.startsWith('0x') || tokenAddress.length !== 42) {
      return "❌ **Error:** Dirección de token inválida";
    }

    try {
      const result = await this.launcherService.getTokenInfo(tokenAddress);

      if (result.success) {
        const { data } = result;
        const launchDate = new Date(Number(data.launchTimestamp) * 1000);
        
        return `📊 **Información del Token**

🏷️ **Nombre:** ${data.name}
💎 **Símbolo:** ${data.symbol}
💰 **Supply Total:** ${data.totalSupply.toLocaleString()}
🔢 **Decimales:** ${data.decimals}
🚀 **Lanzado:** ${launchDate.toLocaleString('es-ES')}
📍 **Dirección:** \`${tokenAddress}\``;
      } else {
        return `❌ **Error Obteniendo Información:** ${result.error}`;
      }
    } catch (error: any) {
      return `❌ **Error Inesperado:** ${error.message}`;
    }
  }

  async getUserTokens(params: string[]): Promise<string> {
    if (params.length < 1) {
      return "❌ **Uso:** `getUserTokens <userAddress>`\n" +
             "📝 **Ejemplo:** `getUserTokens 0x123...`";
    }

    const [userAddress] = params;

    if (!userAddress.startsWith('0x') || userAddress.length !== 42) {
      return "❌ **Error:** Dirección de usuario inválida";
    }

    try {
      const result = await this.launcherService.getUserTokens(userAddress);

      if (result.success && result.data && result.data.length > 0) {
        let response = `📋 **Tokens del Usuario** (${result.data.length})\n\n`;
        
        result.data.forEach((token: any, index: number) => {
          response += `${index + 1}. **${token.name} (${token.symbol})**\n`;
          response += `   📍 Dirección: \`${token.tokenAddress}\`\n`;
          response += `   💰 Supply: ${token.totalSupply.toLocaleString()}\n`;
          response += `   🤖 AI Agents: ${token.hasAIAgents ? '✅' : '❌'}\n`;
          response += `   📅 Creado: ${new Date(token.createdAt * 1000).toLocaleDateString('es-ES')}\n\n`;
        });

        return response;
      } else if (result.success && (!result.data || result.data.length === 0)) {
        return "📭 **No se encontraron tokens** para esta dirección";
      } else {
        return `❌ **Error Obteniendo Tokens:** ${result.error}`;
      }
    } catch (error: any) {
      return `❌ **Error Inesperado:** ${error.message}`;
    }
  }

  async getAllTokens(): Promise<string> {
    try {
      const result = await this.launcherService.getAllTokens();

      if (result.success && result.data && result.data.length > 0) {
        let response = `🌐 **Todos los Tokens** (${result.data.length})\n\n`;
        
        // Mostrar solo los primeros 10 para no saturar
        const tokensToShow = result.data.slice(0, 10);
        
        tokensToShow.forEach((token: any, index: number) => {
          response += `${index + 1}. **${token.name} (${token.symbol})**\n`;
          response += `   📍 Dirección: \`${token.tokenAddress}\`\n`;
          response += `   👤 Creador: \`${token.creator}\`\n`;
          response += `   🤖 AI Agents: ${token.hasAIAgents ? '✅' : '❌'}\n\n`;
        });

        if (result.data.length > 10) {
          response += `... y ${result.data.length - 10} tokens más`;
        }

        return response;
      } else if (result.success && (!result.data || result.data.length === 0)) {
        return "📭 **No hay tokens creados** en la plataforma";
      } else {
        return `❌ **Error Obteniendo Tokens:** ${result.error}`;
      }
    } catch (error: any) {
      return `❌ **Error Inesperado:** ${error.message}`;
    }
  }

  async getTokenAgents(params: string[]): Promise<string> {
    if (params.length < 1) {
      return "❌ **Uso:** `getTokenAgents <tokenAddress>`\n" +
             "📝 **Ejemplo:** `getTokenAgents 0x123...`";
    }

    const [tokenAddress] = params;

    if (!tokenAddress.startsWith('0x') || tokenAddress.length !== 42) {
      return "❌ **Error:** Dirección de token inválida";
    }

    try {
      const result = await this.launcherService.getTokenAgents(tokenAddress);

      if (result.success && result.data && result.data.length > 0) {
        let response = `🤖 **AI Agents del Token** (${result.data.length})\n\n`;
        
        result.data.forEach((agent: any, index: number) => {
          response += `${index + 1}. **${agent.agentType.toUpperCase()}**\n`;
          response += `   🆔 ID: \`${agent.agentId}\`\n`;
          response += `   👤 Propietario: \`${agent.owner}\`\n`;
          response += `   💰 Budget: ${ethers.formatEther(agent.budget)} ETH\n`;
          response += `   📊 Estado: ${agent.isActive ? '✅ Activo' : '❌ Inactivo'}\n`;
          response += `   📅 Creado: ${new Date(agent.createdAt * 1000).toLocaleDateString('es-ES')}\n\n`;
        });

        return response;
      } else if (result.success && (!result.data || result.data.length === 0)) {
        return "📭 **No hay AI agents** configurados para este token";
      } else {
        return `❌ **Error Obteniendo Agents:** ${result.error}`;
      }
    } catch (error: any) {
      return `❌ **Error Inesperado:** ${error.message}`;
    }
  }

  async help(): Promise<string> {
    return `🚀 **Comandos de Token Launcher**

📋 **Comandos Disponibles:**

1. **createToken** - Crear un nuevo token
   \`createToken <nombre> <símbolo> <supply> [enableAI]\`

2. **configureAI** - Configurar AI agents para un token
   \`configureAI <tokenAddress> <community> <marketing> <data> <trading>\`

3. **createAIAgent** - Crear un AI agent específico
   \`createAIAgent <tokenAddress> <tipo> <budget> <config>\`

4. **getTokenInfo** - Obtener información de un token
   \`getTokenInfo <tokenAddress>\`

5. **getUserTokens** - Ver tokens de un usuario
   \`getUserTokens <userAddress>\`

6. **getAllTokens** - Ver todos los tokens de la plataforma
   \`getAllTokens\`

7. **getTokenAgents** - Ver AI agents de un token
   \`getTokenAgents <tokenAddress>\`

8. **tokenHelp** - Mostrar esta ayuda
   \`tokenHelp\`

💡 **Tipos de AI Agents:**
   • community - Community Manager
   • marketing - Marketing AI
   • data - Data Analyst
   • trading - Trading Assistant

🔗 **Ejemplos de Uso:**
   • \`createToken MiDeFiToken MDT 1000000 true\`
   • \`configureAI 0x123... true false true false\`
   • \`createAIAgent 0x123... community 0.1 Gestión de comunidad\``;
  }
}
