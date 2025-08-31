import { BlockchainResponse, TokenCreationData, AIAgentConfig, AgentCreationData } from './blockchain';
export declare class LauncherService {
    private provider;
    private signer;
    private factory;
    private aiAgentManager;
    constructor(privateKey: string, rpcUrl: string);
    createToken(tokenData: TokenCreationData): Promise<BlockchainResponse>;
    configureAIAgents(tokenAddress: string, config: AIAgentConfig): Promise<BlockchainResponse>;
    createAIAgent(agentData: AgentCreationData): Promise<BlockchainResponse>;
    getTokenInfo(tokenAddress: string): Promise<BlockchainResponse>;
    getUserTokens(userAddress: string): Promise<BlockchainResponse>;
    getAllTokens(): Promise<BlockchainResponse>;
    getTokenAgents(tokenAddress: string): Promise<BlockchainResponse>;
}
