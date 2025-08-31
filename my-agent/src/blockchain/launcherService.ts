import { ethers } from 'ethers';
import { 
  BlockchainResponse, 
  TokenCreationData, 
  AIAgentConfig, 
  TokenInfo,
  AgentCreationData 
} from './blockchain';

export class LauncherService {
  private provider: ethers.Provider;
  private signer: ethers.Signer;
  private factory: any; // Factory contract
  private aiAgentManager: any; // AIAgentManager contract

  constructor(privateKey: string, rpcUrl: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);
    
    const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS!;
    const AI_AGENT_MANAGER_ADDRESS = process.env.AI_AGENT_MANAGER_ADDRESS!;
    
    if (!FACTORY_ADDRESS || !AI_AGENT_MANAGER_ADDRESS) {
      throw new Error('FACTORY_ADDRESS y AI_AGENT_MANAGER_ADDRESS deben estar configurados en .env');
    }
    
    // Conectar a los contratos con ABIs temporales
    this.factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, this.signer);
    this.aiAgentManager = new ethers.Contract(AI_AGENT_MANAGER_ADDRESS, AI_AGENT_MANAGER_ABI, this.signer);
  }

  async createToken(tokenData: TokenCreationData): Promise<BlockchainResponse> {
    try {
      const creationFee = await this.factory.creationFee();
      
      const tx = await this.factory.createToken(
        tokenData.name,
        tokenData.symbol,
        tokenData.totalSupply,
        tokenData.enableAIAgents,
        { value: creationFee }
      );
      
      const receipt = await tx.wait();
      
      // Buscar el evento TokenCreated
      const event = receipt?.logs.find(log => 
        log.topics[0] === this.factory.interface.getEventTopic('TokenCreated')
      );
      
      if (event) {
        const parsed = this.factory.interface.parseLog(event);
        return {
          success: true,
          transactionHash: tx.hash,
          tokenAddress: parsed.args[0]
        };
      }
      
      return {
        success: true,
        transactionHash: tx.hash,
        data: receipt
      };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'Error desconocido al crear token' 
      };
    }
  }

  async configureAIAgents(tokenAddress: string, config: AIAgentConfig): Promise<BlockchainResponse> {
    try {
      const token = new ethers.Contract(tokenAddress, TOKEN_ABI, this.signer);
      const tx = await token.configureAIAgents(
        config.communityManager,
        config.marketingAI,
        config.dataAnalyst,
        config.tradingAssistant
      );
      
      await tx.wait();
      return { success: true, transactionHash: tx.hash };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'Error desconocido al configurar AI agents' 
      };
    }
  }

  async createAIAgent(agentData: AgentCreationData): Promise<BlockchainResponse> {
    try {
      const tx = await this.aiAgentManager.createAgent(
        agentData.tokenAddress,
        agentData.agentType,
        ethers.parseEther(agentData.budget.toString()),
        agentData.configuration
      );
      
      const receipt = await tx.wait();
      
      // Buscar el evento AgentCreated
      const event = receipt?.logs.find(log => 
        log.topics[0] === this.aiAgentManager.interface.getEventTopic('AgentCreated')
      );
      
      if (event) {
        const parsed = this.aiAgentManager.interface.parseLog(event);
        return {
          success: true,
          agentId: parsed.args[0],
          transactionHash: tx.hash
        };
      }
      
      return {
        success: true,
        transactionHash: tx.hash,
        data: receipt
      };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'Error desconocido al crear AI agent' 
      };
    }
  }

  async getTokenInfo(tokenAddress: string): Promise<BlockchainResponse> {
    try {
      const token = new ethers.Contract(tokenAddress, TOKEN_ABI, this.signer);
      const info = await token.getTokenInfo();
      
      return {
        success: true,
        data: {
          name: info[0],
          symbol: info[1],
          totalSupply: info[2],
          decimals: info[3],
          launchTimestamp: info[4]
        }
      };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'Error desconocido al obtener información del token' 
      };
    }
  }

  async getUserTokens(userAddress: string): Promise<BlockchainResponse> {
    try {
      const tokens = await this.factory.getUserTokens(userAddress);
      return {
        success: true,
        data: tokens
      };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'Error desconocido al obtener tokens del usuario' 
      };
    }
  }

  async getAllTokens(): Promise<BlockchainResponse> {
    try {
      const tokens = await this.factory.getAllTokens();
      return {
        success: true,
        data: tokens
      };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'Error desconocido al obtener todos los tokens' 
      };
    }
  }

  async getTokenAgents(tokenAddress: string): Promise<BlockchainResponse> {
    try {
      const agents = await this.aiAgentManager.getTokenAgents(tokenAddress);
      return {
        success: true,
        data: agents
      };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'Error desconocido al obtener agentes del token' 
      };
    }
  }
}

// ABIs temporales - Necesitarás generarlos con typechain o compilar los contratos
const FACTORY_ABI = [
  "function creationFee() external view returns (uint256)",
  "function createToken(string name, string symbol, uint256 totalSupply, bool enableAIAgents) external payable returns (address)",
  "function getUserTokens(address user) external view returns (tuple(address,string,string,uint256,address,uint256,bool,uint256)[])",
  "function getAllTokens() external view returns (tuple(address,string,string,uint256,address,uint256,bool,uint256)[])",
  "event TokenCreated(address indexed tokenAddress, address indexed creator, string name, string symbol, uint256 totalSupply)"
];

const AI_AGENT_MANAGER_ABI = [
  "function createAgent(address tokenContract, string agentType, uint256 budget, string configuration) external returns (bytes32)",
  "function getTokenAgents(address tokenContract) external view returns (tuple(bytes32,string,address,address,bool,uint256,string,uint256,uint256)[])",
  "event AgentCreated(bytes32 indexed agentId, address indexed tokenContract, address indexed owner, string agentType)"
];

const TOKEN_ABI = [
  "function configureAIAgents(bool communityManager, bool marketingAI, bool dataAnalyst, bool tradingAssistant) external",
  "function getTokenInfo() external view returns (string, string, uint256, uint256, uint256)"
];
